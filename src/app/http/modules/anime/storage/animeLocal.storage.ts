import * as fs from 'fs/promises'
import * as path from 'path'
import { v4 } from 'uuid'

import { IAnimeStorage } from './types/anime.storage.interface'

export class AnimeLocalStorage implements IAnimeStorage {
  async uploadCover(buffer: Buffer): Promise<string> {
    const name = `${v4()}.jpeg`
    const dir = `${path.resolve('public', 'anime', 'cover')}/${name}`

    await fs.writeFile(dir, buffer)
    return `${process.env.APP_HOST}/anime/cover/${name}`
  }

  async deleteOldCover(url: string) {
    const fileName = url.split('/').pop()
    await fs.unlink(`${path.resolve('public', 'anime', 'cover')}/${fileName}`)
  }
}
