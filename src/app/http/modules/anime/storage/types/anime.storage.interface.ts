export interface IAnimeStorage {
  uploadCover(buffer: Buffer): Promise<string>;
  deleteOldCover(url: string): Promise<void>;
}
