import { PrismaService } from '@shared/services/prisma.service';

export class DatabaseHelper {
  private prisma: PrismaService;

  constructor() {
    this.prisma = new PrismaService();
  }

  async truncate() {
    await this.prisma.$executeRaw('TRUNCATE TABLE User');
    await this.prisma.$disconnect();
  }
}
