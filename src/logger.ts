import { createLogger, transports, format } from 'winston'

const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message, ...meta }) => {
            const [method, params] = meta[Symbol.for('splat')]
            return `[${timestamp}] ${level}: ${message} ${method} ${JSON.stringify(params)}`;
        })
    )
})

export default logger
