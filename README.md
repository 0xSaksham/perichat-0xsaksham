# Real-Time Chat Application

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase

## Prerequisites

- Node.js 18+
- Supabase Account

## Setup Instructions

1. Clone the repository

```bash
git clone https://your-repo-url.git
cd chat-application
```

2. Install dependencies

```bash
npm install
```

3. Set up Supabase

- Create a new Supabase project
- Copy the project URL and anon key
- Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up database tables

- Run the SQL scripts in `supabase/migrations` to create necessary tables

5. Run the development server

```bash
npm run dev
```

## Database Schema

- `users` table
- `conversations` table
- `messages` table

## Features

- Real-time messaging
- User authentication
- Responsive design

## Deployment

- Netlify

## Contributing

- Fork the repository
- Create a new branch
- Make your changes and commit them
- Push to your fork
- Create a pull request
# perichat-0xsaksham
