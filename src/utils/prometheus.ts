//! Code taken from NinoDiscord/Nino
import prom from "prom-client"
import { createServer, IncomingMessage, ServerResponse } from 'http'
import vars from "../../variables"
import Logger from "./logger"

export default class Prometheus {
    public commandsExecuted!: prom.Counter<string>
    public messagesSeen!: prom.Counter<string>
    public guildCount!: prom.Gauge<string>
    public totalGuilds!: prom.Gauge<string>
    public uptime!: prom.Gauge<string>
    // public commmandsRan: prom.Counter<string>
    #server!: ReturnType<typeof createServer>

    load() {
        // if(!vars.prometheus.port) vars.prometheus.port === 9000
        prom.collectDefaultMetrics()
        this.commandsExecuted = new prom.Counter({
            labelNames: ['command'],
            name: "thaldrin_commands_executed",
            help: "How many commands Thaldrin has executed successfully"
        })
        this.messagesSeen = new prom.Counter({
            name: "thaldrin_messages_seen",
            help: "How many Messages Thaldrin has seen throughout the process lifespan"
        })
        this.guildCount = new prom.Gauge({
            name: "thaldrin_guild_count",
            help: "Number of Guilds Thaldrin joined this Lifecycle"
        })
        this.totalGuilds = new prom.Gauge({
            name: "thaldrin_guilds_total",
            help: "Total Number of Guilds Thaldrin is in"
        })
        this.uptime = new prom.Gauge({
            name: "thaldrin_uptime",
            help: "Thaldrin's Uptime"
        })

        this.#server = createServer(this.onRequest.bind(this));
        this.#server.once('listening', () => Logger.info({ type: 'event:prometheusStart', message: `Prometheus: Listening at http://localhost:${vars.prometheus.port}` }));
        this.#server.on('error', error => console.error(error));
        this.#server.listen(vars.prometheus.port);
    }
    private async onRequest(req: IncomingMessage, res: ServerResponse) {
        this.uptime.set(process.uptime())
        if (req.url! === '/metrics') {
            res.writeHead(200, { 'Content-Type': prom.register.contentType });
            res.write(await prom.register.metrics());
        } else if (req.url! === '/favicon.ico') {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.write('{"fuck":"you uwu"}');
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.write('{"uwu":"owo"}');
        }

        res.end();
    }
}

export const Prom = new Prometheus()
