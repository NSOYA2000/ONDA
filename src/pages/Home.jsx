import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const BENEFITS = [
  { icon: 'shield', title: '100% Local Processing', desc: '所有视频和音频处理都在您的设备上完成。文件不会上传到任何服务器，确保您的隐私绝对安全。' },
  { icon: 'expand', title: 'No File Size Limits', desc: '不再受云端带宽限制。即使是 4K 高码率长视频或数百 GB 的原始素材，我们都能在本地轻松处理。' },
  { icon: 'high_quality', title: 'Lossless Quality', desc: '采用工业级解码与编码算法，确保在转换过程中保留每一个像素和音频细节。' },
];

export default function Home() {
  const navigate = useNavigate();
  const { setFile } = useAppContext();
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = useCallback((fileObj) => {
    setFile(fileObj);
    navigate('/choose-format');
  }, [setFile, navigate]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const onFileSelect = useCallback((e) => {
    const f = e.target.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>lock</span>
          私密。快速。完全在浏览器中运行。
        </div>
        <h1 className="display-lg">
          High-Fidelity Audio &amp; Video Conversion,{' '}
          <em>Right in Your Browser.</em>
        </h1>
        <p className="body-lg">
          100% 本地处理，您的文件永远不会离开您的计算机。告别服务器上传，体验最高级别的隐私与速度。
        </p>

        {/* Drop Zone */}
        <div
          className={`drop-zone${dragOver ? ' dragover' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        >
          <div className="drop-zone-inner">
            <div className="drop-zone-icon-circle">
              <span className="material-symbols-outlined" style={{ fontSize: 32 }}>upload_file</span>
            </div>
            <h3 className="drop-zone-title">拖放文件到此处</h3>
            <p className="drop-zone-hint">支持 MP4, MKV, MOV, MP3, FLAC 等主流格式</p>
            <button type="button" className="btn-primary">
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add_circle</span>
              Select File
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*,audio/*"
          style={{ display: 'none' }}
          onChange={onFileSelect}
        />

        {/* Trust badges */}
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 32, color: 'var(--on-surface-variant)' }}>
          <span className="label-sm" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--primary)' }}>verified_user</span>
            浏览器内置引擎
          </span>
          <span className="label-sm" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--primary)' }}>speed</span>
            硬件加速处理
          </span>
        </div>
      </section>

      {/* Benefits */}
      <div className="benefits-section" style={{ margin: '0 calc(var(--margin-desktop) * -1)', paddingLeft: 0, paddingRight: 0 }}>
        <div className="benefits-grid">
          {BENEFITS.map((b) => (
            <div key={b.icon} className="benefit-card">
              <div className="benefit-card-icon">
                <span className="material-symbols-outlined">{b.icon}</span>
              </div>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Section */}
      <section className="tech-section" style={{ margin: '0 calc(var(--margin-desktop) * -1)', paddingLeft: 0, paddingRight: 0 }}>
        <div className="tech-grid">
          <div>
            <h2>新一代转码引擎</h2>
            <p>Onda 结合了 WebAssembly 和现代浏览器的 WebKit 动力，将以往只能在桌面软件上运行的转码性能带到了网页中。</p>
            <ul className="tech-list">
              <li className="tech-list-item">
                <span className="material-symbols-outlined tech-list-item-icon">check_circle</span>
                <div>
                  <h5>硬件加速 WebGL</h5>
                  <span>利用 GPU 加速渲染，缩短等待时间。</span>
                </div>
              </li>
              <li className="tech-list-item">
                <span className="material-symbols-outlined tech-list-item-icon">check_circle</span>
                <div>
                  <h5>全平台兼容</h5>
                  <span>无论是 macOS、Windows 还是移动端，即开即用。</span>
                </div>
              </li>
            </ul>
          </div>

          <div style={{ position: 'relative' }}>
            <div className="tech-image-wrap glass-panel">
              <img src="/images/tech-illustration.jpg" alt="Technology visualization" />
            </div>
            <div className="tech-floating-card glass-panel" style={{ display: 'none' }}>
              {'{/* Hidden on mobile */}'}
            </div>
            <div style={{
              position: 'absolute', top: -32, left: -32,
              padding: 24, borderRadius: 'var(--radius-xl)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              transform: 'rotate(-6deg)',
              display: 'block',
            }} className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 40, height: 40, background: 'var(--primary-container)',
                  borderRadius: 'var(--radius-sm)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', color: 'var(--on-primary)',
                }}>
                  <span className="material-symbols-outlined">terminal</span>
                </div>
                <div>
                  <p className="label-sm" style={{ color: 'var(--on-surface)' }}>FFmpeg Local Stack</p>
                  <p style={{ fontSize: 10, color: 'var(--on-surface-variant)' }}>Active processing...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
