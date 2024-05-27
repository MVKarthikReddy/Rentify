# Rentify

Welcome to **Rentify**! This web application, built using the MERN stack (MongoDB, Express, React, Node.js), allows users to rent, sell, and buy properties online. This README provides an overview of the project, setup instructions, and other essential information.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

## Introduction

**Rentify** is a comprehensive web application designed to facilitate the renting, selling, and buying of properties. The platform provides a user-friendly interface and robust backend to ensure a seamless experience for users looking for their next home or investment opportunity.

## Features

- **User Authentication**: Secure sign-up, login, and profile management.
- **Property Listings**: Browse properties available for rent, sale, or purchase.
- **Advanced Search**: Filter properties based on location, price, size, and more.
- **Property Management**: Users can add, edit, and delete their property listings.
- **Favorites**: Save properties to your favorites for quick access.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS, Bootstrap

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repository:**

    ```bash
    git clone (https://github.com/MVKarthikReddy/rentify)
    cd rentify
    ```

2. **Install dependencies for both the server and client:**

    ```bash
    cd server
    npm install
    cd ../client
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `server` directory and add the following:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

4. **Run the application:**

    Open two terminals and run the following commands:

    Terminal 1 (Backend):

    ```bash
    cd server
    npm start
    ```

    Terminal 2 (Frontend):

    ```bash
    cd client
    npm start
    ```

5. **Access the application:**

    Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Sign up** or **Log in** to your account.
2. **Browse** properties or use the **search** feature to find specific listings.
3. **Add** new property listings if you want to rent or sell a property.
4. **Edit** or **delete** your property listings as needed.
5. **Save** properties to your favorites for easy access later.

## Project Structure

```plaintext
rentify/
├── client/                  # Frontend code (React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                  # Backend code (Node.js, Express)
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Properties

- `GET /api/properties` - Get all properties
- `POST /api/properties` - Add a new property
- `GET /api/properties/:id` - Get a single property by ID
- `PUT /api/properties/:id` - Update a property by ID
- `DELETE /api/properties/:id` - Delete a property by ID

### User

- `GET /api/users/:id` - Get user profile by ID
- `PUT /api/users/:id` - Update user profile by ID

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out:

- **Email**: karthikmedagam@gmail.com
- **GitHub**: [https://github.com/yourusername/rentify](https://github.com/MVKarthikReddy/rentify)

Thank you for using Rentify! We hope you find your perfect property.

