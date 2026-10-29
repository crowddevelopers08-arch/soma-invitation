/* eslint-disable @next/next/no-img-element */
import { invitation } from "@/content/invitation";

// Reuse the opening envelope's wax (cut out cleanly by its outline, no paper or shadow) and gold
// monogram. The monogram sits where it does on the envelope, in % of the seal image.
export function FrontSeal({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <img src={invitation.media.seal} alt="" draggable={false} className="block w-full" />
      <img
        src={invitation.media.monogram}
        alt=""
        draggable={false}
        className="absolute left-[48.96%] top-[47%] w-[55.66%] -translate-x-1/2 -translate-y-1/2 [filter:drop-shadow(0_3px_2px_rgba(40,0,8,0.6))]"
      />
    </div>
  );
}
