function BrandsSection({ brands }) {
  return (
    <section id="markalar" className="mx-auto w-full max-w-7xl space-y-8 px-1">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="h-1 w-12 rounded-full bg-gradient-to-r from-[#ff7f00] to-[#ff8f20]" />
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Markalarımız</h2>
        </div>
        <p className="text-sm text-slate-600 sm:text-base">
          Dünya çapında tanınmış markalarla iş birliği içinde, kaliteli ve güvenilir ürünler sunuyoruz.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg sm:p-8 lg:p-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group relative flex h-32 items-center justify-center rounded-xl border-2 border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#ff7f00] hover:bg-gradient-to-br hover:from-white hover:to-[#ff7f00]/5 hover:shadow-xl"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#ff7f00]/0 to-[#ff7f00]/0 transition-all duration-300 group-hover:from-[#ff7f00]/5 group-hover:to-[#ff7f00]/10" />
              <img
                src={brand.src}
                alt={brand.name}
                className="relative z-10 h-16 w-auto max-w-full object-contain transition-all duration-300 group-hover:scale-110"
                onError={(e) => {
                  console.error(`Failed to load image for ${brand.name}:`, brand.src)
                  e.target.style.display = 'none'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandsSection

