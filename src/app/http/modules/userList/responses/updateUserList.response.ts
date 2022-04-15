import { ApiProperty } from '@nestjs/swagger'

import { UserList } from '../entities/userList.entity';

export class UpdateUserListResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    example: {
      "uuid": "dce7b43b-d0ce-49cf-8436-52f36cc7241c",
      "status": "plan_to_watch",
      "createdAt": "2022-04-11T23:29:24.000Z",
      "updatedAt": null,
      "deletedAt": null,
      "user": {
        "uuid": "59bbcff9-aa45-4075-89d5-2170f397ed05",
        "name": "josh",
        "email": "josh@mail.com",
        "avatar": "https://res.cloudinary.com/dmqkppauk/image/upload/v1624804907/an_review/user/avatar/oyks2ufyd623929cla6s.jpg",
        "isAdmin": false,
        "isEmailConfirmed": true,
        "createdAt": "2022-02-21T21:00:55.000Z",
        "updatedAt": null,
        "deletedAt": null
      },
      "anime": {
        "uuid": "157be479-be2f-4600-9c87-f3fdd6697741",
        "title": "Boku no Hero Academia 3",
        "synopsis": "Summer is here, and the heroes of Class 1-A and 1-B are in for the toughest training camp of their lives! A group of seasoned pros pushes everyone's Quirks to new heights as the students face one overwhelming challenge after another. Braving the elements in this secret location becomes the least of their worries when routine training turns into a critical struggle for survival.\n\n(Source: Crunchyroll)",
        "cover": "https://media.kitsu.io/anime/cover_images/13881/original.jpg",
        "trailer": "https://youtube.com/watch?v=JezE6iZUWxo",
        "episodes": 25,
        "releaseDate": "2018-04-07",
        "season": "winter 2015",
        "genre": "unknow",
        "createdAt": "2022-04-08T17:23:18.000Z",
        "updatedAt": null,
        "deletedAt": null
      }
    }
  })
  private list: UserList;

  constructor(list: UserList, status?: number) {
    this.list = list
    this.statusCode = status || 200
  }

  build() {
    return {
      statusCode: this.statusCode,
      list: this.list
    }
  }
}
