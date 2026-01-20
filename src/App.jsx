import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import hydLogo3 from './assets/hydLogo3.png'
import Home from './pages/Home'
import InfoPage from './pages/InfoPage'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Contact from './pages/Contact'

const footerSections = [
  {
    title: 'KURUMSAL',
    links: [
      'Hakkımızda',
      'Misyon',
      'Vizyon',
      'Pazarlama',
      'Satınalma',
      'Sosyal Sorumluluk',
      'Sertifika',
      'Kvkk Bilgilendirmesi',
    ],
  },
  {
    title: 'ÜRÜNLER',
    links: ['Hidrolik', 'Pnömatik', 'Elektronik', 'Tesisat', 'Sızdırmazlık', 'Projeler', 'Markalar'],
  },
  {
    title: 'MEDYA',
    links: ['Haberler', 'Etkinlikler', 'Galeriler', 'Kataloglar', 'Blog'],
  },
  { title: 'İLETİŞİM', links: ['İletişim Bilgileri', 'İnsan Kaynakları'] },
]

const navItems = [
  { label: 'ANASAYFA', path: '/' },
  { label: 'ÜRÜNLER', path: '/urunler' },
  { label: 'MARKALAR', path: '/markalar' },
  { label: 'HAKKIMIZDA', path: '/hakkimizda' },
  { label: 'İLETİŞİM', path: '/iletisim' },
]

const brandLogos = [
  { name: 'Kawasaki', logo: '/kawasaki.png' },
  { name: 'Walvoil', logo: '/walvoil.png' },
  { name: 'Wika', logo: '/wika.png' },
  { name: 'Salami', logo: '/salami.png' },
  { name: 'Parker', logo: '/parker.png' },
  { name: 'Rexroth', logo: '/rexroth.png' },
  { name: 'Danfoss', logo: '/danfoss.png' },
  { name: 'Hydac', logo: '/hydac.png' },
  { name: 'Casappa', logo: '/casappa.png' },
  { name: 'Eckerle', logo: '/eckerle.png' },
  { name: 'Linde', logo: '/linde.png' },
  { name: 'Sunfab', logo: '/sunfab.png' },
  { name: 'Hidromas', logo: '/hidromas.png' },
  { name: 'Oleocon', logo: '/oleocon.png' },
  { name: 'White', logo: '/white.png' },
]

