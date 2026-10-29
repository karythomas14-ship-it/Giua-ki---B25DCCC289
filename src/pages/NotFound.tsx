import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h1>404 - Không tìm thấy trang</h1>
      <p>Đường dẫn bạn truy cập không tồn tại.</p>
      <Link to="/">Quay về trang chủ</Link>
    </div>
  );
};