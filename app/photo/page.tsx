import { ArchHero } from "@/components/ArchHero";
import { InvitationPage } from "@/components/InvitationPage";
import { invitation as inv } from "@/content/invitation";

export default function PhotoPage() {
  return <InvitationPage hero={<ArchHero />} gallery={inv.photoPage.gallery} closing={inv.photoPage.closing} />;
}
