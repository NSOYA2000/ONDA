import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { AppProvider } from './context/AppContext';
import App from './App';
import './styles/fonts.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={{ token: { fontFamily: "'Sora', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif" } }}>
      <AppProvider>
        <App />
      </AppProvider>
    </ConfigProvider>
  </StrictMode>,
);
