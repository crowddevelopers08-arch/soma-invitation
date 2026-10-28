import { invitation } from "@/content/invitation";

// Reuse the photographed wax and gold monogram from the opening envelope.
export function FrontSeal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="390 795 450 475" className={className} aria-hidden="true">
      <defs>
        <clipPath id="rsvp-envelope-seal">
          <path d="M621 818C658 819 677 836 709 839C743 843 746 869 769 891C793 909 812 931 812 968C813 1007 802 1024 810 1066C822 1105 812 1141 786 1160C759 1180 731 1179 706 1198C677 1219 648 1236 615 1233C580 1232 564 1212 532 1202C498 1192 469 1180 454 1153C435 1124 425 1106 427 1073C432 1040 421 1013 423 982C423 945 440 921 465 900C492 879 506 853 535 843C565 830 588 815 621 818Z" />
        </clipPath>
      </defs>
      <image href={invitation.media.envelope} width="1248" height="2012" preserveAspectRatio="none" clipPath="url(#rsvp-envelope-seal)" />
      <image href={invitation.media.monogram} x="505" y="913" width="218" height="214" preserveAspectRatio="xMidYMid meet" style={{ filter: "drop-shadow(0 3px 2px rgba(40,0,8,0.6))" }} />
    </svg>
  );
}
