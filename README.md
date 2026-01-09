# Tracecat SOAR - Self-Hosted Deployment

This repository contains the Docker Compose configuration used to deploy the Tracecat SOAR as part of the phase III chapter II SOC project.

The deployment runs Tracecat in production mode using Docker and Docker Compose.

---

## Requirements

- Recommended: Linux system (Ubuntu 22.04)
- Docker
- Docker Compose

---

## Setup Instructions

### Create environment configuration
- Clone the repository

- Navigate to the `tracecat` folder in the terminal

- Run `cp .env.example .env`

- Run `docker compose up`

- Open a browser and navigate to `http://localhost`

You should now have Tracecat opened and running in your browser.
