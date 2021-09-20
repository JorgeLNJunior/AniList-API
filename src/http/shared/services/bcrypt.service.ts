import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptService {
  async hash (data: string) {
    return bcrypt.hash(data, 10)
  }

  async compare (data: string, hash: string) {
    return bcrypt.compare(data, hash)
  }
}
