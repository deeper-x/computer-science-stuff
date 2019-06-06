Start/stop container: (Starts existing containers for a service)
```bash
$ sudo docker-compose start
$ sudo docker-compose stop
```

Up/down container: (Builds, (re)creates, starts, and attaches to containers for a service.)
```bash
$ sudo docker-compose up
$ sudo docker-compose down
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

Delete container:
```bash
$ sudo docker container rm <CONTAINER_ID>
```
