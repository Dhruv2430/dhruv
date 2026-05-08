import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ImageGallery } from "@/components/ImageGallery";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contributions } from "@/components/Contributions";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ImageGallery />
      <Experience />
      <Projects />
      <Skills />
      <Contributions />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}
