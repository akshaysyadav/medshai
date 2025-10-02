import React from 'react';

export default function MedicineDetails({ medicine, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !medicine) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center p-3" role="dialog" aria-modal="true">
      <div className="bg-white rounded shadow w-100" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <h2 className="h5 mb-0">Medicine Details</h2>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-3">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="position-relative">
                <img src={medicine.image} alt={medicine.name} className="w-100 rounded" style={{ height: '200px', objectFit: 'cover' }} />
                {!medicine.inStock && (
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-danger">Out of Stock</span>
                  </div>
                )}
                {medicine.originalPrice > medicine.price && (
                  <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-success">
                      {Math.round(((medicine.originalPrice - medicine.price) / medicine.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-12 col-md-8">
              <h3 className="h4 mb-2">{medicine.name}</h3>
              <div className="mb-3">
                <span className="text-muted">Generic Name: </span>
                <span className="fw-medium">{medicine.genericName}</span>
              </div>
              
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <div className="small text-muted">Brand</div>
                  <div className="fw-medium">{medicine.brand}</div>
                </div>
                <div className="col-6">
                  <div className="small text-muted">Category</div>
                  <div className="fw-medium">{medicine.category}</div>
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center me-4">
                  <i className="fas fa-star text-warning me-1"></i>
                  <span className="fw-medium">{medicine.rating}</span>
                  <span className="text-muted ms-1">({medicine.reviewCount} reviews)</span>
                </div>
                {medicine.prescription && (
                  <span className="badge text-bg-warning">
                    <i className="fas fa-prescription-bottle me-1"></i>
                    Prescription Required
                  </span>
                )}
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <span className="h4 text-primary mb-0">₹{medicine.price}</span>
                  {medicine.originalPrice > medicine.price && (
                    <span className="text-muted text-decoration-line-through ms-2">₹{medicine.originalPrice}</span>
                  )}
                </div>
              </div>

              <p className="text-muted mb-3">{medicine.description}</p>
            </div>
          </div>

          <div className="row g-4 mt-2">
            <div className="col-12 col-md-6">
              <h5 className="h6 mb-2">
                <i className="fas fa-pills text-primary me-2"></i>
                Dosage & Usage
              </h5>
              <p className="small text-muted">{medicine.dosage}</p>
            </div>
            
            <div className="col-12 col-md-6">
              <h5 className="h6 mb-2">
                <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                Side Effects
              </h5>
              <ul className="small text-muted mb-0">
                {medicine.sideEffects.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-light rounded">
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <div className="d-flex align-items-center">
                  <i className={`fas ${medicine.inStock ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'} me-2`}></i>
                  <span className={medicine.inStock ? 'text-success' : 'text-danger'}>
                    {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              <div className="col-12 col-md-6 mt-2 mt-md-0">
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-outline-secondary flex-grow-1" onClick={onClose}>
                    Close
                  </button>
                  <button 
                    type="button" 
                    className={`btn flex-grow-1 ${medicine.inStock ? 'btn-success' : 'btn-secondary'}`}
                    onClick={() => onAddToCart(medicine)}
                    disabled={!medicine.inStock}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>
                    {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
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
