"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import "./Tic.css"

type Player = "X" | "O" | null
type Board = Player[]
type Difficulty = "easy" | "medium" | "hard"
type GameState = "playing" | "won" | "lost" | "draw"

export default function NeonTicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [scores, setScores] = useState({ wins: 0, losses: 0, draws: 0 })
  const [gameState, setGameState] = useState<GameState>("playing")
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [winningLine, setWinningLine] = useState<number[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [showDefeat, setShowDefeat] = useState(false)

  const checkWinner = (board: Board): { winner: Player | "draw" | null; line: number[] } => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ]

    for (const line of lines) {
      const [a, b, c] = line
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line }
      }
    }

    return {
      winner: board.every((cell) => cell !== null) ? "draw" : null,
      line: [],
    }
  }

  const getAvailableMoves = (board: Board): number[] => {
    return board.map((cell, index) => (cell === null ? index : -1)).filter((index) => index !== -1)
  }

  const minimax = (
    board: Board,
    depth: number,
    isMaximizing: boolean,
    alpha = Number.NEGATIVE_INFINITY,
    beta: number = Number.POSITIVE_INFINITY,
  ): number => {
    const { winner } = checkWinner(board)

    if (winner === "O") return 10 - depth
    if (winner === "X") return depth - 10
    if (winner === "draw") return 0

    const availableMoves = getAvailableMoves(board)

    if (isMaximizing) {
      let maxEval = Number.NEGATIVE_INFINITY
      for (const move of availableMoves) {
        board[move] = "O"
        const moveValue = minimax(board, depth + 1, false, alpha, beta)
        board[move] = null
        maxEval = Math.max(maxEval, moveValue)
        alpha = Math.max(alpha, moveValue)
        if (beta <= alpha) break
      }
      return maxEval
    } else {
      let minEval = Number.POSITIVE_INFINITY
      for (const move of availableMoves) {
        board[move] = "X"
        const moveValue = minimax(board, depth + 1, true, alpha, beta)
        board[move] = null

        if (moveValue < minEval) {
          minEval = moveValue
        }
      }
      return minEval
    }
  }

  const getAiMove = (board: Board, difficulty: Difficulty): number => {
    const availableMoves = getAvailableMoves(board)

    if (difficulty === "easy") {
      // 70% random, 30% optimal
      if (Math.random() < 0.7) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)]
      }
    } else if (difficulty === "medium") {
      // 30% random, 70% optimal
      if (Math.random() < 0.3) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)]
      }
    }

    // Hard difficulty or optimal move for medium/easy
    let bestMove = availableMoves[0]
    let bestValue = Number.NEGATIVE_INFINITY

    for (const move of availableMoves) {
      board[move] = "O"
      const moveValue = minimax(board, 0, false)
      board[move] = null

      if (moveValue > bestValue) {
        bestValue = moveValue
        bestMove = move
      }
    }

    return bestMove
  }

  const handleCellClick = async (index: number) => {
    if (board[index] || gameState !== "playing" || currentPlayer === "O") return

    const newBoard = [...board]
    newBoard[index] = "X"
    setBoard(newBoard)

    const { winner, line } = checkWinner(newBoard)
    if (winner) {
      setWinningLine(line)
      if (winner === "X") {
        setGameState("won")
        setScores((prev) => ({ ...prev, wins: prev.wins + 1 }))
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 3000)
      } else if (winner === "draw") {
        setGameState("draw")
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
      }
      return
    }

    setCurrentPlayer("O")
    setIsAiThinking(true)

    // AI move with delay for better UX
    setTimeout(
      () => {
        const aiMove = getAiMove(newBoard, difficulty)
        newBoard[aiMove] = "O"
        setBoard([...newBoard])
        setIsAiThinking(false)

        const { winner: aiWinner, line: aiLine } = checkWinner(newBoard)
        if (aiWinner) {
          setWinningLine(aiLine)
          if (aiWinner === "O") {
            setGameState("lost")
            setScores((prev) => ({ ...prev, losses: prev.losses + 1 }))
            setShowDefeat(true)
            setTimeout(() => setShowDefeat(false), 3000)
          } else if (aiWinner === "draw") {
            setGameState("draw")
            setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
          }
        } else {
          setCurrentPlayer("X")
        }
      },
      500 + Math.random() * 1000,
    ) // Random delay for more natural feel
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setGameState("playing")
    setWinningLine([])
    setShowCelebration(false)
    setShowDefeat(false)
  }

  const resetScores = () => {
    setScores({ wins: 0, losses: 0, draws: 0 })
  }

  // Fixed color particles matching About component theme
  const fixedParticles = [
    { left: "10%", top: "15%", gradient: "linear-gradient(45deg, #a855f7, #ec4899)" },
    { left: "20%", top: "70%", gradient: "linear-gradient(45deg, #3b82f6, #a855f7)" },
    { left: "30%", top: "40%", gradient: "linear-gradient(45deg, #ec4899, #f59e0b)" },
    { left: "40%", top: "80%", gradient: "linear-gradient(45deg, #8b5cf6, #10b981)" },
    { left: "50%", top: "20%", gradient: "linear-gradient(45deg, #10b981, #3b82f6)" },
    { left: "60%", top: "60%", gradient: "linear-gradient(45deg, #a855f7, #ec4899)" },
    { left: "70%", top: "35%", gradient: "linear-gradient(45deg, #3b82f6, #a855f7)" },
    { left: "80%", top: "75%", gradient: "linear-gradient(45deg, #ec4899, #f59e0b)" },
    { left: "90%", top: "25%", gradient: "linear-gradient(45deg, #8b5cf6, #10b981)" },
    { left: "15%", top: "50%", gradient: "linear-gradient(45deg, #10b981, #3b82f6)" },
  ]

  return (
    <div className="ticTacToeContainer theme-transition relative">
      {/* Celebration/Defeat Overlay */}
      {showCelebration && (
        <div className="ticTacToeOverlay celebrationOverlay">
          <div className="ticTacToeOverlayContent celebrationMode">
            <div className="text-6xl md:text-8xl mb-4">🎉</div>
            <h2 className="ticTacToeOverlayTitle winTitle">YOU WIN!</h2>
            <div className="ticTacToeOverlaySubtitle winSubtitle">Congratulations! 🏆</div>
          </div>
        </div>
      )}

      {showDefeat && (
        <div className="ticTacToeOverlay defeatOverlay">
          <div className="ticTacToeOverlayContent defeatMode">
            <div className="text-6xl md:text-8xl mb-4">😔</div>
            <h2 className="ticTacToeOverlayTitle loseTitle">YOU LOSE!</h2>
            <div className="ticTacToeOverlaySubtitle loseSubtitle">Better luck next time! 💪</div>
          </div>
        </div>
      )}

      {/* Fixed Color Floating Particles */}
      <div className="ticTacToeParticles">
        {fixedParticles.map((p, i) => (
          <div
            key={i}
            className="ticTacToeParticle"
            style={{
              left: p.left,
              top: p.top,
              background: p.gradient,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="ticTacToeContent">
        {/* Difficulty Selection */}
        <div className="ticTacToeDifficultyCard theme-transition">
          <div className="cardGlow theme-transition" />
          <h3 className="ticTacToeDifficultyTitle">AI Difficulty</h3>
          <div className="ticTacToeDifficultyButtons">
            {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
              <Button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`ticTacToeDifficultyBtn theme-transition ${
                  difficulty === diff ? `difficultySelected difficulty-${diff}` : "difficultyUnselected"
                }`}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Score Board */}
        <div className="ticTacToeScoreCard theme-transition">
          <div className="cardGlow theme-transition" />
          <div className="ticTacToeScoreGrid">
            <div className="ticTacToeScoreItem">
              <div className="ticTacToeScoreLabel winsLabel">Wins</div>
              <div className="ticTacToeScoreValue">{scores.wins}</div>
              <div className="ticTacToeScorePlayer">You</div>
            </div>
            <div className="ticTacToeScoreItem">
              <div className="ticTacToeScoreLabel drawsLabel">Draws</div>
              <div className="ticTacToeScoreValue">{scores.draws}</div>
            </div>
            <div className="ticTacToeScoreItem">
              <div className="ticTacToeScoreLabel lossesLabel">Losses</div>
              <div className="ticTacToeScoreValue">{scores.losses}</div>
              <div className="ticTacToeScorePlayer">AI</div>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div
          className={`ticTacToeGameCard theme-transition ${
            isAiThinking ? "aiThinking" : ""
          } ${gameState === "won" ? "gameWon" : ""}`}
        >
          <div className="cardGlow theme-transition" />
          <div className="ticTacToeBoard">
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                className={`ticTacToeCell theme-transition ${
                  winningLine.includes(index) ? "winningCell" : ""
                } ${isAiThinking && !cell ? "cellThinking" : ""}`}
                disabled={!!cell || gameState !== "playing" || currentPlayer === "O"}
              >
                {cell && (
                  <span className={`ticTacToeCellContent ${cell === "X" ? "playerX" : "playerO"} cellAnimate`}>
                    {cell}
                  </span>
                )}
                {isAiThinking && !cell && (
                  <div className="ticTacToeSpinner">
                    <div className="ticTacToeSpinnerInner"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Game Status */}
        <div className="ticTacToeStatusCard theme-transition">
          <div className="cardGlow theme-transition" />
          <div className="ticTacToeStatusMain">
            {gameState === "playing" ? (
              isAiThinking ? (
                <span className="statusAiThinking">AI is thinking... 🤖</span>
              ) : currentPlayer === "X" ? (
                <span className="statusPlayerTurn">Your turn! ✨</span>
              ) : (
                <span className="statusAiTurn">AI&apos;s turn 🎯</span>
              )
            ) : gameState === "won" ? (
              <span className="statusWon celebrationMode">You Won! 🎉</span>
            ) : gameState === "lost" ? (
              <span className="statusLost">AI Won! 🤖</span>
            ) : (
              <span className="statusDraw">It&apos;s a Draw! 🤝</span>
            )}
          </div>
          <div className="ticTacToeStatusSub">
            {gameState === "playing" ? "Click any empty cell to make your move" : "Game Over - Start a new game!"}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="ticTacToeActions">
          <Button onClick={resetGame} className="ticTacToeActionBtn newGameBtn theme-transition">
            <span className="relative z-10">New Game 🎮</span>
            <div className="ticTacToeActionGlow newGameGlow"></div>
          </Button>
          <Button onClick={resetScores} className="ticTacToeActionBtn resetScoresBtn theme-transition">
            <span className="relative z-10">Reset Scores 📊</span>
            <div className="ticTacToeActionGlow resetScoresGlow"></div>
          </Button>
        </div>
      </div>
    </div>
  )
}
