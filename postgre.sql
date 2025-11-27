create type user_level as enum (
    'observer',
    'user',
    'admin',
    'superAdmin'
);

create table users (
    id uuid primary key default gen_random_uuid(),
    email varchar(128) not null unique,
    level user_level default 'user' not null,

    nickname varchar(32) not null,
    updated_at timestamp with time zone default now() not null
);



create table festivals (
    id uuid primary key default gen_random_uuid(),
    name varchar(32) not null,
    description varchar(256) not null,
    image_id uuid references user_contents(id) on delete set null,
    is_archived boolean default false not null,
    created_at timestamp with time zone default now() not null,

    start_time timestamp with time zone not null,
    end_time timestamp with time zone not null
);



create type event_types as enum (
    'experience',
    'food',
    'stage'
);

create table events (
    id uuid primary key default gen_random_uuid(),
    festival_id uuid references festivals(id) on delete cascade not null,
    owner_id uuid references users(id) not null,
    type event_types not null,

    name varchar(32) not null,
    description varchar(256) not null,
    image_id uuid references user_contents(id) on delete set null,

    start_time timestamp with time zone not null
);



create table event_items (
    id uuid primary key default gen_random_uuid(),
    event_id uuid references events(id) on delete cascade not null,
    
    name varchar(32) not null,
    description varchar(256) not null,
    image_id uuid references user_contents(id) on delete set null,
    price integer not null
);


create table event_users (
    id uuid primary key default gen_random_uuid(),
    event_id uuid references events(id) on delete cascade not null,
    user_id uuid references users(id) not null
);




create type site_setting_type as enum (
    'string',
    'number',
    'boolean'
);

create table site_settings (
    id uuid primary key default gen_random_uuid(),

    key varchar(64) not null unique,
    value varchar(256) not null,
    type site_setting_type not null
);



create table user_contents (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) not null,

    url varchar(256) unique not null,
    type varchar(32) not null,
    
    created_at timestamp with time zone default now() not null,
    is_deleted boolean default false not null
);



create table posts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) not null,
    event_id uuid references events(id),

    content varchar(256) not null,
    image_id uuid references user_contents(id) on delete set null,

    created_at timestamp with time zone default now() not null,
    is_deleted boolean default false not null
);