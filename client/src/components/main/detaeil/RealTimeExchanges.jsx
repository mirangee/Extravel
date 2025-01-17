import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RealTimeExchangesCard from '../intro/RealTimeExchangesCard';
import styles from '../../../scss/RealTimeExchanges.module.scss';
import { Card } from 'reactstrap';
import GoogleTop5 from './GoogleTop5';
import { API_BASE_URL } from '../../../config/host-config';
const RealTimeExchanges = () => {
  const [liveData, setLiveData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLiveData = async () => {
      await axios
        .get(`${API_BASE_URL}/api/rate/currency/live`)
        .then((res) => {
          setLiveData(res.data);
          setLoading(true);
        });
    };

    getLiveData();
  }, []);

  // 데이터가 4개씩 묶음으로 나뉘도록 배열을 변환
  const groupedData = [];
  for (let i = 0; i < liveData.length; i += 1) {
    groupedData.push(liveData.slice(i, i + 1));
  }

  return (
    <>
      <div className={styles.RealTimeContainer}>
        <h3 className={styles.mainH3}>22개국 환율 정보</h3>
        <h1 className={styles.mainH1}>
          다양한 국가의 환율을 손쉽게 알아보세요. <br />
        </h1>
        <div className={styles.wrapper}>
          {groupedData.map((group, groupIndex) => (
            <div className={styles.column} key={groupIndex}>
              {group.map((data) => (
                <div
                  className={styles.cardContainer}
                  key={data.id}
                >
                  <Card className={styles.card}>
                    <RealTimeExchangesCard item={data} />
                  </Card>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <GoogleTop5 />
    </>
  );
};

export default RealTimeExchanges;
