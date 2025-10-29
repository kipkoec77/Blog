import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/70 backdrop-blur mt-10">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between py-6">
          <span className="text-base font-semibold tracking-tight text-blue-600">MERN Blog</span>
          <div className="text-sm text-slate-500">© {new Date().getFullYear()} All rights reserved</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


