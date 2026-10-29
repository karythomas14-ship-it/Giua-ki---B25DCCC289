import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải dữ liệu từ máy chủ.');
        return res.json();
      })
      .then((data) => {
        // Lấy thêm bài viết từ localStorage nếu có
        const localPosts = JSON.parse(localStorage.getItem('localPosts') || '[]');
        setPosts([...localPosts, ...data]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{ padding: '2rem' }}>Đang tải dữ liệu...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Lỗi: {error}</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Danh Sách Bài Viết (MiniBlog)</h1>
      <input
        type="text"
        placeholder="Tìm kiếm theo tiêu đề..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1.5rem', fontSize: '1rem' }}
      />
      {filteredPosts.length === 0 ? (
        <p>Không tìm thấy bài viết nào.</p>
      ) : (
        filteredPosts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>
            <h2>
              <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: '#0066cc' }}>
                {post.title}
              </Link>
            </h2>
            <p>{post.body.substring(0, 100)}...</p>
          </div>
        ))
      )}
    </div>
  );
};