import React, { createContext, useState, useEffect } from 'react';
import { postService, categoryService } from '../services/api';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadPosts = async (page = 1, category = null) => {
    setLoading(true);
    try {
      const response = await postService.getAllPosts(page, 10, category);
      setPosts(response.data);
      setPagination(response.pagination);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const response = await postService.createPost(postData);
      setPosts([response.data, ...posts]);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const response = await postService.updatePost(id, postData);
      setPosts(posts.map((post) => (post._id === id ? response.data : post)));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const deletePost = async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      throw error;
    }
  };

  const value = {
    posts,
    categories,
    loading,
    pagination,
    currentPage,
    loadPosts,
    createPost,
    updatePost,
    deletePost,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

