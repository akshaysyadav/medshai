import React from 'react';

export default function TestDetails({ test, isOpen, onClose, onBookTest }) {
  if (!isOpen || !test) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center p-3" role="dialog" aria-modal="true">
      <div className="bg-white rounded shadow w-100" style={{ maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <h2 className="h5 mb-0">Test Details</h2>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-3">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="position-relative">
                <img src={test.image} alt={test.name} className="w-100 rounded" style={{ height: '200px', objectFit: 'cover' }} />
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
              </div>
            </div>
            
            <div className="col-12 col-md-8">
              <h3 className="h4 mb-2">{test.name}</h3>
              <div className="mb-3">
                <span className="text-muted">Laboratory: </span>
                <span className="fw-medium">{test.lab}</span>
              </div>
              
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <div className="small text-muted">Category</div>
                  <div className="fw-medium">{test.category}</div>
                </div>
                <div className="col-6">
                  <div className="small text-muted">Report Time</div>
                  <div className="fw-medium">{test.reportTime}</div>
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center me-4">
                  <i className="fas fa-star text-warning me-1"></i>
                  <span className="fw-medium">{test.rating}</span>
                  <span className="text-muted ms-1">({test.reviewCount} reviews)</span>
                </div>
                {test.homeCollection && (
                  <span className="badge text-bg-info">
                    <i className="fas fa-home me-1"></i>
                    Home Collection Available
                  </span>
                )}
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <span className="h4 text-primary mb-0">₹{test.price}</span>
                  {test.originalPrice > test.price && (
                    <span className="text-muted text-decoration-line-through ms-2">₹{test.originalPrice}</span>
                  )}
                </div>
              </div>

              <p className="text-muted mb-3">{test.description}</p>
            </div>
          </div>

          <div className="row g-4 mt-2">
            <div className="col-12 col-md-6">
              <h5 className="h6 mb-2">
                <i className="fas fa-clipboard-list text-primary me-2"></i>
                Test Parameters ({test.parameters.length})
              </h5>
              <div className="row">
                {test.parameters.map((parameter, index) => (
                  <div key={index} className="col-12 col-sm-6 mb-1">
                    <span className="small text-muted">
                      <i className="fas fa-check text-success me-1"></i>
                      {parameter}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-12 col-md-6">
              <h5 className="h6 mb-2">
                <i className="fas fa-info-circle text-warning me-2"></i>
                Test Information
              </h5>
              <div className="small text-muted">
                <div className="mb-2">
                  <strong>Duration:</strong> {test.duration}
                </div>
                <div className="mb-2">
                  <strong>Preparation:</strong> {test.preparation}
                </div>
                <div className="mb-2">
                  <strong>Sample Collection:</strong> {test.homeCollection ? 'Home & Lab' : 'Lab Only'}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-light rounded">
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <div className="d-flex align-items-center">
                  <i className={`fas ${test.available ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'} me-2`}></i>
                  <span className={test.available ? 'text-success' : 'text-danger'}>
                    {test.available ? 'Available for Booking' : 'Currently Unavailable'}
                  </span>
                </div>
                {test.homeCollection && (
                  <div className="d-flex align-items-center mt-1">
                    <i className="fas fa-home text-info me-2"></i>
                    <span className="text-info small">Free home sample collection</span>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-6 mt-2 mt-md-0">
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-outline-secondary flex-grow-1" onClick={onClose}>
                    Close
                  </button>
                  <button 
                    type="button" 
                    className={`btn flex-grow-1 ${test.available ? 'btn-success' : 'btn-secondary'}`}
                    onClick={() => onBookTest(test)}
                    disabled={!test.available}
                  >
                    <i className="fas fa-calendar-check me-2"></i>
                    {test.available ? 'Book Test' : 'Unavailable'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
