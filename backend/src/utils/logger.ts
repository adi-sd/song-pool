import winston from "winston";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const logLevel: string = process.env.LOG_LEVEL || "debug";

export const Logger = winston.createLogger({
    level: logLevel,
    format: winston.format.cli(),
    transports: [new winston.transports.Console()],
});

// Custom logging method for Express request information
export const LogRequestInfo = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Logger.info(`${req.method} ${req.url}`, {
        method: req.method,
        url: req.url,
        headers: req.headers,
        query: req.query,
        body: req.body,
    });
    next();
};
