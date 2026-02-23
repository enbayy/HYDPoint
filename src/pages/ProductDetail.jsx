import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'

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
    'MANOMETRE VE VAKUMMETRELER': '/manometrevevakummetreler.png',
    'TRANSMİTTERLER': '/transmitterler.png',
    
    // Manometre ve Vakummetreler Alt Kategorileri
    'ALT BAĞLANTILI MANOMETRELER': '/manometrevevakummetreler.png',
    'KONTAKLI VAKUMMETRELER': '/manometrevevakummetreler.png',
    'PANO BAĞLANTILI VAKUMMETRELER': '/manometrevevakummetreler.png',
    'MANOVAKOMETRELER': '/manometrevevakummetreler.png',
    'ALT BAĞLANTILI VAKUMMETRELER': '/manometrevevakummetreler.png',
    'KONTAKLI MANOMETRELER': '/manometrevevakummetreler.png',
    'ARKADAN BAĞLANTILI MANOMETRELER': '/manometrevevakummetreler.png',
    'PANO BAĞLANTILI MANOMETRELER': '/manometrevevakummetreler.png',
    'ARKADAN BAĞLANTILI VAKUMMETRELER': '/manometrevevakummetreler.png',

    // Hidromotorlar alt kategorileri
    'DİŞLİ MOTORLAR': '/disli-motorlar.png',
    'ALÜMİNYUM GÖVDELİ DİŞLİ HİDROMOTORLAR': '/manometrevevakummetreler.png',
    'DÖKÜM GÖVDELİ DİŞLİ MOTORLAR': '/manometrevevakummetreler.png',
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
    
    // Hortumlar Alt Kategorileri
    'PVC HORTUMLAR': '/hortumlar.png',
    'HİDROLİK HORTUMLAR': '/hortumlar.png',
    'ENDÜSTRİYEL HORTUMLAR': '/hortumlar.png',
    'TERMOPLASTİK HORTUMLAR': '/hortumlar.png',
    'HORTUM KORUYUCULAR': '/hortumlar.png',
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

const pneumaticSections = []

const sealingSections = []

const catalogGroups = [
  { title: 'HİDROLİK', sections: hydraulicSections },
  { title: 'PNÖMATİK', sections: pneumaticSections },
  { title: 'SIZDIRMAZLIK', sections: sealingSections },
]

// MANOMETRE VE VAKUMMETRELER alt kategorileri
const manometreVakummetreAltKategoriler = [
  'ALT BAĞLANTILI MANOMETRELER',
  'KONTAKLI VAKUMMETRELER',
  'PANO BAĞLANTILI VAKUMMETRELER',
  'MANOVAKOMETRELER',
  'ALT BAĞLANTILI VAKUMMETRELER',
  'KONTAKLI MANOMETRELER',
  'ARKADAN BAĞLANTILI MANOMETRELER',
  'PANO BAĞLANTILI MANOMETRELER',
  'ARKADAN BAĞLANTILI VAKUMMETRELER',
]

// DİŞLİ MOTORLAR alt kategorileri
const disliMotorlarAltKategoriler = [
  'ALÜMİNYUM GÖVDELİ DİŞLİ HİDROMOTORLAR',
  'DÖKÜM GÖVDELİ DİŞLİ MOTORLAR',
]

// HORTUMLAR alt kategorileri
const hortumlarAltKategoriler = [
  'PVC HORTUMLAR',
  'HİDROLİK HORTUMLAR',
  'ENDÜSTRİYEL HORTUMLAR',
  'TERMOPLASTİK HORTUMLAR',
  'HORTUM KORUYUCULAR',
]

// DİŞLİ MOTORLAR alt kategorileri
const disliMotorAltKategoriler = [
  'ALÜMİNYUM GÖVDELİ DİŞLİ HİDROMOTORLAR',
  'DÖKÜM GÖVDELİ DİŞLİ MOTORLAR',
]

// Slug'dan ürün adını geri çeviren fonksiyon
const decodeProductName = (slug, groups) => {
  if (!slug) return null
  
  // Tüm ürünleri topla
  const allProductNames = []
  groups.forEach(group => {
    group.sections.forEach(section => {
      allProductNames.push(...section.items)
    })
  })
  
  // Slug'ı decode et ve normalize et
  const decoded = decodeURIComponent(slug).replace(/-/g, ' ')
  
  // Ürün adlarını kontrol et
  for (const name of allProductNames) {
    const nameSlug = encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))
    if (nameSlug === slug || name.toLowerCase() === decoded.toLowerCase()) {
      return name
    }
  }
  
  return null
}

