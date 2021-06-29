import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestResponse } from '@shared/responses/badRequest.response';
import { ForbiddenResponse } from '@shared/responses/forbidden.response';
import { TooManyRequestsResponse } from '@shared/responses/tooManyRequests.response';
import { UnauthorizedResponse } from '@shared/responses/unauthorized.response';

import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { AnimeQuery } from './query/anime.query.interface';
import { CreateAnimeResponse } from './responses/createAnime.response';
import { DeleteAnimeResponse } from './responses/deleteAnime.response';
import { FindAnimeResponse } from './responses/findAnimes.response';
import { UpdateAnimeResponse } from './responses/updateAnime.response';

@ApiBearerAuth()
@ApiTags('Animes')
@ApiUnauthorizedResponse({
  description: 'Invalid credentials',
  type: UnauthorizedResponse,
})
@ApiForbiddenResponse({
  description: 'Forbidden',
  type: ForbiddenResponse,
})
@ApiTooManyRequestsResponse({
  description: 'Too Many Requests',
  type: TooManyRequestsResponse,
})
@UseGuards(AuthGuard('jwt'))
@Controller('animes')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @ApiCreatedResponse({ description: 'OK', type: CreateAnimeResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse,
  })
  @Post()
  async create(@Body() createAnimeDto: CreateAnimeDto) {
    const anime = await this.animeService.create(createAnimeDto);
    return new CreateAnimeResponse(anime).build();
  }

  @ApiOkResponse({ description: 'OK', type: FindAnimeResponse })
  @ApiQuery({ type: AnimeQuery })
  @Get()
  async find(@Query() query: AnimeQuery) {
    const animes = await this.animeService.find(query);
    return new FindAnimeResponse(animes).build();
  }

  @ApiOkResponse({ description: 'OK', type: UpdateAnimeResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse,
  })
  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateAnimeDto: UpdateAnimeDto,
  ) {
    const anime = await this.animeService.update(uuid, updateAnimeDto);
    return new UpdateAnimeResponse(anime).build();
  }

  @ApiOkResponse({ description: 'OK', type: DeleteAnimeResponse })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    await this.animeService.delete(uuid);
    return new DeleteAnimeResponse().build();
  }
}
