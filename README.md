### wander project containing user authentication

## Overview

This project implements a user authentication system using Next.js, MongoDB, and various supporting libraries. The key features include user registration, login, and route protection. It uses technologies such as `mongoose` for database interactions, `Zod` for validation, `sooner` for user notifications, `bcryptjs` to store hashed password in database. The project also includes setup for code formatting, linting, and commit conventions with tools like prettier, lint-staged, commit-lint, and husky.

## Prerequisites

Node.js
MongoDB Atlas account
`npm`

## Installation

1. Clone the repository:
   `git clone git@github.com:Rajharsh2/wander.git`
   cd wander
2. Install dependencies:
   `npm install`

## Setup

# Environment Variables:

    Create a .env file in the root of your project and add the following:
        - CONNECTION_STIRNG=your_mongoDb_connection_string
        - ACCESS_TOKEN_SECRET=your_access_token_secret
        - BYCRYPT_HASH_ROUND=ex:10

## Usage

# Register User

    - Navigate to /register.
    - Fill out the registration form with the required information.
    - Submit the form to create a new user account.

# Login User

    - Navigate to /login.
    - Enter your email and password.
    - Submit the form to log in.

# Middleware Protection

    - Middleware ensures that all routes except for /register and /login are protected.
    - Only authenticated users can access protected routes.
    - If a user attempts to access a protected route without being logged in, they will be redirected to the /login page.
