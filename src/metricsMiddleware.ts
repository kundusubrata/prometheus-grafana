import { Request, Response, NextFunction } from "express";
import client from "prom-client";


const requestCounter = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status_code"],
})
const activeRequestGauge = new client.Gauge({
    name: "http_requests_active",
    help: "Number of HTTP requests currently active",
})
const requestDurationHistogram = new client.Histogram({
    name: "http_request_duration_microseconds",
    help: "Duration of HTTP requests in microseconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]
})

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    activeRequestGauge.inc();
    


    res.on("finish", () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        requestCounter.inc({
            method: req.method,
            route: req.originalUrl,
            status_code: res.statusCode
        })

        requestDurationHistogram.observe({
            method: req.method,
            route: req.originalUrl,
            status_code: res.statusCode
        }, duration)
        
        activeRequestGauge.dec();
    });

    next();
}