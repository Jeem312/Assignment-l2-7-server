# 🚀 Portfolio Backend API

A robust and secure backend API for a personal portfolio website built with Node.js, Express, TypeScript, and MongoDB.

---

## 🌐 Live Deployment

- **Backend URL**: `https://portfolioassignment-alpha.vercel.app/api/v1`
- **Frontend URL**: `https://your-frontend-url.vercel.app`

---

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Error Handling](#error-handling)
- [Admin Credentials](#admin-credentials)

---

## ✨ Features

### Core Features
- **JWT-based Authentication** - Secure admin login with access and refresh tokens
- **Protected Routes** - Role-based access control for admin-only operations
- **Blog Management** - Full CRUD operations for blog posts
- **Project Management** - Complete project showcase management
- **Global Error Handling** - Centralized error management with detailed responses
- **Input Validation** - Request validation using custom validators
- **Secure Password Storage** - bcrypt password hashing
- **HTTP-only Cookies** - Secure token storage in cookies
- **CORS Enabled** - Cross-origin resource sharing configured

### Security Features
- Password encryption with bcrypt
- JWT token-based authentication
- HTTP-only secure cookies
- Environment variable protection
- Request validation & sanitization
- Global error handling

---

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Validation**: Custom validators
- **HTTP Status**: http-status-codes
- **Environment**: dotenv

---

## 📁 Project Structure

```
src/
├── app/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── admin.model.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.route.ts
│   │   │   └── auth.service.ts
│   │   ├── blog/
│   │   │   ├── blog.controller.ts
│   │   │   ├── blog.interface.ts
│   │   │   ├── blog.model.ts
│   │   │   ├── blog.route.ts
│   │   │   └── blog.service.ts
│   │   └── projects/
│   │       ├── project.controller.ts
│   │       ├── project.interface.ts
│   │       ├── project.model.ts
│   │       ├── project.route.ts
│   │       └── project.service.ts
│   ├── routes/
│   │   └── index.ts
│   └── types/
│       └── express/
│           └── index.d.ts
├── config/
│   └── envConfig.ts
├── helpers/
│   └── AppError.ts
├── middleWares/
│   ├── auth.middleware.ts
│   ├── globalErrorHandler.ts
│   └── notFound.ts
├── utils/
│   ├── catchAsync.ts
│   ├── jwt.ts
│   ├── seedSuperAdmin.ts
│   ├── sendResponse.ts
│   └── setCookie.ts
├── app.ts
└── server.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-backend.git
   cd portfolio-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see below)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Frontend URL
FRONTEND_URL=http://localhost:3000

# JWT Secrets
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_ACCESS_EXPIRES=7d
JWT_REFRESH_SECRET=your-refresh-secret-key-here
JWT_REFRESH_SECRET_EXPIRED=30d

# Password Hashing
BCRYPT_SALT_ROUNDS=12

# Super Admin Credentials
SUPER_ADMIN_EMAIL=admin@portfolio.com
SUPER_ADMIN_PASSWORD=Admin@12345
```

> **⚠️ Security Warning**: Never commit your `.env` file! Always use strong, unique secrets in production.

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Routes

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/login` | Public | Admin login |
| POST | `/auth/logout` | Private | Admin logout |

**Login Request:**
```json
{
  "email": "admin@portfolio.com",
  "password": "Admin@12345"
}
```

**Login Response:**
```json
{
  "StatusCode": 200,
  "success": true,
  "message": "Admin login successful",
  "data": {
    "email": "admin@portfolio.com",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Blog Routes

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/blogs` | Public | Get all blogs |
| GET | `/blogs/:id` | Public | Get single blog |
| POST | `/blogs` | Private | Create blog |
| PATCH | `/blogs/:id` | Private | Update blog |
| DELETE | `/blogs/:id` | Private | Delete blog |

**Create Blog Request:**
```json
{
  "title": "My First Blog Post",
  "content": "This is the blog content...",
  "image": "https://example.com/image.jpg",
  "author": "Admin"
}
```

---

### Project Routes

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/projects` | Public | Get all projects |
| GET | `/projects/:id` | Public | Get single project |
| POST | `/projects` | Private | Create project |
| PATCH | `/projects/:id` | Private | Update project |
| DELETE | `/projects/:id` | Private | Delete project |

**Create Project Request:**
```json
{
  "title": "Portfolio Website",
  "description": "A personal portfolio website built with Next.js",
  "features": ["Responsive Design", "Blog System", "Project Showcase"],
  "image": "https://example.com/project.jpg",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "liveLink": "https://portfolio.com"
}
```

---

## 🔒 Authentication & Authorization

### How Authentication Works

1. **Login**: Admin provides email and password
2. **Token Generation**: Server generates JWT access token (7 days) and refresh token (30 days)
3. **Cookie Storage**: Tokens stored in HTTP-only secure cookies
4. **Protected Routes**: Middleware validates JWT before accessing admin routes
5. **Logout**: Clears authentication cookies

### Using Protected Routes

Include the JWT token in the request header:

```bash
# Using Authorization Header
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:5000/api/v1/blogs

# Or cookies are automatically sent by the browser
```

### Middleware Protection

```typescript
// Protected route example
router.post("/blogs", authenticateAdmin, createBlog);
```

---

## ⚠️ Error Handling

The API uses a centralized error handling system with detailed error responses:

### Error Response Format

```json
{
  "success": false,
  "message": "Invalid credentials",
  "errorSource": [
    {
      "path": "email",
      "message": "Admin not found"
    }
  ],
  "stack": "Error stack trace (development only)"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Internal Server Error

---

## 👤 Admin Credentials

### Default Super Admin

**Email**: `shanjidajeem312@gmail.com`  
**Password**: `12345678`

> **Note**: The super admin is automatically seeded when the server starts for the first time. Change the password immediately in production!

### Changing Admin Credentials

Update the `.env` file:
```env
SUPER_ADMIN_EMAIL=newemail@example.com
SUPER_ADMIN_PASSWORD=NewSecurePassword123!
```

Then restart the server or manually update in the database.

---

## 📦 Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Compile TypeScript to JavaScript
npm start            # Start production server

# Utilities
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

---

## 🗄️ Database Models

### Admin Model
```typescript
{
  email: string (unique, required)
  password: string (hashed, required)
  createdAt: Date
  updatedAt: Date
}
```

### Blog Model
```typescript
{
  title: string (required)
  content: string (required)
  image?: string
  author: string (default: "Admin")
  createdAt: Date
  updatedAt: Date
}
```

### Project Model
```typescript
{
  title: string (required)
  description: string (required)
  features: string[]
  image?: string
  thumbnail?: string
  liveLink?: string
  createdAt: Date
  updatedAt: Date
}
```

---

## 🔄 API Response Format

All API responses follow this standard format:

```typescript
{
  StatusCode: number
  success: boolean
  message: string
  data: T | null
  meta?: {
    total: number
  }
}
```

---

## 🚀 Deployment

### Deploying to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Set environment variables in Vercel dashboard

### Deploying to Railway/Render

1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically on push

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Shanjida Jahan Jeem
---

## 🙏 Acknowledgments

- Express.js documentation
- MongoDB documentation
- JWT best practices
- TypeScript guidelines

---

## 📞 Support

For support, email your.email@example.com or open an issue in the repository.

---

