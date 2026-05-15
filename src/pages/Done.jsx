import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

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

    // Create a download from the original file with the new extension
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
      <div style={{ textAlign: 'center', padding: '128px 0' }}>
        <p className="body-lg" style={{ color: 'var(--on-surface-variant)', marginBottom: 24 }}>
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
      {/* Background decoration */}
      <div className="bg-decoration">
        <div className="bg-blob-1" />
        <div className="bg-blob-2" />
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh',
      }}>
        <div style={{ width: '100%', maxWidth: 672, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 48 }}>
          {/* Success Indicator */}
          <div className="success-circle">
            <div className="success-circle-glow" />
            <div className="success-circle-inner">
              <span className="material-symbols-outlined" style={{ fontSize: 48, fontVariationSettings: "'FILL' 0, 'wght' 600" }}>
                check_circle
              </span>
            </div>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h1 className="display-lg">转换已完成</h1>
            <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>
              您的音频文件已成功处理，并已准备好下载。
            </p>
          </div>

          {/* File Card */}
          <div className="glass-panel" style={{
            padding: 24, borderRadius: 'var(--radius-xl)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            textAlign: 'left', gap: 24, flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 48, height: 48, background: 'var(--surface-container-high)',
                borderRadius: 'var(--radius-lg)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>audio_file</span>
              </div>
              <div>
                <h3 className="label-md" style={{ color: 'var(--on-surface)' }}>{outputName}</h3>
                <p className="label-sm" style={{ color: 'var(--on-surface-variant)' }}>
                  {formatBytes(file.size)} &bull; {targetFormat ? targetFormat.toUpperCase() : 'MP3'} &bull; 320kbps
                </p>
              </div>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '4px 12px', background: 'var(--surface-container-low)',
              border: '1px solid rgba(193,198,215,0.3)', borderRadius: 'var(--radius-full)',
            }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: 18, fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
              <span className="label-sm" style={{ color: 'var(--on-surface-variant)' }}>本地处理</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 448, margin: '0 auto', width: '100%' }}>
            <button className="btn-full" onClick={handleDownload}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>download</span>
              下载文件
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <button className="btn-secondary" onClick={handleContinue}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>refresh</span>
                继续转换
              </button>
              <button className="btn-secondary" onClick={handleDownload}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>share</span>
                分享链接
              </button>
            </div>
          </div>

          {/* Security badges */}
          <div style={{
            paddingTop: 32, borderTop: '1px solid rgba(193,198,215,0.2)',
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
          }}>
            {[
              { icon: 'shield_lock', label: '端到端私密' },
              { icon: 'memory', label: '本地算力处理' },
              { icon: 'delete_sweep', label: '无云端存储' },
            ].map((item) => (
              <div key={item.icon} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ color: 'rgba(0,88,188,0.6)' }}>{item.icon}</span>
                <p className="label-sm" style={{ color: 'var(--on-surface-variant)' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
