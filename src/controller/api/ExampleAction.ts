import { Response, Request } from "express";

export async function ExampleAction(request: Request, response: Response) {
    response.send('HELLO WORLD')
}