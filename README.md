# Safety Reporter Service (NodeJS) #

### How do I get set up? ### 

##### Run all services with docker:
1. (optional) modify `dev.env` file in project root (DB_MIGRATE set to true/false)
2. `docker-compose up -d` with `DB_MIGRATE=true` container will recreate DB 

##### Run manually BE in dev mode:
1. add/modify `.env` file in project root
2. `npm install`
3. `npm run migrate`
4. `npm run startd`
#####
In case of cache issues:
1. `docker-compose up --force-recreate`

OR

    1. docker-compose down -v
    2. docker-compose up --build -d
##### .env file configuration example:
    NODE_ENV=dev
    PORT=8080
    JWT_ACCESS_SECRET=secret2
    JWT_REFRESH_SECRET=secret3
    AWS_ACCESS_KEY=secret4
    AWS_SECRET_ACCESS_KEY=secret5
    DATABASE_URL=postgresql://localhost:5432/srs
    PGUSER=srsuser
    PGPASSWORD=srspassword
    PGMAX_CONNECTIONS=50
    DB_MIGRATE=false

Local dev host by default accessible: `localhost:8080`

---

### On production:
change `DB_MIGRATE` to `false` and do 1 time manual migration with this steps:

1. `docker-compose up -d`
2. `docker exec -it srs-be /bin/sh`
3. `npm run migrate`

NB!!! Once development will be finished and you are ready to deploy service to production - 
Do not forget to clean AWS S3 bucket as well from test images.

---

### Routes:

#### public:
* POST (get access & refresh tokens): `/auth/login`
* POST (refresh token): `/auth/token`

#### protected(requires token Authorization):

* GET (service health check):`/health`
* GET (all objects):`/api/v1/objects`
* GET (one object):`/api/v1/objects/:id`
* POST (add object):`/api/v1/objects`
* GET (all reports || [by objectId]):`/api/v1/reports?objectId=1`
* GET (one report):`/api/v1/reports/:id`
* POST (add report):`/api/v1/reports`
* PUT (update report):`/api/v1/reports/:id`
* GET (all responsibles || [by name*]):`/api/v1/responsibles?name=John`
* POST (add responsible):`/api/v1/responsibles`
* GET (observation types):`/api/v1/observations/types`
* POST (observation types):`/api/v1/observations/types`
* GET (all defects || [by observationId]):`/api/v1/defects?observationId=1`
* PUT (one defect ):`/api/v1/defects/:id`

#### Test user with admin privileges:
* email: admin@mapri.eu
* passw: admin123


### Who do I talk to? ###

* developer: nikita.porshnjakov@fob-solutions.com