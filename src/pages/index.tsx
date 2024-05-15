import React, { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [userInput, setUserInput] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const board: number[][] = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];

  const isStart = !bombMap.flat().includes(1);
  const isEnd = board.flat().includes(11);

  const aroundBombNum = (
    board: number[][],
    newBombMap: number[][],
    userInput: number[][],
    x: number,
    y: number,
  ) => {
    if (userInput[y][x] !== 2 || userInput[y][x] !== 3) {
      board[y][x] = [-1, 0, 1]
        .map((dx) =>
          [-1, 0, 1].map(
            (dy) => newBombMap[y + dy] !== undefined && newBombMap[y + dy][x + dx] === 1,
          ),
        )
        .flat()
        .filter(Boolean).length;

      if (board[y][x] === 0) {
        [-1, 0, 1].forEach((dx) => {
          [-1, 0, 1].forEach((dy) => {
            if (board[y + dy] !== undefined && board[y + dy][x + dx] === -1) {
              aroundBombNum(board, newBombMap, userInput, x + dx, y + dy);
            }
          });
        });
      }
    }
  };

  const clickHandler = (x: number, y: number) => {
    const newUserInput = structuredClone(userInput);
    const newBombMap = structuredClone(bombMap);

    if (!isEnd) {
      if (board[y][x] === -1) {
        if (isStart) {
          while (newBombMap.flat().filter((num) => num === 1).length < 10) {
            const randomX = Math.floor(Math.random() * 9);
            const randomY = Math.floor(Math.random() * 9);
            if (randomX === x && randomY === y) {
              continue;
            } else {
              newBombMap[randomY][randomX] = 1;
            }
          }
          setBombMap(newBombMap);
        }
        if (newBombMap[y][x] !== 1) {
          newUserInput[y][x] = 1;
        } else if (newBombMap[y][x] === 1) {
          newBombMap.forEach((row, x) =>
            row.forEach((n, y) => {
              if (newBombMap[y][x] === 1) {
                board[y][x] = 11;
                newUserInput[y][x] = 1;
                console.log(board[y][x]);
              }
            }),
          );
        }
        setUserInput(newUserInput);
      }
    }
  };

  const clickRight = (x: number, y: number, event: React.MouseEvent) => {
    event.preventDefault();
    const newUserInput = structuredClone(userInput);
    if (newUserInput[y][x] === 0 || newUserInput[y][x] === 2 || newUserInput[y][x] === 3) {
      newUserInput[y][x] === 0
        ? (newUserInput[y][x] = 2)
        : newUserInput[y][x] === 2
          ? (newUserInput[y][x] = 3)
          : (newUserInput[y][x] = 0);
    }
    console.log(newUserInput[y][x]);
    setUserInput(newUserInput);
  };

  userInput.forEach((row, dy) => {
    row.forEach((isClick, dx) => {
      if (isClick === 1) {
        aroundBombNum(board, bombMap, userInput, dx, dy);
      } else if (isClick === 2 || isClick === 3) {
        isClick === 2
          ? (board[dy][dx] = 9)
          : isClick === 3
            ? (board[dy][dx] = 10)
            : (board[dy][dx] = -1);
      }
    });
  });

  return (
    <div className={styles.container}>
      <div className={styles.bace}>
        <div className={styles.fancarea} />
        <div className={styles.boardarea}>
          <div className={styles.board}>
            {board.map((row, y) =>
              row.map((number, x) => (
                <div key={`${x}-${y}`}>
                  <div
                    onClick={() => clickHandler(x, y)}
                    onContextMenu={(event) => clickRight(x, y, event)}
                    style={{
                      backgroundPosition:
                        number === -1
                          ? `${-30 * (userInput[y][x] - 1)}px 0px`
                          : number === 9 || number === 10
                            ? `${-30 * (board[y][x] - 1) - 2}px -3px`
                            : `${-30 * (board[y][x] - 1) + 2}px 0px`,
                    }}
                    className={
                      number === -1
                        ? styles.stone
                        : number === 9 || number === 10
                          ? `${styles.stone} ${styles.flag}`
                          : styles.cell
                    }
                  />
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
