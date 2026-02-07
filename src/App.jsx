import { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [messageTitle, setMessageTitle] = useState('Game Over');
  const [showMessage, setShowMessage] = useState(false);
  const [tiles, setTiles] = useState([]);

  const gameRef = useRef(null);
  const tileContainerRef = useRef(null);
  const gameContainerRef = useRef(null);

  // Initialize best score from localStorage
  useEffect(() => {
    const saved = parseInt(localStorage.getItem('2048-neon-best')) || 0;
    setBestScore(saved);
  }, []);

  // Game class
  useEffect(() => {
    class Game2048 {
      constructor(updateState) {
        this.GRID_SIZE = 4;
        this.TILE_SPAWN_CHANCE_4 = 0.1;
        this.WIN_TILE = 2048;

        this.grid = [];
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('2048-neon-best')) || 0;
        this.gameWon = false;
        this.gameOver = false;
        this.tileStates = {};

        this.updateState = updateState;
        this.tileSize = 0;
        this.gap = 15;

        this.init();
      }

      init() {
        this.updateTileDimensions();
        this.restart();
        this.setupEventListeners();
      }

      updateTileDimensions() {
        if (!tileContainerRef.current) return;
        const rect = tileContainerRef.current.getBoundingClientRect();
        this.tileSize = (Math.min(rect.width, rect.height) - (3 * this.gap)) / 4;
      }

      setupEventListeners() {
        const handleKeyDown = (e) => {
          if (this.gameOver) return;

          const keyMap = {
            ArrowUp: 'up',
            ArrowDown: 'down',
            ArrowLeft: 'left',
            ArrowRight: 'right',
            w: 'up', a: 'left', s: 'down', d: 'right',
            W: 'up', A: 'left', S: 'down', D: 'right'
          };

          if (keyMap[e.key]) {
            const moved = this.move(keyMap[e.key]);
            if (moved) e.preventDefault();
          }
        };

        const handleResize = () => {
          this.updateTileDimensions();
          this.renderTiles();
        };

        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', handleResize);

        // Touch controls
        this.setupTouchControls();

        // Store cleanup function
        this.cleanup = () => {
          document.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('resize', handleResize);
        };
      }

      setupTouchControls() {
        if (!gameContainerRef.current) return;

        let touchStartX = 0;
        let touchStartY = 0;
        const threshold = 40;

        const handleTouchStart = (e) => {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
          if (!touchStartX || !touchStartY) return;

          const dx = e.changedTouches[0].clientX - touchStartX;
          const dy = e.changedTouches[0].clientY - touchStartY;

          if (Math.max(Math.abs(dx), Math.abs(dy)) > threshold) {
            if (Math.abs(dx) > Math.abs(dy)) {
              this.move(dx > 0 ? 'right' : 'left');
            } else {
              this.move(dy > 0 ? 'down' : 'up');
            }
          }

          touchStartX = 0;
          touchStartY = 0;
        };

        gameContainerRef.current.addEventListener('touchstart', handleTouchStart, { passive: true });
        gameContainerRef.current.addEventListener('touchend', handleTouchEnd, { passive: true });
      }

      restart() {
        this.grid = Array(this.GRID_SIZE).fill(null).map(() => 
          Array(this.GRID_SIZE).fill(0)
        );
        this.score = 0;
        this.gameWon = false;
        this.gameOver = false;
        this.tileStates = {};

        this.addRandomTile(true);
        this.addRandomTile(true);

        this.updateDisplay();
        this.updateState({
          score: 0,
          gameOver: false,
          gameWon: false,
          showMessage: false
        });
      }

      addRandomTile(isInitial = false) {
        const emptyCells = [];
        for (let r = 0; r < this.GRID_SIZE; r++) {
          for (let c = 0; c < this.GRID_SIZE; c++) {
            if (this.grid[r][c] === 0) {
              emptyCells.push({ r, c });
            }
          }
        }

        if (emptyCells.length === 0) return null;

        const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const value = Math.random() < this.TILE_SPAWN_CHANCE_4 ? 4 : 2;
        this.grid[r][c] = value;
        this.tileStates[`${r}-${c}`] = { 
          value, 
          isNew: !isInitial, 
          isMerged: false 
        };

        return { r, c, value };
      }

      move(direction) {
        if (this.gameOver) return false;

        const gridBefore = JSON.stringify(this.grid);

        // Clear animation states
        Object.values(this.tileStates).forEach(state => {
          state.isNew = false;
          state.isMerged = false;
        });

        const result = this.processMove(direction);

        if (JSON.stringify(this.grid) !== gridBefore) {
          this.score += result.scoreDelta;

          if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('2048-neon-best', this.bestScore.toString());
            this.updateState({ bestScore: this.bestScore });
          }

          // Mark merged cells
          Object.keys(result.mergedCells).forEach(key => {
            if (this.tileStates[key]) {
              this.tileStates[key].isMerged = true;
            }
          });

          this.addRandomTile(false);
          this.updateDisplay();

          // Check win/lose conditions
          if (!this.gameWon && this.hasWinningTile()) {
            this.gameWon = true;
            setTimeout(() => this.endGame(true), 300);
          } else if (this.checkGameOver()) {
            this.gameOver = true;
            setTimeout(() => this.endGame(false), 300);
          }

          return true;
        }

        return false;
      }

      processMove(direction) {
        let scoreDelta = 0;
        let mergedCells = {};

        const processLine = (line) => {
          const filtered = line.filter(v => v !== 0);
          const result = [];
          const mergedIndices = [];
          let score = 0;

          for (let i = 0; i < filtered.length; i++) {
            if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
              const value = filtered[i] * 2;
              result.push(value);
              mergedIndices.push(result.length - 1);
              score += value;
              i++;
            } else {
              result.push(filtered[i]);
            }
          }

          while (result.length < this.GRID_SIZE) {
            result.push(0);
          }

          return { line: result, score, merged: mergedIndices };
        };

        if (direction === 'left') {
          for (let r = 0; r < this.GRID_SIZE; r++) {
            const result = processLine(this.grid[r]);
            this.grid[r] = result.line;
            scoreDelta += result.score;
            result.merged.forEach(c => {
              mergedCells[`${r}-${c}`] = true;
            });
          }
        } else if (direction === 'right') {
          for (let r = 0; r < this.GRID_SIZE; r++) {
            const reversed = [...this.grid[r]].reverse();
            const result = processLine(reversed);
            this.grid[r] = result.line.reverse();
            scoreDelta += result.score;
            result.merged.forEach(c => {
              mergedCells[`${r}-${3 - c}`] = true;
            });
          }
        } else if (direction === 'up') {
          for (let c = 0; c < this.GRID_SIZE; c++) {
            const column = this.grid.map(row => row[c]);
            const result = processLine(column);
            for (let r = 0; r < this.GRID_SIZE; r++) {
              this.grid[r][c] = result.line[r];
            }
            scoreDelta += result.score;
            result.merged.forEach(r => {
              mergedCells[`${r}-${c}`] = true;
            });
          }
        } else if (direction === 'down') {
          for (let c = 0; c < this.GRID_SIZE; c++) {
            const column = this.grid.map(row => row[c]).reverse();
            const result = processLine(column);
            const processed = result.line.reverse();
            for (let r = 0; r < this.GRID_SIZE; r++) {
              this.grid[r][c] = processed[r];
            }
            scoreDelta += result.score;
            result.merged.forEach(r => {
              mergedCells[`${3 - r}-${c}`] = true;
            });
          }
        }

        return { scoreDelta, mergedCells };
      }

      checkGameOver() {
        // Check for empty cells
        for (let r = 0; r < this.GRID_SIZE; r++) {
          for (let c = 0; c < this.GRID_SIZE; c++) {
            if (this.grid[r][c] === 0) return false;
          }
        }

        // Check for possible merges
        for (let r = 0; r < this.GRID_SIZE; r++) {
          for (let c = 0; c < this.GRID_SIZE; c++) {
            const current = this.grid[r][c];
            if (c < this.GRID_SIZE - 1 && current === this.grid[r][c + 1]) {
              return false;
            }
            if (r < this.GRID_SIZE - 1 && current === this.grid[r + 1][c]) {
              return false;
            }
          }
        }

        return true;
      }

      hasWinningTile() {
        return this.grid.flat().includes(this.WIN_TILE);
      }

      updateDisplay() {
        this.updateState({ score: this.score });
        this.renderTiles();
      }

      renderTiles() {
        const tilesData = [];

        for (let r = 0; r < this.GRID_SIZE; r++) {
          for (let c = 0; c < this.GRID_SIZE; c++) {
            const value = this.grid[r][c];
            if (value !== 0) {
              const key = `${r}-${c}`;
              const state = this.tileStates[key] || { 
                value, 
                isNew: false, 
                isMerged: false 
              };

              tilesData.push({
                id: `${r}-${c}-${value}`,
                value,
                row: r,
                col: c,
                isNew: state.isNew,
                isMerged: state.isMerged,
                left: c * (this.tileSize + this.gap),
                top: r * (this.tileSize + this.gap),
                size: this.tileSize
              });
            }
          }
        }

        this.updateState({ tiles: tilesData });
      }

      endGame(isWin) {
        this.gameOver = !isWin;
        this.updateState({
          gameOver: !isWin,
          gameWon: isWin,
          showMessage: true,
          messageTitle: isWin ? 'You Win!' : 'Game Over'
        });
      }
    }

    // Update state callback
    const updateState = (updates) => {
      if (updates.score !== undefined) setScore(updates.score);
      if (updates.bestScore !== undefined) setBestScore(updates.bestScore);
      if (updates.gameOver !== undefined) setGameOver(updates.gameOver);
      if (updates.gameWon !== undefined) setGameWon(updates.gameWon);
      if (updates.showMessage !== undefined) setShowMessage(updates.showMessage);
      if (updates.messageTitle !== undefined) setMessageTitle(updates.messageTitle);
      if (updates.tiles !== undefined) setTiles(updates.tiles);
    };

    const game = new Game2048(updateState);
    gameRef.current = game;

    return () => {
      if (game.cleanup) game.cleanup();
    };
  }, []);

  const handleNewGame = useCallback(() => {
    if (gameRef.current) {
      gameRef.current.restart();
    }
  }, []);

  const handleContinue = useCallback(() => {
    setShowMessage(false);
    setGameWon(false);
    if (gameRef.current) {
      gameRef.current.gameWon = false;
      gameRef.current.gameOver = false;
    }
  }, []);

  const handleTryAgain = useCallback(() => {
    if (gameRef.current) {
      gameRef.current.restart();
    }
  }, []);

  return (
    <div className="container-wrapper">
      <div className="header-container">
        <div className="top-row">
          <div className="brand">
            <h1>2048</h1>
            <div className="subtitle">Neon</div>
          </div>

          <div className="actions-row">
            <div className="score-box">
              <div className="score-label">Score</div>
              <div className="score-value">{score}</div>
            </div>
            <div className="score-box">
              <div className="score-label">Best</div>
              <div className="score-value">{bestScore}</div>
            </div>
            <button className="btn" onClick={handleNewGame}>
              New Game
            </button>
          </div>
        </div>

        <div className="instructions">
          Use <strong>Arrow Keys</strong> or <strong>Swipe</strong> to join tiles
        </div>
      </div>

      <div className="game-container" ref={gameContainerRef}>
        <div className="grid">
          {Array(16).fill(0).map((_, i) => (
            <div key={i} className="cell"></div>
          ))}
        </div>

        <div className="tile-container" ref={tileContainerRef}>
          {tiles.map(tile => (
            <div
              key={tile.id}
              className={`tile tile-${tile.value > 2048 ? 'super' : tile.value}${
                tile.isNew ? ' tile-new' : ''
              }${tile.isMerged ? ' tile-merged' : ''}`}
              style={{
                width: `${tile.size}px`,
                height: `${tile.size}px`,
                left: `${tile.left}px`,
                top: `${tile.top}px`
              }}
            >
              {tile.value}
            </div>
          ))}
        </div>

        <div className={`game-overlay${showMessage ? ' visible' : ''}`}>
          <h2>{messageTitle}</h2>
          <p>Score: <span>{score}</span></p>
          <button 
            className="btn" 
            onClick={gameWon ? handleContinue : handleTryAgain}
          >
            {gameWon ? 'Keep Playing' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  );
}