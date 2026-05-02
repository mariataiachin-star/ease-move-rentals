import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Packages from "@/components/Packages";
import Stories from "@/components/Stories";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import BookingDialog from "@/components/BookingDialog";
import type { PackageId } from "@/data/packages";

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageId | undefined>(undefined);

  const handleSelect = (id: PackageId) => {
    setSelectedPackage(id);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Packages onSelect={handleSelect} />
        <Stories />
        <Faq />
      </main>
      <Footer />
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} initialPackage={selectedPackage} />
    </div>
  );
};

export default Index;
