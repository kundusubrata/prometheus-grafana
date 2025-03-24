# Prometheus & Grafana Node.js Application

This project is a Node.js application integrated with Prometheus and Grafana for monitoring. It provides an API with basic endpoints and exposes metrics for observability.

## Features
- REST API built with Express.js
- Monitoring using Prometheus
- Visualization using Grafana

## Screenshots
![Prometheus Page](/public/prometheus.png)
![Grafana dashboard](/public/grafana-dashboard.png)


## Local Development

### Prerequisites
Ensure you have the following installed:
- Docker & Docker Compose

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/kundusubrata/prometheus-grafana.git
   cd prometheus-grafana
   ```

2. Start the services using Docker Compose:
   ```sh
   docker-compose up -d
   ```
3. Services will be available at:
   - **Node.js API:** `http://localhost:3000`
   - **Grafana UI:** `http://localhost:3001`
   - **Prometheus UI:** `http://localhost:9090`
4. Run a load test on the API:
    ```sh
    npx loadtest -n 100 -c 10 http://localhost:3000/user
    ```
5. Stop the services when done:
    ```sh
    docker compose down -v
    ```
   

## API Endpoints
### User Routes
- `GET /user` - Get user details
- `POST /user` - Create a new user

### Metrics
- `GET /metrics` - Exposes application metrics for Prometheus

## Monitoring Setup
### Grafana
- Default login: `admin` / `admin`
- Configure a new data source for Prometheus: `http://localhost:9090`
- Import dashboards for visualization

