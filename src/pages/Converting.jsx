import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Converting() {
  const navigate = useNavigate();
  const { file, targetFormat } = useAppContext();
  const [percent, setPercent] = useState(0);

  // Redirect if no file
  useEffect(() => {
    if (!file) navigate('/', { replace: true });
  }, [file, navigate]);

  // Simulate progress
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

  // Navigate to done
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
      {/* Background decoration */}
      <div className="bg-decoration">
        <div className="bg-blob-1" />
        <div className="bg-blob-2" />
      </div>

      <div style={{
        minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, width: '100%', display: 'flex', flexDirection: 'column', gap: 48, alignItems: 'center' }}>
          {/* File info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'center',
              padding: '8px 16px', background: 'rgba(224,227,230,0.5)',
              borderRadius: 'var(--radius-full)', color: 'var(--on-secondary-container)',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>audio_file</span>
              <span className="label-md">{file.name}</span>
            </div>
            <h1 className="display-lg">正在处理音频...</h1>
            <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>
              正在应用深度降噪与声学增强
            </p>
          </div>

          {/* Circular Progress */}
          <div className="progress-circle-wrap" style={{ position: 'relative' }}>
            <div style={{ position: 'relative', width: 320, height: 320 }}>
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
              {/* Center content */}
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
              }}>
                <span className="display-lg" style={{ color: 'var(--primary)' }}>{displayPercent}%</span>
                <div className="wave-container">
                  {[40, 70, 50, 90, 60, 80, 45, 75].map((h, i) => (
                    <div key={i} className="wave-bar" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating tech insight */}
            <div style={{
              position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)',
              padding: '16px 24px', borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid rgba(193,198,215,0.3)',
              display: 'flex', alignItems: 'center', gap: 16, whiteSpace: 'nowrap',
            }} className="glass-panel">
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'var(--primary-fixed)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: 'var(--on-primary-fixed)',
              }}>
                <span className="material-symbols-outlined">memory</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <p className="label-md" style={{ color: 'var(--on-surface)' }}>本地 CPU 处理</p>
                <p className="label-sm" style={{ color: 'var(--on-surface-variant)' }}>数据未离开您的设备</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ paddingTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <button className="btn-ghost" onClick={() => navigate('/')}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>cancel</span>
              取消处理
            </button>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 32,
              padding: '16px 32px', background: 'var(--surface-container-low)',
              borderRadius: 16, border: '1px solid rgba(193,198,215,0.1)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <p className="label-sm" style={{ color: 'var(--outline)' }}>预计剩余</p>
                <p className="body-md" style={{ fontWeight: 700, color: 'var(--on-surface)' }}>{remaining} 秒</p>
              </div>
              <div style={{ width: 1, height: 32, background: 'rgba(193,198,215,0.3)' }} />
              <div style={{ textAlign: 'center' }}>
                <p className="label-sm" style={{ color: 'var(--outline)' }}>处理器负载</p>
                <p className="body-md" style={{ fontWeight: 700, color: 'var(--on-surface)' }}>
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
