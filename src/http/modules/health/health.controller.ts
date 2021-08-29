import { IsAdminGuard } from '@http/shared/guards/isAdmin.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @ApiOperation({
    description:
      'Os health checks disponíveis são: database, memory_heap e storage_usage.',
  })
  @UseGuards(AuthGuard('jwt'), new IsAdminGuard())
  @Get()
  @HealthCheck()
  check() {
    const isTestEnv = process.env.NODE_ENV === 'test' ? true : false;

    return this.health.check([
      () => this.db.pingCheck('database'),
      () =>
        this.memory.checkHeap(
          'memory_heap',
          isTestEnv ? 900 * 1024 * 1024 : 200 * 1024 * 1024,
        ),
      () =>
        this.disk.checkStorage('storage_usage', {
          thresholdPercent: isTestEnv ? 1.0 : 0.9,
          path: '/',
        }),
    ]);
  }
}
