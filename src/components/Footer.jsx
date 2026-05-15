import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <div>
          <span className="app-footer-brand">Onda</span>
          <p className="app-footer-copy">&copy; 2024 Onda. Local-first AV processing.</p>
        </div>
        <div className="app-footer-links">
          <button onClick={() => navigate('/how-it-works')}>How it works</button>
          <button onClick={() => navigate('/formats')}>Supported formats</button>
          <a href="#">Terms</a>
          <a href="#">Technology</a>
        </div>
      </div>
    </footer>
  );
}
