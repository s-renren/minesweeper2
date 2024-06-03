import styles from './Levels.module.css';

type Props = {
  level: number;
  tempWidth: number;
  tempHeight: number;
  tempBombs: number;
  clickLevel1: () => void;
  clickLevel2: () => void;
  clickLevel3: () => void;
  clickCustom: () => void;
  handleTempWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTempHeightChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTempBombsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Levels = ({
  level,
  tempWidth,
  tempHeight,
  tempBombs,
  clickLevel1,
  clickLevel2,
  clickLevel3,
  clickCustom,
  handleTempWidthChange,
  handleTempHeightChange,
  handleTempBombsChange,
}: Props) => (
  <div>
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
  </div>
);
