import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SomeCtxProvider } from './sources/utils/customcontext';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SomeCtxProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </SomeCtxProvider>
);
