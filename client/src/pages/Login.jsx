import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.error || 'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center py-10 bg-gradient-to-b from-blue-50 to-transparent">
      <div className="w-full max-w-md px-5">
        <div className="rounded-xl bg-white p-8 shadow-xl ring-1 ring-slate-200/60 transition hover:shadow-2xl">
          <h1 className="text-center text-2xl font-semibold text-slate-800 mb-6">Login</h1>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700 transition"
              disabled={loading}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/20 via-transparent to-white/20 transition-all duration-500 group-hover:translate-x-full" />
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

