all:
	docker-compose up -d

clean:
	docker-compose down
	docker-compose rm -f

re: clean all