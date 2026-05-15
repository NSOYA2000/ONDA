import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import styles from './Converting.module.css';

export default function Converting() {
  const navigate = useNavigate();
  const { file, targetFormat } = useAppContext();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!file) navigate('/', { replace: true });
  }, [file, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) { clearInterval(timer); return 100; }
        const inc = Math.random() * 18;
        return Math.min(prev + inc, 100);
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (percent >= 100) {
      const t = setTimeout(() => navigate('/done'), 600);
      return () => clearTimeout(t);
    }
  }, [percent, navigate]);

  const displayPercent = Math.min(Math.round(percent), 100);
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayPercent / 100) * circumference;
  const remaining = Math.max(Math.round((100 - displayPercent) * 0.6), 0);

  if (!file) return null;

  return (
    <>
      <div className="bg-decoration">
        <div className="bg-blob-1" />
        <div className="bg-blob-2" />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.inner}>
          {/* File info */}
          <div className={styles.fileInfo}>
            <div className={styles.fileChip}>
              <span className={`material-symbols-outlined ${styles.fileChipIcon}`}>audio_file</span>
              <span className="label-md">{file.name}</span>
            </div>
            <h1 className="display-lg">正在处理音频...</h1>
            <p className={`body-lg ${styles.subtitle}`}>
              正在应用深度降噪与声学增强
            </p>
          </div>

          {/* Circular Progress */}
          <div className={`progress-circle-wrap ${styles.progressWrap}`}>
            <div className={styles.progressInner}>
              <svg className="progress-circle" width="100%" height="100%" viewBox="0 0 256 256">
                <circle className="progress-circle-track" cx="128" cy="128" r={radius} />
                <circle
                  className="progress-circle-fill"
                  cx="128"
                  cy="128"
                  r={radius}
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className={styles.progressCenter}>
                <span className={`display-lg ${styles.progressPercent}`}>{displayPercent}%</span>
                <div className="wave-container">
                  {[40, 70, 50, 90, 60, 80, 45, 75].map((h, i) => (
                    <div key={i} className="wave-bar" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating tech insight */}
            <div className={`glass-panel ${styles.floatingInsight}`}>
              <div className={styles.floatingInsightIcon}>
                <span className="material-symbols-outlined">memory</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <p className={`label-md ${styles.insightTitle}`}>本地 CPU 处理</p>
                <p className={`label-sm ${styles.insightSubtitle}`}>数据未离开您的设备</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className="btn-ghost" onClick={() => navigate('/')}>
              <span className={`material-symbols-outlined ${styles.cancelIcon}`}>cancel</span>
              取消处理
            </button>

            <div className={styles.statsPanel}>
              <div style={{ textAlign: 'center' }}>
                <p className={`label-sm ${styles.statLabel}`}>预计剩余</p>
                <p className={`body-md ${styles.statValue}`}>{remaining} 秒</p>
              </div>
              <div className={styles.statDivider} />
              <div style={{ textAlign: 'center' }}>
                <p className={`label-sm ${styles.statLabel}`}>处理器负载</p>
                <p className={`body-md ${styles.statValue}`}>
                  {Math.round(8 + Math.random() * 20)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
