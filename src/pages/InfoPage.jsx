function InfoPage({ title, subtitle, sections = [], hideHeader = false, brands = [] }) {
  return (
    <div className="space-y-10 pb-16">
      {!hideHeader ? (
        <section className="bg-slate-900 text-white">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-8 py-12 sm:py-14">
            <p className="text-xs uppercase tracking-[0.14em] text-red-200">HYD Point</p>
            <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
            {subtitle ? <p className="max-w-3xl text-slate-100/80">{subtitle}</p> : null}
          </div>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-7xl space-y-8 px-8">
        {brands.length > 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {brands.map((brand) => (
                <div
                  key={brand.name || brand}
                  className="group relative flex h-32 items-center justify-center rounded-xl border-2 border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#ff7f00] hover:bg-gradient-to-br hover:from-white hover:to-[#ff7f00]/5 hover:shadow-xl"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#ff7f00]/0 to-[#ff7f00]/0 transition-all duration-300 group-hover:from-[#ff7f00]/5 group-hover:to-[#ff7f00]/10" />
                  <img
                    src={brand.src || brand}
                    alt={brand.name || brand}
                    className="relative z-10 h-16 w-auto max-w-full object-contain transition-all duration-300 group-hover:scale-110"
                    onError={(e) => {
                      console.error(`Failed to load image for ${brand.name || brand}:`, brand.src || brand)
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : sections.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-base text-slate-600">
              Bu sayfanın detaylarını birlikte dolduracağız. Başlıklar, alt başlıklar ve medya içeriklerini eklemeye
              hazırız.
            </p>
          </div>
        ) : (
          sections.map((section) => (
            <div
              key={section.heading}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-xl font-semibold text-slate-900">{section.heading}</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{section.body}</p>
              {section.items ? (
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default InfoPage

