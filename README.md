# MERN Stack Authentication Project

This project demonstrates a MERN stack application with authentication implemented using JWT (JSON Web Token) stored as cookies. The application has two main folders: `client` and `server`.

## NOTE:
It is fully funcation template of a MERN stack authentication system but it doesn't mean there is no room for improvement. It can be further improved by adding encryption of the passwords. For the sake of simplicity and flexibility of this auth-template I didn't used any encryption library for password hashing. But for your serious project, do use some encryption libraries like bcrypt.js etc.

## Project Description

This authentication system is built using the MERN stack (MongoDB, Express, React, Node.js) and incorporates the following technologies:

- **Material UI**: For React components and UI styling.
- **Tailwind CSS**: For utility-first CSS framework.
- **Express**: For the backend server and API routes.
- **MongoDB**: For the database.
- **Mongoose**: For object data modeling (ODM) with MongoDB.
- **JWT**: For secure authentication between routes


## Project Structure

├── client<br>
├── server<br>
│ ├── .env<br>
│ └── ...<br>
└── README.md<br>


## Features

- **User Authentication**: Users can register and log in & logout.
- **JWT and Cookies**: JWT tokens are stored as cookies for secure authentication.
- **MongoDB**: MongoDB is used as the database, managed through Mongoose.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, Cookies

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-repo-url.git
    cd your-repo-url
    ```

2. **Install dependencies for the client and server:**

    ```sh
    cd client
    npm install
    cd ../server
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `server` folder and add the following:

    ```env
   MONGODB_URI=  YOUR_CONNECTION_STRING
   PORT=3000
   JWT_SECRET= YOUR_SECRET_KEY
   FRONT_URL=http://localhost:5173
    ```

4. **Run the application:**

    Open two terminal windows or tabs.

    In the first terminal, start the server:

    ```sh
    cd server
    npm start
    ```

    In the second terminal, start the client:

    ```sh
    cd client
    npm start
    ```


## Usage

- **Register**: Create a new account.
- **Login**: Log in with your credentials.
- **Protected Routes**: Access routes that require authentication.

## Project Workflow

1. **Client**: The React application handles user interface and interacts with the backend via API calls.
2. **Server**: The Node.js server handles authentication, JWT token generation, and database interactions.
3. **Database**: MongoDB stores user information and session data.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/fooBar`).
3. Commit your changes (`git commit -am 'Add some fooBar'`).
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
