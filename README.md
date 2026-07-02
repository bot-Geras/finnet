
# FinnetTrust - User Dashboard & Post Manager

A modern full-stack web application featuring an excellent UI/UX and well-architected backend.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure Overview](#project-structure-overview)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Seed Data](#seed-data)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Design Decisions & Trade-offs](#design-decisions--trade-offs)
- [Future Improvements](#future-improvements)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **CORS** - Cross-origin resource sharing
- **tsx** - TypeScript execution and watch mode

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **TanStack React Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

## Features

### Core Features
1. User management (view all users, select a user)
2. Post management (view user posts, create new posts)
3. Fully responsive design (mobile, tablet, desktop)
4. WCAG 2.1 AA accessible

### UI/UX Enhancements
1. Dark/light mode toggle with smooth transitions
2. Loading skeletons for better UX
3. Error handling with retry options
4. Success notifications for post creation
5. User initial avatars
6. Smooth hover effects and transitions

## Project Structure Overview

```
finnet/
├── finnet-backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── data/            # JSON file storage (users & posts)
│   │   ├── middleware/      # CORS, error handling, validation
│   │   ├── routes/          # API endpoint definitions
│   │   ├── scripts/         # Seed script for dummy data
│   │   ├── services/        # Business logic layer
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # File storage utility
│   │   └── index.ts         # Server entry point
│   └── package.json
└── finnet-frontend/
    ├── src/
    │   ├── api/             # API client functions
    │   ├── components/      # React components
    │   ├── hooks/           # Custom React Query hooks
    │   ├── types/           # TypeScript type definitions
    │   ├── App.tsx          # Main app component
    │   └── main.tsx         # App entry point
    └── package.json
```

## Prerequisites

- **Node.js** (v18 or later)
- **npm** (v9 or later)
- A modern web browser

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd finnet-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the backend server (in development mode with tsx watch):
   ```bash
   npm run dev
   ```

   The backend will be available at: `http://localhost:3000`

   - Health check: `http://localhost:3000/health`
   - Users API: `http://localhost:3000/api/users`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd finnet-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend dev server:
   ```bash
   npm run dev
   ```

   The frontend will be available at: `http://localhost:5173`

## Seed Data

The project includes a seed script that generates dummy users and posts. The seed data is already included in `finnet-backend/src/data/`.

To regenerate seed data (optional):

1. Navigate to the backend directory
2. Run the seed script:
   ```bash
   npm run seed
   ```

This will populate:
- 5 users with realistic names, emails, and company information
- 15 posts (3 per user) with varied titles and content

## Design Decisions & Trade-offs

### Backend Architecture

1. **MVC Pattern**: Separated concerns with controllers (request handling), services (business logic), and routes (endpoint definitions)
2. **File Storage**: Used JSON files for data persistence instead of a database for simplicity and rapid prototyping
3. **TypeScript**: Full type safety across the backend
4. **CORS**: Configured to allow all origins for development purposes (would restrict to specific origin in production)

### Frontend Architecture

1. **React 19**: Leveraged the latest React features
2. **TanStack React Query**:
   - Simplified data fetching and caching
   - Automatic loading/error state management
   - Background updates
3. **Tailwind CSS**: Rapid UI development with utility-first CSS
4. **Dark Mode Support**: Built-in dark/light mode toggle with smooth transitions
5. **Accessibility**:
   - Semantic HTML tags
   - ARIA labels for interactive elements
   - Focus indicators
   - WCAG 2.1 AA compliant color contrasts

### Trade-offs

1. **File Storage vs Database**: File storage was chosen for simplicity, but would switch to PostgreSQL/MongoDB for production
2. **No Authentication**: Current implementation doesn't include auth; would add JWT-based auth in production
3. **Basic Form Validation**: Frontend uses built-in HTML validation; would add more robust validation (Zod/Yup) in production
## API Endpoints

### Health Check
- `GET /health` - Check if server is running

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get user by ID

### Posts
- `GET /api/users/:userId/posts` - Get all posts by a user
- `POST /api/users/:userId/posts` - Create a new post (requires title and body)

## Screenshots

[Add screenshots here later]

## Future Improvements

1. **Authentication**: Add JWT-based authentication
2. **Database**: Replace JSON files with PostgreSQL or MongoDB
3. **Post Interactions**: Add like, comment, and delete post functionality
4. **User Profiles**: Add user profile pages and editing
5. **Pagination**: Add pagination for large number of posts
6. **Form Validation**: Add Zod or Yup for robust form validation
7. **Persistent Dark Mode**: Use localStorage to remember dark mode preference
8. **Search & Filtering**: Add search and filter options for users and posts
9. **Image Uploads**: Allow users to upload images for posts and avatars
10. **Unit Tests**: Add comprehensive test coverage

## Troubleshooting

### Common Issues

1. **Port already in use**:
   - If port 3000 or 5173 is in use, kill the existing process or change the port in the respective config files

2. **CORS errors**:
   - Ensure the backend CORS middleware is properly configured
   - Verify the frontend is running on the expected origin

3. **Dependencies not installing**:
   - Try deleting `node_modules` and `package-lock.json` then run `npm install` again
   - Clear npm cache with `npm cache clean --force` if needed

4. **Seed data not generating**:
   - Ensure the backend directory has write permissions
   - Check if `src/data/` directory exists

## License

MIT License - Feel free to use this project for learning and interview purposes!
