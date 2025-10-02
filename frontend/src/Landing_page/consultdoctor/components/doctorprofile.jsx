import React from 'react';

const DoctorProfileModal = ({ doctor, isOpen, onClose, onBookConsultation }) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center p-3" role="dialog" aria-modal="true">
      <div className="bg-white rounded shadow w-100" style={{ maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <h2 className="h5 mb-0">Doctor Profile</h2>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-3">
          <div className="d-flex flex-column flex-md-row gap-4 mb-4">
            <div className="flex-shrink-0">
              <div className="rounded-circle overflow-hidden" style={{ width: 128, height: 128 }}>
                <img src={doctor?.image} alt={doctor?.name} className="w-100 h-100 object-fit-cover" />
              </div>
            </div>
            <div className="flex-grow-1">
              <h1 className="h4 mb-2">Dr. {doctor?.name}</h1>
              <div className="mb-2 text-muted">{doctor?.specialization}</div>
              <div className="d-flex flex-wrap align-items-center gap-3 mb-3 small">
                <span className="d-inline-flex align-items-center gap-1">
                  <i className="fas fa-star text-warning"></i>
                  <span className="fw-semibold">{doctor?.rating}</span>
                  <span className="text-muted">({doctor?.reviewCount} reviews)</span>
                </span>
                <span className="d-inline-flex align-items-center gap-1">
                  <i className="fas fa-award text-primary"></i>
                  <span className="text-muted">{doctor?.experience} years experience</span>
                </span>
                <span className="d-inline-flex align-items-center gap-1">
                  <i className="fas fa-users text-secondary"></i>
                  <span className="text-muted">{doctor?.patientsConsulted}+ patients</span>
                </span>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {doctor?.languages?.map((language, index) => (
                  <span key={index} className="badge text-bg-light">{language}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-lg-6">
              <div className="mb-3">
                <h3 className="h6 mb-3 d-flex align-items-center gap-2">
                  <i className="fas fa-graduation-cap"></i>
                  Education
                </h3>
                <div className="mb-2 p-3 bg-light rounded">
                  <div className="fw-medium">{doctor?.degree}</div>
                  <div className="small text-muted">{doctor?.medicalCollege}</div>
                  <div className="small text-muted">{doctor?.graduationYear}</div>
                </div>
                {doctor?.additionalQualifications?.map((qual, index) => (
                  <div key={index} className="mb-2 p-3 bg-light rounded">
                    <div className="fw-medium">{qual?.degree}</div>
                    <div className="small text-muted">{qual?.institution}</div>
                    <div className="small text-muted">{qual?.year}</div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h3 className="h6 mb-3 d-flex align-items-center gap-2">
                  <i className="fas fa-stethoscope"></i>
                  Specializations
                </h3>
                <div className="d-flex flex-wrap gap-2">
                  {doctor?.subspecializations?.map((spec, index) => (
                    <span key={index} className="badge text-bg-primary-subtle text-primary">{spec}</span>
                  ))}
                </div>
              </div>

              {doctor?.awards && (
                <div className="mb-3">
                  <h3 className="h6 mb-3 d-flex align-items-center gap-2">
                    <i className="fas fa-trophy"></i>
                    Awards & Recognition
                  </h3>
                  {doctor?.awards?.map((award, index) => (
                    <div key={index} className="d-flex align-items-start gap-2 p-3 bg-light rounded mb-2">
                      <i className="fas fa-award text-warning mt-1"></i>
                      <div>
                        <div className="fw-medium">{award?.title}</div>
                        <div className="small text-muted">{award?.organization} • {award?.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="col-12 col-lg-6">
              <div className="mb-3">
                <h3 className="h6 mb-3 d-flex align-items-center gap-2">
                  <i className="fas fa-video"></i>
                  Consultation Options
                </h3>
                <div className="d-flex flex-column gap-2">
                  {doctor?.consultationTypes?.map((type, index) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="fw-medium">{type?.name}</div>
                        <span className="fw-bold text-primary">₹{type?.price}</span>
                      </div>
                      <div className="small text-muted mb-2">{type?.description}</div>
                      <div className="d-flex align-items-center gap-3 small text-muted">
                        <span className="d-inline-flex align-items-center gap-1">
                          <i className="far fa-clock"></i>
                          {type?.duration} mins
                        </span>
                        <span className="d-inline-flex align-items-center gap-1">
                          <i className="far fa-calendar"></i>
                          Available today
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <h3 className="h6 mb-3 d-flex align-items-center gap-2">
                  <i className="far fa-comments"></i>
                  Recent Reviews
                </h3>
                <div className="d-flex flex-column gap-2">
                  {doctor?.recentReviews?.map((review, index) => (
                    <div key={index} className="p-3 bg-light rounded">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                            <span className="text-white small fw-medium">{review?.patientName?.charAt(0)}</span>
                          </div>
                          <span className="fw-medium">{review?.patientName}</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          {[...Array(5)]?.map((_, i) => (
                            <i key={i} className={`fas fa-star ${i < review?.rating ? 'text-warning' : 'text-muted'}`}></i>
                          ))}
                        </div>
                      </div>
                      <div className="small text-muted">{review?.comment}</div>
                      <div className="small text-muted mt-1">{review?.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between p-3 border-top">
          <div className="small text-muted">
            <div>Available for consultation</div>
            <div>Next slot: {doctor?.nextSlot}</div>
          </div>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={() => onBookConsultation(doctor)}>
              <i className="far fa-calendar me-2"></i>
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileModal;


