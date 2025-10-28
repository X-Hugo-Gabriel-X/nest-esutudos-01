
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';


import { Task } from './entities/task.entity';


import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { error } from 'console';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Injectable()
export class TasksService {
  constructor (private prisma: PrismaService){}
  async findAll(paginationDto?: PaginationDto) {
  const { limit = 10, offset = 0 } = paginationDto || {};

  const allTasks = await this.prisma.task.findMany({
    take: limit,
    skip: offset,
  });
  return allTasks;
}


   async findOneTask(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new HttpException(`Tarefa com id ${id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    const newTask = await this.prisma.task.create({
      data:{
        name: createTaskDto.name,
        description: createTaskDto.description,
        completed: false,
      }
    })
    return newTask
  }

   async update(id: number, updateTaskDto: UpdateTaskDto) {
    const findTask  = await this.prisma.task.findFirst({
      where:{
        id: id
      }
    })
    
    if (!findTask) {
      throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND)
    }

    const task = await this.prisma.task.update({
      where:{
        id: findTask.id
      },
      data: updateTaskDto
    })
    return task
  }


 async delete(id: number) {
        const findTask  = await this.prisma.task.findFirst({
      where:{
        id: id
      }
    })
    
    if (!findTask) {
      throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND)
    }

    await this.prisma.task.delete({
      where: {
        id:findTask.id
      }
    })
    return{
      message: "Tarefa deletada com sucesso"
    }
  }
}
