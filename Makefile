up-f:
	docker-compose up --build --no-recreate -d
up:
	docker-compose up -d
stop:
	docker-compose stop
run:
	docker exec -it vite-docker sh -c "npm i && npm run dev"
build:
	docker exec -it vite-docker sh -c "npm run build"
