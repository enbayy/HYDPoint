function CatalogSection() {
  return (
    <section className="mx-auto grid w-full max-w-[95%] grid-cols-1 items-center gap-10 px-3 sm:px-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-tr from-red-50 via-white to-white" />
        <div className="relative space-y-4 p-8 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="h-1 w-10 rounded-full bg-red-500" />
            <h2 className="text-lg font-semibold text-slate-900">Ürün Kataloğu</h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-slate-600">
            Bu bölümde ürünlerimize ait genel katalogları bulabilir, indirebilir ve çevrim dışı olarak rahatça
            inceleyebilirsiniz.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <select className="h-12 rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 shadow-sm focus:border-red-400 focus:outline-none">
              <option>Metosan Ürün Kataloğu</option>
              <option>Hidrolik Çözümler</option>
              <option>Tesisat ve Sızdırmazlık</option>
            </select>
            <div className="flex gap-3">
              <button className="flex-1 rounded-full bg-red-600 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-red-700">
                görüntüle
              </button>
              <button className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold uppercase tracking-wide text-slate-700 shadow-sm transition hover:border-red-200 hover:text-red-600">
                indir
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <img
          src="https://metosan.com.tr/Storage/Upload/direct-upload/katalog.gif"
          alt="Ürün kataloğu"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

export default CatalogSection

