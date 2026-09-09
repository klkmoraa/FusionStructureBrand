import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../app/globals.css';
import Brandbook from '../app/page';

const root = document.getElementById('root');

if (!root) {
  throw new Error('No se encontró #root para montar el brandbook.');
}

createRoot(root).render(
  <StrictMode>
    <Brandbook />
  </StrictMode>,
);
