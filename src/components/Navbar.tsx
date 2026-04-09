import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";
import { useLocale } from "@/lib/locale";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { locale } = useLocale();

  const copy =
    locale === "ar"
      ? {
          navLinks: [
            { href: "/candles", label: "الحالات" },
            { href: "/#how-it-works", label: "كيف يعمل" },
            { href: "/#stories", label: "الأثر" },
            { href: "/#about", label: "من نحن" },
          ],
          explore: "استكشف",
          donate: "تبرع الآن",
          openMenu: "افتح القائمة",
          closeMenu: "أغلق القائمة",
        }
      : {
          navLinks: [
            { href: "/candles", label: "Browse Cases" },
            { href: "/#how-it-works", label: "How It Works" },
            { href: "/#stories", label: "Impact" },
            { href: "/#about", label: "About" },
          ],
          explore: "Explore",
          donate: "Donate Now",
          openMenu: "Open menu",
          closeMenu: "Close menu",
        };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="container mx-auto px-4 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link to="/" className="group flex items-center">
            <BrandLogo size="md" />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {copy.navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-amber"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-amber transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground" asChild>
              <Link to="/candles">{copy.explore}</Link>
            </Button>
            <Button variant="amber" size="sm" asChild>
              <Link to="/candles" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                {copy.donate}
              </Link>
            </Button>
          </div>

          <button
            className={`p-2 text-foreground lg:hidden ${isScrolled ? "" : ""}`}
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? copy.closeMenu : copy.openMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="overflow-hidden lg:hidden"
            >
              <div className="flex flex-col gap-2 border-t border-border pb-4 pt-4">
                {copy.navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="rounded-lg px-4 py-2 text-foreground/80 transition-colors hover:bg-amber/5 hover:text-amber"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-3 px-4">
                  <Button variant="amber" className="w-full" asChild>
                    <Link to="/candles" className="flex items-center justify-center gap-2">
                      <Heart className="h-4 w-4" />
                      {copy.donate}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;
