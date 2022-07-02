export interface IUserStorage {
  uploadAvatar(buffer: Buffer): Promise<string>
  deleteOldAvatar(url: string): Promise<void>
}
