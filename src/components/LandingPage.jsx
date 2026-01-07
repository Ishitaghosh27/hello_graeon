import React from 'react';
import { MessageSquare, Star, ShieldCheck, Zap, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import FeedbackForm from './FeedbackForm';
import AuthModal from './AuthModal';
import heroImg from '../assets/hero_feedback_illustration.png';

const LandingPage = ({ onLoginSuccess }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState('signin');

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="landing-wrapper">
      {/* Navigation */}
      <nav className="glass-nav">
        <div className="container nav-content">
          <div className="logo">
            <div className="logo-icon">
              <MessageSquare size={24} color="white" />
            </div>
            <span>FeedValid</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#demo">Demo</a>
            <button className="btn btn-primary-outline" onClick={() => openAuth('signin')}>Log In</button>
            <button className="btn btn-primary" onClick={() => openAuth('signup')}>Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container grid-2 hero-content">
          <div className="hero-text">
            <div className="badge">v2.0 is live</div>
            <h1>
              Turn Feedback into <br />
              <span className="text-gradient">Actionable Insights</span>
            </h1>
            <p className="hero-subtitle">
              Collect, validate, and organize user feedback with our premium validation engine.
              Stop the noise and start building what matters.
            </p>
            <div className="hero-btns">
              <button className="btn btn-primary btn-lg" onClick={() => openAuth('signup')}>
                Try for Free <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
              </button>
              <button className="btn btn-secondary btn-lg">View Roadmap</button>
            </div>
          </div>
          <div className="hero-image-container">
            <img src={heroImg} alt="Feedback Illustration" className="hero-img" />
            <div className="hero-blob"></div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="section-lg bg-white">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Teams Choose FeedValid</h2>
            <p className="section-subtitle">The standard for modern product feedback cycles.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon bg-blue-light">
                <ShieldCheck color="var(--primary)" />
              </div>
              <h3>Automated Validation</h3>
              <p>Smart filters ensure every submission meets your quality standards before it reaches your desk.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon bg-purple-light">
                <Zap color="var(--secondary)" />
              </div>
              <h3>Instant Triage</h3>
              <p>Automatically categorize feedback into bugs, features, or general inquiries using AI-powered analysis.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon bg-emerald-light">
                <Star color="var(--accent)" />
              </div>
              <h3>Rating Intelligence</h3>
              <p>Track sentiment trends over time and identify critical pain points in your user journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="demo" className="section-lg bg-page">
        <div className="container grid-2 items-center">
          <div className="form-landing-text">
            <h2 className="section-title">See it in Action</h2>
            <p className="section-subtitle">
              Try our live demo. Experience the seamless validation and premium interface your users will love.
            </p>
            <ul className="benefits-list">
              <li><div className="bullet"></div> Real-time field validation</li>
              <li><div className="bullet"></div> Interactive star ratings</li>
              <li><div className="bullet"></div> Success confirmation states</li>
            </ul>
          </div>
          <div className="form-container-premium">
            <FeedbackForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-premium">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo mb-4">
                <div className="logo-icon">
                  <MessageSquare size={20} color="white" />
                </div>
                <span>FeedValid</span>
              </div>
              <p className="text-muted footer-desc">
                The world's most advanced feedback validation platform for product-led growth teams.
              </p>
              <div className="social-links">
                <Github size={20} />
                <Twitter size={20} />
                <Linkedin size={20} />
              </div>
            </div>
            <div className="footer-links">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Security</a>
              <a href="#">Enterprise</a>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-links">
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Graeon Tech. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onLoginSuccess={onLoginSuccess}
      />

      {/* Custom Styles specifically for Landing Page */}
      <style>{`
        .landing-wrapper {
          overflow-x: hidden;
        }
        .glass-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--glass-border);
          z-index: 1000;
          display: flex;
          align-items: center;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--text-main);
        }
        .logo-icon {
          background: var(--gradient-primary);
          padding: 0.5rem;
          border-radius: 10px;
          display: flex;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-links a {
          text-decoration: none;
          color: var(--text-muted);
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-links a:hover {
          color: var(--primary);
        }
        .hero {
          padding: 10rem 0 5rem;
          background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent),
                      radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.05), transparent);
        }
        .hero-text h1 {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .text-gradient {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          max-width: 540px;
        }
        .badge {
          display: inline-block;
          padding: 0.25rem 1rem;
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .hero-btns {
          display: flex;
          gap: 1rem;
        }
        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.125rem;
        }
        .btn-primary-outline {
          background: transparent;
          border: 1px solid var(--border-light);
          color: var(--text-main);
        }
        .btn-primary-outline:hover {
          background: var(--bg-page);
        }
        .btn-secondary {
          background: white;
          border: 1px solid var(--border-light);
          color: var(--text-main);
        }
        .btn-secondary:hover {
          box-shadow: var(--shadow-md);
        }
        .hero-image-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-img {
          max-width: 100%;
          height: auto;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.1));
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .hero-blob {
          position: absolute;
          width: 140%;
          height: 140%;
          background: var(--gradient-primary);
          opacity: 0.05;
          filter: blur(100px);
          border-radius: 50%;
          z-index: 1;
        }
        .section-lg {
          padding: 8rem 0;
        }
        .bg-white { background: white; }
        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        .section-subtitle {
          font-size: 1.125rem;
          color: var(--text-muted);
          margin-bottom: 4rem;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
        }
        .feature-card {
          padding: 2.5rem;
          background: var(--bg-page);
          border-radius: var(--radius-lg);
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid transparent;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-xl);
          background: white;
          border-color: var(--border-light);
        }
        .feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .bg-blue-light { background: rgba(99, 102, 241, 0.1); }
        .bg-purple-light { background: rgba(168, 85, 247, 0.1); }
        .bg-emerald-light { background: rgba(16, 185, 129, 0.1); }
        
        .feature-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        .feature-card p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.7;
        }
        .form-landing-text .section-subtitle {
          margin-bottom: 2rem;
        }
        .benefits-list {
          list-style: none;
          display: grid;
          gap: 1.25rem;
        }
        .benefits-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 500;
        }
        .bullet {
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
        }
        .form-container-premium {
          background: white;
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--border-light);
        }
        .footer-premium {
          padding: 6rem 0 3rem;
          background: #0f172a;
          color: white;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }
        .footer-desc {
          font-size: 1rem;
          margin-bottom: 2rem;
          opacity: 0.7;
          max-width: 300px;
        }
        .social-links {
          display: flex;
          gap: 1.5rem;
          opacity: 0.5;
        }
        .footer-links h4 {
          margin-bottom: 1.5rem;
          font-size: 1rem;
        }
        .footer-links a {
          display: block;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          margin-bottom: 0.75rem;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: white;
        }
        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          color: rgba(255,255,255,0.4);
          font-size: 0.875rem;
        }
        @media (max-width: 768px) {
          .hero-text h1 { font-size: 2.5rem; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .hero { padding-top: 8rem; }
          .nav-links { display: none; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
