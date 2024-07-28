all:
	docker-compose up -d

clean:
	docker-compose down
	docker-compose rm -f

fclean:
	docker system prune -a

re: clean all