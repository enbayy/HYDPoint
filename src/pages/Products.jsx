import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// Ürün isimlerini resim dosya isimlerine çeviren fonksiyon
const getProductImage = (productName) => {
  // Özel eşleştirmeler - Public klasöründeki resimlere göre
  const specialMappings = {
    // Ana Kategoriler
    'POMPA': '/pompa.png',
    'AKIŞ BÖLÜCÜLER': '/akisboluculer.png',
    'AKÜLER': '/aküler.png',
    'DİREKSİYON BEYİNLERİ': '/direksiyon-beyinleri.png',
    'BASINÇ, ISI ÖLÇÜM VE KONTROL CİHAZLARI': '/basinc-isi-olcum-ve-kontro.png',
    'HİDROMOTORLAR': '/hidromotorlar.png',
    'KUMANDA KOLLARI , JOİSTİK VE LOADER VALF': '/kumanda-kollari--joistik.png',
    'HİDROLİK BAĞLANTI ELEMANLARI': '/hidrolik-baglanti-elemanla.png',
    'HİDROLİK SİLİNDİR VE AKSESUARLARI': '/hidrolik-silindir-ve-akses.png',
    
    // Pompa Alt Kategorileri
    'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR': '/pompa.png',
    'DÖKÜM GÖVDELİ DİŞLİ POMPALAR': '/dokum-govdeli-disli-pompal.png',
    'EL POMPASI': '/el-pompasi.png',
    'İÇTEN DİŞLİ POMPALAR': '/icten-disli-pompalar.png',
    'İŞ MAKİNESİ POMPALARI': '/is-makinesi-pompalari.png',
    'PALETLİ POMPA': '/paletli-pompa.png',
    'PİSTONLU POMPA': '/pistonlu-pompa.png',
    'TANDEM POMPALAR': '/tandem-pompalar.png',
    
    // Akış Bölücü Alt Kategorileri
    'ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER': '/aluminyum-govde-disli-akis-boluculer.png',
    'DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER': '/dokum-govde-disli-akis-boluculer.png',
    
    // Akü Alt Kategorileri
    'MEMBRANLI AKÜLER': '/aküler.png',
    'BALONLU AKÜLER': '/aküler.png',
    
    // Direksiyon Beyinleri Alt Kategorileri
    'EMNİYETLİ NORMAL': '/direksiyon-beyinleri.png',
    'EMNİYETLİ ANTİŞOKLU': '/direksiyon-beyinleri.png',
    'EMNİYETSİZ NORMAL': '/direksiyon-beyinleri.png',
    'EMNİYETSİZ KAPALI MERKEZ': '/direksiyon-beyinleri.png',
    'EMNİYETSİZ ANTİŞOKLU': '/direksiyon-beyinleri.png',
    'FORKLİFT İÇİN XY SERİSİ': '/direksiyon-beyinleri.png',
    
    // Basınç, Isı Ölçüm ve Kontrol Cihazları Alt Kategorileri
    'BASINÇ ŞALTERLERİ': '/basinc-salterleri.png',
    'ISI (SICAKLIK) ÖLÇER': '/isi-sicaklik-olcer.png',
    'MANOMETRE KORUMA VALFLERİ': '/manometre-koruma-valfleri.png',
    'MANOMETRE TEST RAKORLARI': '/manometre-test-rakorlari.png',
    'MANOMETRE VE VAKUMMETRELER': '/manometre-ve-vakummetreler.png',
    'TRANSMİTTERLER': '/transmitterler.png',
    
    // Hidromotorlar Alt Kategorileri
    'DİŞLİ MOTORLAR': '/disli-motorlar.png',
    'EĞİK EKSENLİ HİDROMOTORLAR': '/egik-eksenli-hidromotorlar.png',
    'GEROTOR MOTORLAR (ORBİT)': '/gerotor-motorlar-orbit.png',
    'YILDIZ (RADIAL) MOTOR': '/yildiz-radial-motor.png',
    
    // Kumanda Kolları Alt Kategorileri
    'DİLİMLİ KUMANDA KOLU': '/kumanda-kollari--joistik.png',
    'MONOBLOK KUMANDA KOLU': '/kumanda-kollari--joistik.png',
    'ELEKTRİK KONTROLLÜ KUMANDA KOLLARI': '/kumanda-kollari--joistik.png',
    'JOİSTİK VE YÜKLEYİCİ VALF': '/kumanda-kollari--joistik.png',
    
    // Hidrolik Bağlantı Elemanları Alt Kategorileri
    'HORTUM BAĞLANTI ELEMANLARI': '/hortumbaglantielemanlari.png',
    'DİŞLİ BAĞLANTI ELEMANLARI': '/dislibaglantielemanlari.png',
    'HORTUMLAR': '/hortumlar.png',
    
    // Hidrolik Silindir ve Aksesuarları Alt Kategorileri
    'KROM KAPLI MİLLER': '/hidrolik-silindir-ve-akses.png',
    
    // PNÖMATİK Kategorileri
    'PNÖMATİK': '/hydropack.png',
    'SİLİNDİRLER': '/hydropack.png',
    'BASINÇ REGÜLATÖRLERİ': '/hydropack.png',
    'FİLTRELER': '/hydropack.png',
    'BAĞLANTI ELEMANLARI': '/hidrolik-baglanti-elemanla.png',
    'AKSESUARLAR': '/hydropack.png',
    
    // SIZDIRMAZLIK Kategorileri
    'SIZDIRMAZLIK': '/hydropack.png',
    'O-RING': '/hydropack.png',
    'KEÇE': '/hydropack.png',
    'HİDROLİK CONTALAR': '/hydropack.png',
    'FLANŞ CONTALARI': '/hydropack.png',
    'BAKIM KİTLERİ': '/hydropack.png',
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

  // Eğer resim bulunamazsa varsayılan resim kullan
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
  const [searchParams] = useSearchParams()
  const [activeSection, setActiveSection] = useState(null)
  const [openGroups, setOpenGroups] = useState(['HİDROLİK'])
  const [selectedGroup, setSelectedGroup] = useState('HİDROLİK')
  const [selectedItem, setSelectedItem] = useState(null)

  // URL parametresinden kategoriyi oku
  useEffect(() => {
    const sectionParam = searchParams.get('section')
    if (sectionParam) {
      // URL'den gelen kategoriyi decode et
      const decodedSection = decodeURIComponent(sectionParam)
      // Kategoriyi bul ve aç
      for (const group of catalogGroups) {
        const found = group.sections.find((section) => section.title === decodedSection)
        if (found) {
          setActiveSection(decodedSection)
          setSelectedGroup(group.title)
          setOpenGroups((prev) => {
            if (!prev.includes(group.title)) {
              return [...prev, group.title]
            }
            return prev
          })
          return
        }
        // Eğer section title değilse, item olabilir - item'ın hangi section'a ait olduğunu bul
        for (const section of group.sections) {
          if (section.items.includes(decodedSection)) {
            setActiveSection(section.title)
            setSelectedGroup(group.title)
            setSelectedItem(decodedSection) // URL'den gelen item'ı seç
            setOpenGroups((prev) => {
              if (!prev.includes(group.title)) {
                return [...prev, group.title]
              }
              return prev
            })
            return
          }
        }
      }
    }
  }, [searchParams])

  const currentItems = useMemo(() => {
    if (!activeSection) return []
    for (const group of catalogGroups) {
      const found = group.sections.find((section) => section.title === activeSection)
      if (found) return found.items
    }
    return []
  }, [activeSection])

  // Tüm marka logoları
  const allBrandLogosList = [
    '/hydropack.png', '/asc.png', '/casappa.png', '/hema.png', '/rexroth.png', '/galtec.png',
    '/vivolo.png', '/salami.png', '/grimet.png', '/walvoil.png', '/kawasaki.png', '/parker.png',
    '/danfoss.png', '/hydac.png', '/eckerle.png', '/linde.png', '/wika.png', '/sunfab.png',
    '/zhenjiang.png', '/saip.png', '/akon.png', '/berarma.png', '/celebi.png', '/cms.png',
    '/david-brown.png', '/dinamicoil.png', '/etna.png', '/ferro.png', '/fox.png', '/gold.png',
    '/hemko.png', '/hlp.png', '/hpt.png', '/hydrocar.png', '/hystar.png', '/hytek.png',
    '/italgroup.png', '/kcl.png', '/hidromas.png', '/oleocon.png', '/omfb.png', '/oxim.png',
    '/pakkens.png', '/pnomek.png', '/pzb.png', '/rekorsan.png', '/sai.png', '/samhydraulic.png',
    '/sel.png', '/sick.png', '/telemecanique.png', '/tognella.png', '/trafag.png', '/white.png',
  ]

  // Basit hash fonksiyonu - ürün adına göre deterministik rastgele sayı üretir
  const hashString = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // 32bit integer'a çevir
    }
    return Math.abs(hash)
  }

  // Ürün adına göre rastgele logolar seç (deterministik)
  const getProductBrandLogos = (productName) => {
    if (!productName) return []
    
    // Ürün adına göre seed oluştur
    const seed = hashString(productName)
    
    // Her ürün için farklı sayıda logo (3-8 arası)
    const logoCount = 3 + (seed % 6) // 3-8 arası
    
    // Seed'e göre logoları karıştır
    const shuffled = [...allBrandLogosList]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = (seed + i) % (i + 1)
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    
    // Seed'e göre başlangıç noktası
    const startIndex = seed % shuffled.length
    
    // Rastgele logoları seç
    const selectedLogos = []
    let currentIndex = startIndex
    
    while (selectedLogos.length < logoCount && selectedLogos.length < shuffled.length) {
      if (!selectedLogos.includes(shuffled[currentIndex])) {
        selectedLogos.push(shuffled[currentIndex])
      }
      currentIndex = (currentIndex + 1 + (seed % 7)) % shuffled.length
    }
    
    return selectedLogos
  }

  const allBrandLogos = selectedItem ? getProductBrandLogos(selectedItem) : []

  const toggleGroup = (title) => {
    // Hidrolik için özel davranış: kapanmaz, sadece açılır
    if (title === 'HİDROLİK') {
      const isOpen = openGroups.includes(title)
      if (!isOpen) {
        setOpenGroups((prev) => [...prev, title])
        setSelectedGroup('HİDROLİK')
        setActiveSection(null) // Alt kategori kartlarını göstermek için
        setSelectedItem(null) // Seçili ürünü temizle
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
          setSelectedItem(null) // Seçili ürünü temizle
        }
      } else {
        // Açılıyorsa
        setSelectedGroup(title)
        setActiveSection(null)
        setSelectedItem(null) // Seçili ürünü temizle
      }
    }
  }

  const handleGroupClick = (title) => {
    if (title === 'HİDROLİK') {
      setSelectedGroup('HİDROLİK')
      setActiveSection(null) // Alt kategori kartlarını göstermek için
      setSelectedItem(null) // Seçili ürünü temizle
      // Hidrolik her zaman açık kalmalı
      if (!openGroups.includes(title)) {
        setOpenGroups((prev) => [...prev, title])
      }
    } else {
      setSelectedGroup(title)
      setActiveSection(null)
      setSelectedItem(null) // Seçili ürünü temizle
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
                              onClick={() => {
                                setActiveSection(section.title)
                                setSelectedGroup(group.title)
                                setSelectedItem(null) // Kategori seçildiğinde ürün seçimini temizle
                              }}
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
                                      onClick={() => {
                                        setSelectedItem(item)
                                        setActiveSection(section.title)
                                        setSelectedGroup(group.title)
                                      }}
                                      className={`w-full rounded-lg px-2 py-1 text-left text-sm transition hover:text-[#ff7f00] ${
                                        selectedItem === item ? 'font-semibold text-[#ff7f00]' : ''
                                      }`}
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
          {selectedItem ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">Ürün Detayı</p>
                  <h2 className="text-xl font-semibold">{selectedItem}</h2>
                </div>
              </div>

              {/* Marka Logoları */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">
                {allBrandLogos.length === 0 ? (
                  <div className="py-12 text-center text-slate-500">
                    <p>Bu ürün için marka logosu bulunamadı.</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {allBrandLogos.map((logo, index) => (
                      <div
                        key={index}
                        className="flex h-20 w-32 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-2 transition hover:border-[#ff7f00] hover:bg-white hover:shadow-md sm:h-24 sm:w-36 sm:p-3"
                      >
                        <img 
                          src={logo} 
                          alt={`Brand ${index + 1}`} 
                          className="h-12 w-auto object-contain sm:h-14"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : selectedGroup === 'HİDROLİK' && !activeSection ? (
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
                      onClick={() => {
                        setActiveSection(section.title)
                        setSelectedItem(null) // Kategori kartına tıklandığında ürün seçimini temizle
                      }}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white text-left shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#ff7f00]/30 hover:shadow-xl hover:shadow-[#ff7f00]/5"
                    >
                      {/* Decorative top accent */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff7f00] via-[#ff9500] to-[#ff7f00] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      
                      {/* Professional Header Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff9500] to-[#ffaa33] px-3 py-1.5 shadow-md">
                          <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <span className="text-xs font-bold text-white">{section.items.length}</span>
                        </div>
                      </div>

                      {/* Image Container with Professional Design */}
                      <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 border-b border-slate-100">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-[0.015] group-hover:opacity-[0.03] transition-opacity duration-500" 
                             style={{
                               backgroundImage: 'radial-gradient(circle at 2px 2px, #1e4294 1px, transparent 0)',
                               backgroundSize: '32px 32px'
                             }}
                        />
                        
                        <div className="relative z-10 flex h-full items-center justify-center p-4">
                          <img 
                            src={sectionImg} 
                            alt={section.title} 
                            className="h-full w-full max-h-[170px] object-contain transition-all duration-700 group-hover:scale-110"
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/320x200.png?text=${encodeURIComponent(section.title)}`
                            }}
                          />
                        </div>
                        
                        {/* Gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ff7f00]/0 via-transparent to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/6 group-hover:to-[#1e4294]/6" />
                        
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="relative flex flex-1 flex-col bg-white p-5">
                        <h3 className="mb-2 text-base font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
                          {section.title}
                        </h3>
                        
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100/80 pt-3">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 rounded-md bg-slate-50 px-2.5 py-1 transition-all duration-300 group-hover:bg-[#ff7f00]/10">
                              <svg className="h-3.5 w-3.5 text-slate-500 transition-colors duration-300 group-hover:text-[#ff7f00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span className="text-xs font-semibold text-slate-600 transition-colors duration-300 group-hover:text-[#ff7f00]">{section.items.length} Ürün</span>
                            </div>
                          </div>
                          
                          <div className="relative flex items-center gap-1 overflow-hidden rounded-md bg-gradient-to-r from-[#ff9500] to-[#ffaa33] px-2.5 py-1.5 text-white opacity-0 shadow-md transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:shadow-lg group-hover:shadow-[#ff9500]/20">
                            {/* Shine effect */}
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                            <span className="relative z-10 text-[10px] font-bold uppercase tracking-wide">Detay</span>
                            <svg 
                              className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Corner decoration */}
                      <div className="absolute top-4 right-4 h-6 w-6 rounded-bl-lg bg-gradient-to-br from-[#ff7f00]/0 to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/8 group-hover:to-[#1e4294]/8" />
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
                        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#ff7f00]/30 hover:shadow-xl hover:shadow-[#ff7f00]/5"
                      >
                        {/* Decorative top accent */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff7f00] via-[#ff9500] to-[#ff7f00] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        
                        {/* Professional Product Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <div className="rounded-full bg-white/95 px-2.5 py-1.5 shadow-md backdrop-blur-sm">
                            <svg className="h-3.5 w-3.5 text-[#ff7f00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>

                        {/* Image Container with Professional Design */}
                        <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 border-b border-slate-100">
                          {/* Background pattern */}
                          <div className="absolute inset-0 opacity-[0.015] group-hover:opacity-[0.03] transition-opacity duration-500" 
                               style={{
                                 backgroundImage: 'radial-gradient(circle at 2px 2px, #1e4294 1px, transparent 0)',
                                 backgroundSize: '32px 32px'
                               }}
                          />
                          
                          <div className="relative z-10 flex h-full items-center justify-center p-4">
                            <img 
                              src={img} 
                              alt={item} 
                              className="h-full w-full max-h-[190px] object-contain transition-all duration-700 group-hover:scale-110"
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/320x200.png?text=${encodeURIComponent(item)}`
                              }}
                            />
                          </div>
                          
                          {/* Gradient overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <div className="absolute inset-0 bg-gradient-to-br from-[#ff7f00]/0 via-transparent to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/6 group-hover:to-[#1e4294]/6" />
                          
                          {/* Shine effect on hover */}
                          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100" />
                        </div>
                        
                        {/* Content Section */}
                        <div className="relative flex flex-1 flex-col bg-white p-5">
                          {/* Category badge */}
                          <div className="mb-2.5">
                            <span className="inline-block rounded-md bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 transition-all duration-300 group-hover:bg-[#ff7f00]/10 group-hover:text-[#ff7f00] group-hover:shadow-sm">
                              {item.includes('POMPA') ? 'Pompa' : 
                               item.includes('AKIŞ') ? 'Akış Bölücü' :
                               item.includes('AKÜ') ? 'Akü' :
                               item.includes('DİREKSİYON') || item.includes('EMNİYET') ? 'Direksiyon' :
                               item.includes('BASINÇ') || item.includes('ŞALTER') || item.includes('MANOMETRE') || item.includes('TRANSMİTTER') || item.includes('ISI') ? 'Ölçüm & Kontrol' :
                               item.includes('KUMANDA') || item.includes('JOİSTİK') || item.includes('LOADER') ? 'Kumanda' :
                               item.includes('BAĞLANTI') || item.includes('HORTUM') ? 'Bağlantı' :
                               item.includes('MOTOR') ? 'Motor' : 'Ürün'}
                            </span>
                          </div>
                          
                          <h3 className="mb-3 line-clamp-2 min-h-[3rem] text-base font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
                            {item}
                          </h3>
                          
                          <div className="mt-auto flex items-center justify-between border-t border-slate-100/80 pt-3">
                            <span className="text-xs font-medium uppercase tracking-wider text-slate-400 transition-colors duration-300 group-hover:text-slate-600">
                              Ürün Detayları
                            </span>
                            <div className="relative flex items-center gap-1 overflow-hidden rounded-md bg-gradient-to-r from-[#ff9500] to-[#ffaa33] px-2.5 py-1.5 text-white opacity-0 shadow-md transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:shadow-lg group-hover:shadow-[#ff9500]/20">
                              {/* Shine effect */}
                              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                              <span className="relative z-10 text-[10px] font-bold uppercase tracking-wide">İncele</span>
                              <svg
                                className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        {/* Corner decoration */}
                        <div className="absolute top-4 right-4 h-6 w-6 rounded-bl-lg bg-gradient-to-br from-[#ff7f00]/0 to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/8 group-hover:to-[#1e4294]/8" />
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

