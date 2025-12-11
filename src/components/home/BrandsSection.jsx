function BrandsSection({ brands }) {
  return (
    <section id="markalar" className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="h-1 w-10 rounded-full bg-red-500" />
          <h2 className="text-lg font-semibold text-slate-900">Markalarımız</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="group flex h-20 items-center justify-center rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
          >
            <img src={brand.src} alt={brand.name} className="max-h-10 w-auto object-contain" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default BrandsSection

