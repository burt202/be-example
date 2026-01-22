up:
	docker-compose up --build

down:
	docker-compose down

prod-build:
	docker-compose -f docker-compose.prod.yml build

prod-up:
	docker-compose -f docker-compose.prod.yml up --build
