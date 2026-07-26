import { Header, Hero, MobileBottomBar } from './components/HeaderHero';
import { Symptoms, Services, ContextTypes } from './components/ProblemSolution';
import { Equipment, Process, Areas } from './components/TrustProcess';
import { CaseGallery } from './components/CaseGallery';
import { Notices, FAQ, FinalCTA, Footer } from './components/Support';
import { ExitPopup, PhotoInquiryForm, Reviews } from './components/Conversion';
import { AnswerDefinition, HowToGuide } from './components/AnswerAeo';
import { CompareGuide, TrustIdentity } from './components/TrustAeo';

export default function App() {
  return (
    <div className="font-sans text-gray-900 antialiased relative pb-16 md:pb-0">
      <Header />
      <main>
        <Hero />
        <AnswerDefinition />
        <Symptoms />
        <HowToGuide />
        <CompareGuide />
        <Services />
        <ContextTypes />
        <Equipment />
        <Process />
        <Areas />
        <CaseGallery />
        <Reviews />
        <TrustIdentity />
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
