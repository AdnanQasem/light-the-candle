import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

const LanguageToggle = ({ className }: { className?: string }) => {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border/80 bg-white/80 p-1 shadow-[0_8px_20px_rgba(15,23,42,0.06)] backdrop-blur-sm",
        className,
      )}
      role="group"
      aria-label={locale === "ar" ? "تبديل اللغة" : "Language switcher"}
    >
      {[
        { code: "en" as const, label: "EN" },
        { code: "ar" as const, label: "AR" },
      ].map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLocale(option.code)}
          className={cn(
            "min-h-9 rounded-full px-3 text-xs font-semibold tracking-[0.16em] transition-colors",
            locale === option.code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
          aria-pressed={locale === option.code}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
