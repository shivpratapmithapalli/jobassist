# JobHive

🚀 **AI-powered job application management platform** with React frontend and Spring Boot backend.

## ✨ Features

- 🎨 **Modern glassmorphism UI** with dark theme
- 📝 **Job application tracking** and management  
- 🤖 **AI-powered resume analysis** and suggestions
- 📱 **Responsive design** optimized for all devices
- 🔐 **Secure JWT authentication** with proper password validation
- 🔒 **Remember Me functionality** with session/localStorage management
- ⚡ **Real-time validation** and error handling

## 🏗️ Architecture

```
JobHive/
├── frontend/           # React + TypeScript SPA
│   ├── React 18 + Vite
│   ├── TailwindCSS + shadcn/ui
│   ├── Zustand (State Management)
│   └── JWT Authentication
└── backend/            # Spring Boot API
    ├── Spring Boot 3.2
    ├── Spring Security + JWT
    ├── JPA + PostgreSQL
    └── BCrypt Password Hashing
```

## 🚀 Quick Start

### 1. Backend Setup (Spring Boot)

```bash
# Navigate to backend
cd backend

# Run with H2 (quick development)
mvn spring-boot:run

# Or configure PostgreSQL in application.properties
# Then run: mvn spring-boot:run
```

✅ **Backend running at**: `http://localhost:8080`

### 2. Frontend Setup (React)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ **Frontend running at**: `http://localhost:5173`

## 🔧 Tech Stack

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **TailwindCSS** with custom glassmorphism theme
- **shadcn/ui** + **Radix UI** components
- **Zustand** for state management
- **React Router 7** for routing
- **Framer Motion** for animations
- **Lucide React** for icons

### Backend
- **Spring Boot 3.2** with **Java 17**
- **Spring Security** with **JWT authentication**
- **Spring Data JPA** + **PostgreSQL**
- **BCrypt** password hashing
- **Jakarta Validation** for input validation
- **Maven** for dependency management

## 🛡️ Security Features

- ✅ **JWT-based authentication** with refresh tokens
- ✅ **Password validation** (uppercase, lowercase, numbers, special chars)
- ✅ **BCrypt hashing** for secure password storage
- ✅ **CORS configuration** for frontend-backend communication
- ✅ **Remember Me functionality** with proper session handling
- ✅ **Input validation** and sanitization
- ✅ **SQL injection protection** via JPA

## 📚 API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - Login user  
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile
- `GET /api/v1/user/health` - Health check

### Example Usage

```bash
# Register user
curl -X POST http://localhost:8080/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"SecurePass123!"}'

# Login
curl -X POST http://localhost:8080/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123!"}'
```

## 📁 Project Structure

```
JobHive/
├── frontend/src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Route-level components
│   ├── store/         # Zustand state management
│   ├── lib/           # API service & utilities
│   └── types/         # TypeScript definitions
└── backend/src/main/java/com/jobhive/
    ├── controller/    # REST endpoints
    ├── service/       # Business logic
    ├── repository/    # Data access
    ├── model/         # JPA entities
    ├── dto/           # Request/Response objects
    ├── security/      # JWT & authentication
    └── config/        # Spring configuration
```

## 🔮 What's Next

- 📋 **Job Management APIs** (save, list, export)
- 🤖 **AI Resume Analysis** integration  
- 📊 **Excel export** functionality
- 📧 **Email notifications**
- 🔍 **Advanced search & filtering**

## 🐛 Troubleshooting

**Backend not starting?**
- Check Java 17+ is installed: `java --version`
- Verify port 8080 is available
- Check database connection in `application.properties`

**Frontend not connecting?**
- Ensure backend is running on `localhost:8080`
- Check CORS configuration in Spring Boot
- Verify API base URL in `frontend/src/lib/api.ts`

**Authentication issues?**
- Clear browser localStorage/sessionStorage
- Check JWT token in Network tab
- Verify password meets requirements (8+ chars, mixed case, numbers, symbols)

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes!

---

## 🎉 Migration Complete!

**Authentication has been successfully transferred from TypeScript/Supabase to Spring Boot backend:**

✅ **Removed**: Supabase dependencies and authentication code  
✅ **Added**: Complete Spring Boot backend with JWT authentication  
✅ **Updated**: Frontend to communicate with new backend APIs  
✅ **Maintained**: All existing functionality including Remember Me  

**The app now uses enterprise-grade Spring Boot authentication while maintaining the exact same user experience!** 🚀