# Merchant

## Install
```
cd server
npm install
```

## Start
The [payment API](https://github.com/esgi-react-node/payment) must be started before starting this project in order to run on the same network.
Start the project with this command `make start`

__adminer__ will run on `localhost:8081`
__postgreSQL__ db will run on `localhost:5433`
__API__ will run on `localhost:3004`

## API Routes
### Login
`POST /login_check`
```
{
  username: 'johndoe',
  password: 'password123'
}
```

### Users
User model :
```
{
  id: 3,
  username: 'johndoe',
  password: 'password123',
  firstname: 'John',
  lastname: 'Doe',
  role: 'user',
  "createdAt": "2020-07-01 14:23:50.807+00",
  "updatedAt": "2020-07-01 14:23:50.807+00",
}
```

Get all users : `GET /users/`

Get a single user : `GET /users/:id`

Create a user : `POST /users/`

Example of data to send :
```
{
  "username": "fake@email.fake",
  "password": "test"
}
```

Update user : `PUT /users/:id`
Example of data to send :
```
{
  username: 'johndoe2',
  firstname: 'Marcel',
  lastname: 'Patulacci'
}
```

Delete user : `DELETE /users/:1`

### Orders
Order model:
```
{
  "id": 1,
  "status": "created"
  "amount": 1300,
  "currency": "EUR",
  "cart": {
    "banane": 300,
    "tomate": 600
  },
  "createdAt": "2020-07-01 14:23:50.807+00",
  "updatedAt": "2020-07-01 14:23:50.807+00",
  "billingId": 3,
  "shippingId": 4,
  "UserId": 1
}
```

Get all orders: `GET /orders/`

Get a single order: `GET /orders/:id`

Create order : `POST /orders/`
```
{
  "amount": 1300,
  "currency": "EUR",
  "cart": {
    "banane": 300,
    "tomate": 600
  },
  "billing": {
    "fullName": "Marcel Patoulachi",
    "address": "place de la tour Eiffel",
    "town": "Paris",
    "zip": "75001",
    "country": "France"
  },
  "shipping": {
    "fullName": "Marcel Patoulachi",
    "address": "place de la tour Eiffel",
    "town": "Paris",
    "zip": "75001",
    "country": "France"
  },
  "UserId": 1
}
```
