import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCoins, 
  faBox, 
  faUsers, 
  faStar 
} from '@fortawesome/free-solid-svg-icons';

function MedSahiCoinsWallet({ balance = 0, earningHistory = [] }) {
  const getEarningIcon = (type) => {
    switch(type) {
      case 'return':
        return faBox;
      case 'referral':
        return faUsers;
      default:
        return faStar;
    }
  };

  const getEarningColors = (type) => {
    switch(type) {
      case 'return':
        return {
          bg: 'rgba(25, 135, 84, 0.1)',
          text: '#198754'
        };
      case 'referral':
        return {
          bg: 'rgba(13, 202, 240, 0.1)',
          text: '#0dcaf0'
        };
      default:
        return {
          bg: 'rgba(13, 110, 253, 0.1)',
          text: '#0d6efd'
        };
    }
  };

  return (
    <section className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body p-4 p-md-5">
          {/* Header with Balance */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 pb-4 border-bottom">
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: 'rgba(255, 193, 7, 0.1)'
                }}
              >
                <FontAwesomeIcon 
                  icon={faCoins} 
                  size="xl" 
                  style={{ color: '#ffc107' }}
                />
              </div>
              <div>
                <h3 className="h5 fw-bold mb-1">MedSahi Coins</h3>
                <p className="text-muted small mb-0">Your reward balance</p>
              </div>
            </div>
            <div className="text-md-end">
              <div 
                className="display-5 fw-bold mb-1"
                style={{ 
                  color: '#ffc107',
                  textShadow: '0 2px 4px rgba(255, 193, 7, 0.2)'
                }}
              >
                ₹{balance}
              </div>
              <p className="text-muted small mb-0">Available Balance</p>
            </div>
          </div>

          {/* Recent Earnings Section */}
          <div>
            <h4 className="h6 fw-semibold mb-3">Recent Earnings</h4>
            <div className="d-flex flex-column gap-3">
              {earningHistory?.map((earning, index) => {
                const colors = getEarningColors(earning?.type);
                return (
                  <div 
                    key={index} 
                    className="d-flex justify-content-between align-items-center p-3 rounded-3"
                    style={{ 
                      backgroundColor: '#f8f9fa',
                      border: '1px solid #e9ecef',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e9ecef';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: colors.bg,
                          flexShrink: 0
                        }}
                      >
                        <FontAwesomeIcon 
                          icon={getEarningIcon(earning?.type)} 
                          style={{ color: colors.text }}
                        />
                      </div>
                      <div>
                        <p className="mb-1 fw-medium small">
                          {earning?.description}
                        </p>
                        <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>
                          {earning?.date}
                        </p>
                      </div>
                    </div>
                    <div 
                      className="fw-semibold"
                      style={{ 
                        color: '#198754',
                        fontSize: '0.95rem',
                        whiteSpace: 'nowrap',
                        marginLeft: '1rem'
                      }}
                    >
                      +₹{earning?.amount}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Empty State (if no earning history) */}
          {(!earningHistory || earningHistory.length === 0) && (
            <div className="text-center py-5">
              <FontAwesomeIcon 
                icon={faCoins} 
                size="3x" 
                className="text-muted mb-3"
                style={{ opacity: 0.3 }}
              />
              <p className="text-muted">No earnings yet. Start returning medicines to earn rewards!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MedSahiCoinsWallet;