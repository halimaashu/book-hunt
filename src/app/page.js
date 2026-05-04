import Banner from "@/components/shared/Banner";
import Marque from "@/components/shared/Marque";
import NavBar from "@/components/shared/NavBar";
import SpeachileBooks from "@/components/shared/SpeachileBooks";
import UserReview from "@/components/shared/UserReview";
import UserreviewMarque from "@/components/shared/UserreviewMarque";


export default function Home() {
  return (
    <div className="">
     <Banner/>
     <Marque/>
     <SpeachileBooks/>
     <UserreviewMarque/>
    </div>
  );
}
