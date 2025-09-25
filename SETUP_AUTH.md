# Supabase Authentication Setup Guide

This guide will help you set up real authentication using Supabase for the JobAssist application.

## Prerequisites

1. A Supabase account (free tier is sufficient)
2. A Supabase project created

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - Name: `JobAssist` (or any name you prefer)
   - Database Password: Generate a strong password
   - Region: Choose closest to your location
6. Click "Create new project"

## Step 2: Get Project Credentials

1. In your Supabase dashboard, go to **Settings > API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. In the `frontend/` directory, create a `.env` file:
```bash
# Copy from .env.example
cp .env.example .env
```

2. Edit the `.env` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important**: Never commit the `.env` file to version control. It's already in `.gitignore`.

## Step 4: Configure Supabase Authentication

1. In your Supabase dashboard, go to **Authentication > Settings**
2. Configure the following settings:

### Email Auth Settings:
- **Enable email confirmations**: Turn ON (recommended for production)
- **Secure email change**: Turn ON (recommended)

### Site URL Configuration:
- **Site URL**: `http://localhost:5173` (for development)
- **Redirect URLs**: Add `http://localhost:5173/**` for development

### Email Templates (Optional):
You can customize the email templates for:
- Confirm signup
- Magic link
- Change email address
- Reset password

## Step 5: Test the Implementation

1. Start your development server:
```bash
cd frontend
npm run dev
```

2. Navigate to `http://localhost:5173`
3. Try to sign up with a new account
4. Check your email for confirmation (if enabled)
5. Try to log in with your credentials
6. Test logout functionality

## Step 6: Database Setup (Optional)

If you want to store additional user profile data in Supabase:

1. Go to **Database > Table Editor**
2. Create a `profiles` table with columns:
   - `id` (uuid, primary key, references auth.users)
   - `name` (text)
   - `phone` (text)
   - `location` (text)
   - `current_role` (text)
   - `experience_level` (text)
   - `salary_expectation` (text)
   - `skills` (text[])
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

3. Set up Row Level Security (RLS):
```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own profile
CREATE POLICY "Users can manage their own profile" ON profiles
  FOR ALL USING (auth.uid() = id);
```

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables" error**:
   - Check that your `.env` file is in the `frontend/` directory
   - Verify the variable names start with `VITE_`
   - Restart your dev server after adding environment variables

2. **CORS errors**:
   - Make sure your Site URL and Redirect URLs are configured correctly in Supabase
   - For development, use `http://localhost:5173`

3. **Email confirmation issues**:
   - Check your spam folder
   - Verify email confirmations are enabled in Supabase
   - Make sure the Site URL is correct

4. **Invalid credentials**:
   - Double-check your anon key and project URL
   - Make sure there are no extra spaces or characters

### Authentication Flow:

1. **Sign Up**: Creates user in `auth.users` table
2. **Email Confirmation**: User clicks link to confirm email (if enabled)
3. **Sign In**: Authenticates user and creates session
4. **Session Management**: Handled automatically by Supabase
5. **Sign Out**: Clears session and redirects to home

## Next Steps

Once authentication is working:

1. Consider implementing password reset functionality
2. Add social authentication (Google, GitHub, etc.)
3. Set up user profiles database table
4. Implement role-based access control
5. Add email templates customization

## Security Notes

- Never expose your service role key in frontend code
- Always use RLS (Row Level Security) for database tables
- Keep your environment variables secure
- Consider implementing rate limiting for auth endpoints
- Use HTTPS in production