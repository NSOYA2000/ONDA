import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import styles from './Home.module.css';

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
          <span className={`material-symbols-outlined ${styles.heroBadgeIcon}`}>lock</span>
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
              <span className={`material-symbols-outlined ${styles.dropZoneIcon}`}>upload_file</span>
            </div>
            <h3 className="drop-zone-title">拖放文件到此处</h3>
            <p className="drop-zone-hint">支持 MP4, MKV, MOV, MP3, FLAC 等主流格式</p>
            <button type="button" className="btn-primary">
              <span className={`material-symbols-outlined ${styles.btnIcon}`}>add_circle</span>
              Select File
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*,audio/*"
          className={styles.hiddenInput}
          onChange={onFileSelect}
        />

        {/* Trust badges */}
        <div className={styles.trustBadges}>
          <span className={`label-sm ${styles.trustBadge}`}>
            <span className={`material-symbols-outlined ${styles.trustBadgeIcon}`}>verified_user</span>
            浏览器内置引擎
          </span>
          <span className={`label-sm ${styles.trustBadge}`}>
            <span className={`material-symbols-outlined ${styles.trustBadgeIcon}`}>speed</span>
            硬件加速处理
          </span>
        </div>
      </section>

      {/* Benefits */}
      <div className={`benefits-section ${styles.fullBleed}`}>
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
      <section className={`tech-section ${styles.fullBleed}`}>
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

          <div className={styles.techImageCol}>
            <div className="tech-image-wrap glass-panel">
              <img src={import.meta.env.BASE_URL + "images/tech-illustration.jpg"} alt="Technology visualization" />
            </div>
            <div className={`tech-floating-card glass-panel ${styles.hiddenFloatingCard}`}>
              {'{/* Hidden on mobile */}'}
            </div>
            <div className={`glass-panel ${styles.floatingCard}`}>
              <div className={styles.floatingCardInner}>
                <div className={styles.floatingCardIcon}>
                  <span className="material-symbols-outlined">terminal</span>
                </div>
                <div>
                  <p className={`label-sm ${styles.floatingCardLabel}`}>FFmpeg Local Stack</p>
                  <p className={styles.floatingCardHint}>Active processing...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
