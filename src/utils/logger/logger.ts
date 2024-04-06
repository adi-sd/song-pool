import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const logLevel: string = process.env.LOG_LEVEL || "debug";

export const Logger = winston.createLogger({
    level: logLevel,
    format: winston.format.cli(),
    transports: [new winston.transports.Console()],
});
