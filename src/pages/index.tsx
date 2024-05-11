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

  const isStart = !bombMap.flat().includes(1);

  const img = 1;

  const clickHandler = (x: number, y: number) => {
    const newUserInput = structuredClone(userInput);
    const newBombMap = structuredClone(bombMap);

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
        setBombMap(bombMap);
      }
      newUserInput[y][x] = (newUserInput[y][x] + 1) % 4;
      setUserInput(newUserInput);
    }
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.sampleStyle} style={{backgroundPosition: `${-30*samplePos}px 0px`}} />
      <button onClick={() => setSamplePos((p) => (p + 1) % 14)}>sample</button> */}
      <div className={styles.bace}>
        <div className={styles.fancarea} />
        <div className={styles.boardarea}>
          <div className={styles.board}>
            {userInput.map((row, y) =>
              row.map((color, x) => (
                <div
                  className={color === 0 ? styles.cell : styles.none}
                  style={{ backgroundPosition: `${-30 * (img - 1) - 2}px -2px` }}
                  key={`${x}-${y}`}
                  onClick={() => clickHandler(x, y)}
                />
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
