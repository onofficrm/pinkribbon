import { Header, Hero, MobileBottomBar } from './components/HeaderHero';
import { Symptoms, Services, ContextTypes } from './components/ProblemSolution';
import { Equipment, Process, Areas } from './components/TrustProcess';
import { CaseGallery } from './components/CaseGallery';
import { Notices, FAQ, FinalCTA, Footer } from './components/Support';
import { ExitPopup, PhotoInquiryForm, Reviews } from './components/Conversion';

export default function App() {
  return (
    <div className="font-sans text-gray-900 antialiased relative pb-16 md:pb-0">
      <Header />
      <main>
        <Hero />
        <Symptoms />
        <Services />
        <ContextTypes />
        <Equipment />
        <Process />
        <Areas />
        <CaseGallery />
        <Reviews />
        <PhotoInquiryForm />
        <Notices />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBottomBar />
      <ExitPopup />
    </div>
  );
}
