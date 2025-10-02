import React from 'react';
import { useLabTest } from '../../LabTestContext';

export default function SearchSection() {
  const { searchQuery, setSearchQuery, sortBy, setSortBy, filteredTests } = useLabTest();

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
              placeholder="Search lab tests by name, category, or laboratory..."
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
            <option value="report-time">Fastest Reports</option>
          </select>
        </div>
      </div>
      
      <div className="row text-center mt-3">
        <div className="col-6 col-md-3">
          <div className="fw-bold text-success">{filteredTests.length}</div>
          <div className="small text-muted">Tests Available</div>
        </div>
        <div className="col-6 col-md-3">
          <div className="fw-bold text-primary">{filteredTests.filter(t => t.available).length}</div>
          <div className="small text-muted">Available Now</div>
        </div>
        <div className="col-6 col-md-3 mt-3 mt-md-0">
          <div className="fw-bold text-info">{filteredTests.filter(t => t.homeCollection).length}</div>
          <div className="small text-muted">Home Collection</div>
        </div>
        <div className="col-6 col-md-3 mt-3 mt-md-0">
          <div className="fw-bold text-warning">Trusted</div>
          <div className="small text-muted">Laboratories</div>
        </div>
      </div>
    </div>
  );
}
