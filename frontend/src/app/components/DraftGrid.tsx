import React from "react";

export default function DraftGrid() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative mx-auto max-w-6xl px-6 py-12">
        {/* Dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Primary horizontal grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.35) 0, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 140px)",
          }}
        />

        <div className="relative space-y-20">
          <Section>
            <div className="h-16 rounded-xl border border-white/20" />
          </Section>

          <Section>
            <GridOverlay>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 h-28 rounded-xl border border-white/20" />
                <div className="col-span-8 h-56 rounded-xl border border-white/20" />
              </div>
            </GridOverlay>
          </Section>

          <Section>
            <GridOverlay>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-5 h-24 rounded-xl border border-white/20" />
                <div className="col-span-7 h-24 rounded-xl border border-white/20" />
              </div>
            </GridOverlay>
          </Section>

          <Section>
            <GridOverlay>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-6 h-72 rounded-xl border border-white/20" />
                <div className="col-span-6 h-72 rounded-xl border border-white/20" />
              </div>
            </GridOverlay>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="relative">{children}</section>;
}

function GridOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border border-white/20 p-6">
      {/* Vertical grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(255,255,255,0.35) 0, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 96px)",
        }}
      />

      {/* Horizontal grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.30) 0, rgba(255,255,255,0.30) 1px, transparent 1px, transparent 64px)",
        }}
      />

      <div className="relative">{children}</div>
    </div>
  );
}
