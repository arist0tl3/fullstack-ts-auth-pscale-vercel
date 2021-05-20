# React + Typescript + Express + MySQL + Planetscale + Auth

A very opinionated stack to get started quickly on a full stack app that requires auth.

## Database

This project uses Planetscale and MySQL. To get started, make sure you've created an account with [PlanetScale](https://planetscale.com) and have installed the CLI.

Create the database:

`pscale database create my-app`

Create a [feature branch](https://docs.planetscale.com/concepts/branching):

`pscale branch create my-app feature`

Access the branch via shell:

`pscale shell my-app feature`

Create the users table:

```
CREATE TABLE `users` (
  `id` binary(16) PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL
);
```

Confirm the table creation:

`SHOW TABLES;`



