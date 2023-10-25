import { useEffect, useState } from 'react';
import { useHistory } from '../../hooks';
import { IHistoryRecord } from '../../types/types';
import cls from './history.module.css';

function History () {
  const { getFromHistory } = useHistory();
  const [ historyData, setHistoryData ] = useState<IHistoryRecord[]>([]);

  useEffect(() => {
    const retrieveData = async () => {
      const data = await getFromHistory();
      if (data) setHistoryData(data);
    }
    retrieveData();
  });
  
  return (
    <>
      { historyData.map((el, i) => 
        <div key={`record-${i}`} className={cls['history-record']}>
          <div>{ el.timestamp?.toDate().toLocaleString() }</div>
          { el.name && <div>Name: { el.name }</div> }
          { el.gender && <div>Gender: { el.gender }</div> }
          { el.status && <div>Status: { el.status }</div> }
        </div>) }
    </>
  )
}

export default History;
