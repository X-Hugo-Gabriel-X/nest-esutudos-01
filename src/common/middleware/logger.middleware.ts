import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class LoggerMiddleware implements NestMiddleware{
  use(req: Request, res: Response, next: NextFunction) {
    
    // Pega o valor do cabeçalho "Authorization" enviado pelo cliente
    // Geralmente usado para autenticação (ex: token JWT)
    const authorization = req.headers.authorization

    if(authorization){
      req['user'] = {
        token: authorization,
        role: 'admin'
      }
    }

    next();
  }
}