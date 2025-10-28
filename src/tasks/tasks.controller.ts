import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Patch,
	Delete,
	ParseIntPipe,
	Query,
	UseInterceptors,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';

@Controller('tasks')
export class TasksController {
	constructor(private readonly taskService: TasksService) {}

	@Get()
	@UseInterceptors(LoggerInterceptor)
	findTasks(@Query() paginationDto: PaginationDto) {
		console.log(paginationDto);
		return this.taskService.findAll(paginationDto);
	}

	@Get(':id')
	findOneTask(@Param('id', ParseIntPipe) id: number) {
		return this.taskService.findOneTask(id);
	}

	@Post()
	createTask(@Body() createTaskDto: CreateTaskDto) {
		return this.taskService.create(createTaskDto);
	}

	@Patch(':id')
	updateTask(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateTaskDto: UpdateTaskDto,
	) {
		return this.taskService.update(id, updateTaskDto);
	}

	@Delete(':id')
	deleteTask(@Param('id', ParseIntPipe) id: number) {
		// Delega a exclusão para o service.
		return this.taskService.delete(id);
	}
}
