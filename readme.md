# Back End Example

### To Run

Add `.env`:

```
HOST=http://localhost
PORT=8081

DB_HOST=db
DB_NAME=todo_list
DB_PASSWORD=postgres
DB_PORT=5436
DB_SSL_ENABLED=false
DB_USER=postgres
```

- `npm ci`
- `npm run docker-up`
- go to `http://localhost:8081/`
- use REST client like Postman/Insomnia to call endpoints
  - `http://localhost:8081/v1/todo-list-items`

NOTE: on first launch you will need to log into the postgres container and create the db: `CREATE DATABASE todo_list;`

### Postgres Access

- `docker exec -it [CONTAINER_ID_FROM_DOCKER_PS] bash`
- `psql -U postgres`
- `\c todo_list`
- `\dt`

### Next Tasks

- add update/delete endpoint
