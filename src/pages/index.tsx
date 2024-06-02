import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

const stylesTyped: Record<string, string> = styles;

const Home = () => {
  const [level, setLevel] = useState(1);
  const [userInput, setUserInput] = useState([...Array(9)].map(() => [...Array(9)].map(() => 0)));
  const [bombMap, setBombMap] = useState([...Array(9)].map(() => [...Array(9)].map(() => 0)));
  const [count, setCount] = useState(0);
  const [customWidth, setCustomWidth] = useState<number>(9);
  const [customHeight, setCustomHeight] = useState<number>(9);
  const [custombombs, setCustomBombs] = useState<number>(10);
  const [tempWidth, setTempWidth] = useState<number>(9);
  const [tempHeight, setTempHeight] = useState<number>(9);
  const [tempBombs, setTempBombs] = useState<number>(10);
  const isStart = !bombMap.flat().includes(1);
  const isClearN = bombMap.every((row, y) =>
    row.every((num, x) => num === 1 || userInput[y][x] === 1),
  );
  const isEnd = userInput.some((row, y) =>
    row.some((input, x) => (input === 1 || input === 4) && bombMap[y][x] === 1),
  );
  const flagCount = userInput
    .map((row) => row.map((input) => input === 3))
    .flat()
    .filter(Boolean).length;
  const getLevelH = () => {
    if (level === 1) {
      return 9;
    } else if (level === 2 || level === 3) {
      return 16;
    } else {
      return customHeight;
    }
  };
  const getLevelW = () => {
    if (level === 1) {
      return 9;
    } else if (level === 2) {
      return 16;
    } else if (level === 3) {
      return 30;
    } else {
      return customWidth;
    }
  };
  const levelH = getLevelH();
  const levelW = getLevelW();
  const level1B = [...Array(9)].map(() => [...Array(9)].map(() => 0));
  const level2B = [...Array(16)].map(() => [...Array(16)].map(() => 0));
  const level3B = [...Array(16)].map(() => [...Array(30)].map(() => 0));
  const board: number[][] = [...Array(levelH)].map(() => [...Array(levelW)].map(() => -1));
  const reset: number[][] = [...Array(levelH)].map(() => [...Array(levelW)].map(() => 0));

  let Minus10 = false;
  let Minus100 = false;
  const getFlag = () => {
    if (level === 1) {
      return 10;
    } else if (level === 2) {
      return 40;
    } else if (level === 3) {
      return 99;
    } else {
      return custombombs;
    }
  };
  const reFlag = getFlag();
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

  const calcValue = () => {
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
    if (isClearN) {
      bombMap.forEach((row, dy) => {
        row.forEach((num, dx) => {
          if (num === 1 && userInput[dy][dx] === 0) {
            board[dy][dx] = 15;
          }
        });
      });
    }
  };

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
    if (isEnd || isClearN) {
      return;
    }
    {
      if (board[y][x] === -1) {
        if (isStart) {
          if (customHeight * customWidth === reFlag) {
            newBombMap.forEach((s, ddy) => {
              s.forEach((n1, ddx) => {
                newBombMap[ddy][ddx] = 1;
                console.log('a');
              });
            });
            newBombMap.forEach((row, dy) =>
              row.forEach((n, dx) => {
                if (newBombMap[dy][dx] === 1 && newUserInput[dy][dx] !== 3) {
                  board[dy][dx] = 11;
                  newUserInput[dy][dx] = 1;
                }
              }),
            );
            newUserInput[y][x] = 4;
          }
          while (newBombMap.flat().filter((num) => num === 1).length < reFlag) {
            const randomX = Math.floor(Math.random() * levelW);
            const randomY = Math.floor(Math.random() * levelH);
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
          newBombMap.forEach((row, dy) =>
            row.forEach((n, dx) => {
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
    if (isEnd || isClearN) {
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
  calcValue();

  const clickSmile = () => {
    setUserInput(reset);
    setBombMap(reset);
    setCount(0);
  };

  const clickLevel1 = () => {
    setLevel(1);
    setUserInput(level1B);
    setBombMap(level1B);
    setCount(0);
  };

  const clickLevel2 = () => {
    setLevel(2);
    setUserInput(level2B);
    setBombMap(level2B);
    setCount(0);
  };

  const clickLevel3 = () => {
    setLevel(3);
    setUserInput(level3B);
    setBombMap(level3B);
    setCount(0);
  };

  const clickCustom = () => {
    setLevel(4);
    setCount(0);
    setCustomWidth(tempWidth);
    setCustomHeight(tempHeight);
    const customReset: number[][] = [...Array(tempHeight)].map(() =>
      [...Array(tempWidth)].map(() => 0),
    );
    setUserInput(customReset);
    setBombMap(customReset);
    if (tempHeight * tempWidth <= tempBombs) {
      setCustomBombs(tempHeight * tempWidth);
      setTempBombs(tempHeight * tempWidth);
    } else {
      setCustomBombs(tempBombs);
    }
  };

  const handleTempWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.target.value, 10) < 0) {
      setTempWidth(0);
    } else {
      setTempWidth(parseInt(event.target.value, 10));
    }
  };

  const handleTempHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.target.value, 10) < 0) {
      setTempHeight(0);
    } else {
      setTempHeight(parseInt(event.target.value, 10));
    }
  };

  const handleTempBombsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (tempHeight * tempWidth <= parseInt(event.target.value, 10)) {
      setTempBombs(tempHeight * tempWidth);
      console.log('a');
    } else {
      setTempBombs(parseInt(event.target.value, 10));
    }
  };
  const isClear = bombMap.every((row, y) =>
    row.every((num, x) => num === 1 || userInput[y][x] === 1),
  );
  useEffect(() => {
    if (isClear || isEnd) {
      return;
    }
    if (!isStart) {
      const interval = setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isClear, isEnd, isStart]);
  return (
    <div className={styles.container}>
      <div className={styles.level}>
        <div
          className={styles.level1}
          onClick={clickLevel1}
          style={{
            color: level !== 1 ? 'blue' : 'black',
          }}
        >
          初級
        </div>
        <div
          className={styles.level2}
          onClick={clickLevel2}
          style={{
            color: level !== 2 ? 'blue' : 'black',
          }}
        >
          中級
        </div>
        <div
          className={styles.level3}
          onClick={clickLevel3}
          style={{
            color: level !== 3 ? 'blue' : 'black',
          }}
        >
          上級
        </div>
        <div
          className={styles.level4}
          onClick={clickCustom}
          style={{
            color: level !== 4 ? 'blue' : 'black',
          }}
        >
          カスタム
        </div>
      </div>
      <div className={level === 4 ? styles.custom : styles.none}>
        <label htmlFor="width">幅:</label>
        <input type="number" id="width" value={tempWidth} onChange={handleTempWidthChange} />
        <label htmlFor="height">高さ:</label>
        <input type="number" id="height" value={tempHeight} onChange={handleTempHeightChange} />
        <label htmlFor="bombs">爆弾数:</label>
        <input type="number" id="bombs" value={tempBombs} onChange={handleTempBombsChange} />
        <button id="update" onClick={clickCustom}>
          更新
        </button>
      </div>
      <div
        className={styles.bace}
        style={{
          width:
            level !== 4
              ? `${30 * levelW + 50}px`
              : customWidth < 8
                ? `300px`
                : `${30 * customWidth + 50}px`,
          height: level !== 4 ? `${30 * levelH + 140}px` : `${30 * customHeight + 140}px`,
        }}
      >
        <div
          className={styles.fancarea}
          onClick={() => clickSmile()}
          style={{
            width:
              level !== 4
                ? `${30 * levelW + levelW + 1}px`
                : customWidth < 8
                  ? `250px`
                  : `${30 * customWidth + customWidth + 1}px`,
          }}
        >
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
        <div
          className={styles.boardarea}
          style={{
            width: level !== 4 ? `${30 * levelW + 10}px` : `${30 * customWidth + 10}px`,
            height: level !== 4 ? `${30 * levelH + 10}px` : `${30 * customHeight + 10}px`,
          }}
        >
          <div
            className={styles.board}
            style={{
              width: level !== 4 ? `${30 * levelW}px` : `${30 * customWidth}px`,
              height: level !== 4 ? `${30 * levelH}px` : `${30 * customHeight}px`,
            }}
          >
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
                              ? `-300px -1px`
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
