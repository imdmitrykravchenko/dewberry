create table models
(
    id             serial not null
        constraint models_pkey
            primary key,
    name           varchar(255),
    slug           varchar(255)
        constraint models_slug_unique
            unique,
    age            integer,
    biography      text,
    path           varchar(255),
    website        varchar(255),
    headshot_image varchar(255),
    created_at     timestamp with time zone default CURRENT_TIMESTAMP,
    published      boolean                  default false
);
