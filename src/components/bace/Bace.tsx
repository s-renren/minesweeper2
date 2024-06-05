import styles from '../bace/Bace.module.css';

const stylesTyped: Record<string, string> = styles;

type Props = {
  level: number;
  levelW: number;
  customWidth: number;
  levelH: number;
  customHeight: number;
  clickSmile: () => void;
  Minus100: boolean;
  Minus10: boolean;
  isClear: boolean;
  flag100: number;
  flag10: number;
  flag1: number;
  isEnd: boolean;
  time100: number;
  time10: number;
  time1: number;
  board: number[][];
  clickHandler: (x: number, y: number) => void;
  clickRight: (x: number, y: number, event: React.MouseEvent<HTMLDivElement>) => void;
  userInput: number[][];
};

export const Bace = ({
  level,
  levelW,
  customWidth,
  levelH,
  customHeight,
  clickSmile,
  Minus100,
  Minus10,
  isClear,
  flag100,
  flag10,
  flag1,
  isEnd,
  time100,
  time10,
  time1,
  board,
  clickHandler,
  clickRight,
  userInput,
}: Props) => {
  return (
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
              !isClear ? `${styles.num} ${stylesTyped[`n${flag1}`]}` : `${styles.num} ${styles.n0}`
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
  );
};
