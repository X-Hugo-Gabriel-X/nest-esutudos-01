export abstract class HashingServiceProtocol {
	abstract hashGenerated(password: string): Promise<string>;

	abstract hashCompared(
		password: string,
		passwordHash: string,
	): Promise<boolean>;
}
