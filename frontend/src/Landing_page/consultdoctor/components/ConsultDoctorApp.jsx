import React from 'react';
import { ConsultDoctorProvider, useConsultDoctor } from './ConsultDoctorContext';
import Hero from './sections/Hero';
import SearchAndStats from './sections/SearchAndStats';
import ConsultationTypes from './sections/ConsultationTypes';
import DoctorsSection from './sections/DoctorsSection';
import InstantConsultBanner from './instantconsultation';
import Booking from './booking';
import DoctorProfile from './doctorprofile';

function InnerApp() {
  const { availableDoctorsCount, setSelectedType, bookingDoctor, setBookingDoctor, profileDoctor, setProfileDoctor } = useConsultDoctor();
  return (
    <div className="container py-4">
      <Hero />
      <InstantConsultBanner onInstantConsult={() => setSelectedType({ name: 'Instant Consult', price: 399, duration: 25 })} availableDoctors={availableDoctorsCount} />
      <SearchAndStats />
      <ConsultationTypes />
      <DoctorsSection />

      <Booking doctor={bookingDoctor} consultationType={{}} isOpen={Boolean(bookingDoctor)} onClose={() => setBookingDoctor(null)} onConfirmBooking={() => setBookingDoctor(null)} />
      <DoctorProfile doctor={profileDoctor} isOpen={Boolean(profileDoctor)} onClose={() => setProfileDoctor(null)} onBookConsultation={(d) => { setProfileDoctor(null); setBookingDoctor(d); }} />
    </div>
  );
}

export default function ConsultDoctorApp() {
  return (
    <ConsultDoctorProvider>
      <InnerApp />
    </ConsultDoctorProvider>
  );
}


