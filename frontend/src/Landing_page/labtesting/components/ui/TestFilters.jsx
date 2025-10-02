import React from 'react';
import { useLabTest } from '../../LabTestContext';

export default function TestFilters() {
  const {
    categories,
    labs,
    selectedCategory,
    setSelectedCategory,
    selectedLab,
    setSelectedLab,
    priceRange,
    setPriceRange,
  } = useLabTest();

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0 d-flex align-items-center">
          <i className="fas fa-filter me-2"></i>
          Filters
        </h5>
      </div>
      <div className="card-body">
        {/* Category Filter */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-2">Test Category</h6>
          <div className="d-flex flex-column gap-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`btn btn-sm text-start ${selectedCategory === 'all' ? 'btn-primary' : 'btn-light'}`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`btn btn-sm text-start d-flex align-items-center justify-content-between ${
                  selectedCategory === category.name ? 'btn-primary' : 'btn-light'
                }`}
              >
                <span>{category.name}</span>
                <span className="small opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lab Filter */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-2">Laboratory</h6>
          <div className="d-flex flex-column gap-1">
            <button
              type="button"
              onClick={() => setSelectedLab('all')}
              className={`btn btn-sm text-start ${selectedLab === 'all' ? 'btn-primary' : 'btn-light'}`}
            >
              All Labs
            </button>
            {labs.map((lab) => (
              <button
                type="button"
                key={lab.id}
                onClick={() => setSelectedLab(lab.name)}
                className={`btn btn-sm text-start d-flex align-items-center justify-content-between ${
                  selectedLab === lab.name ? 'btn-primary' : 'btn-light'
                }`}
              >
                <span>{lab.name}</span>
                <span className="small opacity-75">({lab.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-3">
          <h6 className="fw-semibold mb-2">Price Range</h6>
          <div className="mb-2">
            <label htmlFor="priceRange" className="form-label small">
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </label>
            <input
              type="range"
              className="form-range"
              id="priceRange"
              min="0"
              max="5000"
              step="50"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            />
          </div>
          <div className="row g-2">
            <div className="col-6">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
              />
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mb-3">
          <h6 className="fw-semibold mb-2">Quick Filters</h6>
          <div className="d-flex flex-wrap gap-1">
            <button type="button" className="btn btn-outline-info btn-sm">
              <i className="fas fa-home me-1"></i>
              Home Collection
            </button>
            <button type="button" className="btn btn-outline-success btn-sm">
              <i className="fas fa-clock me-1"></i>
              Fast Reports
            </button>
            <button type="button" className="btn btn-outline-warning btn-sm">
              <i className="fas fa-star me-1"></i>
              Top Rated
            </button>
          </div>
        </div>

        {/* Clear Filters */}
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm w-100"
          onClick={() => {
            setSelectedCategory('all');
            setSelectedLab('all');
            setPriceRange([0, 5000]);
          }}
        >
          <i className="fas fa-times me-2"></i>
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
