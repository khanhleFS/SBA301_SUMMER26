import Hero from "@/components/home/hero"
import TrendingGallery from "@/components/home/trending-gallery"
import Features from "@/components/home/features"
import LatestUpdates from "@/components/home/latest-updates"
import AuthorCTA from "@/components/home/author-cta"

export default function HomePage() {
  return (
    <div className="pb-5 bg-lumina-surface transition-colors duration-500">
      {/* CONTINUOUS GRADIENT WRAPPER */}
      <div className="bg-gradient-to-b from-background via-lumina-dim/50 to-background">
        <Hero />
        <TrendingGallery />
      </div>

      <Features />
      <LatestUpdates />
      <AuthorCTA />
    </div>
  )
}