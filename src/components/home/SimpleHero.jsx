import { useEffect, useState } from 'react'

const slides = ['/slider1.jpg', '/slider2.jpg', '/slider3.jpg']

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

  return (
    <section className="mx-auto w-full max-w-7xl px-1 pt-8">
      {/* 16:9 oranlı, her ekranda aynı görünen slider alanı */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl pt-[56.25%]">
        {/* Arka plan dokusu */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnptLTIwIDBjMC0xLjEtLjktMi0yLTJzLTIgLjktMiAyIC45IDIgMiAyIDItLjkgMi0yem0yMi45LS4xYzAtLjgtLjctMS41LTEuNS0xLjVzLTEuNS43LTEuNSAxLjUuNyAxLjUgMS41IDEuNSAxLjUtLjcgMS41LTEuNXptLTIwIDBjMC0uOC0uNy0xLjUtMS41LTEuNXMtMS41LjctMS41IDEuNS43IDEuNSAxLjUgMS41IDEuNS0uNyAxLjUtMS41eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />

        {/* Slider içeriği */}
        <div className="absolute inset-0 z-10">
          {/* Görsel */}
          <img
            src={slides[current]}
            alt={`Slider görseli ${current + 1}`}
            className="h-full w-full object-cover"
          />

          {/* Üst gradient overlay (kontrast için) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

          {/* Sol / Sağ oklar */}
          {slides.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white shadow-md backdrop-blur transition hover:bg-black/70"
                aria-label="Önceki görsel"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white shadow-md backdrop-blur transition hover:bg-black/70"
                aria-label="Sonraki görsel"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Alt noktalar (indicator) */}
          {slides.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    current === index ? 'w-7 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Slider ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SimpleHero
