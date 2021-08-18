export interface IUserStorage {
  uploadAvatar(buffer: Buffer): Promise<string>;
}
