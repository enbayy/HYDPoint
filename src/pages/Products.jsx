import { useMemo, useState } from 'react'

const hydraulicSections = [
  {
    title: 'POMPA',
    items: [
      'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR',
      'DÖKÜM GÖVDELİ DİŞLİ POMPALAR',
      'EL POMPASI',
      'İÇTEN DİŞLİ POMPALAR',
      'İŞ MAKİNESİ POMPALARI',
      'PALETLİ POMPA',
      'PİSTONLU POMPA',
      'TANDEM POMPALAR',
    ],
  },
  { title: 'AKIŞ BÖLÜCÜLER', items: ['ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER', 'DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER'] },
  { title: 'AKÜLER', items: ['MEMBRANLI AKÜLER', 'BALONLU AKÜLER'] },
  {
    title: 'DİREKSİYON BEYİNLERİ',
    items: ['EMNİYETLİ NORMAL', 'EMNİYETLİ ANTİŞOKLU', 'EMNİYETSİZ NORMAL', 'EMNİYETSİZ KAPALI MERKEZ', 'EMNİYETSİZ ANTİŞOKLU', 'FORKLİFT İÇİN XY SERİSİ'],
  },
  {
    title: 'BASINÇ, ISI ÖLÇÜM VE KONTROL CİHAZLARI',
    items: ['BASINÇ ŞALTERLERİ', 'ISI (SICAKLIK) ÖLÇER', 'MANOMETRE KORUMA VALFLERİ', 'MANOMETRE TEST RAKORLARI', 'MANOMETRE VE VAKUMMETRELER', 'TRANSMİTTERLER'],
  },
  { title: 'HİDROMOTORLAR', items: ['DİŞLİ MOTORLAR', 'EĞİK EKSENLİ HİDROMOTORLAR', 'GEROTOR MOTORLAR (ORBİT)', 'YILDIZ (RADIAL) MOTOR'] },
  {
    title: 'KUMANDA KOLLARI , JOİSTİK VE LOADER VALF',
    items: ['DİLİMLİ KUMANDA KOLU', 'MONOBLOK KUMANDA KOLU', 'ELEKTRİK KONTROLLÜ KUMANDA KOLLARI', 'JOİSTİK VE YÜKLEYİCİ VALF'],
  },
  { title: 'HİDROLİK BAĞLANTI ELEMANLARI', items: ['HORTUM BAĞLANTI ELEMANLARI', 'DİŞLİ BAĞLANTI ELEMANLARI', 'HORTUMLAR'] },
  { title: 'HİDROLİK SİLİNDİR VE AKSESUARLARI', items: ['KROM KAPLI MİLLER'] },
]

const pneumaticSections = [
  { title: 'PNÖMATİK', items: ['SİLİNDİRLER', 'BASINÇ REGÜLATÖRLERİ', 'FİLTRELER', 'BAĞLANTI ELEMANLARI', 'AKSESUARLAR'] },
]

const sealingSections = [
  { title: 'SIZDIRMAZLIK', items: ['O-RING', 'KEÇE', 'HİDROLİK CONTALAR', 'FLANŞ CONTALARI', 'BAKIM KİTLERİ'] },
]

const catalogGroups = [
  { title: 'HİDROLİK', sections: hydraulicSections },
  { title: 'PNÖMATİK', sections: pneumaticSections },
  { title: 'SIZDIRMAZLIK', sections: sealingSections },
]

function Products() {
  const [activeSection, setActiveSection] = useState('POMPA')
  const [openGroups, setOpenGroups] = useState(['HİDROLİK'])

  const currentItems = useMemo(() => {
    if (!activeSection) return []
    for (const group of catalogGroups) {
      const found = group.sections.find((section) => section.title === activeSection)
      if (found) return found.items
    }
    return []
  }, [activeSection])

  const toggleGroup = (title) => {
    setOpenGroups((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  return (
    <div className="bg-slate-50 pb-16 text-slate-900">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-8 sm:gap-8 sm:px-6 lg:flex-row">
        <aside className="w-full lg:w-96">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
            {catalogGroups.map((group) => {
              const groupOpen = openGroups.includes(group.title)
              return (
                <div key={group.title} className="space-y-2">
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-base font-semibold transition ${
                      groupOpen ? 'bg-[#ff7f00]/10 text-[#ff7f00]' : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>{group.title}</span>
                    <span className={`text-xs ${groupOpen ? 'rotate-90' : ''} transition`}>›</span>
                  </button>
                  {groupOpen ? (
                    <div className="ml-3 space-y-2 border-l border-slate-200 pl-3">
                      {group.sections.map((section) => {
                        const isActive = activeSection === section.title
                        return (
                          <div key={section.title} className="space-y-1">
                            <button
                              onClick={() => setActiveSection(section.title)}
                              className={`flex w-full items-center justify-between rounded-lg px-2 py-1 text-left text-base font-semibold transition ${
                                isActive ? 'text-[#ff7f00]' : 'text-slate-700 hover:text-[#ff7f00]'
                              }`}
                            >
                              <span>{section.title}</span>
                              <span
                                className={`text-xs transition ${isActive ? 'text-[#ff7f00]' : 'text-slate-400'}`}
                                aria-hidden
                              >
                                ›
                              </span>
                            </button>
                            {isActive ? (
                              <ul className="space-y-1 pl-3 text-sm text-slate-600">
                                {section.items.map((item) => (
                                  <li key={item}>
                                    <button
                                      onClick={() => setActiveSection(section.title)}
                                      className="w-full rounded-lg px-2 py-1 text-left text-sm hover:text-[#ff7f00]"
                                    >
                                      {item}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </aside>

        <div className="flex-1 space-y-5">
          <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">Seçilen grup</p>
              <h2 className="text-xl font-semibold">{activeSection ?? 'Henüz seçilmedi'}</h2>
            </div>
            <span className="text-sm text-slate-500">
              {activeSection ? `${currentItems.length} ürün` : 'Seçim yapın'}
            </span>
          </div>

          {!activeSection ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
              Bir kategori seçin, ürünleri listeleyelim.
            </div>
          ) : currentItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
              Bu grup için ürün bulunamadı.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {currentItems.map((item) => {
                const img = `https://via.placeholder.com/320x200.png?text=${encodeURIComponent(item)}`
                return (
                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <img src={img} alt={item} className="h-40 w-full object-cover" />
                    <div className="p-4">
                      <p className="text-sm font-semibold text-slate-900">{item}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Products

