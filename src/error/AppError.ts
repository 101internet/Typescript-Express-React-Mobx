export class AppError extends Error {
    name: string = "AppError";

    constructor(message?: string) {
        super(message || "Application error");
    }
}