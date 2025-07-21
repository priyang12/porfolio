import { createContext, useContext, useEffect, useState } from 'react';
import { Button } from '@priyang/react-component-lib';
import { Link } from 'react-router';
import clsx from 'clsx';

const createBoard = (BOARD_SIZE: number) => {
  let counter = 1;
  const board = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const currentRow = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }
  return board;
};

const useGameHook = () => {
  const Boxes = 10;
  const [board] = useState(createBoard(Boxes));
  const [snake, setSnake] = useState([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  const [direction, setDirection] = useState('down');
  const [food, setFood] = useState([0, 5]);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [start, setStart] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === 'ArrowUp') {
      setDirection('up');
    } else if (e.key === 'ArrowDown') {
      setDirection('down');
    } else if (e.key === 'ArrowLeft') {
      setDirection('left');
    } else if (e.key === 'ArrowRight') {
      setDirection('right');
    }
  };

  useEffect(() => {
    if (start) document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [start]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        if (start) {
          const newSnake = [...prevSnake];
          const [head, ...rest] = newSnake;
          const [newHead] = moveSnake(head, rest, direction);
          newSnake.unshift(newHead);
          // check if snake eats food
          if (newHead[0] === food[0] && newHead[1] === food[1]) {
            setScore((prevScore) => prevScore + 1);
            const NewFood = [
              Math.floor(Math.random() * Boxes),
              Math.floor(Math.random() * Boxes),
            ];
            setSpeed((prevSpeed) => prevSpeed - 0.1);
            setFood(NewFood);
          } else {
            newSnake.pop();
          }
          // check if snake hits itself
          const snakeHead = newSnake[0];
          const snakeTail = newSnake.slice(1);
          if (
            snakeTail.some(
              (part) => part[0] === snakeHead[0] && part[1] === snakeHead[1],
            )
          ) {
            setGameOver(true);
          }
          return newSnake;
        }
        return prevSnake;
      });
    }, speed);
    if (gameOver) clearInterval(interval);
    return () => {
      clearInterval(interval);
    };
  }, [direction, speed, food, gameOver, start]);

  const moveSnake = (head: number[], rest: number[][], direction: string) => {
    switch (direction) {
      case 'right':
        if (head[1] === Boxes) {
          return [[head[0], 0], ...rest];
        }
        return [[head[0], head[1] + 1], ...rest];
      case 'left':
        if (head[1] === 0) {
          return [[head[0], Boxes], ...rest];
        }
        return [[head[0], head[1] - 1], ...rest];
      case 'up':
        if (head[0] === 0) {
          return [[Boxes, head[1]], ...rest];
        }
        return [[head[0] - 1, head[1]], ...rest];
      case 'down':
        if (head[0] === Boxes) {
          return [[0, head[1]], ...rest];
        }
        return [[head[0] + 1, head[1]], ...rest];
      default:
        return snake;
    }
  };
  const ResetGame = () => {
    setSnake([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
    setDirection('down');
    setFood([0, 5]);
    setScore(0);
    setSpeed(100);
    setGameOver(false);
  };
  return {
    board,
    snake,
    food,
    score,
    gameOver,
    ResetGame,
    setStart,
  };
};

function Bored({ className }: React.ComponentPropsWithoutRef<'div'>) {
  const { board, snake, food, gameOver } = useGameContext();
  return (
    <div
      className={clsx(
        'flex h-full flex-col justify-evenly md:flex-row',
        className,
      )}
    >
      <div className="mx-md py-sm order-2 md:order-1">
        {board.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="flex flex-row justify-center">
              {row.map((col, colIndex) => {
                const isSnake = snake.some(
                  (segment) =>
                    segment[0] === rowIndex && segment[1] === colIndex,
                );
                const isFood = rowIndex === food[0] && colIndex === food[1];
                return (
                  <div
                    key={colIndex}
                    className={clsx(
                      'border-primary-500 text-primary-800 flex h-10 w-10 items-center justify-center border-2',
                      {
                        'bg-neutral-200': isSnake,
                        'bg-accent-500': isFood,
                        'bg-red-500': isSnake && gameOver,
                      },
                    )}
                  >
                    {isSnake ? 'S' : isFood ? 'F' : ''}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Controls({ className }: React.ComponentPropsWithoutRef<'div'>) {
  const { ResetGame, gameOver, score, setStart } = useGameContext();
  return (
    <div className={clsx('flex flex-col', className)}>
      {gameOver ? (
        <>
          <div className="text-2xl">Game Over</div>
          <div className="text-2xl">
            <Button className="p-2" onClick={ResetGame}>
              Reset
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <Button
            variant="info-border"
            className="text-2xl"
            onClick={() => setStart(true)}
          >
            Start Game
          </Button>
          <Button
            variant="warning-border"
            className="text-2xl"
            onClick={() => setStart(false)}
          >
            Stop Game
          </Button>
        </div>
      )}
    </div>
  );
}

type ContextType = ReturnType<typeof useGameHook>;

const GameContext = createContext<ContextType | undefined>(undefined);

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

function SnakeGame() {
  const { board, food, gameOver, score, snake, setStart, ResetGame } =
    useGameHook();

  return (
    <GameContext
      value={{
        ResetGame,
        board,
        food,
        gameOver,
        score,
        setStart,
        snake,
      }}
    >
      <div className="grid h-screen grid-cols-1 md:grid-cols-8 lg:grid-cols-12">
        <title>Games/Snake Bite</title>
        <div className="col-start-3 col-end-11 flex items-center justify-between">
          <h1 className="text-center text-5xl">Snake Game</h1>
          <Link to="/Games" className="Button Button-secondary-border">
            Go back
          </Link>
        </div>
        <div className="col-span-12 col-start-1 sm:col-start-3 sm:col-end-4">
          <h2 className="text-4xl">
            Score: <span>{score}</span>
          </h2>
          <Bored />
        </div>

        <Controls className="col-span-12 col-start-1 sm:col-start-9 sm:col-end-12" />
      </div>
    </GameContext>
  );
}

export default SnakeGame;
