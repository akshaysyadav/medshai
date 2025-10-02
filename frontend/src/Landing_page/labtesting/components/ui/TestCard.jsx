import React from 'react';

export default function TestCard({ test, onViewDetails, onBookTest }) {
  return (
    <div className="card h-100">
      <div className="position-relative">
        <img src={test.image} alt={test.name} className="card-img-top" style={{ height: '150px', objectFit: 'cover' }} />
        {!test.available && (
          <div className="position-absolute top-0 end-0 m-2">
            <span className="badge bg-danger">Unavailable</span>
          </div>
        )}
        {test.originalPrice > test.price && (
          <div className="position-absolute top-0 start-0 m-2">
            <span className="badge bg-success">
              {Math.round(((test.originalPrice - test.price) / test.originalPrice) * 100)}% OFF
            </span>
          </div>
        )}
        {test.homeCollection && (
          <div className="position-absolute bottom-0 start-0 m-2">
            <span className="badge bg-info">
              <i className="fas fa-home me-1"></i>
              Home Collection
            </span>
          </div>
        )}
      </div>
      
      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          <h6 className="card-title mb-1">{test.name}</h6>
          <small className="text-muted">{test.lab}</small>
        </div>
        
        <div className="mb-2">
          <span className="badge text-bg-primary me-2">{test.category}</span>
          <span className="badge text-bg-light">
            <i className="far fa-clock me-1"></i>
            {test.reportTime}
          </span>
        </div>

        <div className="d-flex align-items-center mb-2">
          <div className="d-flex align-items-center me-3">
            <i className="fas fa-star text-warning me-1"></i>
            <span className="small">{test.rating}</span>
            <span className="small text-muted ms-1">({test.reviewCount})</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="fas fa-vial text-primary me-1"></i>
            <span className="small text-muted">{test.parameters.length} parameters</span>
          </div>
        </div>

        <p className="card-text small text-muted flex-grow-1">{test.description}</p>

        <div className="mt-auto">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div>
              <span className="h6 text-primary mb-0">₹{test.price}</span>
              {test.originalPrice > test.price && (
                <span className="small text-muted text-decoration-line-through ms-2">₹{test.originalPrice}</span>
              )}
            </div>
            <div className="small text-muted">
              <i className="fas fa-clock me-1"></i>
              {test.duration}
            </div>
          </div>

          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-outline-primary btn-sm flex-grow-1" 
              onClick={() => onViewDetails(test)}
            >
              <i className="fas fa-info-circle me-1"></i>
              Details
            </button>
            <button 
              type="button" 
              className={`btn btn-sm flex-grow-1 ${test.available ? 'btn-success' : 'btn-secondary'}`}
              onClick={() => onBookTest(test)}
              disabled={!test.available}
            >
              <i className="fas fa-calendar-check me-1"></i>
              {test.available ? 'Book Test' : 'Unavailable'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
