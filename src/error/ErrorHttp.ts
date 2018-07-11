import { AppError } from "./AppError";

export abstract class ErrorHttp extends AppError {
    name: string = "ErrorHttp";

    abstract getCode(): number;

    constructor(message: string = "Http Application error", code?: number) {
        super(message);
    }
}