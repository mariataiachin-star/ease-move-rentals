import { Boxes, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background py-16">
    <div className="container mx-auto grid gap-10 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2.5 font-body text-2xl font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-sunset text-primary-foreground">
            <Boxes className="h-5 w-5" />
          </span>
          Survival <span className="text-primary">Kit</span>
        </div>
        <p className="mt-4 max-w-sm text-sm text-background/70">
          Sustainable rental kits for international and Erasmus students in Antwerp. Affordable, circular, and built for temporary stays.
        </p>
        <div className="mt-6 flex gap-3">
          {[Instagram, Linkedin, Mail].map((Icon, i) => (
            <a key={i} href="#" aria-label="Social link" className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 transition-smooth hover:bg-primary hover:border-primary hover:text-primary-foreground">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div>
        <p className="font-body font-bold">Platform</p>
        <ul className="mt-4 space-y-2 text-sm text-background/70">
          <li>How it works</li><li>Rental kits</li><li>Sustainability</li><li>For universities</li>
        </ul>
      </div>
      <div>
        <p className="font-body font-bold">Support</p>
        <ul className="mt-4 space-y-2 text-sm text-background/70">
          <li>Help center</li><li>Contact</li><li>Terms</li><li>Privacy</li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto mt-12 border-t border-background/10 pt-6 text-center text-xs text-background/50">
      © {new Date().getFullYear()} Survival Kit · Built for students in Antwerp
    </div>
  </footer>
);

export default Footer;