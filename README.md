NestJS project example
=====

NestJS-project-example
This repository is an example application for the [NestJS framework](https://nestjs.com/) that exposes a REST API and interacts with both [PostgreSQL](https://www.postgresql.org/) and [MongoDB](https://www.mongodb.com/).

Endpoints
---

The REST API is about coffees and includes the following endpoints:

GET http://localhost:3000/coffees/flavors?limit=1&offset=1

GET http://localhost:3000/coffees/10

POST http://localhost:3000/coffees/ with JSON data in the request body:
{
  "name": "name",
  "brand": "brand",
  "flavors": [
    "flavor1",
    "flavor2"
  ]
}

PATCH http://localhost:3000/coffees/1 with JSON data in the request body:
json
{
  "name": "new_name"
}

DELETE http://localhost:3000/coffees/1


Branches
---

This repository has two branches: main and mongodb.



The main branch covers the following topics:

- Creating a REST API application
- PostgreSQL with TypeORM
- Dependency Injection
- Application Configuration
- Generating OpenAPI Specification
- Using Jest
- mongodb Branch

The mongodb branch is about the following topics:

- Introducing the Mongoose Module
- Creating a Mongoose Model
- Using a Mongoose Model to Access MongoDB
- Adding Pagination
- Use Transactions
- Adding Indexes to Schemas


Getting Started
---

To get started with this project, clone the repository to your local machine and install the required dependencies:

git clone https://github.com/vittorioexp/NestJS-project-example.git

cd NestJS-project-example

docker-compose up -d

npm install


To run the application, use the following command:

npm run start:dev

This will start the application in development mode with hot reloading enabled.


Contributing
---

If you'd like to contribute to this project, please create a pull request with your changes.
