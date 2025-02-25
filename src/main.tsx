import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.tsx';
import axios from 'axios';
import { SocketProvider } from './context/SocketContext.tsx';

axios.defaults.baseURL = import.meta.env.VITE_APP_URI;
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
      <SocketProvider>
    <App />
    </SocketProvider>
    </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
