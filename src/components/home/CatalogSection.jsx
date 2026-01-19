function CatalogSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-1">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#ff7f00]/5 via-white to-white" />
        <div className="relative space-y-4 p-8 sm:p-10">
          <div className="flex items-center justify-center gap-3">
            <span className="h-1 w-10 rounded-full bg-[#ff7f00]" />
            <h2 className="text-lg font-semibold text-slate-900">Ürün Kataloğu</h2>
          </div>
          <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-slate-600">
            Bu bölümde ürünlerimize ait genel katalogları bulabilir, indirebilir ve çevrim dışı olarak rahatça
            inceleyebilirsiniz.
          </p>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <select className="h-12 rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 shadow-sm focus:border-[#ff7f00] focus:outline-none">
              <option>HYD Point Ürün Kataloğu</option>
              <option>Hidrolik Çözümler</option>
              <option>Tesisat ve Sızdırmazlık</option>
            </select>
            <div className="flex gap-3">
              <button className="flex-1 rounded-full bg-[#ff7f00] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#e07000]">
                görüntüle
              </button>
              <button className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold uppercase tracking-wide text-slate-700 shadow-sm transition hover:border-[#ff7f00] hover:text-[#ff7f00]">
                indir
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CatalogSection

