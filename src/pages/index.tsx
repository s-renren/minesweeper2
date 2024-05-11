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

  const clickHandler = (x: number, y: number) => {
    const newUserInput = structuredClone(userInput);
    newUserInput[y][x] = (newUserInput[y][x] + 1) % 4;
    console.log(newUserInput[y][x]);
    setUserInput(newUserInput);
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
                <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)} />
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
