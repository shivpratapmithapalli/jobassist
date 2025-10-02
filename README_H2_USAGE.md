# H2 in local dev and switching to PostgreSQL on Render (Docker)

This project runs with an in-memory H2 database for local development and switches to PostgreSQL in deployment. We also use JWT for stateless authentication with an HS512 signing key provided via an environment variable.

## What happens to auth credentials
- Passwords are stored hashed with BCrypt in the `users` table (via Spring Security's `PasswordEncoder`).
- JWT access tokens are NOT stored in the database. Authentication is stateless; the token is verified on each request.
- In local dev, H2 is in-memory and `spring.jpa.hibernate.ddl-auto=create-drop`, so all data (including users) is cleared when the app stops.

## Local development (H2)
Local dev uses H2 so you don't need a DB server.

Relevant config (application.properties):
- `spring.datasource.url=jdbc:h2:mem:testdb`
- `spring.datasource.driver-class-name=org.h2.Driver`
- `spring.h2.console.enabled=true`
- `spring.jpa.hibernate.ddl-auto=create-drop`
- `spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect`

Dependency: `com.h2database:h2` (runtime scope) is included in `pom.xml`.

## JWT signing key (env var)
We created an environment variable for the HS512 signing key:
- Variable name: `APP_JWT_SECRET`
- Value format: `base64:<base64-encoded-64-byte-secret>`
- Spring maps `APP_JWT_SECRET` to `app.jwt.secret` automatically.
- The backend validates the key length (>= 64 bytes) before registering users; if invalid, the request fails before any DB write.

Example (PowerShell, persistent for current user):

```powershell
$rng   = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$bytes = New-Object 'System.Byte[]' 64
$rng.GetBytes($bytes)
[Environment]::SetEnvironmentVariable(
  "APP_JWT_SECRET",
  "base64:" + [Convert]::ToBase64String($bytes),
  "User"
)
$rng.Dispose()
```

## Switching to PostgreSQL for deployment
PostgreSQL is already listed as a dependency: `org.postgresql:postgresql`.

For production, configure these environment variables (do NOT commit credentials):
- `SPRING_PROFILES_ACTIVE=prod` (recommended)
- `SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:<port>/<database>?sslmode=require`
- `SPRING_DATASOURCE_USERNAME=<username>`
- `SPRING_DATASOURCE_PASSWORD=<password>`
- `SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect`
- `SPRING_JPA_HIBERNATE_DDL_AUTO=update` (or `validate` once you have migrations)
- `APP_JWT_SECRET=base64:<base64-encoded-64-byte-secret>`

Recommended: add an `application-prod.properties` that omits H2 and leaves values to env vars:

```properties
server.port=8080
# No H2 settings in prod
spring.h2.console.enabled=false
spring.jpa.open-in-view=false
# Let env vars provide datasource URL/credentials and dialect
```

## Deploying on Render (Docker)
Render (free PostgreSQL) gives you a database with connection parameters. In your Render Service (the Docker-based web service):

1) Create or connect a Render PostgreSQL instance.
2) In the Web Service settings, set Environment Variables:
   - `SPRING_PROFILES_ACTIVE=prod`
   - `SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:<port>/<db>?sslmode=require`
   - `SPRING_DATASOURCE_USERNAME=<user>`
   - `SPRING_DATASOURCE_PASSWORD=<password>`
   - `SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect`
   - `SPRING_JPA_HIBERNATE_DDL_AUTO=update`
   - `APP_JWT_SECRET=base64:<base64-encoded-64-byte-secret>`

If Render provides a `DATABASE_URL` like `postgres://user:pass@host:port/db`, convert manually to JDBC format for `SPRING_DATASOURCE_URL`:
`jdbc:postgresql://host:port/db?sslmode=require` and set `USERNAME`/`PASSWORD` from that URL.

### Docker build & run (local example)
Assuming you have a Dockerfile at the backend root; run with env vars:

```bash
# build
docker build -t jobhive-backend ./backend

# run with PostgreSQL and JWT secret
docker run --rm -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e SPRING_DATASOURCE_URL="jdbc:postgresql://<host>:<port>/<db>?sslmode=require" \
  -e SPRING_DATASOURCE_USERNAME="<user>" \
  -e SPRING_DATASOURCE_PASSWORD="<password>" \
  -e SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT="org.hibernate.dialect.PostgreSQLDialect" \
  -e SPRING_JPA_HIBERNATE_DDL_AUTO=update \
  -e APP_JWT_SECRET="base64:<base64-encoded-64-byte-secret>" \
  jobhive-backend
```

## Notes & recommendations
- H2 data is ephemeral; do not rely on it beyond dev/testing.
- For production, consider schema migrations with Flyway or Liquibase and switch `ddl-auto` to `validate`.
- Keep secrets out of logs and code. Use Render environment variables or a secrets manager.
- Rotating `APP_JWT_SECRET` will invalidate existing JWTs by design.
