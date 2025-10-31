import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import { sign } from 'crypto';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private readonly hashingService: HashingServiceProtocol,

		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
	) {
		console.log(jwtConfiguration);
	}

	async authenticate(singInDto: SignInDto) {
		const user = await this.prisma.user.findFirst({
			where: {
				email: singInDto.email,
			},
		});
		if (!user) {
			throw new HttpException(
				'Usuário nao encontrado',
				HttpStatus.UNAUTHORIZED,
			);
		}

		const passwordIsValid = await this.hashingService.hashCompared(
			singInDto.password,
			user.passwordHash,
		);

		if (!passwordIsValid) {
			throw new HttpException(
				'Senha/Usuário incorretos',
				HttpStatus.UNAUTHORIZED,
			);
		}
		return {
			id: user.id,
			name: user.name,
			email: user.email,
		};
	}
}
