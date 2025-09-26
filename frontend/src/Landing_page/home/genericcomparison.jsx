import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const GenericComparisonWidget = () => {
  const [selectedComparison, setSelectedComparison] = useState(0);

  const comparisons = [
    {
      branded: {
        name: "Crocin 650mg",
        price: "₹45",
        manufacturer: "GSK",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop"
      },
      generic: {
        name: "Paracetamol 650mg",
        price: "₹12",
        manufacturer: "Cipla",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop"
      },
      savings: "73%",
      category: "Pain Relief"
    },
    {
      branded: {
        name: "Augmentin 625mg",
        price: "₹180",
        manufacturer: "GSK",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop"
      },
      generic: {
        name: "Amoxiclav 625mg",
        price: "₹65",
        manufacturer: "Sun Pharma",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop"
      },
      savings: "64%",
      category: "Antibiotic"
    },
    {
      branded: {
        name: "Pantop 40mg",
        price: "₹120",
        manufacturer: "Aristo",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop"
      },
      generic: {
        name: "Pantoprazole 40mg",
        price: "₹35",
        manufacturer: "Dr. Reddy's",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop"
      },
      savings: "71%",
      category: "Gastric"
    }
  ];

  const currentComparison = comparisons[selectedComparison];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">Generic vs Branded Medicine Comparison</h2>
          <p className="text-muted">
            Same active ingredients, same effectiveness, significant savings
          </p>
        </div>

        {/* Category Selector */}
        <div className="d-flex justify-content-center mb-4">
          <div className="btn-group" role="group">
            {comparisons.map((comparison, index) => (
              <button
                key={index}
                type="button"
                className={`btn ${selectedComparison === index ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setSelectedComparison(index)}
              >
                {comparison.category}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="row g-4 mb-4">
          {/* Branded */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <span className="badge bg-danger">Branded</span>
                  <i className="fas fa-arrow-trend-up text-danger"></i>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <img src={currentComparison.branded.image} alt={currentComparison.branded.name} className="img-thumbnail me-3" style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
                  <div>
                    <h5 className="card-title mb-1">{currentComparison.branded.name}</h5>
                    <p className="text-muted mb-0">by {currentComparison.branded.manufacturer}</p>
                  </div>
                </div>

                <h3 className="text-danger">{currentComparison.branded.price} <small className="text-muted">per strip</small></h3>

                <ul className="list-unstyled mt-3 mb-0">
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i>FDA Approved</li>
                  <li><i className="fas fa-check text-success me-2"></i>Quality Assured</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Generic */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100 border-success">
              <div className="card-body position-relative">
                <span className="badge bg-success position-absolute top-0 start-0 m-3">Recommended Generic</span>

                <div className="d-flex justify-content-between mb-3 mt-3"> 
                  <span className="badge bg-success">.</span>
                  <i className="fas fa-arrow-trend-down text-success"></i>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <img src={currentComparison.generic.image} alt={currentComparison.generic.name} className="img-thumbnail me-3" style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
                  <div>
                    <h5 className="card-title mb-1">{currentComparison.generic.name}</h5>
                    <p className="text-muted mb-0">by {currentComparison.generic.manufacturer}</p>
                  </div>
                </div>

                <h3 className="text-success">{currentComparison.generic.price} <small className="text-muted">per strip</small></h3>

                <ul className="list-unstyled mt-3 mb-0">
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Same Active Ingredient</li>
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i>WHO-GMP Certified</li>
                  <li><i className="fas fa-star text-primary me-2"></i>Save {currentComparison.savings}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Highlight */}
        <div className="text-center p-4 bg-light border rounded-3">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <i className="fas fa-piggy-bank text-success fs-2 me-2"></i>
            <h2 className="text-success fw-bold mb-0">Save {currentComparison.savings}</h2>
          </div>
          <p className="text-muted mb-3">
            That's ₹{parseInt(currentComparison.branded.price.slice(1)) - parseInt(currentComparison.generic.price.slice(1))} saved per strip!
          </p>
          <Link to="/find-medicines" className="btn btn-primary btn-lg">
            <i className="fas fa-search me-2"></i>
            Find More Generic Alternatives
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GenericComparisonWidget;
