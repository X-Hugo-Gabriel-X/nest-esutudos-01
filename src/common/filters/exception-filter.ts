import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from "express";
import { timestamp } from "rxjs";


@Catch(HttpException)
export class ApiExceptionFiter implements ExceptionFilter{
  catch(exception: HttpException, host: ArgumentsHost){

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    console.log('passando no filtro')

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: errorResponse !== '' ? errorResponse : 'Erro ao realizar essa operação.'
    })
  }
}