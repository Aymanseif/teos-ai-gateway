import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Trust from '@/components/Trust';
import Products from '@/components/Products';
import Security from '@/components/Security';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Trust />
        <Products />
        <Security />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
