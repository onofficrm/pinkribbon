import { Header, Hero, MobileBottomBar } from './components/HeaderHero';
import { Symptoms, Services, ContextTypes } from './components/ProblemSolution';
import { Equipment, Process, Areas } from './components/TrustProcess';
import { Notices, FAQ, FinalCTA, Footer } from './components/Support';

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
        <Notices />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
