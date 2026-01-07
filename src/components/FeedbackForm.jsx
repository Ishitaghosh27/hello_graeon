import React, { useState } from 'react';
import { Send, AlertCircle, Check, Star } from 'lucide-react';
import { supabase } from '../supabaseClient';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'general',
        rating: 0,
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const validate = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) newErrors.name = 'Name is required';

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';

        // Rating validation
        if (formData.rating === 0) newErrors.rating = 'Please select a rating';

        // Message validation
        if (!formData.message) newErrors.message = 'Message is required';
        else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const { error: insertError } = await supabase
                .from('feedbacks')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        type: formData.type,
                        rating: formData.rating,
                        message: formData.message,
                        status: 'pending'
                    }
                ]);

            if (insertError) throw insertError;

            setSubmitted(true);
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field as user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    if (submitted) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{
                    width: '64px', height: '64px',
                    background: 'var(--success)', color: 'white',
                    borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', margin: '0 auto 1.5rem'
                }}>
                    <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Feedback Received!</h3>
                <p className="text-muted" style={{ marginBottom: '2rem' }}>
                    Thank you for helping us improve. We've received your submission and saved it to our database.
                </p>
                <button
                    onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', type: 'general', rating: 0, message: '' });
                    }}
                    className="btn btn-primary"
                >
                    Send Another
                </button>
            </div>
        );
    }

    return (
        <div>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Send us your feedback</h3>

            {submitError && (
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
                    <AlertCircle size={18} /> {submitError}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

                {/* Name */}
                <div className="mb-4">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius)',
                            border: `1px solid ${errors.name ? 'var(--error)' : 'var(--border-light)'}`,
                            outline: 'none'
                        }}
                    />
                    {errors.name && <p style={{ color: 'var(--error)', fontSize: '0.85rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><AlertCircle size={14} />{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius)',
                            border: `1px solid ${errors.email ? 'var(--error)' : 'var(--border-light)'}`,
                            outline: 'none'
                        }}
                    />
                    {errors.email && <p style={{ color: 'var(--error)', fontSize: '0.85rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><AlertCircle size={14} />{errors.email}</p>}
                </div>

                {/* Type & Rating Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="mb-4">
                    {/* Feedback Type */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius)',
                                border: '1px solid var(--border-light)',
                                background: 'white',
                                outline: 'none'
                            }}
                        >
                            <option value="general">General</option>
                            <option value="bug">Bug Report</option>
                            <option value="feature">Feature Request</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Rating */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Rating *</label>
                        <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, rating: star }));
                                        if (errors.rating) setErrors(prev => ({ ...prev, rating: null }));
                                    }}
                                    style={{ background: 'transparent', padding: 0 }}
                                >
                                    <Star
                                        size={24}
                                        fill={star <= formData.rating ? '#F59E0B' : 'transparent'}
                                        color={star <= formData.rating ? '#F59E0B' : '#CBD5E1'}
                                    />
                                </button>
                            ))}
                        </div>
                        {errors.rating && <p style={{ color: 'var(--error)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.rating}</p>}
                    </div>
                </div>

                {/* Message */}
                <div className="mb-8">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Message *</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us what you think..."
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius)',
                            border: `1px solid ${errors.message ? 'var(--error)' : 'var(--border-light)'}`,
                            resize: 'vertical',
                            outline: 'none'
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {errors.message ? (
                            <p style={{ color: 'var(--error)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><AlertCircle size={14} />{errors.message}</p>
                        ) : <div></div>}
                        <span style={{ fontSize: '0.8rem', color: formData.message.length < 10 ? 'var(--text-muted)' : 'var(--success)' }}>
                            {formData.message.length} chars
                        </span>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Submit Feedback <Send size={18} />
                        </span>
                    )}
                </button>

            </form>
        </div >
    );
};

export default FeedbackForm;
