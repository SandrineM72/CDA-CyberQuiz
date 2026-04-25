#!/bin/bash

export DEPLOY_ENV=${DEPLOY_ENV:-production}

docker compose -p "$DEPLOY_ENV" -f docker-compose.prod.yml --env-file .env.production down && \
docker compose -p "$DEPLOY_ENV" -f docker-compose.prod.yml --env-file .env.production pull && \
docker compose -p "$DEPLOY_ENV" -f docker-compose.prod.yml --env-file .env.production up -d