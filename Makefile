install:
	yarn --cwd ./backend/ install && yarn --cwd ./web/ install

dev:
	docker compose -f ./docker/docker-compose.yaml up