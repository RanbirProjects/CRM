# MERN CRM System

A full-stack Customer Relationship Management (CRM) system built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- **User Authentication**: Register and login with JWT tokens
- **Customer Management**: Add, edit, delete, and view customers
- **Interaction Tracking**: Log and manage customer interactions (calls, emails, meetings)
- **Dashboard**: Overview with statistics and quick actions
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Secure API**: Protected routes with JWT authentication

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crm-mern
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

   **MongoDB Connection String Examples:**
   - Local: `mongodb://localhost:27017/crm`
   - MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/crm`

5. **Start the application**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### Getting Started

1. **Register a new account** or **login** with existing credentials
2. **Dashboard**: View overview statistics and quick actions
3. **Customers**: Manage your customer database
4. **Add Customers**: Fill in customer information
5. **Track Interactions**: Log calls, emails, and meetings for each customer

### Features Overview

#### Dashboard
- Welcome message with user name
- Statistics cards (total customers, interactions)
- Quick action buttons

#### Customer Management
- View all customers in a table format
- Add new customers with detailed information
- Edit existing customer details
- Delete customers (with confirmation)
- View individual customer profiles

#### Interaction Tracking
- Log different types of interactions (call, email, meeting)
- Add notes to each interaction
- View interaction history per customer
- Date tracking for all interactions

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Customers
- `GET /api/customers` - Get all customers (protected)
- `GET /api/customers/:id` - Get single customer (protected)
- `POST /api/customers` - Create new customer (protected)
- `PUT /api/customers/:id` - Update customer (protected)
- `DELETE /api/customers/:id` - Delete customer (protected)

### Interactions
- `GET /api/interactions/customer/:customerId` - Get interactions for customer (protected)
- `POST /api/interactions` - Create new interaction (protected)
- `PUT /api/interactions/:id` - Update interaction (protected)
- `DELETE /api/interactions/:id` - Delete interaction (protected)

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Customer
```javascript
{
  name: String,
  email: String,
  phone: String,
  company: String,
  notes: String,
  user: ObjectId (ref: User),
  createdAt: Date
}
```

### Interaction
```javascript
{
  customer: ObjectId (ref: Customer),
  type: String (enum: ['call', 'email', 'meeting']),
  note: String,
  date: Date,
  user: ObjectId (ref: User)
}
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Protected Routes**: API endpoints require valid JWT
- **User Isolation**: Users can only access their own data
- **Input Validation**: Server-side validation for all inputs

## Project Structure

```
crm-mern/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Customer.js
│   │   └── Interaction.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── customers.js
│   │   └── interactions.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── CustomerList.js
│   │   │   ├── CustomerDetail.js
│   │   │   ├── AddCustomer.js
│   │   │   ├── EditCustomer.js
│   │   │   └── Navbar.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository. # CRM
