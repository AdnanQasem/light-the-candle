import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, Flame, MapPin } from "lucide-react";
import { CircleMarker, MapContainer, TileLayer, Tooltip, useMap } from "react-leaflet";
import type { LatLngBoundsExpression, LatLngExpression } from "leaflet";

interface Region {
  name: string;
  waiting: number;
  lit: number;
  urgent: number;
  fill: string;
  center: LatLngExpression;
  bounds: LatLngBoundsExpression;
}

const regions: Region[] = [
  {
    name: "North Gaza",
    waiting: 45,
    lit: 120,
    urgent: 12,
    fill: "hsl(34 92% 58%)",
    center: [31.551, 34.492],
    bounds: [
      [31.525, 34.435],
      [31.59, 34.545],
    ],
  },
  {
    name: "Gaza City",
    waiting: 78,
    lit: 245,
    urgent: 22,
    fill: "hsl(24 86% 64%)",
    center: [31.5017, 34.4668],
    bounds: [
      [31.455, 34.395],
      [31.53, 34.515],
    ],
  },
  {
    name: "Deir al-Balah",
    waiting: 56,
    lit: 178,
    urgent: 10,
    fill: "hsl(42 84% 62%)",
    center: [31.4178, 34.3503],
    bounds: [
      [31.39, 34.3],
      [31.445, 34.405],
    ],
  },
  {
    name: "Khan Yunis",
    waiting: 67,
    lit: 142,
    urgent: 9,
    fill: "hsl(34 76% 56%)",
    center: [31.3462, 34.3039],
    bounds: [
      [31.315, 34.245],
      [31.38, 34.355],
    ],
  },
  {
    name: "Rafah",
    waiting: 34,
    lit: 73,
    urgent: 5,
    fill: "hsl(18 75% 63%)",
    center: [31.2969, 34.2436],
    bounds: [
      [31.255, 34.2],
      [31.325, 34.295],
    ],
  },
];

const gazaCenter: LatLngExpression = [31.4307, 34.3786];
const gazaBounds: LatLngBoundsExpression = [
  [31.24, 34.18],
  [31.61, 34.58],
];

const totalUnlit = regions.reduce((sum, region) => sum + region.waiting, 0);
const totalLit = regions.reduce((sum, region) => sum + region.lit, 0);
const totalUrgent = regions.reduce((sum, region) => sum + region.urgent, 0);

const MapViewport = ({ selected }: { selected: Region }) => {
  const map = useMap();

  useEffect(() => {
    map.flyToBounds(selected.bounds, {
      padding: [56, 56],
      maxZoom: 12.6,
      duration: 1.1,
    });
  }, [map, selected]);

  useEffect(() => {
    map.setMaxBounds(gazaBounds);
    map.setMinZoom(10.8);
  }, [map]);

  return null;
};

const GazaMapSection = () => {
  const [selected, setSelected] = useState<Region>(regions[1]);

  const selectedSummary = useMemo(
    () => [
      { label: "Waiting candles", value: selected.waiting, tone: "text-foreground" },
      { label: "Candles lit", value: selected.lit, tone: "text-amber" },
      { label: "Urgent cases", value: selected.urgent, tone: "text-urgent" },
    ],
    [selected],
  );

  return (
    <section className="section-shell uniform-section px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 max-w-3xl"
        >
          <div className="section-kicker mb-4">
            <MapPin className="h-3.5 w-3.5" />
            Gaza map
          </div>
          <h2 className="editorial-title">See where support is reaching across Gaza.</h2>
          <p className="editorial-copy mt-4">
            This section now uses a real Leaflet map with approximate governorate positions, smoother focus transitions,
            and the same case data surfaced in the panel beside it.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="dark-panel relative overflow-hidden rounded-[38px] p-6 md:p-8"
          >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber/18 blur-3xl" />

            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-primary-foreground/52">Governorate overview</div>
                <div className="mt-2 text-3xl font-semibold text-primary-foreground md:text-4xl">
                  Real map tiles, approximate safe markers
                </div>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-primary-foreground/70">
                Approximate for safety
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Waiting", value: totalUnlit, icon: MapPin, tone: "text-primary-foreground" },
                { label: "Lit", value: totalLit, icon: Flame, tone: "text-amber" },
                { label: "Urgent", value: totalUrgent, icon: AlertCircle, tone: "text-[#ff8a70]" },
              ].map(({ label, value, icon: Icon, tone }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-4"
                >
                  <Icon className={`mb-3 h-5 w-5 ${tone}`} />
                  <div className="text-xs uppercase tracking-[0.24em] text-primary-foreground/50">{label}</div>
                  <div className="mt-1 text-3xl font-semibold text-primary-foreground">{value}</div>
                </motion.div>
              ))}
            </div>

            <div className="leaflet-shell relative mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-3">
              <div className="pointer-events-none absolute left-4 top-4 z-[500] rounded-full border border-white/12 bg-black/28 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-primary-foreground/86 backdrop-blur-md">
                Gaza Strip Overview
              </div>
              <MapContainer
                center={gazaCenter}
                zoom={11.4}
                scrollWheelZoom={false}
                dragging={false}
                doubleClickZoom={false}
                boxZoom={false}
                keyboard={false}
                zoomControl={false}
                attributionControl={false}
                maxBounds={gazaBounds}
                maxBoundsViscosity={1}
                className="h-[520px] w-full rounded-[26px]"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <MapViewport selected={selected} />
                {regions.map((region) => {
                  const isSelected = selected.name === region.name;

                  return (
                    <CircleMarker
                      key={region.name}
                      center={region.center}
                      radius={isSelected ? 22 : 16}
                      pathOptions={{
                        color: isSelected ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                        weight: 3,
                        fillColor: region.fill,
                        fillOpacity: isSelected ? 0.95 : 0.72,
                      }}
                      eventHandlers={{
                        click: () => setSelected(region),
                      }}
                    >
                      <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={isSelected}>
                        <div className="space-y-1">
                          <div className="text-xs font-semibold uppercase tracking-[0.18em]">{region.name}</div>
                          <div className="text-xs">{region.waiting} waiting candles</div>
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-5"
          >
            <div className="glass-panel rounded-[34px] p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-full bg-amber/12 p-3 text-amber">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Selected governorate</div>
                  <div className="text-3xl font-semibold text-foreground">{selected.name}</div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="grid gap-4 sm:grid-cols-3"
                >
                  {selectedSummary.map(({ label, value, tone }) => (
                    <motion.div
                      key={label}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.18 }}
                      className="rounded-[22px] border border-border/70 bg-background/70 p-4"
                    >
                      <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{label}</div>
                      <div className={`mt-2 text-3xl font-semibold ${tone}`}>{value}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                The map uses approximate coordinates for safety and privacy while still reflecting Gaza&apos;s north-to-south governorate sequence.
              </p>
            </div>

            <div className="warm-panel rounded-[34px] p-5">
              <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">Regional list</div>
              <div className="space-y-3">
                {regions.map((region) => (
                  <motion.button
                    key={region.name}
                    onClick={() => setSelected(region)}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className={`flex w-full items-center justify-between rounded-[22px] border px-4 py-4 text-left transition-all duration-300 ${
                      selected.name === region.name
                        ? "border-amber bg-amber/8"
                        : "border-border/70 bg-background/65 hover:border-amber/30"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-foreground">{region.name}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        {region.waiting} waiting • {region.lit} lit
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <div>{region.urgent} urgent</div>
                      <div className={region.urgent >= 10 ? "text-urgent" : "text-muted-foreground"}>
                        {region.urgent >= 10 ? "High concentration" : "Moderate concentration"}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GazaMapSection;
