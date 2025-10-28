import {
	IsNotEmpty,
	IsNumber,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateTaskDto {
	@IsString({ message: 'O nome precisa utilizar apenas letras' })
	@MinLength(5, { message: 'O nome deve ter pelo menos 5 caracteres' })
	@IsNotEmpty()
	readonly name: string;

	@IsString()
	@IsNotEmpty()
	readonly description: string;

	@IsNumber()
	@IsNotEmpty()
	readonly userId: number;
}
