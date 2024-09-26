import * as winston from "winston";
import { createLogger, format, transports } from "winston";
import Logger from "../Interfaces/Winstom";
import { injectable } from "tsyringe/dist/decorators";

export type LogLevel = "error" | "warn" | "info" | "debug";

// Configuração do logger
const logger = createLogger({
  level: "debug", // Define o nível mínimo de log (pode ser 'info', 'warn', 'error', 'debug')
  transports: [
    new transports.Console(), // Log no console
    // Adicionar logs para arquivos (opcional):
    // new transports.File({ level: 'warn', filename: 'logsWarnings.log' }),
    // new transports.File({ level: 'error', filename: 'logsErrors.log' }),
  ],
  format: format.combine(
    format.colorize(), // Adiciona cores ao nível de log
    format.timestamp(), // Adiciona timestamp
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
});

// Exportar o logger para uso em qualquer parte do projeto
export default logger;
