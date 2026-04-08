import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import logoCandle from "@/assets/logo-candle.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img src={logoCandle} alt="Light The Candle" className="h-8 w-8" />
            <span className="font-heading text-lg font-semibold">Light The Candle</span>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            A digital humanitarian platform connecting those in need in Gaza with compassionate donors worldwide.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Platform</h4>
          <div className="space-y-2">
            {["Browse Candles", "How It Works", "Trust & Safety", "For NGOs"].map((item) => (
              <Link key={item} to="#" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Support</h4>
          <div className="space-y-2">
            {["Contact Us", "FAQ", "Privacy Policy", "Terms of Service"].map((item) => (
              <Link key={item} to="#" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Stay Connected</h4>
          <p className="text-sm text-primary-foreground/70 mb-4">
            Follow our mission and see the impact of every candle lit.
          </p>
          <div className="flex gap-4">
            {["Twitter", "Instagram", "Facebook"].map((social) => (
              <a key={social} href="#" className="text-sm text-primary-foreground/70 hover:text-amber transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-primary-foreground/50">
          © 2024 Light The Candle. All rights reserved.
        </p>
        <p className="text-xs text-primary-foreground/50 flex items-center gap-1">
          Built with <Heart className="h-3 w-3 text-amber" /> for humanity
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
