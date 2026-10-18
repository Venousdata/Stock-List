import React from 'react';
import { createRoot } from 'react-dom/client';

import { Widget } from './components/Widget';
import { AAPL, AMZN, DIS, WMT } from './__test__/fixtures';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Widget positions={[AAPL, AMZN, DIS, WMT]} />
  </React.StrictMode>,
);
