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
  `id` VARCHAR(36) PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `token`
);
```

Create the user tokens table:

```
CREATE TABLE `user_tokens` (
  `id` VARCHAR(36) PRIMARY KEY,
  `user_id` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `revoked` BOOLEAN DEFAULT FALSE,
  `revoked_at` TIMESTAMP,
  `revoked_reason` VARCHAR(255)
);
```

Create the items table:

```
CREATE TABLE `items` (
  `id` VARCHAR(36) PRIMARY KEY,
  `description` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL
);
```

## Adding data

You can use the `npm run codegen` command to automatically generate types for your graphql types and resolvers. A common workflow would be:

1. Create a new folder in the `data` folder, and add a type.ts file.
2. Populate the type.ts file
3. Add the type to the `data/typeDefs.ts` file
4. After the server has restarted, run `npm run codegen` in a separate terminal
5. Import types from `generated/graphql`

