import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import Index from '@/pages/Index';
import './index.css';

createRoot(document.getElementById('root')!).render(<><Index /><Toaster richColors /></>);
