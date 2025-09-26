import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DoctorConsultationPreview = () => {
  const [onlineDoctors, setOnlineDoctors] = useState(12);

  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "General Medicine",
      experience: "15 years",
      rating: 4.9,
      consultations: 2500,
      status: "online",
      nextSlot: "Available now",
      fee: "₹299",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQadzeS41vONIfTEWPgkhrALgZ31RSwdba_AA&s"
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialty: "Cardiology",
      experience: "20 years",
      rating: 4.8,
      consultations: 3200,
      status: "online",
      nextSlot: "2:30 PM today",
      fee: "₹499",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQadzeS41vONIfTEWPgkhrALgZ31RSwdba_AA&s"
    },
    {
      id: 3,
      name: "Dr. Anita Patel",
      specialty: "Pediatrics",
      experience: "12 years",
      rating: 4.9,
      consultations: 1800,
      status: "busy",
      nextSlot: "4:00 PM today",
      fee: "₹399",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQadzeS41vONIfTEWPgkhrALgZ31RSwdba_AA&s"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineDoctors(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'busy': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Available';
      case 'busy': return 'In consultation';
      default: return 'Offline';
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="mb-3">Consult Verified Doctors Online</h2>
          <p className="mb-3 text-muted">Get expert medical advice from certified doctors available 24/7</p>
          <span className={`badge ${onlineDoctors > 0 ? 'bg-success' : 'bg-secondary'}`}>
            {onlineDoctors} doctors online now
          </span>
        </div>

        <div className="row g-4 mb-5">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-start mb-3">
                    <div className="position-relative me-3">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="rounded-circle" 
                        width="64" 
                        height="64" 
                      />
                      <span className={`position-absolute bottom-0 end-0 rounded-circle border border-white p-1 ${getStatusColor(doctor.status)}`}></span>
                    </div>
                    <div>
                      <h5 className="card-title mb-1">{doctor.name}</h5>
                      <p className="mb-0 text-primary">{doctor.specialty}</p>
                      <small className="text-muted">{doctor.experience} experience</small>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mb-3 text-center">
                    <div>
                      <i className="fas fa-star text-warning me-1"></i>
                      <strong>{doctor.rating}</strong>
                      <div><small className="text-muted">Rating</small></div>
                    </div>
                    <div>
                      <strong>{doctor.consultations.toLocaleString()}</strong>
                      <div><small className="text-muted">Consultations</small></div>
                    </div>
                  </div>

                  <div className="bg-light rounded p-2 mb-3">
                    <div className="d-flex justify-content-between">
                      <small>Status:</small>
                      <small className={doctor.status === 'online' ? 'text-success' : 'text-warning'}>
                        {getStatusText(doctor.status)}
                      </small>
                    </div>
                    <div className="d-flex justify-content-between">
                      <small>Next slot:</small>
                      <small>{doctor.nextSlot}</small>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-0">{doctor.fee}</h5>
                      <small className="text-muted">Consultation fee</small>
                    </div>
                    <button 
                      className={`btn btn-${doctor.status === 'online' ? 'primary' : 'outline-secondary'}`}
                      disabled={doctor.status !== 'online'}
                    >
                      {doctor.status === 'online' ? 'Consult Now' : 'Book Slot'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/doctor-consultation-platform" className="btn btn-success btn-lg">
            <i className="fas fa-video me-2"></i> Start Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorConsultationPreview;
