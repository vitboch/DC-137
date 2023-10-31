import { useEffect, useState } from 'react';
import { useHistory } from '../../hooks';
import { IHistoryRecord } from '../../types/types';
import cls from './history.module.css';

const History: React.FC = () => {
  const { getFromHistory } = useHistory();
  const [historyData, setHistoryData] = useState<IHistoryRecord[]>([]);

  useEffect(() => {
    const retrieveData = async () => {
      const data = await getFromHistory();
      if (data) setHistoryData(data);
    };
    retrieveData();
  }, []);

  return (
    <div className={cls.history}>
      {historyData
        .sort((a, b) => +b.timestamp.toDate() - +a.timestamp.toDate())
        .map(({ name, gender, status, timestamp }, i) => (
          <div key={`record-${i}`} className={cls['history-record']}>
            <div
              className={`${cls['history-record__property']} ${cls['history-record__timestamp']}`}
            >
              {timestamp?.toDate().toLocaleString()}
            </div>
            <div className={cls['history-record__data']}>
              {name && (
                <div className={cls['history-record__property']}>
                  <span className={cls['history-record__label']}>Name:</span>
                  {name}
                </div>
              )}
              {gender && (
                <div className={cls['history-record__property']}>
                  <span className={cls['history-record__label']}>Gender:</span>
                  {gender}
                </div>
              )}
              {status && (
                <div className={cls['history-record__property']}>
                  <span className={cls['history-record__label']}>Status:</span>
                  {status}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default History;
