export interface IAnimeStorage {
  uploadCover(buffer: Buffer): Promise<string>;
}
