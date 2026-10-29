import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Post, Comment } from '../types';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Kiểm tra xem có phải bài viết tự tạo trong localStorage không
    const localPosts: Post[] = JSON.parse(localStorage.getItem('localPosts') || '[]');
    const foundLocal = localPosts.find((p) => String(p.id) === id);

    if (foundLocal) {
      setPost(foundLocal);
      setComments([]); // Bài viết tự tạo tạm thời chưa có comment từ API
      setLoading(false);
    } else {
      // Fetch từ API
      Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
          if (!res.ok) throw new Error('Bài viết không tồn tại.');
          return res.json();
        }),
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`).then((res) => res.json()),
      ])
        .then(([postData, commentData]) => {
          setPost(postData);
          setComments(commentData);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div style={{ padding: '2rem' }}>Đang tải chi tiết...</div>;
  if (error || !post) return <div style={{ padding: '2rem', color: 'red' }}>Lỗi: {error || 'Không tìm thấy bài viết'}</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/">&larr; Quay lại trang chủ</Link>
      <h1>{post.title}</h1>
      <p style={{ lineHeight: '1.6' }}>{post.body}</p>

      <hr style={{ margin: '2rem 0' }} />
      <h3>Bình luận ({comments.length})</h3>
      {comments.length === 0 ? (
        <p>Chưa có bình luận nào.</p>
      ) : (
        comments.map((c) => (
          <div key={c.id} style={{ background: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>
            <strong>{c.name}</strong> <em>({c.email})</em>
            <p style={{ margin: '0.5rem 0 0 0' }}>{c.body}</p>
          </div>
        ))
      )}
    </div>
  );
};