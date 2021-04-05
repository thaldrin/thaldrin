import Winston from "winston";
import "winston-daily-rotate-file"
import config from "../../config";
import chalk from 'chalk'

let transport = new Winston.transports.DailyRotateFile({
    filename: './logs/thaldrin.%DATE%.log',
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    // maxSize: '20m',
    maxFiles: '14d',
});
let errortransport = new Winston.transports.DailyRotateFile({
    filename: './logs/thaldrin.error.%DATE%.log',
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    // maxSize: '20m',
    maxFiles: '14d',
    level: "error"
});
const colors: { [k: string]: any } = {
    info: chalk.blueBright,
    error: chalk.redBright,
    warn: chalk.yellowBright,
    debug: chalk.magentaBright
}

const Logger = Winston.createLogger({
    format: Winston.format.simple(),

    transports: [
        new Winston.transports.File({ filename: "./logs/thaldrin.log" }),
        new Winston.transports.File({ filename: "./logs/thaldrin.error.log", level: "error" }),
        transport, errortransport,
        new Winston.transports.Console({
            format: Winston.format.combine(
                Winston.format.timestamp({ format: "HH:mm DD-MM-YYYY" }),
                Winston.format.printf(info => {
                    let color = colors[info.level]
                    let timestamp = chalk.gray(`[${info.timestamp}]`)
                    let type = chalk.magenta.underline(`[${info.type}]`)
                    let level = color(info.level.toUpperCase())
                    // const message = `| ${info.message}`
                    let message: string
                    if (info.message === ` `) {
                        message = " "
                    } else {
                        message = `| ${info.message}`
                    }
                    let command = info.command
                    return `${timestamp} ${level} ${type} ${command ? chalk.yellow(command) : ""} ${message}`
                })
            )
        }),
    ]

})



export default Logger