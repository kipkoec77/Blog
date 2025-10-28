import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../context/PostContext';
import PostCard from '../components/PostCard';
import './Home.css';

const Home = () => {
  const { posts, loadPosts, loading, pagination, categories } = useContext(PostContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts(1, selectedCategory);
  }, [selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality will be implemented in the service
    loadPosts(1, selectedCategory);
  };

  const handlePageChange = (page) => {
    loadPosts(page, selectedCategory);
  };

  return (
    <div className="home">
      <div className="container">
        <h1>Blog Posts</h1>
        
        <div className="filters">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-control"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            
            {pagination && (
              <div className="pagination">
                {pagination.prev && (
                  <button
                    onClick={() => handlePageChange(pagination.prev.page)}
                    className="btn btn-secondary"
                  >
                    Previous
                  </button>
                )}
                <span className="page-info">
                  Page {pagination.prev ? pagination.prev.page + 1 : 1}
                </span>
                {pagination.next && (
                  <button
                    onClick={() => handlePageChange(pagination.next.page)}
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="no-posts">
            <p>No posts found. Be the first to create a post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

