import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Obtém o objeto de resposta
    const response = context.switchToHttp().getResponse();

    // Adiciona headers personalizados
    response.setHeader('X-Custom-Header', 'MeuHeaderPersonalizado');
    response.setHeader('X-App-Version', '1.0.0');

    // Continua o fluxo da requisição
    return next.handle().pipe(
      tap(() => {
        // Você poderia adicionar lógica pós-resposta aqui, se quiser
      }),
    );
  }
}
