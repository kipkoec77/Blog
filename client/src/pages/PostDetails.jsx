import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { postService } from '../services/api';
import './PostDetails.css';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      const response = await postService.getPost(id);
      setPost(response.data);
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      await postService.addComment(id, { content: commentContent });
      setCommentContent('');
      loadPost(); // Reload post to get updated comments
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <div className="alert alert-danger">
          <p>Post not found.</p>
        </div>
      </div>
    );
  }

  const canEdit = user && (user.id === post.author._id || user.role === 'admin');
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="post-details">
      <div className="container">
        {canEdit && (
          <div className="post-actions">
            <button
              onClick={() => navigate(`/posts/${id}/edit`)}
              className="btn btn-secondary"
            >
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        )}

        <article className="post">
          <div className="post-header">
            <span className="post-category">{post.category?.name}</span>
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span>By {post.author?.name}</span>
              <span>{formatDate(post.createdAt)}</span>
              <span>{post.viewCount} views</span>
            </div>
          </div>

          {post.featuredImage && (
            <img
              src={`http://localhost:5000/uploads/${post.featuredImage}`}
              alt={post.title}
              className="post-featured-image"
            />
          )}

          <div className="post-content">{post.content}</div>

          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        <section className="comments">
          <h2>Comments ({post.comments?.length || 0})</h2>

          {user ? (
            <form onSubmit={handleComment} className="comment-form">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Write a comment..."
                className="form-control"
                rows="3"
              />
              <button type="submit" className="btn btn-primary">
                Post Comment
              </button>
            </form>
          ) : (
            <p className="login-prompt">
              Please <a href="/login">login</a> to leave a comment.
            </p>
          )}

          <div className="comments-list">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <div className="comment-author">{comment.user?.name}</div>
                  <div className="comment-content">{comment.content}</div>
                  <div className="comment-date">
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDetails;

