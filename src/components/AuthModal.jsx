import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { AlertCircle } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, initialMode = 'signin', onLoginSuccess }) => {
    const [mode, setMode] = useState(initialMode);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: '',
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === 'signup') {
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            phone: formData.phone,
                        }
                    }
                });
                if (signUpError) throw signUpError;

                // For a simple demo, we'll auto-login or expect them to be logged in
                // In most cases, signUp returns user if confirmed or needs verification
                if (data.user) {
                    onLoginSuccess(data.user);
                } else {
                    alert('Check your email for confirmation!');
                }
            } else {
                const { data, error: signInError } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (signInError) throw signInError;
                if (data.user) {
                    onLoginSuccess(data.user);
                }
            }
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="auth-modal glass-effect" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>

                <div className="auth-header">
                    <h2>{mode === 'signin' ? 'Welcome Back' : 'Create Account'}</h2>
                    <p>{mode === 'signin' ? 'Sign in to access your dashboard' : 'Join thousands of users today'}</p>
                </div>

                {error && (
                    <div className="error-message" style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--error)',
                        padding: '1rem',
                        borderRadius: 'var(--radius)',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <AlertCircle size={18} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    {mode === 'signup' && (
                        <div className="form-group">
                            <label htmlFor="phone">Contact Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="primary-btn auth-submit" disabled={loading}>
                        {loading ? 'Processing...' : (mode === 'signin' ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {mode === 'signin'
                            ? "Don't have an account? "
                            : "Already have an account? "}
                        <button
                            className="link-btn"
                            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                        >
                            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div >
    );
};

export default AuthModal;
