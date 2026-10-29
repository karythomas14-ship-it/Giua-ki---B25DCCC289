import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '../types';

export const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError('Tiêu đề và nội dung không được để trống!');
      return;
    }

    const newPost: Post = {
      id: 'local-' + Date.now(),
      title,
      body,
    };

    const existingPosts = JSON.parse(localStorage.getItem('localPosts') || '[]');
    localStorage.setItem('localPosts', JSON.stringify([newPost, ...existingPosts]));

    navigate('/');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Viết Bài Viết Mới</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Tiêu đề:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        <div>
          <label>Nội dung:</label>
          <textarea
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.75rem', background: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
          Đăng Bài
        </button>
      </form>
    </div>
  );
};