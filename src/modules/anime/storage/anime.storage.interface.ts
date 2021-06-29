export interface IAnimeStorage {
  uploadCover(file: Express.Multer.File): Promise<string>;
}
