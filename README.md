# 2048 Neon Edition 🎮✨

<div align="center">

![2048 Neon Edition](https://img.shields.io/badge/2048-Neon%20Edition-00f3ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A stunning, production-ready implementation of the classic 2048 puzzle game with a cyberpunk neon aesthetic.**

[Demo](#demo) • [Features](#features) • [Installation](#installation) • [Usage](#usage) • [Documentation](#documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Customization](#customization)
- [Performance](#performance)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## 🎯 Overview

**2048 Neon Edition** is a modern, React-based reimagining of Gabriele Cirulli's popular 2048 puzzle game. This implementation features a sleek cyberpunk aesthetic with neon glow effects, smooth animations, and professional-grade code architecture. Built with performance and user experience as top priorities, it delivers a polished gaming experience across all devices.

### Why This Implementation?

- **Production-Ready Code**: Clean, maintainable architecture with proper React patterns
- **Visual Excellence**: Stunning neon design with carefully crafted animations
- **Cross-Platform**: Seamless experience on desktop, tablet, and mobile
- **Performance Optimized**: Efficient rendering with minimal re-renders
- **Fully Responsive**: Adaptive layout that works on any screen size
- **Accessibility**: Keyboard and touch controls for all users

---

## 🎬 Demo

### Desktop Experience
- Smooth keyboard controls (Arrow keys + WASD)
- Responsive grid with precise tile positioning
- Fluid animations and neon glow effects

### Mobile Experience
- Intuitive swipe gestures
- Touch-optimized interface
- Optimized for various screen sizes

---

## ✨ Features

### 🎨 Visual Design
- **Cyberpunk Neon Aesthetic** - Eye-catching color palette with 11 unique tile colors
- **Dynamic Glow Effects** - Real-time box-shadow animations for depth
- **Smooth Transitions** - 150ms CSS transitions for buttery-smooth tile movements
- **Victory Animation** - Pulsing glow effect for the winning 2048 tile
- **Dark Theme** - Easy on the eyes with a sleek black background

### 🎮 Game Mechanics
- **Classic 2048 Gameplay** - Authentic game rules and tile merging logic
- **Smart Tile Spawning** - 90% chance for '2', 10% chance for '4'
- **Continue After Win** - Keep playing after reaching 2048
- **Game State Persistence** - Best score saved to localStorage
- **Instant Restart** - Quick "New Game" button for replay

### 🖱️ Controls
- **Keyboard Support** - Arrow keys and WASD for movement
- **Touch Gestures** - Swipe in any direction on mobile/tablet
- **Responsive Threshold** - 40px swipe detection for accuracy
- **Button Controls** - Click "New Game" to restart anytime

### 📱 Responsive Design
- **Adaptive Layout** - Scales perfectly from 320px to 4K displays
- **Dynamic Tile Sizing** - JavaScript-calculated dimensions for precision
- **Mobile Optimized** - Adjusted font sizes and spacing for small screens
- **Viewport Locked** - Prevents unwanted zooming on mobile

### ⚡ Performance
- **Minimal Re-renders** - Smart state management with React hooks
- **Event Cleanup** - Proper listener removal to prevent memory leaks
- **CSS Animations** - Hardware-accelerated transforms
- **Efficient Algorithms** - Optimized grid transformation logic

---

## 🛠️ Tech Stack

### Core Technologies
- **[React 18.3.1](https://react.dev/)** - Modern UI library with hooks
- **[Vite 6.0](https://vitejs.dev/)** - Lightning-fast build tool
- **Vanilla CSS3** - Custom styles with CSS variables
- **ES6+ JavaScript** - Modern syntax with classes and modules

### Development Tools
- **ESLint** - Code quality and consistency
- **Vite Plugin React** - Fast Refresh and JSX support
- **LocalStorage API** - Client-side data persistence

### Browser APIs Used
- Keyboard Events API
- Touch Events API
- LocalStorage API
- ResizeObserver (implicit via window.resize)

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 or **yarn** >= 1.22.0

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/2048-neon-react.git
cd 2048-neon-react
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### Step 3: Start Development Server

Using npm:
```bash
npm run dev
```

Using yarn:
```bash
yarn dev
```

The game will open automatically at `http://localhost:3000`

---

## 🚀 Usage

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

- Changes to source files will reflect immediately
- Vite provides instant feedback in the browser
- Console warnings and errors are displayed

### Production Build

Create an optimized production build:

```bash
npm run build
```

Build artifacts will be generated in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality and style:

```bash
npm run lint
```

---

## 🎲 Game Rules

### Objective
Combine numbered tiles to create a tile with the value **2048**.

### How to Play

1. **Movement**: Use arrow keys (or WASD) to slide all tiles in one direction
2. **Merging**: When two tiles with the same number touch, they merge into one
3. **Scoring**: Each merge adds the new tile's value to your score
4. **New Tiles**: After each move, a new tile (2 or 4) appears randomly
5. **Win**: Reach the 2048 tile to win (you can continue playing after)
6. **Lose**: Game ends when the grid is full and no moves are possible

### Controls

| Action | Desktop | Mobile |
|--------|---------|--------|
| Move Up | `↑` or `W` | Swipe Up |
| Move Down | `↓` or `S` | Swipe Down |
| Move Left | `←` or `A` | Swipe Left |
| Move Right | `→` or `D` | Swipe Right |
| New Game | Click Button | Tap Button |

### Scoring

- Each tile merge adds the **new tile's value** to your score
- Example: Merging 2 + 2 = 4 adds **4 points**
- Your **best score** is automatically saved locally

---

## 📁 Project Structure

```
2048-neon-react/
│
├── public/                 # Static assets
│   └── vite.svg           # Vite logo
│
├── src/                   # Source files
│   ├── App.jsx           # Main game component
│   ├── App.css           # Game-specific styles
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles and fonts
│
├── index.html            # HTML template
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

### Key Files Explained

#### `src/App.jsx`
The main game component containing:
- React state management with hooks
- Game2048 class with all game logic
- Event listeners for keyboard and touch
- UI rendering with dynamic tiles

#### `src/App.css`
Complete styling including:
- CSS custom properties for theming
- Neon color palette definitions
- Tile-specific styles (2, 4, 8...2048)
- Animations (pop, merge, pulse-glow)
- Responsive breakpoints

#### `src/main.jsx`
React application entry point:
- ReactDOM initialization
- Root component mounting
- StrictMode wrapper for development

#### `vite.config.js`
Build configuration:
- React plugin setup
- Development server settings
- Build optimization options

---

## 🏗️ Architecture

### Component Design

```
App (Functional Component)
│
├── State Management (useState)
│   ├── score
│   ├── bestScore
│   ├── gameOver
│   ├── gameWon
│   ├── tiles (array)
│   └── showMessage
│
├── Refs (useRef)
│   ├── gameRef (Game2048 instance)
│   ├── tileContainerRef (DOM element)
│   └── gameContainerRef (DOM element)
│
├── Effects (useEffect)
│   ├── Initialize best score
│   └── Initialize Game2048 class
│
└── Game2048 Class
    ├── Grid Management
    ├── Tile Logic
    ├── Movement Processing
    ├── Score Calculation
    └── State Updates
```

### Data Flow

1. **User Input** → Event Listener
2. **Event Listener** → Game2048 Class Method
3. **Game Logic** → Grid Transformation
4. **Grid Update** → State Update Callback
5. **State Update** → React Re-render
6. **React Re-render** → DOM Update

### State Management Pattern

```javascript
// Game class updates React state via callback
this.updateState = (updates) => {
  if (updates.score !== undefined) setScore(updates.score);
  if (updates.tiles !== undefined) setTiles(updates.tiles);
  // ... more updates
};

// React renders based on state
{tiles.map(tile => (
  <div className="tile" style={{...}}>
    {tile.value}
  </div>
))}
```

### Event Handling

- **Keyboard Events**: Captured at document level
- **Touch Events**: Attached to game container
- **Resize Events**: Window-level listener
- **Cleanup**: All listeners removed on unmount

---

## 🎨 Customization

### Changing Colors

Edit CSS variables in `src/App.css`:

```css
:root {
  /* Background Colors */
  --bg-body: #050505;        /* Main background */
  --bg-game: #000000;        /* Game container */
  --bg-cell: #111111;        /* Empty cells */
  
  /* Neon Palette */
  --neon-blue: #00f3ff;      /* Tile 2 */
  --neon-pink: #bc13fe;      /* Tile 4 */
  --neon-green: #0aff00;     /* Tile 8 */
  --neon-yellow: #fff700;    /* Tile 16 */
  --neon-orange: #ff8c00;    /* Tile 32 */
  --neon-red: #ff003c;       /* Tile 64 */
  --neon-purple: #9d00ff;    /* Tile 128 */
}
```

### Adjusting Game Settings

Modify constants in `src/App.jsx`:

```javascript
class Game2048 {
  constructor(updateState) {
    this.GRID_SIZE = 4;              // Grid dimensions (4x4)
    this.TILE_SPAWN_CHANCE_4 = 0.1;  // 10% chance for '4' tile
    this.WIN_TILE = 2048;            // Winning tile value
  }
}
```

### Custom Grid Sizes

To change grid size to 5x5:

1. Update `GRID_SIZE` in App.jsx:
```javascript
this.GRID_SIZE = 5;
```

2. Update CSS grid in App.css:
```css
.grid {
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}
```

3. Update cell count in App.jsx:
```javascript
{Array(25).fill(0).map((_, i) => (
  <div key={i} className="cell"></div>
))}
```

### Animation Timing

Adjust animation speeds in `src/App.css`:

```css
.tile {
  transition: all 0.15s ease-in-out;  /* Movement speed */
}

@keyframes pop {
  /* ... */
}  /* 0.25s total - new tile appearance */

@keyframes merge-pop {
  /* ... */
}  /* 0.2s total - merge animation */
```

### Font Changes

Replace Poppins font in `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;600;700&display=swap');

body {
  font-family: 'Your Font', sans-serif;
}
```

---

## 🌐 Browser Support

### Desktop Browsers

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |

### Mobile Browsers

| Browser | Version | Status |
|---------|---------|--------|
| iOS Safari | 14+ | ✅ Fully Supported |
| Chrome Mobile | 90+ | ✅ Fully Supported |
| Firefox Mobile | 88+ | ✅ Fully Supported |
| Samsung Internet | 14+ | ✅ Fully Supported |

### Required Features

- CSS Grid Layout
- CSS Custom Properties (Variables)
- ES6+ JavaScript (Classes, Arrow Functions)
- Touch Events API
- LocalStorage API

---

## 📝 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 2048 Neon Edition

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

See [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### Original Game
- **Gabriele Cirulli** - Creator of the original 2048 game
- **Veewo Studio** - Creator of 1024 (inspiration for 2048)
- **Threes** - Original concept by Asher Vollmer

### Technologies
- **React Team** - For the amazing React library
- **Vite Team** - For the blazing-fast build tool
- **Google Fonts** - For the Poppins font family

---

<div align="center">

**Made with ❤️ and ⚡ by the 2048 Neon Team**

[⬆ Back to Top](#2048-neon-edition-)

</div>