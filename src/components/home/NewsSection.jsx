function NewsSection({ items }) {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <span className="h-1 w-10 rounded-full bg-[#ff7f00]" />
        <h2 className="text-lg font-semibold text-slate-900">Haberler</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((news) => (
          <article
            key={news.title}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="h-56 overflow-hidden">
              <img src={news.image} alt={news.title} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-3 p-6">
              <h3 className="text-xl font-semibold text-slate-900">{news.title}</h3>
              <p className="text-sm font-semibold text-[#ff7f00]">{news.date}</p>
              <p className="text-base leading-relaxed text-slate-600">{news.description}</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#ff7f00] hover:text-[#e07000]"
              >
                devamını oku
                <span aria-hidden className="text-base">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
      <div>
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-wide text-slate-700 shadow-sm transition hover:border-[#ff7f00] hover:text-[#ff7f00]"
        >
          tüm haberler
          <span aria-hidden className="text-base">→</span>
        </a>
      </div>
    </section>
  )
}

export default NewsSection

