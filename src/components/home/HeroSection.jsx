import { useEffect, useMemo, useState } from 'react'

function HeroSection({ slides }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const slideCount = slides.length

  const activeHero = useMemo(() => slides[activeSlide], [activeSlide, slides])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount)
    }, 5200)
    return () => clearInterval(timer)
  }, [slideCount])

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(15,23,42,0.8), rgba(15,23,42,0.4)), url(${activeHero.image})`,
          }}
        />
        <div className="relative z-10 flex min-h-[420px] flex-col gap-6 p-8 sm:min-h-[480px] sm:p-12 md:min-h-[520px] md:p-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-red-200">
            <span className="inline-block h-1 w-8 rounded-full bg-red-500" />
            Güçlü Çözümler
          </div>
          <h1 className="text-3xl font-semibold sm:text-4xl">{activeHero.title}</h1>
          <p className="max-w-2xl text-base text-slate-100/80 sm:text-lg">{activeHero.description}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold uppercase tracking-wide transition hover:bg-red-700"
            >
              incele
            </a>
            <a
              href="#markalar"
              className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/20"
            >
              markalar
            </a>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 w-10 rounded-full transition ${
                  index === activeSlide ? 'bg-red-500' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`${slide.title} slaytını göster`}
              />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-slate-900/35 to-transparent max-sm:hidden" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent sm:hidden" />
        <div className="absolute bottom-4 right-4 flex gap-3 sm:bottom-6 sm:right-6">
          <button
            onClick={() => setActiveSlide((prev) => (prev - 1 + slideCount) % slideCount)}
            className="rounded-full bg-white/15 px-4 py-3 text-white shadow-lg backdrop-blur transition hover:bg-white/25"
            aria-label="Önceki slayt"
          >
            ‹
          </button>
          <button
            onClick={() => setActiveSlide((prev) => (prev + 1) % slideCount)}
            className="rounded-full bg-white/15 px-4 py-3 text-white shadow-lg backdrop-blur transition hover:bg-white/25"
            aria-label="Sonraki slayt"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

