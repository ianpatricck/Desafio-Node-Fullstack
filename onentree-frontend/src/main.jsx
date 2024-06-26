import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { GlobalAlertProvider } from '@/context/GlobalAlertContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalAlertProvider>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </GlobalAlertProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
