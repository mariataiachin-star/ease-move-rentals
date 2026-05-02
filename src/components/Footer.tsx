import { Home, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background py-16">
    <div className="container mx-auto grid gap-10 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 font-display text-2xl font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-sunset text-primary-foreground">
            <Home className="h-5 w-5" />
          </span>
          NestKit
        </div>
        <p className="mt-4 max-w-sm text-sm text-background/70">
          Helping international students land softer, live lighter, and leave easier — one cozy kit at a time.
        </p>
        <div className="mt-6 flex gap-3">
          {[Instagram, Twitter, Mail].map((Icon, i) => (
            <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 transition-smooth hover:bg-primary hover:border-primary">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div>
        <p className="font-display font-bold">Company</p>
        <ul className="mt-4 space-y-2 text-sm text-background/70">
          <li>About</li><li>Cities</li><li>Sustainability</li><li>Careers</li>
        </ul>
      </div>
      <div>
        <p className="font-display font-bold">Support</p>
        <ul className="mt-4 space-y-2 text-sm text-background/70">
          <li>Help center</li><li>Contact</li><li>Terms</li><li>Privacy</li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto mt-12 border-t border-background/10 pt-6 text-center text-xs text-background/50">
      © {new Date().getFullYear()} NestKit · Made with warmth in Europe
    </div>
  </footer>
);

export default Footer;