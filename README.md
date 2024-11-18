# E-Commerce Website  

Welcome to our **E-Commerce Website**, a fully functional online shopping platform built using the MERN (MongoDB, Express, React, Node.js) stack. This project demonstrates a professional-level implementation of a modern e-commerce application.  

---

## Features  

- **User Authentication**:  
  Secure login and signup using JWT (JSON Web Tokens).  
  - Login  
  - Signup  
  - Password encryption with bcrypt  

- **Product Management**:  
  - View a list of products with pagination.  
  - Filter products by categories, price, and ratings.  
  - Add, update, and delete products (admin only).  

- **Shopping Cart**:  
  - Add products to the cart.  
  - Update product quantities in the cart.  
  - Checkout seamlessly.  

- **Order Management**:  
  - Place orders with real-time updates.  
  - Track order history.  
  - Admin dashboard for managing orders.  

- **Responsive Design**:  
  Mobile-first design for optimal experience across devices.  

- **State Management**:  
  Centralized state management with **Redux** for better scalability.  

---

## Technologies Used  

- **Frontend**: React, Redux, Bootstrap (for styling).  
- **Backend**: Node.js, Express.js.  
- **Database**: MongoDB (NoSQL).  
- **Authentication**: JSON Web Tokens (JWT) with bcrypt for password security.  
- **Development Tools**:  
  - VSCode  
  - Postman for API testing  

---

## Prerequisites  

Before running the project, ensure you have the following installed:  

- Node.js (v14 or higher).  
- MongoDB (locally or via a cloud service like MongoDB Atlas).  
- Git (for version control).  

---

## Installation  

1. Clone the repository:  

   ```bash
   git clone https://github.com/youssef-degachi/ECommerce-.git
   cd ECommerce-
   npm i
   cd frontend
   npm i
   cd ..
   npm run dev

## ⚠️ **Important**  

💡 **Don't forget:**  
Make sure to configure your database by adding your connection string in the `.env` file!  

```env
MONGODB_URI=your-mongo-connection-string
