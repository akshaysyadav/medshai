import React from 'react';

export default function MedicineCard({ medicine, onViewDetails, onAddToCart }) {
  return (
    <div className="card h-100">
      <div className="position-relative">
        <img src={medicine.image} alt={medicine.name} className="card-img-top" style={{ height: '150px', objectFit: 'cover' }} />
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
      
      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          <h6 className="card-title mb-1">{medicine.name}</h6>
          <small className="text-muted">Generic: {medicine.genericName}</small>
        </div>
        
        <div className="mb-2">
          <span className="badge text-bg-light me-2">{medicine.brand}</span>
          <span className="badge text-bg-primary">{medicine.category}</span>
        </div>

        <div className="d-flex align-items-center mb-2">
          <div className="d-flex align-items-center me-3">
            <i className="fas fa-star text-warning me-1"></i>
            <span className="small">{medicine.rating}</span>
            <span className="small text-muted ms-1">({medicine.reviewCount})</span>
          </div>
          {medicine.prescription && (
            <span className="badge text-bg-warning small">
              <i className="fas fa-prescription-bottle me-1"></i>
              Rx Required
            </span>
          )}
        </div>

        <p className="card-text small text-muted flex-grow-1">{medicine.description}</p>

        <div className="mt-auto">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div>
              <span className="h6 text-primary mb-0">₹{medicine.price}</span>
              {medicine.originalPrice > medicine.price && (
                <span className="small text-muted text-decoration-line-through ms-2">₹{medicine.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-outline-primary btn-sm flex-grow-1" 
              onClick={() => onViewDetails(medicine)}
            >
              <i className="fas fa-info-circle me-1"></i>
              Details
            </button>
            <button 
              type="button" 
              className={`btn btn-sm flex-grow-1 ${medicine.inStock ? 'btn-success' : 'btn-secondary'}`}
              onClick={() => onAddToCart(medicine)}
              disabled={!medicine.inStock}
            >
              <i className="fas fa-shopping-cart me-1"></i>
              {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
