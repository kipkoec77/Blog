import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-xl font-semibold tracking-tight text-blue-600">
            MERN Blog
          </Link>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-slate-700 hover:text-blue-600 transition">Home</Link>
            {user ? (
              <>
                <Link to="/posts/create" className="text-slate-700 hover:text-blue-600 transition">Create Post</Link>
                <span className="text-sm text-slate-500">Welcome, {user.name}</span>
                <button onClick={handleLogout} className="inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white shadow hover:bg-red-600 transition">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-700 hover:text-blue-600 transition">Login</Link>
                <Link to="/register" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-slate-700 hover:text-blue-600 transition" onClick={() => setOpen(false)}>Home</Link>
              {user ? (
                <>
                  <Link to="/posts/create" className="text-slate-700 hover:text-blue-600 transition" onClick={() => setOpen(false)}>Create Post</Link>
                  <span className="text-sm text-slate-500">Welcome, {user.name}</span>
                  <button onClick={() => { setOpen(false); handleLogout(); }} className="inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white shadow hover:bg-red-600 transition">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-slate-700 hover:text-blue-600 transition" onClick={() => setOpen(false)}>Login</Link>
                  <Link to="/register" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition" onClick={() => setOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

