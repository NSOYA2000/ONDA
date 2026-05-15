import styles from './SupportedFormats.module.css';

const AUDIO_FORMATS = [
  { ext: 'MP3', desc: '通用音频格式，兼容性最佳', category: '常用' },
  { ext: 'WAV', desc: '无损音频格式，保留完整音质', category: '无损' },
  { ext: 'FLAC', desc: '无损压缩，兼顾质量与体积', category: '无损' },
  { ext: 'M4A', desc: 'Apple 生态标准音频格式', category: '常用' },
  { ext: 'AAC', desc: '高级音频编码，流媒体首选', category: '常用' },
  { ext: 'OGG', desc: '开源音频容器格式', category: '开源' },
  { ext: 'WMA', desc: 'Windows 媒体音频格式', category: '其他' },
  { ext: 'AIFF', desc: 'Mac 原生音频交换格式', category: '无损' },
];

const VIDEO_FORMATS = [
  { ext: 'MP4', desc: '最通用的视频格式，全平台支持', category: '常用' },
  { ext: 'MOV', desc: 'Apple ProRes / QuickTime 格式', category: '专业' },
  { ext: 'AVI', desc: '经典 Windows 视频容器', category: '常用' },
  { ext: 'MKV', desc: '开源多轨视频容器', category: '开源' },
  { ext: 'WEBM', desc: 'Web 优化视频格式', category: 'Web' },
  { ext: 'FLV', desc: 'Flash 视频格式（兼容模式）', category: '其他' },
];

const categoryColors = {
  '常用': '#0058bc',
  '无损': '#34C759',
  '开源': '#FF9500',
  '专业': '#5856D6',
  'Web': '#FF2D55',
  '其他': '#86868B',
};

function FormatTable({ title, icon, formats }) {
  return (
    <div className={styles.section}>
      <h2 className={`label-md ${styles.sectionHeader}`}>
        <span className={`material-symbols-outlined ${styles.sectionHeaderIcon}`}>{icon}</span>
        {title}
      </h2>
      <div className={`glass-panel ${styles.table}`}>
        <div className={styles.tableHeader}>
          <span>格式</span>
          <span>说明</span>
          <span>分类</span>
        </div>
        {formats.map((f) => (
          <div key={f.ext} className={styles.tableRow}>
            <span className={styles.formatExt}>
              .{f.ext}
            </span>
            <span className={styles.formatDesc}>
              {f.desc}
            </span>
            <span
              className={styles.categoryBadge}
              style={{
                color: categoryColors[f.category],
                background: `${categoryColors[f.category]}15`,
              }}
            >
              {f.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SupportedFormats() {
  return (
    <>
      <div className={`hero ${styles.hero}`}>
        <h1 className={`display-lg ${styles.heroTitle}`}>
          支持格式
        </h1>
        <p className={`body-lg ${styles.heroSubtitle}`}>
          Onda 支持主流音频和视频格式的互转。以下是完整的格式兼容列表。
        </p>
      </div>

      <FormatTable title="音频格式" icon="volume_up" formats={AUDIO_FORMATS} />
      <FormatTable title="视频格式" icon="movie" formats={VIDEO_FORMATS} />

      {/* Note */}
      <div className={`glass-panel ${styles.note}`}>
        <div className={styles.noteInner}>
          <span className={`material-symbols-outlined ${styles.noteIcon}`}>
            check_circle
          </span>
          <div>
            <h3 className={`label-md ${styles.noteTitle}`}>
              持续更新中
            </h3>
            <p className={`body-md ${styles.noteDesc}`}>
              我们正在不断添加更多格式支持。如果您需要的格式暂未列出，
              请随时联系我们，我们会优先考虑您的需求。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
