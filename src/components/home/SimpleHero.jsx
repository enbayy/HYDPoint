import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    title: 'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR',
    displayTitle: 'Alüminyum Gövdeli Dişli Pompalar',
    subtitle: 'Yüksek verimlilik, düşük kayıp',
    image: '/aligodi.png',
    category: 'Pompa',
  },
  {
    title: 'DİŞLİ MOTORLAR',
    displayTitle: 'Dişli Motorlar',
    subtitle: 'Dayanıklı hidromotor çözümleri',
    image: '/disli-motorlar.png',
    category: 'Hidromotor',
  },
  {
    title: 'PİSTONLU POMPA',
    displayTitle: 'Pistonlu Pompalar',
    subtitle: 'Yüksek basınç uygulamaları',
    image: '/pistonlu-pompa.png',
    category: 'Pompa',
  },
  {
    title: 'MEMBRANLI AKÜLER',
    displayTitle: 'Membranlı Aküler',
    subtitle: 'Güvenilir enerji depolama',
    image: '/aküler.png',
    category: 'Akü',
  },
  {
    title: 'DİLİMLİ KUMANDA KOLU',
    displayTitle: 'Kumanda Kolları',
    subtitle: 'Hassas kontrol sistemleri',
    image: '/kumanda-kollari--joistik.png',
    category: 'Kumanda',
  },
]

function SimpleHero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  const slide = slides[current]
  const productSlug = encodeURIComponent(slide.title.toLowerCase().replace(/\s+/g, '-'))

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-lg shadow-slate-200/50">
        <div className="grid min-h-[280px] grid-cols-1 sm:min-h-[300px] md:grid-cols-2 md:min-h-[320px]">
          {/* Sol: metin */}
          <div className="relative z-10 flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-6 rounded-full bg-[#ff7f00]" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff7f00]">
                {slide.category}
              </span>
            </div>

            <h1
              key={`title-${current}`}
              className="mb-2 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-[2rem]"
            >
              {slide.displayTitle}
            </h1>

            <p key={`sub-${current}`} className="mb-6 max-w-sm text-sm text-slate-500 sm:text-base">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/urun-detay/${productSlug}`}
                state={{
                  productName: slide.title,
                  productImage: slide.image,
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-[#1e4294] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1e4294]/20 transition hover:bg-[#183578] hover:shadow-lg"
              >
                İncele
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/urunler"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#1e4294]/40 hover:text-[#1e4294]"
              >
                Tüm Ürünler
              </Link>
            </div>

            {slides.length > 1 && (
              <div className="mt-8 flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      current === index
                        ? 'w-6 bg-[#ff7f00]'
                        : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sağ: ürün görseli */}
          <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1e4294]/[0.04] via-transparent to-[#ff7f00]/[0.06] px-6 py-6 sm:px-10 md:py-8">
            <div className="pointer-events-none absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 translate-x-1/4 rounded-full bg-[#1e4294]/[0.06] blur-2xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 -translate-x-1/4 translate-y-1/4 rounded-full bg-[#ff7f00]/[0.08] blur-2xl" />

            <img
              key={slide.image}
              src={slide.image}
              alt={slide.displayTitle}
              className="relative z-10 h-44 w-auto max-w-[85%] object-contain drop-shadow-xl sm:h-52 md:h-56 lg:h-60"
            />

            {slides.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition hover:border-[#1e4294]/30 hover:text-[#1e4294] sm:left-4"
                  aria-label="Önceki"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition hover:border-[#1e4294]/30 hover:text-[#1e4294] sm:right-4"
                  aria-label="Sonraki"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SimpleHero
