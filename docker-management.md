Run container:
```bash
$ sudo docker-compose up
```

Login into a container:
```bash
$ sudo docker container ls
$ docker exec -it <CONTAINER_ID> bash
```

Copying file from/to container:
```bash
$ docker cp <filename> <CONTAINER_ID>/path
```

Start single container:
```bash
$ sudo docker start <CONTAINER_ID>
```
