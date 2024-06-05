import styles from './index.module.css';
import { useGame } from '../hooks/useGames';
import { Levels } from '../components/levels/Levels';
import { Bace } from '../components/bace/Bace';

const Home = () => {
  const {
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
    level,
    levelW,
    customWidth,
    levelH,
    customHeight,
    isClear,
    board,
    userInput,
    isEnd,
    tempWidth,
    tempHeight,
    tempBombs,
  } = useGame();
  return (
    <div className={styles.container}>
      <Levels
        level={level}
        tempWidth={tempWidth}
        tempHeight={tempHeight}
        tempBombs={tempBombs}
        clickLevel1={clickLevel1}
        clickLevel2={clickLevel2}
        clickLevel3={clickLevel3}
        clickCustom={clickCustom}
        handleTempWidthChange={handleTempWidthChange}
        handleTempHeightChange={handleTempHeightChange}
        handleTempBombsChange={handleTempBombsChange}
      />
      <Bace
        level={level}
        levelW={levelW}
        customWidth={customWidth}
        levelH={levelH}
        customHeight={customHeight}
        clickSmile={clickSmile}
        Minus100={Minus100}
        Minus10={Minus10}
        isClear={isClear}
        flag100={flag100}
        flag10={flag10}
        flag1={flag1}
        isEnd={isEnd}
        time100={time100}
        time10={time10}
        time1={time1}
        board={board}
        clickHandler={clickHandler}
        clickRight={clickRight}
        userInput={userInput}
      />
    </div>
  );
};

export default Home;