const pageContent = {
  urunler: {
    title: 'Ürünler',
    subtitle: 'Hidrolik, pnömatik, elektronik ve tesisat ürün gamımızı inceleyin.',
    sections: [
      {
        heading: 'Hidrolik',
        body: 'Pompalar, valfler, güç üniteleri ve mobil çözümler.',
        items: ['Yüksek basınç çözümleri', 'Mobil hidrolik', 'Endüstriyel uygulamalar'],
      },
      {
        heading: 'Pnömatik',
        body: 'Silindirler, hava hazırlama ekipmanları ve bağlantı elemanları.',
      },
    ],
  },
  markalar: {
    title: 'Markalar',
    subtitle: 'Dünya çapında temsil ettiğimiz markalar ve iş ortaklarımız.',
    sections: [
      {
        heading: 'Çözüm Ortaklarımız',
        body: 'Kawasaki, Walvoil, Wika, Salami ve daha fazlasını tek çatı altında topluyoruz.',
      },
    ],
  },
  projeler: {
    title: 'Projeler',
    subtitle: 'Tamamladığımız endüstriyel ve mobil uygulama projelerinden seçkiler.',
    sections: [
      { heading: 'Referanslar', body: 'Çelik, otomotiv, enerji ve denizcilik sektörlerinde sahada kanıtlanmış projeler.' },
    ],
  },
  medya: {
    title: 'Medya',
    subtitle: 'Haberler, etkinlikler, fotoğraf galerileri ve kataloglarımız tek yerde.',
    sections: [
      { heading: 'Haberler', body: 'Etkinlik ve lansman duyurularını yakında burada paylaşacağız.' },
      { heading: 'Kataloglar', body: 'Ürün kataloglarımızın dijital kopyalarını görüntüleyip indirebilirsiniz.' },
    ],
  },
  hakkimizda: {
    title: 'Hakkımızda',
    subtitle: 'Hidrolik ve pnömatik sektöründe güvenilir çözüm ortağınız.',
    sections: [
      {
        heading: 'HYD Point Endüstriyel',
        body: 'HYD Point Endüstriyel, hidrolik ve pnömatik sistemler alanında faaliyet gösteren, sektörün önde gelen firmalarından biridir. Geniş ürün yelpazesi ve teknik uzmanlığımızla, endüstriyel uygulamalardan mobil makine sektörüne kadar geniş bir yelpazede hizmet vermekteyiz. Müşterilerimize en kaliteli ürünleri, en uygun fiyatlarla sunarak, sektörde güvenilir bir çözüm ortağı olmayı hedefliyoruz.',
      },
      {
        heading: 'Ürün Gamımız',
        body: 'Hidrolik pompalar, motorlar, valfler, akış bölücüler, aküler, direksiyon sistemleri, basınç ölçüm cihazları, bağlantı elemanları ve daha birçok hidrolik komponenti geniş bir yelpazede sunmaktayız. Ayrıca pnömatik sistemler, sızdırmazlık elemanları ve elektronik kontrol sistemleri konusunda da hizmet vermekteyiz.',
        items: [
          'Hidrolik pompalar ve motorlar',
          'Akış bölücüler ve aküler',
          'Direksiyon sistemleri ve kumanda kolları',
          'Basınç ölçüm ve kontrol cihazları',
          'Hidrolik bağlantı elemanları ve hortumlar',
          'Pnömatik sistemler',
          'Sızdırmazlık elemanları',
        ],
      },
      {
        heading: 'Misyonumuz',
        body: 'Müşterilerimize en kaliteli hidrolik ve pnömatik ürünleri, teknik destek ve danışmanlık hizmetleriyle birlikte sunarak, onların başarısına katkıda bulunmak. Sektörde güvenilirlik, kalite ve müşteri memnuniyeti odaklı bir hizmet anlayışıyla öncü olmak.',
      },
      {
        heading: 'Vizyonumuz',
        body: 'Türkiye ve bölge ülkelerinde hidrolik ve pnömatik sektöründe tanınan, güvenilir ve tercih edilen bir marka olmak. Sürekli gelişen teknolojiye ayak uydurarak, müşterilerimize en güncel çözümleri sunmak ve sektörde lider konumda yer almak.',
      },
      {
        heading: 'Değerlerimiz',
        body: 'Kalite, güvenilirlik, müşteri odaklılık ve sürekli gelişim temel değerlerimizdir. Her projede müşteri memnuniyetini ön planda tutarak, uzun vadeli iş ortaklıkları kurmayı hedefliyoruz.',
        items: [
          'Kalite ve güvenilirlik',
          'Müşteri odaklı hizmet anlayışı',
          'Teknik uzmanlık ve danışmanlık',
          'Zamanında teslimat',
          'Rekabetçi fiyatlandırma',
          'Sürekli gelişim ve yenilik',
        ],
      },
    ],
  },
  iletisim: {
    title: 'İletişim',
    subtitle: 'Satış, teknik destek ve insan kaynakları için bize ulaşın.',
    sections: [
      {
        heading: 'Merkez',
        body: 'Adres, telefon ve e-posta bilgilerini buraya ekleyeceğiz.',
        items: ['Telefon', 'E-posta', 'Çalışma saatleri'],
      },
    ],
  },
}

