import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Packages from "@/components/Packages";
import Benefits from "@/components/Benefits";
import Sustainability from "@/components/Sustainability";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BookingDialog from "@/components/BookingDialog";
import KitDetailDialog from "@/components/KitDetailDialog";
import type { PackageId } from "@/data/packages";

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [viewingKit, setViewingKit] = useState<PackageId | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageId | undefined>(undefined);

  const handleSelect = (id: PackageId) => {
    setSelectedPackage(id);
    setBookingOpen(true);
    setDetailOpen(false);
  };

  const handleView = (id: PackageId) => {
    setViewingKit(id);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Packages onSelect={handleSelect} onView={handleView} />
        <Benefits />
        <Sustainability />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} initialPackage={selectedPackage} />
      <KitDetailDialog open={detailOpen} onOpenChange={setDetailOpen} kitId={viewingKit} onOrder={handleSelect} />
    </div>
  );
};

export default Index;
