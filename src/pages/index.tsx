import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

const stylesTyped: Record<string, string> = styles;

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

  const reset: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [count, setCount] = useState(0);

  const isStart = !bombMap.flat().includes(1);
  const isEnd = userInput.some((row, y) =>
    row.some((input, x) => (input === 1 || input === 4) && bombMap[y][x] === 1),
  );
  const isClear = bombMap.every((row, y) =>
    row.every((num, x) => num === 1 || userInput[y][x] === 1),
  );

  const flagCount = userInput
    .map((row) => row.map((input) => input === 3))
    .flat()
    .filter(Boolean).length;

  let Minus10 = false;
  let Minus100 = false;
  const reFlag = 10;
  let FlagNum = reFlag - flagCount;
  let flag1 = 0;
  let flag10 = 0;
  let flag100 = 0;

  if (FlagNum >= 0) {
    flag1 = Math.floor(FlagNum % 10);
    flag10 = Math.floor((FlagNum / 10) % 10);
    flag100 = Math.floor((FlagNum / 100) % 10);
  } else {
    FlagNum *= -1;
    flag1 = Math.floor(FlagNum % 10);
    flag10 = Math.floor((FlagNum / 10) % 10);
    flag100 = Math.floor((FlagNum / 100) % 10);
    if (FlagNum < 10) {
      Minus10 = true;
    } else if (FlagNum >= 10 && FlagNum < 100) {
      Minus100 = true;
    } else {
      flag1 = 9;
      flag10 = 9;
      Minus100 = true;
    }
  }

  useEffect(() => {
    if (isStart) {
      return;
    } else if (isEnd) {
      return;
    } else if (isClear) {
      return;
    }
    const timerId = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [isStart, isEnd, isClear]);

  const time1 = Math.floor(count % 10);
  const time10 = Math.floor((count / 10) % 10);
  const time100 = Math.floor((count / 100) % 10);

  const aroundBombNum = (
    board: number[][],
    newBombMap: number[][],
    userInput: number[][],
    x: number,
    y: number,
  ) => {
    if (bombMap[y][x] !== 1) {
      board[y][x] = [-1, 0, 1]
        .map((dx) =>
          [-1, 0, 1].map(
            (dy) => newBombMap[y + dy] !== undefined && newBombMap[y + dy][x + dx] === 1,
          ),
        )
        .flat()
        .filter(Boolean).length;
      userInput[y][x] = 1;

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
    if (isEnd || isClear) {
      return;
    }
    {
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
          newBombMap.forEach((row, dx) =>
            row.forEach((n, dy) => {
              if (newBombMap[dy][dx] === 1 && newUserInput[dy][dx] !== 3) {
                board[dy][dx] = 11;
                newUserInput[dy][dx] = 1;
              }
            }),
          );
          newUserInput[y][x] = 4;
        }
      }
    }
    setUserInput(newUserInput);
  };

  const clickRight = (x: number, y: number, event: React.MouseEvent) => {
    event.preventDefault();
    const newUserInput = structuredClone(userInput);
    if (isEnd || isClear) {
      return;
    }
    {
      if (userInput[y][x] !== 1) {
        if (newUserInput[y][x] === 0 || newUserInput[y][x] === 2 || newUserInput[y][x] === 3) {
          newUserInput[y][x] === 0
            ? (newUserInput[y][x] = 3)
            : newUserInput[y][x] === 3
              ? (newUserInput[y][x] = 2)
              : (newUserInput[y][x] = 0);
        }
        setUserInput(newUserInput);
      }
    }
  };

  userInput.forEach((row, dy) => {
    row.forEach((isClick, dx) => {
      if (isClick === 2 || isClick === 3) {
        isClick === 2
          ? (board[dy][dx] = 9)
          : isClick === 3
            ? (board[dy][dx] = 10)
            : (board[dy][dx] = -1);
      }
      if (bombMap[dy][dx] !== 1) {
        if (isClick === 1) {
          aroundBombNum(board, bombMap, userInput, dx, dy);
        } else if (userInput[dy][dx] === 2 || userInput[dy][dx] === 3) {
          board[dy][dx] = 15;
        }
      } else if (isClick === 1 && bombMap[dy][dx] === 1) {
        board[dy][dx] = 11;
      }
    });
  });

  const clickSmile = () => {
    setUserInput(reset);
    setBombMap(reset);
    setCount(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bace}>
        <div className={styles.fancarea} onClick={() => clickSmile()}>
          <div className={styles.numStyles}>
            <div
              className={
                Minus100
                  ? `${styles.num} ${styles.nMinus}`
                  : !isClear
                    ? `${styles.num} ${stylesTyped[`n${flag100}`]}`
                    : `${styles.num} ${styles.n0}`
              }
            />
            <div
              className={
                Minus10
                  ? `${styles.num} ${styles.nMinus}`
                  : !isClear
                    ? `${styles.num} ${stylesTyped[`n${flag10}`]}`
                    : `${styles.num} ${styles.n0}`
              }
            />
            <div
              className={
                !isClear
                  ? `${styles.num} ${stylesTyped[`n${flag1}`]}`
                  : `${styles.num} ${styles.n0}`
              }
            />
          </div>
          <div
            className={styles.smile}
            style={{
              backgroundPosition: isEnd
                ? `${-30 * 13 + 1}px 2px`
                : isClear
                  ? `${-30 * 12 + 1}px 2px`
                  : `${-30 * 11 + 1}px 2px`,
            }}
          />
          <div className={styles.numStyles}>
            <div className={`${styles.num} ${stylesTyped[`n${time100}`]}`} />
            <div className={`${styles.num} ${stylesTyped[`n${time10}`]}`} />
            <div className={`${styles.num} ${stylesTyped[`n${time1}`]}`} />
          </div>
        </div>
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
                        isClear && (userInput[y][x] === 0 || userInput[y][x] === 2)
                          ? `${-18 * 9 - 9}px 1px`
                          : userInput[y][x] === 2 || userInput[y][x] === 3
                            ? `${-18 * (userInput[y][x] + 6) - 9}px 1px`
                            : userInput[y][x] === 4
                              ? `-299px 0px`
                              : number === -1
                                ? `${-30 * (userInput[y][x] - 1)}px 0px`
                                : isEnd && number === 15
                                  ? `${-23 * (userInput[y][x] + 6) - 1}px 1px`
                                  : number === 15
                                    ? `${-30 * (board[y][x] - 5) + 1}px 0px`
                                    : `${-30 * (board[y][x] - 1) - 1}px -2px`,
                      backgroundColor:
                        userInput[y][x] === 4 ? 'red' : isEnd && number === 15 ? 'pink' : '',
                    }}
                    className={
                      userInput[y][x] === 4
                        ? styles.cell
                        : number === -1
                          ? `${styles.stone} ${styles.flag}`
                          : number === 9 || number === 10
                            ? `${styles.stone} ${styles.flag}`
                            : !isEnd && number === 15
                              ? `${styles.stone} ${styles.flag}`
                              : isEnd && number === 15
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
