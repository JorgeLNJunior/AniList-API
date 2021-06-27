export interface IUserStorage {
  uploadAvatar(file: Express.Multer.File): Promise<string>;
}
