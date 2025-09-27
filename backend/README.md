# JobAssist Backend

Spring Boot backend API for the JobAssist job application management platform.

## 🚀 Quick Start

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+ (or use H2 for development)

### Development Setup

1. **Clone and navigate to backend**:
   ```bash
   cd backend
   ```

2. **Configure Database**:

   **Option A: PostgreSQL (Recommended for production)**
   ```bash
   # Create database
   createdb jobassist_db
   createuser jobassist_user --interactive
   
   # Update application.properties with your DB credentials
   ```

   **Option B: H2 In-Memory (Quick development)**
   ```bash
   # Uncomment H2 configuration in application.properties
   # Comment out PostgreSQL configuration
   ```

3. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

4. **Verify it's running**:
   ```bash
   curl http://localhost:8080/api/v1/user/health
   # Should return: "User service is running! 🚀"
   ```

## 📚 API Endpoints

### Authentication

- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - Login user
- `GET /api/v1/user/profile` - Get user profile (requires JWT)
- `PUT /api/v1/user/profile` - Update user profile (requires JWT)
- `GET /api/v1/user/check-email?email=...` - Check if email exists

### Example Requests

**Register User**:
```bash
curl -X POST http://localhost:8080/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "MySecure123!",
    "phone": "123-456-7890",
    "location": "New York, NY"
  }'
```

**Login User**:
```bash
curl -X POST http://localhost:8080/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "MySecure123!"
  }'
```

## 🔧 Configuration

Key configuration options in `application.properties`:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/jobassist_db
spring.datasource.username=jobassist_user
spring.datasource.password=jobassist_password

# JWT
app.jwt.secret=YourSecretKey
app.jwt.expiration=86400000  # 24 hours
app.jwt.refresh-expiration=604800000  # 7 days

# CORS
app.cors.allowed-origins=http://localhost:5173,http://localhost:3000
```

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with BCrypt
- CORS configuration for frontend
- Input validation and sanitization
- SQL injection protection via JPA

## 🏗️ Architecture

```
backend/src/main/java/com/jobassist/
├── controller/          # REST endpoints
├── service/            # Business logic
├── repository/         # Data access layer
├── model/             # Entity classes
├── dto/               # Request/Response objects
├── security/          # JWT & auth configuration
└── config/            # Spring configuration
```

## 📊 Database Schema

- **users** - User accounts and profiles
- **jobs** - Saved job applications
- **resumes** - Parsed resume data (future feature)

## 🐛 Troubleshooting

**Port already in use**:
```bash
# Change port in application.properties
server.port=8081
```

**Database connection issues**:
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Create database manually
psql -c "CREATE DATABASE jobassist_db;"
```

**CORS errors from frontend**:
```bash
# Verify allowed origins in application.properties match your frontend URL
app.cors.allowed-origins=http://localhost:5173
```

## 🚧 Development

**Hot reload**:
```bash
mvn spring-boot:run -Dspring-boot.run.fork=false
```

**Run tests**:
```bash
mvn test
```

**Build for production**:
```bash
mvn clean package
java -jar target/jobassist-backend-1.0.0.jar
```

## 🔮 Next Features

- Job management APIs (POST /job/save, GET /job/list, etc.)
- Resume analysis with AI
- Excel export functionality
- Email notifications
- Advanced search and filtering

---

**Need help?** Check the logs in the terminal where you ran `mvn spring-boot:run` for detailed error information.