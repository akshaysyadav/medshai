import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowTrendUp, 
  faBullseye, 
  faUsers, 
  faCalendar 
} from '@fortawesome/free-solid-svg-icons';

function ImpactChart({ monthlyData, communityAverage }) {
  const fallback = [
    { month: 'Jan', impact: 20 },
    { month: 'Feb', impact: 28 },
    { month: 'Mar', impact: 25 },
    { month: 'Apr', impact: 35 },
    { month: 'May', impact: 40 },
    { month: 'Jun', impact: 44 }
  ];
  const chartData = (monthlyData?.length ? monthlyData : fallback).map((data, index) => ({
    ...data,
    communityAvg: communityAverage?.[index]?.impact ?? Math.max(0, (data.impact || 0) - 5)
  }));

  const statsCards = [
    {
      id: 1,
      icon: faArrowTrendUp,
      value: '+23%',
      label: 'vs Last Month',
      color: '#0d6efd', // primary
      bgColor: 'rgba(13, 110, 253, 0.05)'
    },
    {
      id: 2,
      icon: faBullseye,
      value: '87%',
      label: 'Goal Achieved',
      color: '#198754', // success
      bgColor: 'rgba(25, 135, 84, 0.05)'
    },
    {
      id: 3,
      icon: faUsers,
      value: 'Top 15%',
      label: 'Community Rank',
      color: '#0dcaf0', // info
      bgColor: 'rgba(13, 202, 240, 0.05)'
    },
    {
      id: 4,
      icon: faCalendar,
      value: '6',
      label: 'Months Active',
      color: '#d63384', // accent/pink
      bgColor: 'rgba(214, 51, 132, 0.05)'
    }
  ];

  return (
    <section className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body p-4 p-md-5">
          {/* Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <div className="mb-3 mb-md-0">
              <h3 className="h5 fw-bold mb-1">Monthly Impact Trends</h3>
              <p className="text-muted small mb-0">Your progress vs community average</p>
            </div>
            <div className="d-flex gap-3">
              <div className="d-flex align-items-center">
                <div 
                  className="rounded-circle me-2"
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#2E8B57'
                  }}
                ></div>
                <span className="small text-muted">Your Impact</span>
              </div>
              <div className="d-flex align-items-center">
                <div 
                  className="rounded-circle me-2"
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#6C757D'
                  }}
                ></div>
                <span className="small text-muted">Community Avg</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-4" style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E1E8ED" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6C757D"
                  fontSize={12}
                  tick={{ fill: '#6C757D' }}
                />
                <YAxis 
                  stroke="#6C757D"
                  fontSize={12}
                  tick={{ fill: '#6C757D' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E1E8ED',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  cursor={{ stroke: '#E1E8ED', strokeWidth: 1 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="impact" 
                  stroke="#2E8B57" 
                  strokeWidth={3}
                  dot={{ fill: '#2E8B57', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#2E8B57', strokeWidth: 2, fill: '#fff' }}
                  name="Your Impact"
                />
                <Line 
                  type="monotone" 
                  dataKey="communityAvg" 
                  stroke="#6C757D" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#6C757D', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#6C757D', strokeWidth: 2, fill: '#fff' }}
                  name="Community Average"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Cards */}
          <div className="row g-3">
            {statsCards.map((card) => (
              <div key={card.id} className="col-6 col-lg-3">
                <div 
                  className="text-center p-3 rounded-3"
                  style={{ 
                    backgroundColor: card.bgColor,
                    border: `1px solid ${card.color}20`,
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <FontAwesomeIcon 
                    icon={card.icon} 
                    size="lg"
                    className="mb-2"
                    style={{ color: card.color }}
                  />
                  <div 
                    className="h5 fw-bold mb-1" 
                    style={{ color: card.color }}
                  >
                    {card.value}
                  </div>
                  <div className="small text-muted">
                    {card.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImpactChart;