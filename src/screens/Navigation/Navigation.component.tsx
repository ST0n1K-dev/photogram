import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavigationProps } from './Navigation.config';

const Navigation: React.FC<NavigationProps> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Main</div>} />
      <Route path="/profile" element={<div>Profile</div>} />
      <Route path="/direct" element={<div>Messages</div>} />
    </Routes>
    { children }
  </BrowserRouter>
);

export default Navigation;
