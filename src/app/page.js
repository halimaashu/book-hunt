import Banner from "@/components/shared/Banner";
import Marque from "@/components/shared/Marque";
import SpeachileBooks from "@/components/shared/SpeachileBooks";
import SimpleStep from "@/components/shared/SimpleStep";
import TrustedBooks from "@/components/shared/TrustedBooks";
import UserreviewMarque from "@/components/shared/UserreviewMarque";
import FAQ from "@/components/shared/FAQ";
import ContactPage from "@/components/shared/ContactPage";
import PartnersMarquee from "@/components/shared/Partnersmarquee";

export default function Home() {
  return (
    <div>
      <Banner />
      <Marque />
      <SpeachileBooks />

      <div id="how-it-works">
        <SimpleStep />
      </div>

      <TrustedBooks />
      <UserreviewMarque />
      <FAQ />
      <ContactPage/>
      <PartnersMarquee/>
    </div>
  );
}