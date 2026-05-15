import styles from './HowItWorks.module.css';

const TECH_FEATURES = [
  {
    icon: 'memory',
    title: 'WebAssembly 原生性能',
    desc: 'Onda 将 FFmpeg 编译为 WebAssembly，在浏览器沙箱中运行，提供接近原生的编解码速度。',
  },
  {
    icon: 'developer_board',
    title: '浏览器内置引擎',
    desc: '直接利用浏览器底层 API，包括 WebCodecs、WebGPU 和 Web Workers 进行多线程并行处理。',
  },
  {
    icon: 'lock',
    title: '零数据上传',
    desc: '所有文件在您的设备上本地处理。我们绝不上传、存储或分享您的任何音频/视频文件。',
  },
  {
    icon: 'all_inclusive',
    title: '无限文件大小',
    desc: '与云端转换服务不同，Onda 没有文件大小限制。处理 4K 视频或数百 GB 文件理论上均受支持。',
  },
];

const FAQS = [
  {
    q: 'Onda 是如何工作的？',
    a: 'Onda 使用 WebAssembly 将 FFmpeg 等专业级编解码工具编译到浏览器中。文件完全在您的本地设备上处理，无需上传到任何服务器。',
  },
  {
    q: '支持哪些浏览器？',
    a: '推荐使用最新版本的 Chrome、Edge 或 Safari。Firefox 也支持，但部分性能优化可能无法完全生效。',
  },
  {
    q: '我的文件安全吗？',
    a: '是的。Onda 的设计核心理念是"本地优先"。您的文件从始至终都在您的设备上，从未离开您的浏览器。',
  },
];

export default function HowItWorks() {
  return (
    <>
      {/* Hero */}
      <div className={`hero ${styles.hero}`}>
        <h1 className={`display-lg ${styles.heroTitle}`}>
          工作原理
        </h1>
        <p className={`body-lg ${styles.heroSubtitle}`}>
          了解 Onda 如何在浏览器中实现专业级的音视频转码性能。
        </p>
      </div>

      {/* Illustration Card */}
      <div className={`glass-panel ${styles.illustrationCard}`}>
        <div className={styles.illustrationIcon}>
          <span className="material-symbols-outlined">memory</span>
        </div>
        <h2 className={`headline-md ${styles.illustrationTitle}`}>浏览器即转码引擎</h2>
        <p className={styles.illustrationDesc}>
          WebAssembly + 现代浏览器内核结合，将桌面级转码引擎无缝搬进浏览器。
        </p>
      </div>

      {/* Features */}
      <div className={styles.featuresList}>
        {TECH_FEATURES.map((f) => (
          <div key={f.icon} className={`glass-panel ${styles.featureCard}`}>
            <div className={styles.featureInner}>
              <div className={styles.featureIcon}>
                <span className="material-symbols-outlined">{f.icon}</span>
              </div>
              <div>
                <h3 className={`body-lg ${styles.featureTitle}`}>
                  {f.title}
                </h3>
                <p className={styles.featureDesc}>
                  {f.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h2 className={`label-md ${styles.faqHeader}`}>
        常见问题
      </h2>
      <div className={styles.faqList}>
        {FAQS.map((item) => (
          <div key={item.q} className={`glass-panel ${styles.faqItem}`}>
            <h3 className={styles.faqQuestion}>
              <span className={`material-symbols-outlined ${styles.faqQuestionIcon}`}>check_circle</span>
              {item.q}
            </h3>
            <p className={styles.faqAnswer}>
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
