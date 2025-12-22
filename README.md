# Cinema Brasileiro

Web application to explore and discover Brazilian movies. Built with React and TypeScript.

## Features

-  User login and registration
-  Brazilian movies catalog (up to 100 movies)
-  Search and filters (genre, year, awards)
-  Infinite scroll to load more movies
-  Details page with complete information
-  Where to watch (links for streaming, rent, buy)
-  Movies by the same director
-  Related movies by genre

## Technologies

- **React 18** + **TypeScript**
- **Redux Toolkit** (state management)
- **React Router** (navigation)
- **Firebase** (authentication)
- **TMDb API** (movie data)
- **Vite** (build tool)

## How to Run

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment variables**

Create a `.env` file in the project root:
```env
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_TMDB_API_KEY=your-tmdb-key
```

3. **Run the project**
```bash
npm run dev
```

4. **Access in browser**
```
http://localhost:5173
```

## Project Structure

```
src/
├── components/     # Reusable components (MovieCard, FilterBar, etc.)
├── pages/         # Application pages (Home, Login, MovieDetail)
├── services/      # API integration (TMDb, Firebase)
├── store/         # State management (Redux)
├── styles/        # CSS files
├── routes/        # Route configuration
└── types/         # TypeScript types
```

## Important Concepts

### Protected Routes
Pages like `/home` and `/movie/:id` can only be accessed by authenticated users. If not logged in, you are redirected to login.

### State Management (Redux)
- **authSlice**: Manages user authentication
- **moviesSlice**: Manages movie list, filters and pagination

### Infinite Scroll
When scrolling to the bottom of the page, more movies are automatically loaded.

### Filters
Filters are applied in real-time to all loaded movies.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Check code with ESLint

## APIs Used

- **TMDb** (The Movie Database): Search movies, details, directors and where to watch
- **Firebase Auth**: User authentication

## Common Issues

**Movies don't load?**
- Check if API keys are configured in `.env`
- Check browser console for errors

**Can't login?**
- Check if Firebase is configured correctly
- Confirm environment variables are correct

## License

Project developed for educational purposes.
