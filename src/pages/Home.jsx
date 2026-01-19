import BrandsSection from '../components/home/BrandsSection'
import CatalogSection from '../components/home/CatalogSection'
import FeaturedProductsSection from '../components/home/FeaturedProductsSection'
import SimpleHero from '../components/home/SimpleHero'
import { brandLogos } from '../components/home/homeData'

function Home() {
  return (
    <div className="space-y-20 pb-20">
      <SimpleHero />
      <FeaturedProductsSection />
      <BrandsSection brands={brandLogos} />
      <CatalogSection />
    </div>
  )
}

export default Home

