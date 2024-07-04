all:
	docker-compose up -d

clean:
	docker-compose down
	docker-compose rm -f

re:
	docker-compose down
	docker-compose rm -f
	docker-compose up -d