const secondaryNav = [
  {
    label: 'HİDROLİK',
    path: '/urunler',
    description: 'Pompalar, valfler, güç üniteleri, ağır iş uygulamaları.',
    links: [
      'POMPA',
      'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR',
      'DÖKÜM GÖVDELİ DİŞLİ POMPALAR',
      'EL POMPASI',
      'İÇTEN DİŞLİ POMPALAR',
      'İŞ MAKİNESİ POMPALARI',
      'PALETLİ POMPA',
      'PİSTONLU POMPA',
      'TANDEM POMPALAR',
      'AKIŞ BÖLÜCÜLER',
      'ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER',
      'DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER',
      'AKÜLER',
      'MEMBRANLI AKÜLER',
      'BALONLU AKÜLER',
    ],
  },
  {
    label: 'PNÖMATİK',
    path: '/urunler',
    description: 'Silindirler, hava hazırlama ve bağlantı ekipmanları.',
    links: ['Silindirler', 'Basınç Regülatörleri', 'Filtreler', 'Bağlantı Elemanları', 'Aksesuarlar'],
  },
  {
    label: 'SIZDIRMAZLIK',
    path: '/urunler',
    description: 'Tesisat ve hidrolik sistemler için contalar, kelepçeler.',
    links: ['O-ring', 'Keçe', 'Hortum Kelepçeleri', 'Flanş Contaları', 'Bakım Kitleri'],
  },
]

// Public klasöründeki tüm marka logoları
const brandGallery = {
  Akon: '/akon.png',
  ASC: '/asc.png',
  Berarma: '/berarma.png',
  Casappa: '/casappa.png',
  Celebi: '/celebi.png',
  CMS: '/cms.png',
  Danfoss: '/danfoss.png',
  'David Brown': '/david-brown.png',
  Dinamicoil: '/dinamicoil.png',
  Eckerle: '/eckerle.png',
  Etna: '/etna.png',
  Ferro: '/ferro.png',
  Fox: '/fox.png',
  Galtec: '/galtec.png',
  Gold: '/gold.png',
  Grimet: '/grimet.png',
  Hema: '/hema.png',
  Hemko: '/hemko.png',
  HLP: '/hlp.png',
  HPT: '/hpt.png',
  Hydac: '/hydac.png',
  Hydrocar: '/hydrocar.png',
  Hydropack: '/hydropack.png',
  Hystar: '/hystar.png',
  Hytek: '/hytek.png',
  Italgroup: '/italgroup.png',
  Kawasaki: '/kawasaki.png',
  KCL: '/kcl.png',
  Linde: '/linde.png',
  'HYD Point': '/metosan.png',
  MS: '/ms.png',
  Oleocon: '/oleocon.png',
  OMFB: '/omfb.png',
  Oxim: '/oxim.png',
  Pakkens: '/pakkens.png',
  Parker: '/parker.png',
  Pnomek: '/pnomek.png',
  PZB: '/pzb.png',
  Rekorsan: '/rekorsan.png',
  Rexroth: '/rexroth.png',
  SAI: '/sai.png',
  Saip: '/saip.png',
  Salami: '/salami.png',
  Samhydraulic: '/samhydraulic.png',
  SEL: '/sel.png',
  Sick: '/sick.png',
  Sunfab: '/sunfab.png',
  Telemecanique: '/telemecanique.png',
  Tognella: '/tognella.png',
  Trafag: '/trafag.png',
  Vivolo: '/vivolo.png',
  Walvoil: '/walvoil.png',
  White: '/white.png',
  Wika: '/wika.png',
  Zhenjiang: '/zhenjiang.png',
}

