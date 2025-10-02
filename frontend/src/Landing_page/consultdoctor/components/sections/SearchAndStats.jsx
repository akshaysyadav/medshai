import React from 'react';
import { useConsultDoctor } from '../../ConsultDoctorContext';

export default function SearchAndStats() {
  const { availableDoctorsCount } = useConsultDoctor();
  return (
    <div className="p-3 border rounded mb-4 bg-white">
      <div className="row g-2 align-items-center">
        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0"><i className="fas fa-search"></i></span>
            <input type="text" className="form-control border-start-0" placeholder="Search doctors by name or specialization..." />
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end">
          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted">Highest Rated</span>
            <i className="fas fa-chevron-down text-muted"></i>
          </div>
        </div>
      </div>
      <div className="row text-center mt-3">
        <div className="col-6 col-md-3">
          <div className="fw-bold text-success">6+</div>
          <div className="small text-muted">Expert Doctors</div>
        </div>
        <div className="col-6 col-md-3">
          <div className="fw-bold text-success">{availableDoctorsCount}</div>
          <div className="small text-muted">Available Now</div>
        </div>
        <div className="col-6 col-md-3 mt-3 mt-md-0">
          <div className="fw-bold text-primary">15k+</div>
          <div className="small text-muted">Consultations</div>
        </div>
        <div className="col-6 col-md-3 mt-3 mt-md-0">
          <div className="fw-bold text-warning">4.8★</div>
          <div className="small text-muted">Average Rating</div>
        </div>
      </div>
    </div>
  );
}


