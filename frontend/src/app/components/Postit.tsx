// components/Postit.tsx
import type { ReactNode } from "react";

type PostitProps = {
  children: ReactNode; // whatever you pass in (Blocks, <p>, etc.)
  className?: string; // optional extra styles
};

export default function Postit({ children, className }: PostitProps) {
  return (
    <div className={`grid ${className ?? ""}`}>
      <div className="relative">
        <span className="pointer-events-none absolute -left-2 -top-5 h-10 w-5 rotate-45 bg-blue-100/60"></span>
        <span className="pointer-events-none absolute -right-2 -top-5 h-10 w-5 -rotate-45 bg-blue-100/60"></span>
        <span className="pointer-events-none absolute -left-2 -bottom-5 h-10 w-5 -rotate-45 bg-blue-100/60"></span>
        <span className="pointer-events-none absolute -right-2 -bottom-5 h-10 w-5 rotate-45 bg-blue-100/60"></span>

        <div className="p-4 pl-10 text-black font-bold lined-background-container border-yellow-200 border-b-3 border-r-3">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
