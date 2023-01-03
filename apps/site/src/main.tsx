import React from 'react';
import 'react-toggle/style.css';
import {XRayWeb} from './XRayWeb';
import 'react-toastify/dist/ReactToastify.css';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<React.StrictMode>
  <XRayWeb />
</React.StrictMode>,);