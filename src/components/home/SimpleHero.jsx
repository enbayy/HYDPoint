import { Link } from 'react-router-dom'

function SimpleHero() {
  return (
    <section className="mx-auto w-full max-w-7xl px-1 pt-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnptLTIwIDBjMC0xLjEtLjktMi0yLTJzLTIgLjktMiAyIC45IDIgMiAyIDItLjkgMi0yem0yMi45LS4xYzAtLjgtLjctMS41LTEuNS0xLjVzLTEuNS43LTEuNSAxLjUuNyAxLjUgMS41IDEuNSAxLjUtLjcgMS41LTEuNXptLTIwIDBjMC0uOC0uNy0xLjUtMS41LTEuNXMtMS41LjctMS41IDEuNS43IDEuNSAxLjUgMS41IDEuNS0uNyAxLjUtMS41eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 p-12 text-center sm:p-16 md:p-20">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#ff7f00]/80">
            <span className="inline-block h-1 w-8 rounded-full bg-[#ff7f00]" />
            Hidrolik Çözümlerde Lider
            <span className="inline-block h-1 w-8 rounded-full bg-[#ff7f00]" />
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Güçlü Çözümler,{' '}
            <span className="bg-gradient-to-r from-[#ff7f00] to-[#ff8f20] bg-clip-text text-transparent">
              Güvenilir Hizmet
            </span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg md:text-xl">
            40 yılı aşkın tecrübe, güçlü stok ve uzman mühendislik desteğiyle hidrolik, pnömatik ve sızdırmazlık çözümlerinde yanınızdayız.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/urunler"
              className="rounded-full bg-[#ff7f00] px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:bg-[#e07000] hover:shadow-xl hover:-translate-y-0.5"
            >
              Ürünleri Keşfet
            </Link>
            <Link
              to="/iletisim"
              className="rounded-full bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur transition-all hover:bg-white/20"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
      </div>
    </section>
  )
}

export default SimpleHero
