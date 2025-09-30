import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGift, 
  faShoppingCart, 
  faHeart, 
  faTree 
} from '@fortawesome/free-solid-svg-icons';

function RedemptionOptions({ balance = 0 }) {
  const iconMap = {
    ShoppingCart: faShoppingCart,
    Heart: faHeart,
    TreePine: faTree
  };

  const colorStyles = {
    primary: {
      bg: 'rgba(13, 110, 253, 0.1)',
      border: 'rgba(13, 110, 253, 0.2)',
      text: '#0d6efd',
      iconBg: 'rgba(13, 110, 253, 0.2)'
    },
    destructive: {
      bg: 'rgba(220, 53, 69, 0.1)',
      border: 'rgba(220, 53, 69, 0.2)',
      text: '#dc3545',
      iconBg: 'rgba(220, 53, 69, 0.2)'
    },
    success: {
      bg: 'rgba(25, 135, 84, 0.1)',
      border: 'rgba(25, 135, 84, 0.2)',
      text: '#198754',
      iconBg: 'rgba(25, 135, 84, 0.2)'
    }
  };

  const redemptionOptions = [
    {
      id: 1,
      type: 'discount',
      title: 'Medicine Discounts',
      description: 'Get discounts on your next medicine purchase',
      icon: 'ShoppingCart',
      color: 'primary',
      options: [
        { amount: 50, discount: '5%', minPurchase: '₹500' },
        { amount: 100, discount: '10%', minPurchase: '₹1000' },
        { amount: 200, discount: '20%', minPurchase: '₹2000' }
      ]
    },
    {
      id: 2,
      type: 'donation',
      title: 'Healthcare NGOs',
      description: 'Donate to support healthcare initiatives',
      icon: 'Heart',
      color: 'destructive',
      options: [
        { amount: 100, impact: 'Provide medicines for 2 children' },
        { amount: 250, impact: 'Support 1 elderly patient for a month' },
        { amount: 500, impact: 'Fund health checkup for 5 families' }
      ]
    },
    {
      id: 3,
      type: 'environment',
      title: 'Tree Planting',
      description: 'Plant trees to offset carbon footprint',
      icon: 'TreePine',
      color: 'success',
      options: [
        { amount: 25, impact: 'Plant 1 tree' },
        { amount: 100, impact: 'Plant 5 trees' },
        { amount: 250, impact: 'Plant 12 trees + care for 1 year' }
      ]
    }
  ];

  return (
    <section className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body p-4 p-md-5">
          {/* Header */}
          <div className="d-flex align-items-center mb-4">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{
                width: '56px',
                height: '56px',
                backgroundColor: 'rgba(255, 193, 7, 0.1)'
              }}
            >
              <FontAwesomeIcon 
                icon={faGift} 
                size="xl" 
                style={{ color: '#ffc107' }}
              />
            </div>
            <div>
              <h3 className="h5 fw-bold mb-1">Redeem Coins</h3>
              <p className="text-muted small mb-0">Use your ₹{balance} balance for good</p>
            </div>
          </div>

          {/* Redemption Categories */}
          <div className="d-flex flex-column gap-4">
            {redemptionOptions.map((category) => {
              const colors = colorStyles[category.color];
              return (
                <div 
                  key={category.id} 
                  className="p-4 rounded-3"
                  style={{
                    backgroundColor: colors.bg,
                    border: `2px solid ${colors.border}`
                  }}
                >
                  {/* Category Header */}
                  <div className="d-flex align-items-center mb-4">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: colors.iconBg,
                        flexShrink: 0
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={iconMap[category.icon]} 
                        size="lg"
                        style={{ color: colors.text }}
                      />
                    </div>
                    <div>
                      <h4 className="h6 fw-semibold mb-1">{category.title}</h4>
                      <p className="text-muted small mb-0">{category.description}</p>
                    </div>
                  </div>

                  {/* Options Grid */}
                  <div className="row g-3">
                    {category.options.map((option, index) => {
                      const canRedeem = balance >= option.amount;
                      return (
                        <div key={index} className="col-12 col-md-4">
                          <div 
                            className="card h-100"
                            style={{
                              border: '1px solid #dee2e6',
                              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (canRedeem) {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <div className="card-body p-3 text-center">
                              {/* Amount */}
                              <div className="mb-2">
                                <div 
                                  className="h5 fw-bold mb-1"
                                  style={{ color: '#ffc107' }}
                                >
                                  ₹{option.amount}
                                </div>
                                {option.discount && (
                                  <div 
                                    className="small fw-semibold"
                                    style={{ color: '#198754' }}
                                  >
                                    {option.discount} OFF
                                  </div>
                                )}
                              </div>

                              {/* Description */}
                              <div 
                                className="text-muted mb-3"
                                style={{ fontSize: '0.8rem', minHeight: '2.5rem' }}
                              >
                                {option.minPurchase 
                                  ? `Min purchase: ${option.minPurchase}` 
                                  : option.impact
                                }
                              </div>

                              {/* Redeem Button */}
                              <button
                                className={`btn btn-sm w-100 ${
                                  canRedeem 
                                    ? 'btn-primary' 
                                    : 'btn-outline-secondary'
                                }`}
                                disabled={!canRedeem}
                                style={{
                                  fontSize: '0.85rem',
                                  padding: '0.5rem'
                                }}
                              >
                                {canRedeem ? 'Redeem' : 'Insufficient Balance'}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RedemptionOptions;