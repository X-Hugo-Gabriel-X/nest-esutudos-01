import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdminGuard } from 'src/common/guards/admin-guard';

@Module({
	imports: [TasksModule, UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware)
		.forRoutes({
			path: '*',
			method: RequestMethod.ALL
		})
	}
}
