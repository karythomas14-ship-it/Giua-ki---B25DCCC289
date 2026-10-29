import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Trang Chủ</Link>
      {isAuthenticated && (
        <Link to="/create" style={{ textDecoration: 'none' }}>Viết Bài</Link>
      )}
      <div style={{ marginLeft: 'auto' }}>
        {isAuthenticated ? (
          <button onClick={() => { logout(); navigate('/'); }}>Đăng Xuất</button>
        ) : (
          <Link to="/login">Đăng Nhập</Link>
        )}
      </div>
    </nav>
  );
};