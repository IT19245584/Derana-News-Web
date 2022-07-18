
import Index from './components/client/index';
import Login from './components/admin/login';
import Admin_Dashboard from './components/admin/admin';
import News_Dashboard from './components/admin/news';
import News_category from './components/admin/news_category';
import News_Add from './components/admin/news_add';
import Staff_Dashboard from './components/admin/staff';
import Staff_Add from './components/admin/staff_add';
import Staff_Edit from './components/admin/staff_edit';
import One_News from './components/client/one_news';
import SportAndTech from './components/client/category_Wise_new';
import Gallery from './components/client/gallery';
import Edit_News from './components/admin/news_edit';

import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Admin/Login" element={<Login />} />
          <Route path="/Admin/Admin_Dashboard" element={<Admin_Dashboard />} />
          <Route path="/Admin/News" element={<News_Dashboard />} />
          <Route path="/Admin/News_category" element={<News_category />} />
          <Route path="/Admin/News_Add" element={<News_Add />} />
          <Route path="/Admin/Staff_Dashboard" element={<Staff_Dashboard />} />
          <Route path="/Admin/Staff_Add" element={<Staff_Add />} />
          <Route path="/Admin/Staff_Edit" element={<Staff_Edit />} />
          <Route path="/Admin/Edit_News" element={<Edit_News />} />
          <Route path="/Client/One_News" element={<One_News />} />
          <Route path="/Client/SportAndTech" element={<SportAndTech />} />
          <Route path="/Client/Gallery" element={<Gallery />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
