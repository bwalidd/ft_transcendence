all:
	docker-compose build --no-cache
	docker-compose up -d

clean:
	docker-compose down
	docker-compose rm -f

fclean: clean
	docker system prune -a

re: clean all