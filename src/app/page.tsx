import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Specials from "./components/Specials"
import Delivery from "./components/Delivery"
import Footer from "./components/Footer"
import ScrollToTopButton from "./components/ScrollToTopButton"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      <Hero />
      <Features />
      <Specials />
      <Delivery />
      <Footer />
      <ScrollToTopButton />
    </main>
  )
}

