# Wordstock - Modern Online Bookstore

![Wordstock Logo](https://cdn-icons-png.flaticon.com/128/207/207114.png)

## Overview

Wordstock is a comprehensive full-stack e-commerce platform designed for book lovers. The application provides a seamless shopping experience with a sleek, modern interface and robust backend functionality. From browsing books to managing favorites and completing purchases, Wordstock offers an intuitive and engaging experience for all users.

## Demo Video

[Watch the Wordstock Demo](https://youtu.be/JGIpeSlcroc) <!-- Replace with your actual demo video link -->

## Key Features

### User Authentication & Management
- **Secure Signup/Login**: JWT-based authentication with HTTP-only cookies for enhanced security
- **User Profiles**: Personalized dashboard to manage account details
- **Role-Based Access**: Different interfaces and permissions for regular users and administrators

### Book Discovery & Management
- **Comprehensive Catalog**: Browse an extensive collection of books
- **Advanced Filtering**: Sort by price, title, and other criteria
- **Search Functionality**: Find specific books quickly with the search feature
- **Recently Added Section**: Stay updated with the latest additions to the store

### User Experience
- **Responsive Design**: Seamless experience across all devices
- **Favorites System**: Save books for later viewing
- **Shopping Cart**: Add, remove, and manage items before checkout
- **Detailed Book Information**: Access comprehensive details about each book

### Visual Design
- **Modern UI**: Clean, contemporary design with gradient text effects
- **Smooth Animations**: Subtle transitions and hover effects
- **Intuitive Navigation**: Easy-to-use layout for all user actions

## Technologies Used

### Frontend
- **React.js**: Component-based UI development
- **Redux**: State management for user authentication and app state
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: Navigation and routing
- **Axios**: HTTP requests to the backend API

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcrypt.js**: Password hashing for security

## Installation & Setup

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Arjunhg/EpicReads.git
```

### Step 2: Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```
PORT = 3000
MONGO_URI = "YOUR_MONGODB_CONNECTION_STRING"
JWT_SECRET = "YOUR_SECRET_KEY"
CLIENT_URL = http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

### Step 3: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Step 4: Access the Application
- Open your browser and navigate to http://localhost:5173

## Usage Guide

### Browsing Books
- Visit the homepage to see featured and recently added books
- Navigate to "All Books" to see the complete collection
- Use search functionality and filters to find specific books

### Account Management
- Sign up for a new account or log in to an existing one
- Visit your profile to manage favorites and account settings
- Update your information from the Settings page

### Shopping
- Add books to your cart from book details pages
- Review your cart items before proceeding to checkout
- Add books to favorites to save them for later

### Book Details
- Click on any book to view detailed information
- See author information, descriptions, price, and more
- Add the book to cart or favorites directly from this page

## API Endpoints
The application includes a comprehensive set of RESTful APIs:

### Authentication
- POST `/api/v1/sign-up`: Register a new user
- POST `/api/v1/sign-in`: Log in a user
- POST `/api/v1/logout`: Log out the current user
- GET `/api/v1/auth/me`: Get current user information

### Books
- GET `/api/v1/get-all-books`: Retrieve all books
- GET `/api/v1/get-recent-books`: Get recently added books
- GET `/api/v1/get-book/:id`: Get details of a specific book

## Technologies Summary
- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, HTTP-only cookies
- **Styling**: Gradient designs, responsive layouts

Experience the joy of book shopping with Wordstock's modern interface and seamless functionality!