
# User Authentication

User Authentication is a web application that provides secure signup and login functionalities using email OTP verification and password hashing. It also includes a mobile-friendly design and follows best practices for application development.

## Features

- Signup flow with email OTP verification
- Displaying relevant error messages for incorrect OTP or API failure
- Welcome page after signup/login
- Mobile-friendly design
- Best practices for security (password hashing, JWT authentication)


## Tech Stack

**Client:** React, Redux, TailwindCSS (with Typescript)

**Server:** Node, Express

**Database:** MongoDB 


## Installation

Clone the repository:

```bash
git clone https://github.com/Sachin967/User-Authentication.git
  cd my-project
```

Install dependencies for client and backend:
    
```bash
cd client
npm install
cd ../backend
npm install
```

Set up environment variables:

- Create a .env file in the backend directory.
- Add necessary environment variables like database connection URL, JWT secret, etc.

Start the development servers:

```bash
cd client
npm run dev
cd ../backend
npm start
```

Access the application in your browser:

```bash
http://localhost:3000

```