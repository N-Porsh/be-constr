begin;


drop table if exists "user" cascade;
drop type if exists user_role;
create type user_role as enum ('INSPECTOR', 'SUPER_ADMIN');
create table if not exists "user"
(
    id       serial primary key,
    role     user_role not null,
    name     varchar(64),
    email    varchar(128),
    password bytea,
    unique (email)
);


drop table if exists object cascade;
create table if not exists object
(
    id                   serial primary key,
    name                 varchar(128) not null,
    location             varchar(128) not null,
    active               boolean      not null default true,
    last_inspection_date timestamp,
    created_date         timestamp    not null default current_timestamp
);


drop table if exists report cascade;
drop type if exists report_status;
create type report_status as enum ('DRAFT', 'SUBMITTED', 'FINISHED');
create table if not exists report
(
    id            serial primary key,
    object_id     integer references object (id),
    user_id       integer references "user" (id) not null,
    status        report_status                  not null,
    description   text,
    created_date  timestamp                      not null default current_timestamp,
    modified_date timestamp
);


drop table if exists observation_type cascade;
create table if not exists observation_type
(
    id          serial primary key,
    name        varchar(128) not null,
    active      boolean      not null default true,
    description text
);


drop table if exists observation cascade;
create table if not exists observation
(
    id                  serial primary key,
    report_id           integer not null references report (id),
    observation_type_id integer not null references observation_type (id),
    correct_count       integer
);


drop table if exists responsible_person cascade;
create table if not exists responsible_person
(
    id    serial primary key,
    name  varchar(64),
    email varchar(128),
    unique (email)
);


drop table if exists defect cascade;
create table if not exists defect
(
    id                    serial primary key,
    observation_id        integer   not null references observation (id),
    responsible_person_id integer   not null references responsible_person (id),
    resolved              boolean   not null default false,
    resolved_date         timestamp,
    deadline              timestamp not null,
    description           text      not null
);


drop table if exists attachment cascade;
create table if not exists attachment
(
    id        serial primary key,
    defect_id integer      not null references defect (id),
    path      varchar(256) not null
);


commit;