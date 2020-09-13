## Try to improve solid and architecture code with layer design

## How to Run

```bash
docker-compose up -d
```

```bash
npm i
npm run start
```

## To run tests

```bash
docker-compose up -d
```

You need up database to run all tests

```bash
npm run test
```

## Business Rules and some examples

- [x] it must require email and password. Once they are register.

```bash
curl -X POST \
  http://localhost:3000/api/v1/user \
  -H 'content-type: application/json' \
  -d '{
        "email": "usuario@gmail.com",
        "password": "123"
      }'

```

- [x] endpotin to user get a token

```bash
curl -X POST \
  http://localhost:3000/api/v1/login \
  -H 'content-type: application/json' \
  -d '{
        "email": "usuario@gmail.com",
        "password": "123"
      }'

{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMzLCJlbWFpbCI6InVzdWFyaW9AZ21haWwuY29tIiwiaWF0IjoxNTk4ODE2MjczLCJleHAiOjE1OTg4MjM0NzN9.yUT7yByycCyxigIqnKkGL0OYx0MdhLxi_zh9uaYzmkQ"}%

```

endpoints:

```bash
verb PUT: http://localhost:3000/api/v1/taxpayer-registry
must have header Authorization: token (get token from login endpoint)

need to send a valid cpf (taxpayer registry)
{
  "cpf": "0112113911",
  "countryCode": "BR"
}
```

```bash
verb PUT: http://localhost:3000/api/v1/full-name
header: Authorization: token
{
    "firstName": "Matheus",
    "lastName": "Xico"
}
```

```bash
PUT:http://localhost:3000/api/v1/address
header: Authorization: token
{
    "cep": "123123",
    "address": "xx Oscar da Costa",
    "number": 930,
    "city": "Sao Paulo",
    "state": "SP"
}

```

## Code Structure Design (Architecture layer)

We try to use layer architecture to create this code
![](./layer.png)

## Test Approach

We try to use this approach to test https://martinfowler.com/articles/microservice-testing/
