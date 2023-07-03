# Online Cow Selling Backend for Eid Ul Adha

This project is the backend implementation of an Online Cow Selling platform in preparation for Eid Ul Adha. It provides the necessary functionalities to handle cow listings, user management, transactions, and authentication.

## Features

- Error handling with appropriate error responses
- CRUD operations for users and cows
- Pagination and filtering of cow listings
- Transaction management
- Authentication and authorization for protected routes

## Technology Stack

The backend is developed using the following technologies:

- TypeScript: Programming language
- Express.js: Web framework
- Mongoose: Object Data Modeling (ODM) and validation library for MongoDB
 
 ## API Documentation

The API documentation provides details about the available routes, their functionalities, expected request and response formats, authentication requirements, and additional features. Refer to the API documentation for a comprehensive understanding of the backend API.

API Documentation
Error Handling

The backend application has proper error handling implemented throughout the codebase. Errors are captured and appropriate error responses with status codes and error messages are provided. The error response object includes the following properties:

    success: false
    message: The error type (e.g., Validation Error, Cast Error, Duplicate Entry)
    errorMessages: An array of error messages with path and message properties
    stack: The error stack trace

Models
User Model

The User model represents a user in the system. It has the following properties:

    _id: Unique identifier
    phoneNumber: User's phone number
    role: User's role (seller or buyer)
    password: User's password (hashed)
    name: User's full name (first name and last name)
    address: User's address
    budget: Savings for buying the cow
    income: Money from selling the cow
    createdAt: Timestamp of user creation
    updatedAt: Timestamp of user update

Cow Model

The Cow model represents a cow listing. It has the following properties:

    _id: Unique identifier
    name: Cow's name
    age: Cow's age
    price: Cow's price
    seller: Reference to the seller user
    createdAt: Timestamp of cow creation
    updatedAt: Timestamp of cow updat