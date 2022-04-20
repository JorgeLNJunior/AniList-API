import { CreateUserDto } from '@http/modules/user/dto/create-user.dto'
import { User } from '@http/modules/user/entities/user.entity'
import { BcryptService } from '@http/shared/services/bcrypt.service'
import { InjectQueue } from '@nestjs/bull'
import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Queue } from 'bull'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue('email') private mailQueue: Queue,
    @InjectRepository(User) private userRepository: Repository<User>,
    private bcrypt: BcryptService,
    private jwt: JwtService,
    private configService: ConfigService
  ) { }

  async register(createUserDto: CreateUserDto) {
    const passwordHash = await this.bcrypt.hash(createUserDto.password)
    createUserDto.password = passwordHash

    const userData = this.userRepository.create(createUserDto)
    const user = await this.userRepository.save(userData)

    await this.mailQueue.add('email_activation', { user: user })

    return user
  }

  async login(user: User) {
    const payload = { uuid: user.uuid, isAdmin: user.isAdmin }
    return this.jwt.sign(payload)
  }

  async activateEmail(token: string) {
    const email = this.decodeToken(token)
    const user = await this.userRepository.findOne({ email: email })
    if (!user) {
      throw new BadRequestException('user not found')
    }
    if (user.isActive) {
      throw new BadRequestException('this email is already active')
    }

    await this.userRepository.update(user.uuid, { isActive: true })
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email: email })

    if (!user) {
      throw new UnauthorizedException('this email is not registered')
    }

    const isSamePassword = await this.bcrypt.compare(
      password,
      user.password
    )

    if (!isSamePassword) {
      throw new UnauthorizedException('wrong credentials')
    }

    return user
  }

  private decodeToken(token: string) {
    try {
      const payload = this.jwt.verify(token, {
        secret: this.configService.get<string>('EMAIL_ACTIVATION_TOKEN_SECRET')
      })
      return payload.email
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException('token expired')
      }
      throw new BadRequestException('Invalid token')
    }
  }
}
