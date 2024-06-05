import { useEffect, useState } from 'react';

export const useGame = () => {
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
    if (0 <= parseInt(event.target.value, 10) && parseInt(event.target.value, 10) <= 999) {
      setTempWidth(parseInt(event.target.value, 10));
    } else {
      setTempWidth(0);
    }
  };

  const handleTempHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (0 <= parseInt(event.target.value, 10) && parseInt(event.target.value, 10) <= 999) {
      setTempHeight(parseInt(event.target.value, 10));
    } else {
      setTempHeight(0);
    }
  };

  const handleTempBombsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (0 <= parseInt(event.target.value, 10) && parseInt(event.target.value, 10) <= 999) {
      if (tempHeight * tempWidth <= parseInt(event.target.value, 10)) {
        setTempBombs(tempHeight * tempWidth);
      } else {
        setTempBombs(parseInt(event.target.value, 10));
      }
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

  return {
    flag100,
    Minus10,
    flag1,
    flag10,
    Minus100,
    time1,
    time10,
    time100,
    clickHandler,
    clickRight,
    clickSmile,
    clickLevel1,
    clickLevel2,
    clickLevel3,
    clickCustom,
    handleTempWidthChange,
    handleTempHeightChange,
    handleTempBombsChange,
    isClear,
    isEnd,
    level,
    levelW,
    tempWidth,
    tempHeight,
    tempBombs,
    board,
    userInput,
    customWidth,
    levelH,
    customHeight,
  };
};
