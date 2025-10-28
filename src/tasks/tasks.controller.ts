import { Body, Controller, Get, Param, Post, Patch, Delete, ParseIntPipe, Query, UseInterceptors} from '@nestjs/common';


import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';


@Controller('tasks')
@UseInterceptors(LoggerInterceptor)
export class TasksController {


  constructor (private readonly taskService: TasksService){}


  @Get()
  findTasks(@Query() paginationDto: PaginationDto){
    console.log(paginationDto)
    return this.taskService.findAll(paginationDto)
  }

  @Get(':id')

  findOneTask(@Param('id',ParseIntPipe)id: number){ 
    return this.taskService.findOneTask(id);
  }

  // --- [BLOCO 6: ENDPOINT createTask (POST /tasks)] ---
  // @Post() ativa com uma requisição HTTP POST.
  // Rota completa: POST /tasks
  @Post()
  // @Body() createTaskDto: CreateTaskDto
  // 1. @Body(): Pega o JSON enviado no corpo (body) da requisição.
  // 2. createTaskDto: CreateTaskDto: O NestJS valida automaticamente se o JSON
  //    bate com as regras que definimos no DTO (ex: 'name' é string e obrigatório).
  //    Se não bater, retorna erro 400.
  createTask(@Body() createTaskDto: CreateTaskDto){
    return this.taskService.create(createTaskDto)
  }

  // --- [BLOCO 7: ENDPOINT updateTask (PATCH /tasks/:id)] ---
  // @Patch(':id') ativa com uma requisição HTTP PATCH.
  // Rota completa: PATCH /tasks/1
  @Patch(':id')
  updateTask(@Param('id',ParseIntPipe)id: number, @Body() updateTaskDto: UpdateTaskDto){
    return this.taskService.update(id, updateTaskDto)
  }


  @Delete(':id')
  deleteTask(@Param ('id',ParseIntPipe)id: number){
    // Delega a exclusão para o service.
    return this.taskService.delete(id)
  }
}
