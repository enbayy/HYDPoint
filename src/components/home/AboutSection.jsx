function AboutSection() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="h-1 w-10 rounded-full bg-red-500" />
          <h2 className="text-lg font-semibold text-slate-900">HAKKIMIZDA</h2>
        </div>
        <p className="text-base leading-relaxed text-slate-600">
          1978 yılında ticari faaliyetlerine başlayan firmamız 1995 yılında METOSAN Hidrolik ve Pnömatik San. ve Tic. Ltd.
          Şti adı altında 6000 m² alanda Hidrolik ve Pnömatik sektöründe hizmet vermeye başlamıştır. Firmamız bulunduğu
          sektörde sahip olduğu tecrübe ve birikimi sayesinde günümüzün en etkin ve saygın kuruluşlarından biridir.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-red-600 hover:text-red-700"
        >
          devamını oku
          <span aria-hidden className="text-base">→</span>
        </a>
      </div>
      <div className="relative min-h-[260px] overflow-hidden rounded-3xl shadow-lg sm:min-h-[320px]">
        <img
          src="https://metosan.com.tr/Storage/Upload/cache/637695442382333208-b75-1hakkimizda-494-632.jpeg"
          alt="Hakkımızda görseli"
          className="h-full w-full object-cover"
        />
        <a
          href="https://www.youtube.com/watch?v=1NGTy-JyLcU"
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 flex items-center justify-center bg-slate-900/40 text-white transition hover:bg-slate-900/55"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl shadow-lg">▶</span>
        </a>
      </div>
    </section>
  )
}

export default AboutSection

