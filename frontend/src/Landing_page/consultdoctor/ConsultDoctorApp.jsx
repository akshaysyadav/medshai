import React from 'react';
import { ConsultDoctorProvider, useConsultDoctor } from './ConsultDoctorContext';
import Hero from './components/sections/Hero';
import SearchAndStats from './components/sections/SearchAndStats';
import ConsultationTypes from './components/sections/ConsultationTypes';
import DoctorsSection from './components/sections/DoctorsSection';
import InstantConsultBanner from './components/ui/instantconsultation';
import Booking from './components/ui/booking';
import DoctorProfile from './components/ui/doctorprofile';

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


