# Movie & Music Explorer 🎬🎵

A responsive Vue.js application to explore movies and discover their soundtracks using TMDB and Deezer APIs.

## 🌟 Features

- **Movie Search**: Explore popular movies and search by specific titles
- **Music Search**: Find tracks, artists and albums
- **Soundtracks**: Discover movie soundtracks automatically
- **Responsive Design**: Interface optimized for desktop, tablet and mobile
- **Music Preview**: Play preview tracks from Deezer
- **Rich Details**: Complete movie information including cast, genres and ratings

## 🚀 Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd movie-music-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Configure API keys:

Edit the `src/services/api.js` file and replace the following variables with your keys:

```javascript
// TMDB API Configuration
const TMDB_API_KEY = "YOUR_TMDB_API_KEY_HERE";

// Deezer API via RapidAPI Configuration
const RAPIDAPI_KEY = "YOUR_RAPIDAPI_KEY_HERE";
```

### Getting API Keys

#### TMDB API

1. Visit [TMDB](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings > API
4. Request a free API key

#### Deezer API (via RapidAPI)

1. Visit [RapidAPI](https://rapidapi.com/)
2. Create a free account
3. Subscribe to [Deezer API](https://rapidapi.com/deezerdevs/api/deezer-1/)
4. Copy your X-RapidAPI-Key

## 🏃‍♂️ Running the Project

### Development Mode

```bash
npm run dev
```

Access `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── SearchBar.vue      # Search bar with type selection
│   ├── MovieCard.vue      # Movie card component
│   ├── MusicCard.vue      # Music card component
│   ├── MovieModal.vue     # Movie details modal
│   └── LoadingSpinner.vue # Loading indicator
├── services/
│   └── api.js            # API configuration and functions
├── App.vue               # Main component
├── main.js              # Entry point
└── style.css            # Global styles
```

## 🎨 Interface Features

### Responsive Design

- **Desktop**: Grid layout with multiple columns
- **Tablet**: Adapted layout with fewer columns
- **Mobile**: Single column layout optimized for touch

### Functionality

- **Smart Search**: Toggle between movie and music search
- **Interactive Cards**: Hover effects and smooth animations
- **Details Modal**: Complete movie details view
- **Music Player**: Track previews directly in the interface
- **Graceful Loading**: Loading indicators and empty states

## 🛠️ Technologies Used

- **Vue.js 3**: Main framework
- **Vite**: Build tool and dev server
- **Axios**: HTTP client for API calls
- **CSS3**: Responsive styles with Flexbox and Grid
- **TMDB API**: Movie data
- **Deezer API**: Music data

## 📱 Responsiveness

The app is fully responsive and works well on:

- Desktops (1200px+)
- Tablets (768px - 1199px)
- Smartphones (up to 767px)

## 🎵 Music Features

- Search tracks by title, artist or album
- Music preview (when available)
- Artist and album information
- Direct link to Deezer
- Automatic soundtrack search based on movie title

## 🎬 Movie Features

- Popular movies on homepage
- Search by movie title
- Complete details including:
  - Poster and basic information
  - Full synopsis
  - Rating and duration
  - Genres
  - Related soundtrack

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See our [Contributing Guidelines](.github/CONTRIBUTING.md) for more details.

## 🚀 CI/CD and Deployment

This project uses GitHub Actions for automated testing and deployment:

- **Continuous Integration**: Automated testing on Node.js 18.x and 20.x
- **Security Auditing**: Weekly dependency vulnerability scans
- **Automated Deployment**: Deploy to GitHub Pages on main branch
- **Release Management**: Automated releases with changelog generation

For setup instructions, see [GitHub Actions Setup Guide](GITHUB_ACTIONS_SETUP.md).

### Status Badges

![CI/CD Pipeline](https://github.com/amonroca/movie-music-explorer/workflows/CI/CD%20Pipeline/badge.svg)
![Security Audit](https://github.com/amonroca/movie-music-explorer/workflows/Dependency%20Updates/badge.svg)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the movie API
- [Deezer](https://www.deezer.com/) for the music API
- [Vue.js](https://vuejs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool
