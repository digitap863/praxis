import Herosection from "@/components/home/Herosection";
import About from "@/components/home/About";
import Approach from "@/components/home/Approach";
import Service from "@/components/home/Service";
import Design from "@/components/home/Design";
import Purpose from "@/components/home/Purpose";
import Faq from "@/components/home/Faq";
import Blog from "@/components/home/Blog";

export default function Home() {
  return (
    <>
      <Herosection />
      <About />
      <Approach />
      <Service />
      <Design />
      <Purpose />
      <Faq />
      <Blog />
    </>
  );
}
