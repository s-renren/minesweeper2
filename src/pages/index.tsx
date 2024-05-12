import { useState } from 'react';
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

  const [board, setBoard] = useState([
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

  const isStart = !bombMap.flat().includes(1);
  const isEnd = board.flat().includes(11);

  // const aroundBombNum = (
  //   aroundBoard: number[][],
  //   aroundBombMap: number[][],
  //   x: number,
  //   y: number,
  // ) => {
  //   aroundBoard[y][x] = [-1, 0, 1]
  //     .map((dx) => {
  //       [-1, 0, 1].map((dy) => {
  //         aroundBombMap[y + dy][x + dx] !== undefined && aroundBombMap[y + dy][x + dx] === 1;
  //       });
  //     })
  //     .flat()
  //     .filter(Boolean).length;
  //     console.log(aroundBoard[y][x])
  // };

  const clickHandler = (x: number, y: number) => {
    const newUserInput = structuredClone(userInput);
    const newBombMap = structuredClone(bombMap);
    const newBoard = structuredClone(board);

    if (!isEnd) {
      if (newUserInput[y][x] === 0) {
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
          newUserInput[y][x] = (newUserInput[y][x] + 1) % 4;
          // aroundBombNum(newBoard, newBombMap, x, y);
        } else if (newBombMap[y][x] === 1) {
          newBombMap.forEach((row, x) =>
            row.forEach((n, y) => {
              if (newBombMap[y][x] === 1) {
                newBoard[y][x] = 11;
                newUserInput[y][x] = (newUserInput[y][x] + 1) % 4;
              }
            }),
          );
          setBoard(newBoard);
        }
        setUserInput(newUserInput);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bace}>
        <div className={styles.fancarea} />
        <div className={styles.boardarea}>
          <div className={styles.board}>
            {userInput.map((row, y) =>
              row.map((color, x) => (
                <div key={`${x}-${y}`}>
                  <div
                    onClick={() => clickHandler(x, y)}
                    style={{ backgroundPosition: `${-30 * (userInput[y][x] - 1)}px 0px` }}
                    className={color === 0 ? styles.cell : ''}
                  >
                    <div
                      style={{ backgroundPosition: `${-30 * (board[y][x] - 1)}px 0px` }}
                      className={color !== 0 ? styles.none : ''}
                    />
                  </div>
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
