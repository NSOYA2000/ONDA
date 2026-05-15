import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/', label: '首页' },
  { path: '/how-it-works', label: '工作原理' },
  { path: '/formats', label: '支持格式' },
];

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (p) => (p === '/' ? pathname === '/' : pathname.startsWith(p));

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <span className="app-logo" onClick={() => navigate('/')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate('/')}>
          Onda
        </span>

        <nav className="app-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              className={`app-nav-link${isActive(item.path) ? ' active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
          <span className="privacy-badge">
            <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>
              shield
            </span>
            Privacy First
          </span>
        </nav>
      </div>
    </header>
  );
}
