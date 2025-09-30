import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAward, 
  faBox, 
  faWind, 
  faDroplet 
} from '@fortawesome/free-solid-svg-icons';

function EnvironmentalHeroScore({ heroScore = 720, impactData = { medicinesReturned: 0, co2Prevented: 0, waterSaved: 0 } }) {
  const { medicinesReturned, co2Prevented, waterSaved } = impactData;

  const impactCards = [
    {
      id: 1,
      icon: faBox,
      value: medicinesReturned,
      label: 'Medicines Returned',
      color: '#198754', // success
      bgColor: 'rgba(25, 135, 84, 0.1)'
    },
    {
      id: 2,
      icon: faWind,
      value: `${co2Prevented}kg`,
      label: 'CO₂ Emissions Prevented',
      color: '#0dcaf0', // info
      bgColor: 'rgba(13, 202, 240, 0.1)'
    },
    {
      id: 3,
      icon: faDroplet,
      value: `${waterSaved}L`,
      label: 'Water Saved',
      color: '#d63384', // accent/pink
      bgColor: 'rgba(214, 51, 132, 0.1)'
    }
  ];

  return (
    <section className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body p-4 p-md-5">
          {/* Hero Score Header */}
          <div className="text-center mb-5">
            <div 
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            >
              <FontAwesomeIcon 
                icon={faAward} 
                size="2x" 
                style={{ color: '#0d6efd' }}
              />
            </div>
            <h2 
              className="display-4 fw-bold mb-2" 
              style={{ color: '#0d6efd' }}
            >
              {heroScore}
            </h2>
            <p className="h5 fw-semibold mb-2">Environmental Hero Score</p>
            <p className="text-muted">Your positive impact on the planet</p>
          </div>

          {/* Impact Stats Grid */}
          <div className="row g-4">
            {impactCards.map((card) => (
              <div key={card.id} className="col-12 col-md-4">
                <div 
                  className="text-center p-4 rounded-3"
                  style={{ 
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e9ecef',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                    style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: card.bgColor
                    }}
                  >
                    <FontAwesomeIcon 
                      icon={card.icon} 
                      size="lg" 
                      style={{ color: card.color }}
                    />
                  </div>
                  <div 
                    className="h3 fw-bold mb-2" 
                    style={{ color: card.color }}
                  >
                    {card.value}
                  </div>
                  <div className="text-muted small">
                    {card.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </section>
  );
}

export default EnvironmentalHeroScore;