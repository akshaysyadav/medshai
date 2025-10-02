import React from 'react';

const InstantConsultBanner = ({ onInstantConsult, availableDoctors }) => {
  return (
    <div className="p-4 mb-4 bg-primary text-white rounded">
      <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-3">
          <div className="p-3 bg-white rounded-circle text-primary">
            <i className="fas fa-bolt"></i>
          </div>
          <div>
            <h2 className="h5 mb-1">Need Urgent Medical Help?</h2>
            <p className="mb-0 small opacity-75">Connect with available doctors within 5 minutes for immediate consultation</p>
          </div>
        </div>
        <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
          <div className="text-center">
            <div className="d-flex align-items-center justify-content-center gap-2 small mb-2">
              <i className="fas fa-users"></i>
              <span>{availableDoctors} doctors available now</span>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-2 small">
              <i className="far fa-clock"></i>
              <span>Average wait time: 3 minutes</span>
            </div>
          </div>
          <button type="button" className="btn btn-light text-primary fw-semibold" onClick={onInstantConsult}>
            <i className="fas fa-video me-2"></i>
            Start Instant Consult
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstantConsultBanner;


