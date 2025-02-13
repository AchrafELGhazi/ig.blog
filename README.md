# IG.Blog: Blog Application

A modern blog application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

- User authentication (register, login, logout)
- Create, read, update, like, comment and delete blog posts
- Responsive design
- Protected routes with JWT authentication
- User context management

## 📋 Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## 🛠️ Installation & Setup

### Backend Setup

1. **Clone the repository**
   ```sh
   https://github.com/AchrafELGhazi/BLOG-APP.git
   cd blog-app/server
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the `server` directory with:
   ```sh
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server**
   ```sh
   npm run dev:start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```sh
   cd ../web
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the frontend**
   ```sh
   npm start
   ```

## 📁 Project Structure

### Backend
- `app.js` - Main application file (Express server setup and MongoDB connection)
- `models/` - MongoDB/Mongoose models
- `controllers/` - Request handler functions
- `middlewares/` - Custom middleware (e.g., JWT verification)
- `routes/` - API route definitions

### Frontend
- `src/` - React components and pages
- `src/utils/UserContext.tsx` - User state management
- `src/components/Navbar.tsx` - Navigation component
- `src/pages/` - Page components (Register, Profile, etc.)


## 🔐 Security

- JWT-based authentication
- Protected API routes
- Secure password handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
