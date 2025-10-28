import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Task } from './entities/task.entity';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {
	constructor(private prisma: PrismaService) {}
	async findAll(paginationDto?: PaginationDto) {
		const { limit = 10, offset = 0 } = paginationDto || {};

		const allTasks = await this.prisma.task.findMany({
			take: limit,
			skip: offset,
		});
		return allTasks;
	}
	/////////////////////////////////////[Find]////////////////////////////////////////////////////////////////
	async findOneTask(id: number) {
		const task = await this.prisma.task.findUnique({
			where: { id },
		});

		if (!task) {
			throw new HttpException(
				`Tarefa com id ${id} não encontrada`,
				HttpStatus.NOT_FOUND,
			);
		}

		return task;
	}

	/////////////////////////////////////[Create]////////////////////////////////////////////////////////////////
	async create(createTaskDto: CreateTaskDto) {
		try {
			const newTask = await this.prisma.task.create({
				data: {
					name: createTaskDto.name,
					description: createTaskDto.description,
					completed: false,
					userId: createTaskDto.userId,
				},
			});
			return newTask;
		} catch (err) {
			console.log(err);
			throw new HttpException(
				'Falha em cadastrar uma nova tarefa',
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	/////////////////////////////////////[Update]////////////////////////////////////////////////////////////////
	async update(id: number, updateTaskDto: UpdateTaskDto) {
		try {
			const findTask = await this.prisma.task.findFirst({
				where: {
					id: id,
				},
			});

			if (!findTask) {
				throw new HttpException(
					'Essa tarefa não existe!',
					HttpStatus.NOT_FOUND,
				);
			}

			const task = await this.prisma.task.update({
				where: {
					id: findTask.id,
				},
				data: {
					name: updateTaskDto?.name ? updateTaskDto?.name : findTask.name,
					description: updateTaskDto?.description
						? updateTaskDto?.description
						: findTask.description,
					completed: updateTaskDto?.completed
						? updateTaskDto.completed
						: findTask.completed,
				},
			});
			return task;
		} catch (err) {
			console.log(err);
			throw new HttpException(
				'Falha em cadastrar uma nova tarefa',
				HttpStatus.BAD_REQUEST,
			);
		}
	}
	/////////////////////////////////////[Delete]////////////////////////////////////////////////////////////////
	async delete(id: number) {
		const findTask = await this.prisma.task.findFirst({
			where: {
				id: id,
			},
		});

		if (!findTask) {
			throw new HttpException('Essa tarefa não existe!', HttpStatus.NOT_FOUND);
		}

		await this.prisma.task.delete({
			where: {
				id: findTask.id,
			},
		});
		return {
			message: 'Tarefa deletada com sucesso',
		};
	}
}
