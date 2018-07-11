import { Response, Request } from "express";
import * as path from "path";

export async function AdminAction(request: Request, response: Response) {
    response.sendFile(
        path.join(__dirname + "../../../dist/frontend/index.html")
    );
}