function ProductDetail() {
  const location = useLocation()
  const navigate = useNavigate()
  const { slug } = useParams()
  const { productName: stateProductName, productImage, productLogo } = location.state || {}
  
  const [activeSection, setActiveSection] = useState(null)
  const [openGroups, setOpenGroups] = useState(['HİDROLİK'])
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  // State'ten, slug'dan veya seçilen üründen ürün adını al
  const productName = selectedProduct || stateProductName || decodeProductName(slug, catalogGroups)

  // Aktif kategoriye göre ürünleri bul
  const currentItems = useMemo(() => {
    if (!activeSection) return []
    for (const group of catalogGroups) {
      const found = group.sections.find((section) => section.title === activeSection)
      if (found) return found.items
    }
    return []
  }, [activeSection])

  // Eğer ürün adı bulunamazsa geri dön
  if (!productName) {
    return (
      <div className="bg-slate-50 pb-16 text-slate-900">
        <div className="mx-auto max-w-[95%] px-3 pt-10 sm:px-4">
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-base text-slate-600">Ürün bulunamadı.</p>
            <button
              onClick={() => navigate('/urunler')}
              className="mt-4 rounded-lg bg-[#ff7f00] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e07000]"
            >
              Ürünlere Dön
            </button>
          </div>
        </div>
      </div>
    )
  }

  const toggleGroup = (title) => {
    if (title === 'HİDROLİK') {
      const isOpen = openGroups.includes(title)
      if (!isOpen) {
        setOpenGroups((prev) => [...prev, title])
      }
    } else {
      setOpenGroups((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
    }
  }

  const handleGroupClick = (title) => {
    if (title === 'HİDROLİK') {
      if (!openGroups.includes(title)) {
        setOpenGroups((prev) => [...prev, title])
      }
    } else {
      if (!openGroups.includes(title)) {
        setOpenGroups((prev) => [...prev, title])
      }
    }
  }

  const handleSectionClick = (sectionTitle) => {
    setActiveSection(sectionTitle)
    setSelectedProduct(null) // Ürün seçimini temizle, kategori kartlarını göster
  }

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

  // Ürün adına göre marka logolarını seç
  const getProductBrandLogos = (productName) => {
    if (!productName) return []
    
    // Belirli ürünler için sabit logo listeleri
    if (productName === 'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR') {
      return [
        '/hydropack.png',
        '/asc.png',
        '/casappa.png',
        '/hema.png',
        '/rexroth.png',
        '/galtec.png',
        '/vivolo.png',
        '/salami.png',
      ]
    }

    if (productName === 'DÖKÜM GÖVDELİ DİŞLİ POMPALAR') {
      return [
        '/asc.png',
        '/casappa.png',
        '/david-brown.png',
        '/hemko.png',
        '/hidromas.png',
      ]
    }

    if (productName === 'EL POMPASI') {
      return [
        '/hydropack.png',
        '/omfb.png',
        '/cms.png',
        '/ferro.png',
        '/oleocon.png',
      ]
    }

    if (productName === 'İÇTEN DİŞLİ POMPALAR') {
      return ['/eckerle.png']
    }

    if (productName === 'İŞ MAKİNESİ POMPALARI') {
      return ['/david-brown.png']
    }

    if (productName === 'PALETLİ POMPA') {
      return [
        '/berarma.png',
        '/oxim.png',
        '/hystar.png',
        '/hytek.png',
        '/kcl.png',
      ]
    }

    if (productName === 'PİSTONLU POMPA') {
      return [
        '/casappa.png',
        '/hema.png',
        '/kawasaki.png',
        '/linde.png',
        '/celebi.png',
        '/gold.png',
        '/hpt.png',
        '/pzb.png',
        '/samhydraulic.png',
        '/sunfab.png',
        '/parker.png',
      ]
    }

    if (productName === 'TANDEM POMPALAR') {
      return [
        '/hydropack.png',
        '/asc.png',
        '/casappa.png',
        '/hema.png',
        '/vivolo.png',
        '/salami.png',
        '/hydrocar.png',
      ]
    }

    if (productName === 'ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER') {
      return [
        '/asc.png',
        '/casappa.png',
        '/hema.png',
      ]
    }

    if (productName === 'DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER') {
      return ['/casappa.png']
    }

    if (productName === 'MEMBRANLI AKÜLER') {
      return [
        '/fox.png',
        '/saip.png',
        '/hydac.png',
      ]
    }

    if (productName === 'BALONLU AKÜLER') {
      return [
        '/fox.png',
        '/saip.png',
        '/hydac.png',
      ]
    }

    // Manometre & Vakummetre alt ürünleri
    if (productName === 'ALT BAĞLANTILI MANOMETRELER') {
      return [
        '/pakkens.png',
        '/wika.png',
      ]
    }

    if (productName === 'KONTAKLI VAKUMMETRELER') {
      return ['/pakkens.png']
    }

    if (productName === 'PANO BAĞLANTILI VAKUMMETRELER') {
      return ['/pakkens.png']
    }

    if (productName === 'MANOVAKOMETRELER') {
      return ['/pakkens.png']
    }

    if (productName === 'ALT BAĞLANTILI VAKUMMETRELER') {
      return ['/pakkens.png']
    }

    if (productName === 'KONTAKLI MANOMETRELER') {
      return ['/pakkens.png']
    }

    if (productName === 'ARKADAN BAĞLANTILI MANOMETRELER') {
      return ['/pakkens.png']
    }

    if (productName === 'PANO BAĞLANTILI MANOMETRELER') {
      return ['/pakkens.png']
    }

    if (productName === 'ARKADAN BAĞLANTILI VAKUMMETRELER') {
      return ['/pakkens.png']
    }

    if (productName === 'EMNİYETLİ NORMAL') {
      return [
        '/hydropack.png',
        '/hema.png',
      ]
    }

    if (productName === 'EMNİYETLİ ANTİŞOKLU') {
      return [
        '/hydropack.png',
        '/hema.png',
      ]
    }

    if (productName === 'EMNİYETSİZ NORMAL') {
      return [
        '/hydropack.png',
        '/zhenjiang.png',
      ]
    }

    if (productName === 'EMNİYETSİZ KAPALI MERKEZ') {
      return ['/hydropack.png']
    }

    if (productName === 'EMNİYETSİZ ANTİŞOKLU') {
      return ['/hydropack.png']
    }

    if (productName === 'FORKLİFT İÇİN XY SERİSİ') {
      return ['/hydropack.png']
    }

    if (productName === 'BASINÇ ŞALTERLERİ') {
      return [
        '/hystar.png',
        '/fox.png',
        '/hydac.png',
        '/etna.png',
        '/danfoss.png',
        '/hlp.png',
        '/pnomek.png',
        '/telemecanique.png',
      ]
    }

    if (productName === 'ISI (SICAKLIK) ÖLÇER') {
      return [
        '/fox.png',
        '/pnomek.png',
      ]
    }

    if (productName === 'MANOMETRE KORUMA VALFLERİ') {
      return ['/tognella.png']
    }

    if (productName === 'MANOMETRE TEST RAKORLARI') {
      return ['/ferro.png']
    }

    if (productName === 'TRANSMİTTERLER') {
      return [
        '/sick.png',
        '/wika.png',
        '/trafag.png',
      ]
    }

    if (productName === 'ALÜMİNYUM GÖVDELİ DİŞLİ HİDROMOTORLAR') {
      return [
        '/asc.png',
        '/casappa.png',
        '/hema.png',
      ]
    }

    if (productName === 'DÖKÜM GÖVDELİ DİŞLİ MOTORLAR') {
      return [
        '/asc.png',
        '/casappa.png',
      ]
    }

    if (productName === 'EĞİK EKSENLİ HİDROMOTORLAR') {
      return [
        '/celebi.png',
        '/gold.png',
        '/sunfab.png',
        '/parker.png',
      ]
    }

    if (productName === 'GEROTOR MOTORLAR (ORBİT)') {
      return [
        '/hema.png',
        '/oxim.png',
        '/samhydraulic.png',
        '/parker.png',
        '/zhenjiang.png',
        '/danfoss.png',
        '/white.png',
        '/ms.png',
        '/dinamicoil.png',
      ]
    }

    if (productName === 'YILDIZ (RADIAL) MOTOR') {
      return [
        '/hydropack.png',
        '/sai.png',
        '/italgroup.png',
      ]
    }

    if (productName === 'DİLİMLİ KUMANDA KOLU') {
      return [
        '/hydropack.png',
        '/akon.png',
        '/walvoil.png',
      ]
    }

    if (productName === 'MONOBLOK KUMANDA KOLU') {
      return [
        '/hydropack.png',
        '/galtec.png',
        '/akon.png',
        '/walvoil.png',
      ]
    }

    if (productName === 'ELEKTRİK KONTROLLÜ KUMANDA KOLLARI') {
      return ['/hydropack.png']
    }

    if (productName === 'JOİSTİK VE YÜKLEYİCİ VALF') {
      return ['/hydropack.png']
    }

    if (productName === 'HORTUM BAĞLANTI ELEMANLARI') {
      return ['/rekorsan.png']
    }

    if (productName === 'DİŞLİ BAĞLANTI ELEMANLARI') {
      return ['/rekorsan.png']
    }

    if (productName === 'KROM KAPLI MİLLER') {
      return ['/grimet.png']
    }

    if (productName === 'PVC HORTUMLAR') {
      return ['/sel.png']
    }

    if (productName === 'HİDROLİK HORTUMLAR') {
      return ['/sel.png']
    }

    if (productName === 'ENDÜSTRİYEL HORTUMLAR') {
      return ['/sel.png']
    }

    if (productName === 'TERMOPLASTİK HORTUMLAR') {
      return ['/sel.png']
    }

    if (productName === 'HORTUM KORUYUCULAR') {
      return ['/sel.png']
    }

    // Diğer tüm ürünler için: deterministik rastgele seçim
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

  const allBrandLogos = getProductBrandLogos(productName)

  return (
    <div className="bg-slate-50 pb-16 text-slate-900">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pt-8 sm:gap-8 sm:px-6 lg:flex-row lg:px-8">
        {/* Sol Menü */}
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
                              onClick={() => handleSectionClick(section.title)}
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
                                {section.items.map((item) => {
                                  return (
                                    <li key={item}>
                                      <button
                                        onClick={() => {
                                          setSelectedProduct(item)
                                          // activeSection'ı koru, kategori açık kalsın
                                        }}
                                        className={`w-full rounded-lg px-2 py-1 text-left text-sm transition hover:text-[#ff7f00] ${
                                          item === productName ? 'font-semibold text-[#ff7f00]' : ''
                                        }`}
                                      >
                                        {item}
                                      </button>
                                    </li>
                                  )
                                })}
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

        {/* Sağ İçerik */}
        <div className="flex-1 space-y-5">
          {productName === 'MANOMETRE VE VAKUMMETRELER' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">Alt Kategoriler</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
              </div>

              {/* Alt Kategori Kartları */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {manometreVakummetreAltKategoriler.map((item) => {
                  const img = getProductImage(item)
                  return (
                    <div
                      key={item}
                      onClick={() => {
                        setSelectedProduct(item)
                      }}
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
            </>
          ) : productName === 'DİŞLİ MOTORLAR' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">Alt Kategoriler</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
              </div>

              {/* DİŞLİ MOTORLAR Alt Kategori Kartları */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {disliMotorlarAltKategoriler.map((item) => {
                  const img = getProductImage(item)
                  return (
                    <div
                      key={item}
                      onClick={() => {
                        setSelectedProduct(item)
                      }}
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
            </>
          ) : productName === 'HORTUMLAR' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">Alt Kategoriler</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
              </div>

              {/* HORTUMLAR Alt Kategori Kartları */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {hortumlarAltKategoriler.map((item) => {
                  const img = getProductImage(item)
                  return (
                    <div
                      key={item}
                      onClick={() => {
                        setSelectedProduct(item)
                      }}
                      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#ff7f00]/40 hover:shadow-2xl hover:shadow-[#ff7f00]/10"
                    >
                      {/* Content Section */}
                      <div className="flex flex-1 flex-col p-6 pt-8">
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
            </>
          ) : selectedProduct || (productName && !activeSection) ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">Ürün Detayı</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
              </div>

              {/* Marka Logoları */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">
                {allBrandLogos.length === 0 ? (
                  <div className="py-12 text-center text-slate-500">
                    <p>Bu ürün için marka logosu bulunamadı.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-6">
                    {allBrandLogos.map((logo, index) => (
                      <div
                        key={index}
                        className="flex h-16 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-2 transition hover:border-[#ff7f00] hover:bg-white hover:shadow-md sm:h-20 sm:p-3"
                      >
                        <img 
                          src={logo} 
                          alt={`Brand ${index + 1}`} 
                          className="h-10 w-auto object-contain sm:h-12"
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
          ) : (
            <>
              {/* Kategori Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">Seçilen kategori</p>
                  <h2 className="text-xl font-semibold">{activeSection ?? 'Henüz seçilmedi'}</h2>
                </div>
                <span className="text-sm text-slate-500">
                  {activeSection ? `${currentItems.length} ürün` : 'Seçim yapın'}
                </span>
              </div>

              {/* Ürün Kartları */}
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
                    return (
                      <div
                        key={item}
                        onClick={() => {
                          setSelectedProduct(item)
                          // activeSection'ı koru, kategori açık kalsın
                        }}
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

export default ProductDetail
