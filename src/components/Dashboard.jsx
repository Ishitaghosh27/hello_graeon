import React, { useState, useEffect } from 'react';
import {
  BarChart,
  MessageSquare,
  Users,
  Star,
  TrendingUp,
  LogOut,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { supabase } from '../supabaseClient';

const Dashboard = ({ user, onLogout }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    avgRating: 0,
    resolutionRate: 0,
    types: { bug: 0, feature: 0, general: 0, other: 0 },
    sentiment: { positive: 0, neutral: 0, negative: 0 }
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedbacks(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching feedbacks:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    if (!data.length) return;

    const total = data.length;
    const avgRating = data.reduce((acc, curr) => acc + curr.rating, 0) / total;
    const resolvedCount = data.filter(f => f.status === 'Resolved').length;

    const types = data.reduce((acc, curr) => {
      const type = curr.type.toLowerCase();
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, { bug: 0, feature: 0, general: 0, other: 0 });

    const sentiment = data.reduce((acc, curr) => {
      if (curr.rating >= 4) acc.positive++;
      else if (curr.rating === 3) acc.neutral++;
      else acc.negative++;
      return acc;
    }, { positive: 0, neutral: 0, negative: 0 });

    setStats({
      total,
      avgRating: avgRating.toFixed(1),
      resolutionRate: ((resolvedCount / total) * 100).toFixed(0),
      types,
      sentiment
    });
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar glass-effect">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <MessageSquare size={20} color="white" />
            </div>
            <span>FeedValid</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-item active"><BarChart size={18} /> Overview</div>
          <div className="nav-item"><MessageSquare size={18} /> Feedback</div>
          <div className="nav-item"><Users size={18} /> Customers</div>
          <div className="nav-item"><TrendingUp size={18} /> Insights</div>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Analytics Overview</h1>
            <p className="text-muted">Welcome back, {user.email}</p>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <Search size={18} />
              <input type="text" placeholder="Search feedback..." />
            </div>
            <div className="user-profile">
              <div className="avatar">{user.email[0].toUpperCase()}</div>
            </div>
          </div>
        </header>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Loader2 className="animate-spin" size={48} color="var(--primary)" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card glass-effect">
                <div className="stat-icon bg-blue-light"><MessageSquare color="var(--primary)" /></div>
                <div className="stat-info">
                  <span className="stat-value">{stats.total.toLocaleString()}</span>
                  <span className="stat-label">Total Feedback</span>
                </div>
              </div>
              <div className="stat-card glass-effect">
                <div className="stat-icon bg-purple-light"><Star color="var(--secondary)" /></div>
                <div className="stat-info">
                  <span className="stat-value">{stats.avgRating}</span>
                  <span className="stat-label">Avg Rating</span>
                </div>
              </div>
              <div className="stat-card glass-effect">
                <div className="stat-icon bg-emerald-light"><CheckCircle2 color="var(--accent)" /></div>
                <div className="stat-info">
                  <span className="stat-value">{stats.resolutionRate}%</span>
                  <span className="stat-label">Resolution Rate</span>
                </div>
              </div>
            </div>

            {/* Analytics Section */}
            <section className="analytics-section grid-2">
              <div className="analytics-card glass-effect">
                <h3>Sentiment Distribution</h3>
                <div className="chart-placeholder">
                  <div className="bar-group">
                    <div className="bar-label">Positive ({(stats.sentiment.positive / stats.total * 100 || 0).toFixed(0)}%)</div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${(stats.sentiment.positive / stats.total * 100) || 0}%`, background: 'var(--accent)' }}></div>
                    </div>
                  </div>
                  <div className="bar-group">
                    <div className="bar-label">Neutral ({(stats.sentiment.neutral / stats.total * 100 || 0).toFixed(0)}%)</div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${(stats.sentiment.neutral / stats.total * 100) || 0}%`, background: 'var(--primary)' }}></div>
                    </div>
                  </div>
                  <div className="bar-group">
                    <div className="bar-label">Negative ({(stats.sentiment.negative / stats.total * 100 || 0).toFixed(0)}%)</div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${(stats.sentiment.negative / stats.total * 100) || 0}%`, background: 'var(--error)' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="analytics-card glass-effect">
                <h3>Feedback by Type</h3>
                <div className="type-distribution">
                  <div className="type-item">
                    <span className="type-pill bug">Bug</span>
                    <span className="type-count">{stats.types.bug} entries</span>
                  </div>
                  <div className="type-item">
                    <span className="type-pill feature">Feature</span>
                    <span className="type-count">{stats.types.feature} entries</span>
                  </div>
                  <div className="type-item">
                    <span className="type-pill general">General</span>
                    <span className="type-count">{stats.types.general} entries</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Feedback Table */}
            <section className="table-section glass-effect">
              <div className="table-header">
                <h3>Recent Submissions</h3>
                <button className="btn btn-secondary btn-sm" onClick={fetchFeedbacks}><Filter size={14} /> Refresh</button>
              </div>
              <div className="table-container">
                {feedbacks.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    <p>No feedback submissions found yet.</p>
                  </div>
                ) : (
                  <table className="feedback-table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Type</th>
                        <th>Rating</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.map(item => (
                        <tr key={item.id}>
                          <td>
                            <div className="table-user">
                              <span className="name">{item.name}</span>
                              <span className="email">{item.email}</span>
                            </div>
                          </td>
                          <td>
                            <span className={`type-badge ${item.type.toLowerCase()}`}>{item.type}</span>
                          </td>
                          <td>
                            <div className="table-rating">
                              <Star size={14} fill="currentColor" /> {item.rating}
                            </div>
                          </td>
                          <td>{new Date(item.created_at).toLocaleDateString()}</td>
                          <td>
                            <span className={`status-pill ${item.status.toLowerCase().replace(' ', '-')}`}>
                              {item.status}
                            </span>
                          </td>
                          <td><button className="icon-btn"><MoreVertical size={16} /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <style>{`
        /* Reuse styles from previous iteration */
        .dashboard-layout { display: flex; height: 100vh; background: #f8fafc; overflow: hidden; }
        .dashboard-sidebar { width: 260px; height: 100%; border-right: 1px solid var(--border-light); display: flex; flex-direction: column; padding: 2rem 1.5rem; background: white; z-index: 10; }
        .sidebar-nav { margin-top: 3rem; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
        .nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.875rem 1rem; border-radius: var(--radius); color: var(--text-muted); font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .nav-item:hover { background: rgba(99, 102, 241, 0.05); color: var(--primary); }
        .nav-item.active { background: var(--gradient-primary); color: white; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2); }
        .sidebar-footer { padding-top: 2rem; border-top: 1px solid var(--border-light); }
        .logout-btn { width: 100%; display: flex; align-items: center; gap: 0.75rem; padding: 0.875rem 1rem; border-radius: var(--radius); color: var(--error); font-weight: 600; background: transparent; border: none; cursor: pointer; transition: background 0.2s; }
        .logout-btn:hover { background: rgba(239, 68, 68, 0.05); }
        .dashboard-main { flex: 1; height: 100%; overflow-y: auto; padding: 2rem 3rem; }
        .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .header-left h1 { font-size: 1.875rem; font-weight: 800; color: var(--text-main); }
        .header-right { display: flex; align-items: center; gap: 1.5rem; }
        .search-bar { background: white; border: 1px solid var(--border-light); padding: 0.625rem 1rem; border-radius: 100px; display: flex; align-items: center; gap: 0.75rem; width: 300px; color: var(--text-muted); }
        .search-bar input { border: none; background: transparent; width: 100%; font-size: 0.9rem; }
        .avatar { width: 40px; height: 40px; background: var(--gradient-primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3rem; }
        .stat-card { padding: 1.5rem; display: flex; align-items: center; gap: 1.25rem; position: relative; }
        .stat-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .stat-info { display: flex; flex-direction: column; }
        .stat-value { font-size: 1.5rem; font-weight: 800; color: var(--text-main); }
        .stat-label { font-size: 0.875rem; color: var(--text-muted); font-weight: 500; }
        .analytics-card { padding: 2rem; }
        .analytics-card h3 { margin-bottom: 1.5rem; font-size: 1.125rem; }
        .chart-placeholder { display: flex; flex-direction: column; gap: 1.25rem; }
        .bar-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .bar-label { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); }
        .bar-track { height: 8px; background: var(--border-light); border-radius: 100px; overflow: hidden; }
        .bar-fill { height: 100%; border-radius: 100px; }
        .type-distribution { display: flex; flex-direction: column; gap: 1rem; }
        .type-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: rgba(0,0,0,0.02); border-radius: var(--radius); }
        .type-pill { padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .type-pill.bug { background: rgba(239, 68, 68, 0.1); color: var(--error); }
        .type-pill.feature { background: rgba(168, 85, 247, 0.1); color: var(--secondary); }
        .type-pill.general { background: rgba(99, 102, 241, 0.1); color: var(--primary); }
        .type-count { font-weight: 600; font-size: 0.9rem; color: var(--text-main); }
        .table-section { padding: 2rem; }
        .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .table-container { width: 100%; overflow-x: auto; }
        .feedback-table { width: 100%; border-collapse: collapse; text-align: left; }
        .feedback-table th { padding: 1rem; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; border-bottom: 1px solid var(--border-light); }
        .feedback-table td { padding: 1.25rem 1rem; border-bottom: 1px solid var(--border-light); }
        .table-user { display: flex; flex-direction: column; }
        .table-user .name { font-weight: 700; color: var(--text-main); }
        .table-user .email { font-size: 0.8rem; color: var(--text-muted); }
        .type-badge { padding: 0.25rem 0.625rem; border-radius: 100px; font-size: 0.75rem; font-weight: 600; }
        .type-badge.bug { color: var(--error); border: 1px solid var(--error); }
        .type-badge.feature { color: var(--secondary); border: 1px solid var(--secondary); }
        .type-badge.general { color: var(--primary); border: 1px solid var(--primary); }
        .table-rating { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: #eab308; }
        .status-pill { padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.75rem; font-weight: 700; }
        .status-pill.resolved { background: rgba(16, 185, 129, 0.1); color: var(--accent); }
        .status-pill.in-progress { background: rgba(234, 179, 8, 0.1); color: #eab308; }
        .status-pill.pending { background: rgba(100, 116, 139, 0.1); color: var(--text-muted); }
        .status-pill.escalated { background: rgba(239, 68, 68, 0.1); color: var(--error); }
        .icon-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 1200px) {
          .dashboard-sidebar { width: 80px; padding: 2rem 1rem; }
          .logo span, .nav-item span, .logout-btn span, .nav-item { display: none; }
          .nav-item { display: flex; justify-content: center; }
          .dashboard-sidebar .logo span { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
