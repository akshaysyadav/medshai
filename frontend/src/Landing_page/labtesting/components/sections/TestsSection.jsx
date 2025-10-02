import React from 'react';
import { useLabTest } from '../../LabTestContext';
import TestFilters from '../ui/TestFilters';
import TestCard from '../ui/TestCard';

export default function TestsSection() {
  const { filteredTests, setSelectedTest, setBookingTest } = useLabTest();

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-3">
        <TestFilters />
      </div>
      <div className="col-12 col-lg-9">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="h5 mb-0">Available Tests ({filteredTests.length})</h3>
          <div className="small text-muted d-flex align-items-center gap-2">
            <i className="fas fa-flask"></i>
            <span>Certified laboratories & accurate results</span>
          </div>
        </div>

        {filteredTests.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">No tests found</h4>
            <p className="text-muted">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className="row g-3">
            {filteredTests.map((test) => (
              <div key={test.id} className="col-12 col-sm-6 col-xl-4">
                <TestCard
                  test={test}
                  onViewDetails={(t) => setSelectedTest(t)}
                  onBookTest={(t) => setBookingTest(t)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
