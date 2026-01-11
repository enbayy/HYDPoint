import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

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

  // Pompa resimleri mapping
  const getPumpImage = (itemName) => {
    const imageMap = {
      'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR': '/aligodi.png',
      'DÖKÜM GÖVDELİ DİŞLİ POMPALAR': '/dokum-govdeli-disli-pompal.png',
      'EL POMPASI': '/el-pompasi.png',
      'İÇTEN DİŞLİ POMPALAR': '/icten-disli-pompalar.png',
      'İŞ MAKİNESİ POMPALARI': '/is-makinesi-pompalari.png',
      'PALETLİ POMPA': '/paletli-pompa.png',
      'PİSTONLU POMPA': '/pistonlu-pompa.png',
      'TANDEM POMPALAR': '/tandem-pompalar.png',
    }
    return imageMap[itemName] || `https://via.placeholder.com/320x200.png?text=${encodeURIComponent(itemName)}`
  }

  // Ürün logoları mapping
  const getProductLogo = (itemName) => {
    const logoMap = {
      'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR': 'https://metosan.com.tr/Storage/Upload/cache/637557325862393960-b-39hydrocar-175-90.png',
      'DÖKÜM GÖVDELİ DİŞLİ POMPALAR': 'https://metosan.com.tr/Storage/Upload/cache/638340098660595043-b-73grimet-175-90.png',
      'EL POMPASI': 'https://metosan.com.tr/Storage/Upload/cache/637333620284483912-b-11salami-175-90.png',
      'İÇTEN DİŞLİ POMPALAR': 'https://metosan.com.tr/Storage/Upload/cache/637661968877589422-b-67walvoil-175-90.png',
      'İŞ MAKİNESİ POMPALARI': 'https://metosan.com.tr/Storage/Upload/cache/637532341975657085-b-30kawasaki-175-90.png',
      'PALETLİ POMPA': 'https://metosan.com.tr/Storage/Upload/cache/637635181100323594-b-58wika-175-90.png',
      'PİSTONLU POMPA': 'https://metosan.com.tr/Storage/Upload/cache/637613397761965452-b-46zhenjiang-175-90.png',
      'TANDEM POMPALAR': 'https://metosan.com.tr/Storage/Upload/cache/637607340096564042-b-43saip-175-90.png',
      'ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER': 'https://metosan.com.tr/Storage/Upload/cache/637532342525093881-b-33gold-175-90.png',
      'DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER': 'https://metosan.com.tr/Storage/Upload/cache/637332590151054674-b75-15hemko-175-90.png',
      'MEMBRANLI AKÜLER': 'https://metosan.com.tr/Storage/Upload/cache/637557325862393960-b-39hydrocar-175-90.png',
      'BALONLU AKÜLER': 'https://metosan.com.tr/Storage/Upload/cache/638340098660595043-b-73grimet-175-90.png',
    }
    // Eğer ürün için logo yoksa, ürün adına göre bir logo seç (modulo ile)
    const logos = [
      'https://metosan.com.tr/Storage/Upload/cache/637557325862393960-b-39hydrocar-175-90.png',
      'https://metosan.com.tr/Storage/Upload/cache/638340098660595043-b-73grimet-175-90.png',
      'https://metosan.com.tr/Storage/Upload/cache/637333620284483912-b-11salami-175-90.png',
      'https://metosan.com.tr/Storage/Upload/cache/637661968877589422-b-67walvoil-175-90.png',
      'https://metosan.com.tr/Storage/Upload/cache/637532341975657085-b-30kawasaki-175-90.png',
      'https://metosan.com.tr/Storage/Upload/cache/637635181100323594-b-58wika-175-90.png',
      'https://metosan.com.tr/Storage/Upload/cache/637613397761965452-b-46zhenjiang-175-90.png',
      'https://metosan.com.tr/Storage/Upload/cache/637607340096564042-b-43saip-175-90.png',
      'https://metosan.com.tr/Storage/Upload/cache/637532342525093881-b-33gold-175-90.png',
      'https://metosan.com.tr/Storage/Upload/cache/637332590151054674-b75-15hemko-175-90.png',
    ]
    return logoMap[itemName] || logos[itemName.length % logos.length]
  }

  return (
    <div className="bg-slate-50 pb-16 text-slate-900">
      <section className="mx-auto flex w-full max-w-[95%] flex-col gap-6 px-3 pt-8 sm:gap-8 sm:px-4 lg:flex-row">
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentItems.map((item) => {
                const img = activeSection === 'POMPA' ? getPumpImage(item) : `https://via.placeholder.com/320x200.png?text=${encodeURIComponent(item)}`
                const productSlug = encodeURIComponent(item.toLowerCase().replace(/\s+/g, '-'))
                return (
                  <Link
                    key={item}
                    to={`/urun-detay/${productSlug}`}
                    state={{ productName: item, productImage: img, productLogo: getProductLogo(item) }}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-[#ff7f00]/50 hover:shadow-xl"
                  >
                    {/* Ürün Görseli */}
                    <div className="relative flex h-64 items-center justify-center overflow-hidden bg-white p-6">
                      <img 
                        src={img} 
                        alt={item} 
                        className="h-full w-full object-contain transition-all duration-500 group-hover:scale-105" 
                      />
                    </div>
                    
                    {/* Ürün Bilgileri */}
                    <div className="flex flex-1 flex-col justify-between border-t border-slate-100 bg-white p-5">
                      <div>
                        {/* Ürün Adı */}
                        <h3 className="mb-3 line-clamp-2 min-h-[3rem] text-base font-semibold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#ff7f00]">
                          {item}
                        </h3>
                      </div>
                      
                      {/* Detaylar için tıklayın */}
                      <div className="mt-auto flex items-center">
                        <span className="text-xs text-slate-500 transition-colors duration-300 group-hover:text-slate-700">Detaylar için tıklayın</span>
                        <svg 
                          className="ml-2 h-4 w-4 text-[#ff7f00] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
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

