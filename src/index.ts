import { Request, Response } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";
import { AppConf } from "./conf";
import * as compression from "compression";
import * as history from "connect-history-api-fallback";
import { ErrorHttp } from "./error/ErrorHttp";

const isProduction = AppConf.get("NODE_ENV") == "production";
// let expressLogging = require("express-logging");
// let logger = require("logops");


// create express app
const app = express();
app.use(compression());
if (!isProduction) {
    const webpack = require("webpack");
    const middleware = require("webpack-dev-middleware");
    const webpackConfig = require("../webpack.config.js");
    const compiler = webpack(webpackConfig);
    const instance = middleware(compiler, {
        hot: true,
        historyApiFallback: true,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        }
    });

    app.use(
        history({
            rewrites: [
                {
                    from: /^\/api\/.*/,
                    to: function(context) {
                        return context.parsedUrl.pathname;
                    }
                }
            ],
            // verbose: true
        })
    );
    app.use(instance);
    app.use(require("webpack-hot-middleware")(compiler));
} else {
    app.use(express.static("dist/frontend"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// register all application routes
AppRoutes.forEach(route => {
    app[route.method](
        route.path,
        (request: Request, response: Response, next: Function) => {
            route
                .action(request, response)
                .then(() => next)
                .catch(err => next(err));
        }
    );
});

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: Function
    ) => {
        if (error instanceof ErrorHttp) {
            response.status(error.getCode());
        }
        return response.json({
            message: error.message
        });
    }
);

let port = !!AppConf.get("APP_PORT") ? AppConf.get("APP_PORT") : 8080;
// run app
app.listen(port);
console.log("Express application is up and running on port " + port);