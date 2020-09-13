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

- [x] Build 5 RESTful api points where a Users can send each part of their personal information. They need to pass token and data in the body of the request. You need store this information some where.

CPF -> String
Full Name -> String
Birthday -> String
Phone Number -> Number
Address (CEP, street, number, complement, city, state) -> String and Number

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
verb PUT: http://localhost:3000/api/v1/birthday
header: Authorization: token
{
    "birthday": "09/09/1994"
}
```

```bash
PUT : http://localhost:3000/api/v1/phone-number
header: Authorization: token
{
    "phoneNumber": "048 991496580"
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

```bash
PUT : http://localhost:3000/api/v1/ammount
header: Authorization: token

{
    "amount": 23.0
}
```

- [x] Add a verification step for CPF, verify it is valid CPF number.
- [x] Add a verification step for the CEP.
- [x] Add a new end-point -> Amount Requested, will received data in cents.

- [x] The order of the end-points must be maintained and checked, to achieve this, create a place where you can save the order of the end-points. Such that CPF -> Full Name -> Birthday -> Phone Number -> Address -> Amount Requested order must be enforce.
- [] If a request is made out of order, it must return message informing an error. If the request is valid with the correct order, it must inform which is the next end-point the User has to request to

## Code Structure Design (Architecture layer)

We try to use layer architecture to create this code
![](./layer.png)

## Test Approach

We try to use this approach to test https://martinfowler.com/articles/microservice-testing/
