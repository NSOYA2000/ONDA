import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import styles from './ChooseFormat.module.css';

const AUDIO_FORMATS = [
  { ext: 'MP3', desc: '最常用', target: 'mp3' },
  { ext: 'WAV', desc: '无损', target: 'wav' },
  { ext: 'FLAC', desc: '高质', target: 'flac' },
  { ext: 'M4A', desc: 'Apple', target: 'm4a' },
];

const VIDEO_FORMATS = [
  { ext: 'MP4', desc: '万能', target: 'mp4' },
  { ext: 'MOV', desc: 'ProRes', target: 'mov' },
  { ext: 'AVI', desc: '经典', target: 'avi' },
];

function formatBytes(bytes) {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getExt(filename) {
  if (!filename) return '—';
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toUpperCase() : '—';
}

export default function ChooseFormat() {
  const navigate = useNavigate();
  const { file, setTargetFormat, targetFormat } = useAppContext();

  const [selected, setSelected] = useState(targetFormat);

  if (!file) {
    return (
      <div className={styles.emptyState}>
        <p className={`body-lg ${styles.emptyStateText}`}>
          请先选择文件
        </p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          返回首页
        </button>
      </div>
    );
  }

  const handleStart = () => {
    if (!selected) return;
    setTargetFormat(selected);
    navigate('/converting');
  };

  return (
    <div className={styles.grid}>
      {/* Left: File Info */}
      <div className={styles.leftCol}>
        <div className="file-card glass-panel">
          <div className="file-card-header">
            <div className="file-card-icon">
              <span className="material-symbols-outlined" style={{ fontSize: 32 }}>audio_file</span>
            </div>
            <div>
              <h2 className={`headline-md ${styles.fileCardTitle}`}>已选择文件</h2>
              <p className={`body-md ${styles.fileCardSubtitle}`}>本地处理，隐私无忧</p>
            </div>
          </div>

          <div className={styles.fileCardBody}>
            <div className="file-card-field">
              <span className="file-card-label">文件名</span>
              <span className={`file-card-value ${styles.fileNameValue}`}>{file.name}</span>
            </div>
            <div className={styles.fileCardMeta}>
              <div className="file-card-field">
                <span className="file-card-label">文件大小</span>
                <span className={`file-card-value ${styles.fileMetaValue}`}>
                  {formatBytes(file.size)}
                </span>
              </div>
              <div className="file-card-field">
                <span className="file-card-label">原始格式</span>
                <span className={`file-card-value ${styles.fileMetaValue}`}>
                  {getExt(file.name)} {file.type ? `(${file.type.split('/').pop()})` : ''}
                </span>
              </div>
            </div>
          </div>

          <div className={`privacy-notice ${styles.privacyNoticeTop}`}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>info</span>
            <p>文件将保持在本地。Onda 不会上传您的任何数据到云端服务器。</p>
          </div>
        </div>

        {/* Tech visualization image */}
        <div className={styles.techImage}>
          <img
            src={import.meta.env.BASE_URL + "images/tech-wave.jpg"}
            alt="Tech visualization"
            className={styles.techImageImg}
          />
        </div>
      </div>

      {/* Right: Format Selection */}
      <div className={styles.formatPanel}>
        <h3 className={`headline-md ${styles.formatPanelTitle}`}>选择目标格式</h3>

        {/* Audio Formats */}
        <div className={styles.audioSection}>
          <div className={styles.formatSectionHeader}>
            <span className={`material-symbols-outlined ${styles.formatSectionIcon}`}>volume_up</span>
            <h4 className={`label-md ${styles.formatSectionLabel}`}>音频格式</h4>
          </div>
          <div className="format-grid">
            {AUDIO_FORMATS.map((f) => (
              <button
                key={f.target}
                className={`format-tile${selected === f.target ? ' selected' : ''}`}
                onClick={() => setSelected(f.target)}
              >
                <span className="format-tile-name">{f.ext}</span>
                <span className="format-tile-desc">{f.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Formats */}
        <div className={styles.videoSection}>
          <div className={styles.formatSectionHeader}>
            <span className={`material-symbols-outlined ${styles.formatSectionIcon}`}>movie</span>
            <h4 className={`label-md ${styles.formatSectionLabel}`}>视频格式</h4>
          </div>
          <div className="format-grid">
            {VIDEO_FORMATS.map((f) => (
              <button
                key={f.target}
                className={`format-tile${selected === f.target ? ' selected' : ''}`}
                onClick={() => setSelected(f.target)}
              >
                <span className="format-tile-name">{f.ext}</span>
                <span className="format-tile-desc">{f.desc}</span>
              </button>
            ))}
            <div className="format-tile disabled">
              <span className={`format-tile-name ${styles.moreFormatName}`}>更多</span>
              <span className={`format-tile-desc ${styles.moreFormatDesc}`}>敬请期待</span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className={styles.startSection}>
          <button className="btn-full" disabled={!selected} onClick={handleStart}>
            <span className={`material-symbols-outlined ${styles.btnIcon}`}>bolt</span>
            开始转换
          </button>
          {selected && (
            <p className={`label-sm ${styles.startHint}`}>
              <span className={styles.startHintColor}>转换时长预计: &lt; 5 秒</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
