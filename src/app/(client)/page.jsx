import About from "@/components/home/About";
import Approach from "@/components/home/Approach";
import Blog from "@/components/home/Blog";
import Design from "@/components/home/Design";
import Faq from "@/components/home/Faq";
import Herosection from "@/components/home/Herosection";
import Purpose from "@/components/home/Purpose";
import Service from "@/components/home/Service";
import Whysection from "@/components/home/Whysection";



export default function Home() {
  return (
    <>
      <Herosection />
      <About />
      <Whysection />
      <Approach />
      <Service />
      <Design />
      <Purpose />
      <Faq />
      <Blog />
    </>
  );
}
