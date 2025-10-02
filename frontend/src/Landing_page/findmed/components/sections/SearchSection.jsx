import React from 'react';
import { useFindMed } from '../../FindMedContext';

export default function SearchSection() {
  const { searchQuery, setSearchQuery, sortBy, setSortBy, filteredMedicines } = useFindMed();

  return (
    <div className="p-3 border rounded mb-4 bg-white">
      <div className="row g-3 align-items-center">
        <div className="col-12 col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search medicines by name, generic name, or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-md-4">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
      
      <div className="row text-center mt-3">
        <div className="col-6 col-md-3">
          <div className="fw-bold text-success">{filteredMedicines.length}</div>
          <div className="small text-muted">Medicines Found</div>
        </div>
        <div className="col-6 col-md-3">
          <div className="fw-bold text-primary">{filteredMedicines.filter(m => m.inStock).length}</div>
          <div className="small text-muted">In Stock</div>
        </div>
        <div className="col-6 col-md-3 mt-3 mt-md-0">
          <div className="fw-bold text-warning">{filteredMedicines.filter(m => !m.prescription).length}</div>
          <div className="small text-muted">No Prescription</div>
        </div>
        <div className="col-6 col-md-3 mt-3 mt-md-0">
          <div className="fw-bold text-info">Fast</div>
          <div className="small text-muted">Delivery</div>
        </div>
      </div>
    </div>
  );
}
