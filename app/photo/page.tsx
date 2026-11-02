import { InvitationPage } from "@/components/InvitationPage";
import { PhotoHero } from "@/components/PhotoHero";
import { invitation as inv } from "@/content/invitation";

export default function PhotoPage() {
  return (
    <InvitationPage
      hero={<PhotoHero />}
      gallery={inv.photoPage.gallery}
      closing={inv.photoPage.closing}
    />
  );
}
