import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import styles from './Done.module.css';

function formatBytes(bytes) {
  if (!bytes) return '3.2 MB';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Done() {
  const navigate = useNavigate();
  const { file, targetFormat, reset } = useAppContext();

  const outputName = file
    ? file.name.replace(/\.[^.]+$/, `.${targetFormat || 'mp3'}`)
    : 'recording.mp3';

  const handleDownload = useCallback(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = outputName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [file, outputName]);

  const handleContinue = () => {
    reset();
    navigate('/');
  };

  if (!file) {
    return (
      <div className={styles.emptyState}>
        <p className={`body-lg ${styles.emptyStateText}`}>
          没有找到转换记录
        </p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          返回首页
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-decoration">
        <div className="bg-blob-1" />
        <div className="bg-blob-2" />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.container}>
          {/* Success Indicator */}
          <div className="success-circle">
            <div className="success-circle-glow" />
            <div className="success-circle-inner">
              <span className={`material-symbols-outlined ${styles.checkIcon}`}>
                check_circle
              </span>
            </div>
          </div>

          {/* Header */}
          <div className={styles.header}>
            <h1 className="display-lg">转换已完成</h1>
            <p className={`body-lg ${styles.subtitle}`}>
              您的音频文件已成功处理，并已准备好下载。
            </p>
          </div>

          {/* File Card */}
          <div className={`glass-panel ${styles.fileCard}`}>
            <div className={styles.fileIconWrap}>
              <div className={styles.fileIcon}>
                <span className={`material-symbols-outlined ${styles.fileIconColor}`}>audio_file</span>
              </div>
              <div>
                <h3 className={`label-md ${styles.fileName}`}>{outputName}</h3>
                <p className={`label-sm ${styles.fileMeta}`}>
                  {formatBytes(file.size)} &bull; {targetFormat ? targetFormat.toUpperCase() : 'MP3'} &bull; 320kbps
                </p>
              </div>
            </div>
            <div className={styles.privacyTag}>
              <span className={`material-symbols-outlined ${styles.privacyTagIcon}`}>
                verified_user
              </span>
              <span className={`label-sm ${styles.privacyTagText}`}>本地处理</span>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className="btn-full" onClick={handleDownload}>
              <span className={`material-symbols-outlined ${styles.btnIcon}`}>download</span>
              下载文件
            </button>
            <div className={styles.buttonRow}>
              <button className="btn-secondary" onClick={handleContinue}>
                <span className={`material-symbols-outlined ${styles.btnIcon}`}>refresh</span>
                继续转换
              </button>
              <button className="btn-secondary" onClick={handleDownload}>
                <span className={`material-symbols-outlined ${styles.btnIcon}`}>share</span>
                分享链接
              </button>
            </div>
          </div>

          {/* Security badges */}
          <div className={styles.securityBadges}>
            {[
              { icon: 'shield_lock', label: '端到端私密' },
              { icon: 'memory', label: '本地算力处理' },
              { icon: 'delete_sweep', label: '无云端存储' },
            ].map((item) => (
              <div key={item.icon} className={styles.securityBadge}>
                <span className={`material-symbols-outlined ${styles.securityBadgeIcon}`}>{item.icon}</span>
                <p className={`label-sm ${styles.securityBadgeLabel}`}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
