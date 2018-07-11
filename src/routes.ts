/**
 * All application routes.
 */
import {AdminAction} from "./controller/AdminController";
import {ExampleAction} from "./controller/api/ExampleAction";

export const AppRoutes = [
    {
        path: "/admin*",
        method: "get",
        action: AdminAction
    },
    {
        path: "/api",
        method: "get",
        action: ExampleAction
    },
];