function App() {
  const [openSecondary, setOpenSecondary] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSubOpen, setMobileSubOpen] = useState(null)
  const [brandsMenuOpen, setBrandsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const closeSecondaryTimer = useRef(null)
  const brandsMenuTimer = useRef(null)
  const searchInputRef = useRef(null)
  const pumpGroup = [
    'POMPA',
    'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR',
    'DÖKÜM GÖVDELİ DİŞLİ POMPALAR',
    'EL POMPASI',
    'İÇTEN DİŞLİ POMPALAR',
    'İŞ MAKİNESİ POMPALARI',
    'PALETLİ POMPA',
    'PİSTONLU POMPA',
    'TANDEM POMPALAR',
  ]
  const flowGroup = [
    'AKIŞ BÖLÜCÜLER',
    'ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER',
    'DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER',
  ]
  const batteryGroup = ['AKÜLER', 'MEMBRANLI AKÜLER', 'BALONLU AKÜLER']
  const steeringGroup = [
    'DİREKSİYON BEYİNLERİ',
    'EMNİYETLİ NORMAL',
    'EMNİYETLİ ANTİŞOKLU',
    'EMNİYETSİZ NORMAL',
    'EMNİYETSİZ KAPALI MERKEZ',
    'EMNİYETSİZ ANTİŞOKLU',
    'FORKLİFT İÇİN XY SERİSİ',
  ]
  const pressureGroup = [
    'BASINÇ, ISI ÖLÇÜM VE KONTROL CİHAZLARI',
    'BASINÇ ŞALTERLERİ',
    'ISI (SICAKLIK) ÖLÇER',
    'MANOMETRE KORUMA VALFLERİ',
    'MANOMETRE TEST RAKORLARI',
    'MANOMETRE VE VAKUMMETRELER',
    'TRANSMİTTERLER',
  ]
  const motorGroup = [
    'HİDROMOTORLAR',
    'DİŞLİ MOTORLAR',
    'EĞİK EKSENLİ HİDROMOTORLAR',
    'GEROTOR MOTORLAR (ORBİT)',
    'YILDIZ (RADIAL) MOTOR',
  ]
  const controlGroup = [
    'HİDROLİK BAĞLANTI ELEMANLARI',
    'HORTUM BAĞLANTI ELEMANLARI',
    'DİŞLİ BAĞLANTI ELEMANLARI',
    'HORTUMLAR',
  ]
  const cylinderGroup = ['HİDROLİK SİLİNDİR VE AKSESUARLARI', 'KROM KAPLI MİLLER']
  const loaderGroup = [
    'KUMANDA KOLLARI , JOİSTİK VE LOADER VALF',
    'DİLİMLİ KUMANDA KOLU',
    'MONOBLOK KUMANDA KOLU',
    'ELEKTRİK KONTROLLÜ KUMANDA KOLLARI',
    'JOİSTİK VE YÜKLEYİCİ VALF',
  ]

  const handleOpenSecondary = (label) => {
    if (closeSecondaryTimer.current) {
      clearTimeout(closeSecondaryTimer.current)
      closeSecondaryTimer.current = null
    }
    setOpenSecondary(label)
  }

  const handleCloseSecondary = () => {
    if (closeSecondaryTimer.current) {
      clearTimeout(closeSecondaryTimer.current)
    }
    closeSecondaryTimer.current = setTimeout(() => setOpenSecondary(null), 120)
  }

  useEffect(() => {
    return () => {
      if (closeSecondaryTimer.current) {
        clearTimeout(closeSecondaryTimer.current)
      }
      if (brandsMenuTimer.current) {
        clearTimeout(brandsMenuTimer.current)
      }
    }
  }, [])


  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="relative z-40 backdrop-blur bg-white/95 shadow-sm shadow-slate-200/70">
          <div className="border-b border-slate-100">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-8 py-3 text-xs">
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[#1e4294] font-medium">
                  <svg className="h-4 w-4 text-[#ff7f00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +90 212 000 00 00
                </span>
                <span className="hidden md:inline-flex items-center gap-1.5 text-[#1e4294] font-medium">
                  <svg className="h-4 w-4 text-[#ff7f00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@hydpoint.com
                </span>
                <span className="hidden lg:inline-flex items-center gap-1.5 text-[#1e4294] font-medium">
                  <svg className="h-4 w-4 text-[#ff7f00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pazartesi - Cumartesi: 09:00 - 18:00
                </span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-5">
            <div className="flex items-center gap-3 -my-5">
              <img
                src={hydLogo3}
                alt="HYD Point logo"
                className="h-16 w-auto"
              />
            </div>

            <nav className="hidden items-center gap-12 text-base font-semibold text-slate-700 lg:flex">
              {navItems.map((item) => {
                if (item.label === 'Markalar') {
                  return (
                    <div
                      key={item.path}
                      className="group relative"
                      onMouseEnter={() => {
                        if (brandsMenuTimer.current) {
                          clearTimeout(brandsMenuTimer.current)
                          brandsMenuTimer.current = null
                        }
                        setBrandsMenuOpen(true)
                      }}
                      onMouseLeave={() => {
                        brandsMenuTimer.current = setTimeout(() => setBrandsMenuOpen(false), 120)
                      }}
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `relative pb-1 transition hover:text-[#1e4294] ${isActive ? 'text-[#1e4294]' : ''}`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span>MARKALAR</span>
                            <span
                              className={`absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#ff7f00] transition ${
                                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                              }`}
                            />
                          </>
                        )}
                      </NavLink>
                    </div>
                  )
                }
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `group relative pb-1 transition hover:text-[#1e4294] ${isActive ? 'text-[#1e4294]' : ''}`
                    }
                    end={item.path === '/'}
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item.label}</span>
                        <span
                          className={`absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#ff7f00] transition ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                )
              })}
            </nav>
            
            {brandsMenuOpen && (
              <div
                className="absolute left-0 right-0 top-full z-50 mt-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
                onMouseEnter={() => {
                  if (brandsMenuTimer.current) {
                    clearTimeout(brandsMenuTimer.current)
                    brandsMenuTimer.current = null
                  }
                  setBrandsMenuOpen(true)
                }}
                onMouseLeave={() => {
                  brandsMenuTimer.current = setTimeout(() => setBrandsMenuOpen(false), 120)
                }}
              >
                <div className="grid grid-cols-5 gap-4">
                  {brandLogos.map((brand) => (
                    <div
                      key={brand.name}
                      className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 transition hover:-translate-y-1 hover:border-[#ff7f00]/60 hover:shadow-md"
                    >
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="h-12 w-auto max-w-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                      <span className="text-xs font-medium text-slate-700">{brand.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <NavLink
                    to="/markalar"
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#ff7f00]/10 px-4 py-2 text-sm font-semibold text-[#1e4294] transition hover:bg-[#ff7f00]/20"
                    onClick={() => setBrandsMenuOpen(false)}
                  >
                    TÜM MARKALAR
                    <span>→</span>
                  </NavLink>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex">
                <div className="relative w-64">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ÜRÜN ARA"
                    className="w-full rounded-full border border-slate-200 bg-white px-4 py-2.5 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-200 focus:border-[#ff7f00] focus:outline-none focus:ring-2 focus:ring-[#ff7f00]/20 hover:border-slate-300"
                  />
                  <svg
                    className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        searchInputRef.current?.focus()
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      aria-label="Temizle"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[#1e4294]/40 hover:text-[#1e4294] lg:hidden"
                aria-label="Menüyü aç/kapat"
              >
                <span className="relative block h-4 w-5">
                  <span
                    className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition ${
                      mobileOpen ? 'top-1/2 rotate-45' : 'top-0'
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition ${
                      mobileOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition ${
                      mobileOpen ? 'top-1/2 -rotate-45' : 'bottom-0'
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          <div className="relative z-30 border-t border-slate-200/80 bg-gradient-to-b from-white via-slate-50/30 to-white shadow-sm">
            <div className="relative mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-3 px-6 py-4">
              {secondaryNav.map((item) => (
                <div
                  key={item.label}
                  className="group relative z-40"
                  onMouseEnter={() => {
                    // PNÖMATİK ve SIZDIRMAZLIK için dropdown açılmasın
                    if (item.label !== 'PNÖMATİK' && item.label !== 'SIZDIRMAZLIK') {
                      handleOpenSecondary(item.label)
                    }
                  }}
                  onMouseLeave={handleCloseSecondary}
                >
                  <NavLink
                    to={item.path}
                    onClick={(e) => {
                      // Hidrolik için dropdown'ı açık tut
                      if (item.label === 'HİDROLİK') {
                        e.preventDefault()
                        handleOpenSecondary(item.label)
                      } else {
                        // Sızdırmazlık ve Pnömatik için dropdown'ı kapat
                        setOpenSecondary(null)
                      }
                    }}
                    className="relative flex items-center gap-2.5 rounded-xl border border-slate-200/60 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-[#1e4294]/40 hover:bg-gradient-to-r hover:from-[#1e4294]/5 hover:to-[#ff7f00]/5 hover:text-[#1e4294] hover:shadow-md hover:shadow-[#1e4294]/10 active:scale-[0.98]"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="relative z-10 text-[10px] text-slate-400 transition-all duration-200 group-hover:translate-y-0.5 group-hover:text-[#ff7f00]">▼</span>
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1e4294]/0 via-[#1e4294]/0 to-[#ff7f00]/0 opacity-0 transition-opacity duration-200 group-hover:opacity-5" />
                  </NavLink>
                </div>
              ))}
            </div>
            {secondaryNav.map((item) => (
              openSecondary === item.label && (
                <div
                  key={item.label}
                  onMouseEnter={() => handleOpenSecondary(item.label)}
                  onMouseLeave={handleCloseSecondary}
                  className="absolute left-0 right-0 top-full z-50 mx-auto mt-1 w-full max-w-7xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
                >
                      {item.label !== 'HİDROLİK' ? (
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                        </div>
                      ) : null}
                      {item.label === 'HİDROLİK' ? (
                        <div className="mt-4 grid grid-cols-6 gap-x-8 gap-y-2 text-sm text-slate-700">
                          <div className="space-y-2">
                            {pumpGroup.map((link) => {
                              const isHeading = link === 'POMPA'
                              return (
                                <div key={link} className="flex items-start gap-2">
                                  {!isHeading && (
                                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ff7f00]" />
                                  )}
                                  <a
                                    href="#"
                                    className={`transition hover:text-[#1e4294] ${
                                      isHeading ? 'text-[#ff7f00] font-semibold' : ''
                                    }`}
                                  >
                                    {link}
                                  </a>
                                </div>
                              )
                            })}
                          </div>
                          <div className="space-y-2">
                            {flowGroup.map((link) => {
                              const isHeading = link === 'AKIŞ BÖLÜCÜLER'
                              return (
                                <div key={link} className="flex items-start gap-2">
                                  {!isHeading && (
                                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ff7f00]" />
                                  )}
                                  <a
                                    href="#"
                                    className={`transition hover:text-[#1e4294] ${
                                      isHeading ? 'text-[#ff7f00] font-semibold' : ''
                                    }`}
                                  >
                                    {link}
                                  </a>
                                </div>
                              )
                            })}
                            {batteryGroup.map((link) => {
                              const isHeading = link === 'AKÜLER'
                              return (
                                <div key={link} className="flex items-start gap-2">
                                  {!isHeading && (
                                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ff7f00]" />
                                  )}
                                  <a
                                    href="#"
                                    className={`transition hover:text-[#1e4294] ${
                                      isHeading ? 'text-[#ff7f00] font-semibold' : ''
                                    }`}
                                  >
                                    {link}
                                  </a>
                                </div>
                              )
                            })}
                            {motorGroup.map((link) => {
                              const isHeading = link === 'HİDROMOTORLAR'
                              return (
                                <div key={link} className="flex items-start gap-2">
                                  {!isHeading && (
                                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ff7f00]" />
                                  )}
                                  <a
                                    href="#"
                                    className={`transition hover:text-[#1e4294] ${
                                      isHeading ? 'text-[#ff7f00] font-semibold' : ''
                                    }`}
                                  >
                                    {link}
                                  </a>
                                </div>
                              )
                            })}
                          </div>
                          <div className="space-y-2">
                            {steeringGroup.map((link) => {
                              const isHeading = link === 'DİREKSİYON BEYİNLERİ'
                              return (
                                <div key={link} className="flex items-start gap-2">
                                  {!isHeading && (
                                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ff7f00]" />
                                  )}
                                  <a
                                    href="#"
                                    className={`transition hover:text-[#1e4294] ${
                                      isHeading ? 'text-[#ff7f00] font-semibold' : ''
                                    }`}
                                  >
                                    {link}
                                  </a>
                                </div>
                              )
                            })}
                          </div>
                          <div className="space-y-2">
                            {pressureGroup.map((link) => {
                              const isHeading = link === 'BASINÇ, ISI ÖLÇÜM VE KONTROL CİHAZLARI'
                              return (
                                <div key={link} className="flex items-start gap-2">
                                  {!isHeading && (
                                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ff7f00]" />
                                  )}
                                  <a
                                    href="#"
                                    className={`transition hover:text-[#1e4294] ${
                                      isHeading ? 'text-[#ff7f00] font-semibold' : ''
                                    }`}
                                  >
                                    {link}
                                  </a>
                                </div>
                              )
                            })}
                          </div>
                          <div className="space-y-2">
                            {loaderGroup.map((link) => {
                              const isHeading = link === 'KUMANDA KOLLARI , JOİSTİK VE LOADER VALF'
                              return (
                                <div key={link} className="flex items-start gap-2">
                                  {!isHeading && (
                                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ff7f00]" />
                                  )}
                                  <a
                                    href="#"
                                    className={`transition hover:text-[#1e4294] ${
                                      isHeading ? 'text-[#ff7f00] font-semibold' : ''
                                    }`}
                                  >
                                    {link}
                                  </a>
                                </div>
                              )
                            })}
                          </div>
                          <div className="space-y-2">
                            {controlGroup.map((link) => {
                              const isHeading = link === 'HİDROLİK BAĞLANTI ELEMANLARI'
                              return (
                                <div key={link} className="flex items-start gap-2">
                                  {!isHeading && (
                                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ff7f00]" />
                                  )}
                                  <a
                                    href="#"
                                    className={`transition hover:text-[#1e4294] ${
                                      isHeading ? 'text-[#ff7f00] font-semibold' : ''
                                    }`}
                                  >
                                    {link}
                                  </a>
                                </div>
                              )
                            })}
                            {cylinderGroup.map((link) => {
                              const isHeading = link === 'HİDROLİK SİLİNDİR VE AKSESUARLARI'
                              return (
                                <div key={link} className="flex items-start gap-2">
                                  {!isHeading && (
                                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ff7f00]" />
                                  )}
                                  <a
                                    href="#"
                                    className={`transition hover:text-[#1e4294] ${
                                      isHeading ? 'text-[#ff7f00] font-semibold' : ''
                                    }`}
                                  >
                                    {link}
                                  </a>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ) : item.label === 'MARKALAR' ? (
                        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                          {item.links.map((link) => (
                            <div
                              key={link}
                              className="flex items-center justify-center rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-[#ff7f00]/60 hover:shadow-md"
                            >
                              <img
                                src={brandGallery[link]}
                                alt={link}
                                className="max-h-10 w-auto object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-slate-700">
                          {item.links.map((link) => (
                            <li key={link} className="flex items-start gap-2">
                              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ff7f00]" />
                              <a href="#" className="transition hover:text-[#1e4294]">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                </div>
              )
            ))}
          </div>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-label="Mobil menü">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative ml-auto h-full w-[90vw] max-w-sm overflow-y-auto border-l border-slate-200 bg-white shadow-2xl">
              <div className="flex items-center justify-between px-6 py-5">
                <div className="flex items-center gap-2">
                  <img src={hydLogo3} alt="HYD Point logo" className="h-8 w-auto" />
                  <span className="text-sm font-semibold text-slate-700">HYD Point</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                  aria-label="Menüyü kapat"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 px-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition ${
                        isActive ? 'bg-[#1e4294] text-white' : 'text-slate-800 hover:bg-slate-100'
                      }`
                    }
                    end={item.path === '/'}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-slate-400">›</span>
                  </NavLink>
                ))}
              </div>

              <div className="mt-4 border-t border-slate-100 px-4 pt-4">
                <p className="px-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Kategoriler</p>
                <div className="mt-2 space-y-2">
                  {secondaryNav.map((item) => (
                    <div key={item.label} className="rounded-xl border border-slate-200">
                      <button
                        onClick={() => setMobileSubOpen((prev) => (prev === item.label ? null : item.label))}
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-800"
                      >
                        <span>{item.label}</span>
                        <span className="text-xs text-slate-500">{mobileSubOpen === item.label ? '▲' : '▼'}</span>
                      </button>
                      {mobileSubOpen === item.label ? (
                        <div className="space-y-1 px-4 pb-4">
                          {item.links.map((link) => (
                            <a
                              key={link}
                              href="#"
                              className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 px-4 py-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ÜRÜN ARA"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-200 focus:border-[#ff7f00] focus:outline-none focus:ring-2 focus:ring-[#ff7f00]/20"
                  />
                  <svg
                    className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      aria-label="Temizle"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        </header>

        <main className="pt-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/urunler"
              element={<Products />}
            />
            <Route
              path="/urun-detay/:slug"
              element={<ProductDetail />}
            />
            <Route
              path="/markalar"
              element={<InfoPage hideHeader {...pageContent.markalar} brands={Object.entries(brandGallery).map(([name, src]) => ({ name, src }))} />}
            />
            <Route
              path="/projeler"
              element={<InfoPage {...pageContent.projeler} />}
            />
            <Route
              path="/medya"
              element={<InfoPage {...pageContent.medya} />}
            />
            <Route
              path="/hakkimizda"
              element={<InfoPage {...pageContent.hakkimizda} />}
            />
            <Route
              path="/iletisim"
              element={<Contact />}
            />
          </Routes>
        </main>

        <footer className="mt-16 bg-slate-900 text-slate-200">
          <div className="mx-auto max-w-7xl px-8 py-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
              <div className="space-y-4">
                <img
                  src={hydLogo3}
                  alt="Derya Rakor Logo"
                  className="h-16 w-auto"
                />
                <p className="text-sm text-slate-300">
                  Hidrolik ve pnömatik sektöründe kaliteli ürünler ve çözümler sunuyoruz.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-white">ÜRÜNLER</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li>
                    <a href="#" className="transition hover:text-white">
                      POMPA
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-white">
                      AKIŞ BÖLÜCÜLER
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-white">
                      AKÜLER
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-white">
                      HİDROMOTORLAR
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-white">
                      HİDROLİK BAĞLANTI ELEMANLARI
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-white">
                      HİDROLİK SİLİNDİR VE AKSESUARLARI
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-white">
                      DİREKSİYON BEYİNLERİ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-white">
                      BASINÇ, ISI ÖLÇÜM VE KONTROL CİHAZLARI
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-white">
                      KUMANDA KOLLARI, JOİSTİK VE LOADER VALF
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-white">İLETİŞİM</h4>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-[#ff7f00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@hydpoint.com" className="transition hover:text-white">
                      info@hydpoint.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-[#ff7f00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+902123456789" className="transition hover:text-white">
                      (0212) 345 67 89
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-white">ADRES</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Fevziçakmak, 10670. Sk. Bayır Özel Org. San. Bölg No:31 D:31A,<br />
                  42050 Karatay/Konya
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 bg-slate-800">
            <div className="mx-auto flex max-w-7xl items-center justify-center px-8 py-4 text-xs text-white">
              <p>Telif Hakkı © 2026. HYD Point Endüstriyel tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
