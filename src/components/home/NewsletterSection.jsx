function NewsletterSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-6 rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-lg lg:flex-row lg:items-center">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">Mail Bültenimize Kaydolun</h3>
          <p className="text-base text-slate-200">
            Bültenimize kaydolarak firmamızla alakalı güncellemelerden anında haberdar olabilirsiniz.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:max-w-xl">
          <input
            type="email"
            placeholder="email@adresiniz.com"
            className="h-12 flex-1 rounded-full border border-white/30 bg-white/10 px-4 text-sm text-white placeholder-white/60 shadow-inner focus:border-white focus:outline-none"
          />
          <button className="h-12 rounded-full bg-[#ff7f00] px-6 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#e07000]">
            kaydet
          </button>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection

