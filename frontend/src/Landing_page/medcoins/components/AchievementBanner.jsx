import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShield, 
  faUsers, 
  faPiggyBank, 
  faLeaf, 
  faDroplet, 
  faCalendar, 
  faTrophy, 
  faStar, 
  faCheckCircle 
} from '@fortawesome/free-solid-svg-icons';

function AchievementBadges({ achievements, progress }) {
  const iconMap = {
    Shield: faShield,
    Users: faUsers,
    PiggyBank: faPiggyBank,
    Leaf: faLeaf,
    Droplets: faDroplet,
    Calendar: faCalendar
  };

  const colorStyles = {
    success: {
      bg: 'rgba(25, 135, 84, 0.1)',
      border: '#198754',
      text: '#198754'
    },
    info: {
      bg: 'rgba(13, 202, 240, 0.1)',
      border: '#0dcaf0',
      text: '#0dcaf0'
    },
    warning: {
      bg: 'rgba(255, 193, 7, 0.1)',
      border: '#ffc107',
      text: '#ffc107'
    },
    primary: {
      bg: 'rgba(13, 110, 253, 0.1)',
      border: '#0d6efd',
      text: '#0d6efd'
    },
    secondary: {
      bg: 'rgba(108, 117, 125, 0.1)',
      border: '#6c757d',
      text: '#6c757d'
    }
  };

  const allBadges = [
    {
      id: 1,
      name: 'Eco Warrior',
      description: 'Return 50 medicines',
      icon: 'Shield',
      color: 'success',
      requirement: 50,
      current: progress?.medicinesReturned || 0,
      unlocked: achievements?.includes('eco_warrior')
    },
    {
      id: 2,
      name: 'Community Champion',
      description: 'Refer 10 friends',
      icon: 'Users',
      color: 'info',
      requirement: 10,
      current: progress?.referrals || 0,
      unlocked: achievements?.includes('community_champion')
    },
    {
      id: 3,
      name: 'Savings Master',
      description: 'Save ₹5000 on medicines',
      icon: 'PiggyBank',
      color: 'warning',
      requirement: 5000,
      current: progress?.totalSavings || 0,
      unlocked: achievements?.includes('savings_master')
    },
    {
      id: 4,
      name: 'Green Guardian',
      description: 'Prevent 100kg CO₂ emissions',
      icon: 'Leaf',
      color: 'primary',
      requirement: 100,
      current: progress?.co2Prevented || 0,
      unlocked: achievements?.includes('green_guardian')
    },
    {
      id: 5,
      name: 'Water Saver',
      description: 'Save 500L of water',
      icon: 'Droplets',
      color: 'info',
      requirement: 500,
      current: progress?.waterSaved || 0,
      unlocked: achievements?.includes('water_saver')
    },
    {
      id: 6,
      name: 'Consistency King',
      description: 'Active for 12 months',
      icon: 'Calendar',
      color: 'secondary',
      requirement: 12,
      current: progress?.monthsActive || 0,
      unlocked: achievements?.includes('consistency_king')
    }
  ];

  const getProgressPercentage = (current, requirement) => {
    return Math.min((current / requirement) * 100, 100);
  };

  const nextBadge = allBadges.find(b => !b.unlocked);

  return (
    <section className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body p-4 p-md-5">
          {/* Header */}
          <div className="d-flex align-items-center mb-4">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center me-3" 
              style={{ 
                width: '56px', 
                height: '56px', 
                backgroundColor: 'rgba(255, 193, 7, 0.15)' 
              }}
            >
              <FontAwesomeIcon icon={faTrophy} size="2x" style={{ color: '#ffc107' }} />
            </div>
            <div>
              <h3 className="h4 fw-bold mb-1">Achievement Badges</h3>
              <p className="text-muted mb-0">Unlock badges by reaching milestones</p>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="row g-4">
            {allBadges.map((badge) => {
              const colors = colorStyles[badge.color];
              return (
                <div key={badge.id} className="col-12 col-md-6 col-lg-4">
                  <div 
                    className="card h-100"
                    style={{ 
                      backgroundColor: badge.unlocked ? colors.bg : '#fff',
                      border: badge.unlocked ? `2px solid ${colors.border}` : '1px solid #dee2e6',
                      transition: 'all 0.3s ease',
                      boxShadow: badge.unlocked ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    <div className="card-body text-center p-4">
                      {/* Icon */}
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{
                          width: '72px',
                          height: '72px',
                          backgroundColor: badge.unlocked ? colors.bg : '#f8f9fa'
                        }}
                      >
                        <FontAwesomeIcon 
                          icon={iconMap[badge.icon]} 
                          size="2x"
                          style={{ color: badge.unlocked ? colors.text : '#6c757d' }}
                        />
                      </div>
                      
                      {/* Badge Info */}
                      <h5 className="fw-bold mb-2">{badge.name}</h5>
                      <p className="text-muted small mb-3">{badge.description}</p>

                      {/* Progress Section */}
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-muted small">Progress</span>
                          <span 
                            className="small fw-semibold"
                            style={{ color: badge.unlocked ? '#198754' : '#6c757d' }}
                          >
                            {badge.unlocked ? 'Unlocked!' : `${badge.current}/${badge.requirement}`}
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        {!badge.unlocked && (
                          <div className="progress" style={{ height: '8px' }}>
                            <div 
                              className="progress-bar"
                              role="progressbar"
                              style={{ 
                                width: `${getProgressPercentage(badge.current, badge.requirement)}%`,
                                backgroundColor: colors.text
                              }}
                              aria-valuenow={getProgressPercentage(badge.current, badge.requirement)}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        )}

                        {/* Unlocked Message */}
                        {badge.unlocked && (
                          <div className="d-flex align-items-center justify-content-center mt-2">
                            <FontAwesomeIcon 
                              icon={faCheckCircle} 
                              className="me-2" 
                              style={{ color: '#198754' }}
                            />
                            <span className="small fw-semibold" style={{ color: '#198754' }}>
                              Achievement Unlocked!
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Achievement Section */}
          <div 
            className="card mt-4" 
            style={{ 
              backgroundColor: 'rgba(13, 110, 253, 0.05)',
              border: '1px solid rgba(13, 110, 253, 0.2)'
            }}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon 
                  icon={faStar} 
                  size="xl" 
                  className="me-3" 
                  style={{ color: '#0d6efd' }}
                />
                <div>
                  <p className="fw-semibold mb-1" style={{ fontSize: '1.1rem' }}>Next Achievement</p>
                  <p className="text-muted mb-0">
                    {nextBadge 
                      ? `Unlock "${nextBadge.name}" by ${nextBadge.description.toLowerCase()}`
                      : "All achievements unlocked! You're a sustainability champion!"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AchievementBadges;