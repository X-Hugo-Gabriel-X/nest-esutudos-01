import { HashingServiceProtocol } from './hashing.service';
import * as bcrypt from 'bcryptjs';

export class BcryptService extends HashingServiceProtocol {
	async hashGenerated(password: string): Promise<string> {
		const salt = await bcrypt.genSalt();

		return bcrypt.hash(password, salt);
	}
	async hashCompared(password: string, passwordHash: string): Promise<boolean> {
		// Pede ao bcrypt para comparar a senha pura com o hash
		// Ele refaz o hash usando o 'sal' embutido no passwordHash
		// e vê se o resultado bate.
		return bcrypt.compare(password, passwordHash);
	}
}
