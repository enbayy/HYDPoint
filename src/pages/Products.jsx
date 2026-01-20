import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Ürün isimlerini resim dosya isimlerine çeviren fonksiyon
const getProductImage = (productName) => {
  // Özel eşleştirmeler
  const specialMappings = {
    'POMPA': '/pompa.png',
    'AKIŞ BÖLÜCÜLER': '/akisboluculer.png',
    'AKÜLER': '/aküler.png',
    'DİREKSİYON BEYİNLERİ': '/direksiyon-beyinleri.png',
    'BASINÇ, ISI ÖLÇÜM VE KONTROL CİHAZLARI': '/basinc-isi-olcum-ve-kontro.png',
    'HİDROMOTORLAR': '/hidromotorlar.png',
    'KUMANDA KOLLARI , JOİSTİK VE LOADER VALF': '/kumanda-kollari--joistik.png',
    'HİDROLİK BAĞLANTI ELEMANLARI': '/hidrolik-baglanti-elemanla.png',
    'HİDROLİK SİLİNDİR VE AKSESUARLARI': '/hidrolik-silindir-ve-akses.png',
    'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR': '/pompa.png',
    'DÖKÜM GÖVDELİ DİŞLİ POMPALAR': '/dokum-govdeli-disli-pompal.png',
    'EL POMPASI': '/el-pompasi.png',
    'İÇTEN DİŞLİ POMPALAR': '/icten-disli-pompalar.png',
    'İŞ MAKİNESİ POMPALARI': '/is-makinesi-pompalari.png',
    'PALETLİ POMPA': '/paletli-pompa.png',
    'PİSTONLU POMPA': '/pistonlu-pompa.png',
    'TANDEM POMPALAR': '/tandem-pompalar.png',
    'ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER': '/aluminyum-govde-disli-akis-boluculer.png',
    'DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER': '/dokum-govde-disli-akis-boluculer.png',
    'MEMBRANLI AKÜLER': '/aküler.png',
    'BALONLU AKÜLER': '/aküler.png',
    'EMNİYETLİ NORMAL': '/direksiyon-beyinleri.png',
    'EMNİYETLİ ANTİŞOKLU': '/direksiyon-beyinleri.png',
    'EMNİYETSİZ NORMAL': '/direksiyon-beyinleri.png',
    'EMNİYETSİZ KAPALI MERKEZ': '/direksiyon-beyinleri.png',
    'EMNİYETSİZ ANTİŞOKLU': '/direksiyon-beyinleri.png',
    'FORKLİFT İÇİN XY SERİSİ': '/direksiyon-beyinleri.png',
    'BASINÇ ŞALTERLERİ': '/basinc-salterleri.png',
    'ISI (SICAKLIK) ÖLÇER': '/isi-sicaklik-olcer.png',
    'MANOMETRE KORUMA VALFLERİ': '/manometre-koruma-valfleri.png',
    'MANOMETRE TEST RAKORLARI': '/manometre-test-rakorlari.png',
    'MANOMETRE VE VAKUMMETRELER': '/manometre-ve-vakummetreler.png',
    'TRANSMİTTERLER': '/transmitterler.png',
    'DİŞLİ MOTORLAR': '/disli-motorlar.png',
    'EĞİK EKSENLİ HİDROMOTORLAR': '/egik-eksenli-hidromotorlar.png',
    'GEROTOR MOTORLAR (ORBİT)': '/gerotor-motorlar-orbit.png',
    'YILDIZ (RADIAL) MOTOR': '/yildiz-radial-motor.png',
    'DİLİMLİ KUMANDA KOLU': '/kumanda-kollari--joistik.png',
    'MONOBLOK KUMANDA KOLU': '/kumanda-kollari--joistik.png',
    'ELEKTRİK KONTROLLÜ KUMANDA KOLLARI': '/kumanda-kollari--joistik.png',
    'JOİSTİK VE YÜKLEYİCİ VALF': '/kumanda-kollari--joistik.png',
    'HORTUM BAĞLANTI ELEMANLARI': '/hortumbaglantielemanlari.png',
    'DİŞLİ BAĞLANTI ELEMANLARI': '/dislibaglantielemanlari.png',
    'HORTUMLAR': '/hortumlar.png',
    'KROM KAPLI MİLLER': '/hidrolik-silindir-ve-akses.png',
  }

  // Özel eşleştirme varsa onu kullan
  if (specialMappings[productName]) {
    return specialMappings[productName]
  }

  // Genel dönüşüm: Türkçe karakterleri değiştir, küçük harfe çevir, boşlukları tire ile değiştir
  let imageName = productName
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/İ/g, 'i')
    .replace(/Ğ/g, 'g')
    .replace(/Ü/g, 'u')
    .replace(/Ş/g, 's')
    .replace(/Ö/g, 'o')
    .replace(/Ç/g, 'c')
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '')

  return `/${imageName}.png`
}

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
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState(null)
  const [openGroups, setOpenGroups] = useState(['HİDROLİK'])
  const [selectedGroup, setSelectedGroup] = useState('HİDROLİK')

  const currentItems = useMemo(() => {
    if (!activeSection) return []
    for (const group of catalogGroups) {
      const found = group.sections.find((section) => section.title === activeSection)
      if (found) return found.items
    }
    return []
  }, [activeSection])

  const toggleGroup = (title) => {
    // Hidrolik için özel davranış: kapanmaz, sadece açılır
    if (title === 'HİDROLİK') {
      const isOpen = openGroups.includes(title)
      if (!isOpen) {
        setOpenGroups((prev) => [...prev, title])
        setSelectedGroup('HİDROLİK')
        setActiveSection(null) // Alt kategori kartlarını göstermek için
      }
      // Açıksa hiçbir şey yapma (kapanmaz)
    } else {
      // Sızdırmazlık ve Pnömatik için normal davranış
      setOpenGroups((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
      if (openGroups.includes(title)) {
        // Kapanıyorsa
        if (selectedGroup === title) {
          setSelectedGroup(null)
          setActiveSection(null)
        }
      } else {
        // Açılıyorsa
        setSelectedGroup(title)
        setActiveSection(null)
      }
    }
  }

  const handleGroupClick = (title) => {
    if (title === 'HİDROLİK') {
      setSelectedGroup('HİDROLİK')
      setActiveSection(null) // Alt kategori kartlarını göstermek için
      // Hidrolik her zaman açık kalmalı
      if (!openGroups.includes(title)) {
        setOpenGroups((prev) => [...prev, title])
      }
    } else {
      setSelectedGroup(title)
      setActiveSection(null)
      if (!openGroups.includes(title)) {
        setOpenGroups((prev) => [...prev, title])
      }
    }
  }

  return (
    <div className="bg-slate-50 pb-16 text-slate-900">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pt-8 sm:gap-8 sm:px-6 lg:flex-row lg:px-8">
        <aside className="w-full lg:w-80">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
            {catalogGroups.map((group) => {
              const groupOpen = openGroups.includes(group.title)
              return (
                <div key={group.title} className="space-y-2">
                  <button
                    onClick={() => {
                      if (group.title === 'HİDROLİK') {
                        handleGroupClick(group.title)
                      } else {
                        toggleGroup(group.title)
                      }
                    }}
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
          {selectedGroup === 'HİDROLİK' && !activeSection ? (
            <>
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">Hidrolik Kategorileri</p>
                  <h2 className="text-xl font-semibold">Alt Kategorileri Seçin</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {hydraulicSections.map((section) => {
                  const sectionImg = getProductImage(section.title)
                  return (
                    <button
                      key={section.title}
                      onClick={() => setActiveSection(section.title)}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#ff7f00]/40 hover:shadow-2xl hover:shadow-[#ff7f00]/10"
                    >
                      {/* Image Container with Professional Gradient */}
                      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
                        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <img 
                          src={sectionImg} 
                          alt={section.title} 
                          className="h-full w-full object-contain p-6 transition-all duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/320x200.png?text=${encodeURIComponent(section.title)}`
                          }}
                        />
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ff7f00]/0 via-transparent to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/5 group-hover:to-[#1e4294]/5" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex flex-1 flex-col p-6 pt-5">
                        <h3 className="mb-3 text-lg font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
                          {section.title}
                        </h3>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition-colors duration-300 group-hover:bg-[#ff7f00]/10 group-hover:text-[#ff7f00]">
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                              {section.items.length} ürün
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[#ff7f00] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                            <span className="text-xs font-semibold uppercase tracking-wide">İncele</span>
                            <svg 
                              className="h-4 w-4" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </>
          ) : (
            <>
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {currentItems.map((item) => {
                    const img = getProductImage(item)
                    const productSlug = encodeURIComponent(item.toLowerCase().replace(/\s+/g, '-'))
                    return (
                      <div
                        key={item}
                        onClick={() => navigate(`/urun-detay/${productSlug}`, { state: { productName: item, productImage: img } })}
                        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#ff7f00]/40 hover:shadow-2xl hover:shadow-[#ff7f00]/10"
                      >
                        {/* Image Container with Enhanced Design */}
                        <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
                          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <img 
                            src={img} 
                            alt={item} 
                            className="h-full w-full object-contain p-6 transition-all duration-500 group-hover:scale-110"
                            onError={(e) => {
                              // Resim yüklenemezse placeholder göster
                              e.target.src = `https://via.placeholder.com/320x200.png?text=${encodeURIComponent(item)}`
                            }}
                          />
                          {/* Professional gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#ff7f00]/0 via-transparent to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/5 group-hover:to-[#1e4294]/5" />
                        </div>
                        
                        {/* Content Section */}
                        <div className="flex flex-1 flex-col p-6 pt-5">
                          <h3 className="mb-4 line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
                            {item}
                          </h3>
                          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors duration-300 group-hover:text-slate-700">
                              Ürün Detayı
                            </span>
                            <div className="flex items-center gap-1.5 text-[#ff7f00] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                              <span className="text-xs font-semibold">İncele</span>
                              <svg 
                                className="h-4 w-4" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Products

