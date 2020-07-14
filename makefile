start:
	docker-compose up -d merchant-db merchant-api merchant-adminer

stop:
	docker-compose stop
fixture:
	docker-compose exec merchant-api node fixture/fixtures.js
