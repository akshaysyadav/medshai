import React from 'react';
import { LabTestProvider, useLabTest } from './LabTestContext';
import Hero from './components/sections/Hero';
import SearchSection from './components/sections/SearchSection';
import TestsSection from './components/sections/TestsSection';
import TestDetails from './components/ui/TestDetails';
import BookingModal from './components/ui/BookingModal';

function InnerApp() {
  const { selectedTest, setSelectedTest, bookingTest, setBookingTest } = useLabTest();

  const handleBookTest = (test) => {
    setSelectedTest(null);
    setBookingTest(test);
  };

  const handleConfirmBooking = (bookingData) => {
    console.log('Booking confirmed:', bookingData);
    alert(`Test ${bookingData.test.name} booked successfully for ${bookingData.date} at ${bookingData.time}!`);
    setBookingTest(null);
  };

  return (
    <div className="container py-4">
      <Hero />
      <SearchSection />
      <TestsSection />

      <TestDetails
        test={selectedTest}
        isOpen={Boolean(selectedTest)}
        onClose={() => setSelectedTest(null)}
        onBookTest={handleBookTest}
      />

      <BookingModal
        test={bookingTest}
        isOpen={Boolean(bookingTest)}
        onClose={() => setBookingTest(null)}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
}

export default function LabTestApp() {
  return (
    <LabTestProvider>
      <InnerApp />
    </LabTestProvider>
  );
}
