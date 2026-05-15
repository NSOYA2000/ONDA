import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

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
      <div style={{ textAlign: 'center', padding: '128px 0' }}>
        <p className="body-lg" style={{ color: 'var(--on-surface-variant)', marginBottom: 24 }}>
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
    <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 'var(--space-gutter)', alignItems: 'start' }}>
      {/* Left: File Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="file-card glass-panel">
          <div className="file-card-header">
            <div className="file-card-icon">
              <span className="material-symbols-outlined" style={{ fontSize: 32 }}>audio_file</span>
            </div>
            <div>
              <h2 className="headline-md" style={{ color: 'var(--on-surface)' }}>已选择文件</h2>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>本地处理，隐私无忧</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="file-card-field">
              <span className="file-card-label">文件名</span>
              <span className="file-card-value" style={{ wordBreak: 'break-all' }}>{file.name}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="file-card-field">
                <span className="file-card-label">文件大小</span>
                <span className="file-card-value" style={{ fontSize: 'var(--text-body-md)', fontWeight: 500 }}>
                  {formatBytes(file.size)}
                </span>
              </div>
              <div className="file-card-field">
                <span className="file-card-label">原始格式</span>
                <span className="file-card-value" style={{ fontSize: 'var(--text-body-md)', fontWeight: 500 }}>
                  {getExt(file.name)} {file.type ? `(${file.type.split('/').pop()})` : ''}
                </span>
              </div>
            </div>
          </div>

          <div className="privacy-notice" style={{ marginTop: 48 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>info</span>
            <p>文件将保持在本地。Onda 不会上传您的任何数据到云端服务器。</p>
          </div>
        </div>

        {/* Tech visualization image */}
        <div style={{
          height: 192, borderRadius: 'var(--radius-xl)', overflow: 'hidden',
          position: 'relative', border: '1px solid rgba(193,198,215,0.2)', boxShadow: 'var(--shadow-sm)',
        }}>
          <img
            src={import.meta.env.BASE_URL + "images/tech-wave.jpg"}
            alt="Tech visualization"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Right: Format Selection */}
      <div style={{
        padding: 32, background: 'var(--surface-container-lowest)',
        border: '1px solid var(--outline-variant)', borderRadius: 'var(--radius-xl)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        display: 'flex', flexDirection: 'column', height: 'fit-content',
      }}>
        <h3 className="headline-md" style={{ marginBottom: 32 }}>选择目标格式</h3>

        {/* Audio Formats */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--on-surface-variant)' }}>volume_up</span>
            <h4 className="label-md" style={{ color: 'var(--on-surface-variant)' }}>音频格式</h4>
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
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--on-surface-variant)' }}>movie</span>
            <h4 className="label-md" style={{ color: 'var(--on-surface-variant)' }}>视频格式</h4>
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
              <span className="format-tile-name" style={{ color: 'var(--outline)' }}>更多</span>
              <span className="format-tile-desc" style={{ color: 'var(--outline)' }}>敬请期待</span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div style={{ marginTop: 'auto', paddingTop: 32, borderTop: '1px solid rgba(193,198,215,0.2)' }}>
          <button className="btn-full" disabled={!selected} onClick={handleStart}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>bolt</span>
            开始转换
          </button>
          {selected && (
            <p style={{ textAlign: 'center', marginTop: 16 }} className="label-sm" >
              <span style={{ color: 'var(--outline)' }}>转换时长预计: &lt; 5 秒</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
