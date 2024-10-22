# simple-crud-api
## Simple CRUD API 
Simple CRUD API with cluster and balancer

## How to install Simple_CRUD_API
1. Clone this repository:
```bash
  $ git clone https://github.com/KuzmakD/simple-crud-api.git
```
2. Install dependencies using following command: 
```bash npm install```
3. Change file .env.example to .env

## How to run the app
Run the Simple CRUD API in development mode:
```bash
npm run start:dev
```

Run the Simple CRUD API multi server with balanser
```bash
npm run start:multi
```

Run the Simple CRUD API in production mode:
```bash
npm run start:prod
```

## How to run the tests
Run tests for Simple CRUD API
```bash 
npm run test
```

## Works with Rest API
GET all users = Method `GET` + `api/users` 
```http://localhost:4000/api/users```

GET the user by id = Method `GET` + `api/users/${userId}`
```http://localhost:4000/api/users/{id}```

POST, add user = Method `POST` + `api/users`
```http://localhost:4000/api/users```

PUT, update the existing user by id = Method `PUT` + `api/users/${userId}`
```http://localhost:4000/api/users/{id}```

DELETE the existing user by id = Method `DELETE` + `api/users/${userId}`
```http://localhost:4000/api/users/{id}```
