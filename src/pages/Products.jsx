import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'

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
    
    // Hidromotorlar Alt Kategorileri
    'DİŞLİ MOTORLAR': '/disli-motorlar.png',
    'ALÜMİNYUM GÖVDELİ DİŞLİ HİDROMOTORLAR': '/manometrevevakummetreler.png',
    'DÖKÜM GÖVDELİ DİŞLİ MOTORLAR': '/manometrevevakummetreler.png',
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
    
    // Hortumlar Alt Kategorileri
    'PVC HORTUMLAR': '/hortumlar.png',
    'HİDROLİK HORTUMLAR': '/hortumlar.png',
    'ENDÜSTRİYEL HORTUMLAR': '/hortumlar.png',
    'TERMOPLASTİK HORTUMLAR': '/hortumlar.png',
    'HORTUM KORUYUCULAR': '/hortumlar.png',
    
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

function Products() {
  const navigate = useNavigate()
  const { category, subcategory } = useParams()
  const [searchParams] = useSearchParams()
  const [activeSection, setActiveSection] = useState(null)
  const [openGroups, setOpenGroups] = useState(['HİDROLİK'])
  const [selectedGroup, setSelectedGroup] = useState('HİDROLİK')
  const [selectedItem, setSelectedItem] = useState(null)

  // URL parametrelerinden kategoriyi oku
  useEffect(() => {
    // Eğer subcategory varsa, ProductDetail sayfasına yönlendir (bu sayfa Products için)
    if (subcategory) {
      // ProductDetail sayfasına yönlendir - route zaten /urunler/:category/:subcategory olarak ayarlandı
      // Bu durumda Products sayfası render edilmemeli, ProductDetail render edilmeli
      // Ama route yapısı doğru olduğu için burada bir şey yapmaya gerek yok
      return
    }
    
    // Eğer category varsa, onu kullan
    if (category) {
      // Kategoriyi bul ve aç
      for (const group of catalogGroups) {
        const found = group.sections.find((section) => {
          const sectionSlug = section.title.toLowerCase().replace(/\s+/g, '-')
          return sectionSlug === category
        })
        if (found) {
          setActiveSection(found.title)
          setSelectedGroup(group.title)
          setSelectedItem(null) // Alt kategori seçimini temizle
          setOpenGroups((prev) => {
            if (!prev.includes(group.title)) {
              return [...prev, group.title]
            }
            return prev
          })
          return
        }
      }
    } else {
      // URL'de category yoksa, state'leri temizle
      setActiveSection(null)
      setSelectedItem(null)
    }
    
    // Eski query parameter desteği (geriye dönük uyumluluk)
    const sectionParam = searchParams.get('section')
    if (sectionParam && !category) {
      const decodedSection = decodeURIComponent(sectionParam)
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
        for (const section of group.sections) {
          if (section.items.includes(decodedSection)) {
            setActiveSection(section.title)
            setSelectedGroup(group.title)
            setSelectedItem(decodedSection)
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
  }, [category, subcategory, searchParams])

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
                                {section.items.map((item) => {
                                  const categorySlug = section.title.toLowerCase().replace(/\s+/g, '-')
                                  const subcategorySlug = item.toLowerCase().replace(/\s+/g, '-')
                                  const isSelected = subcategory === subcategorySlug
                                  return (
                                    <li key={item}>
                                      <button
                                        onClick={() => {
                                          // Alt kategoriye tıklandığında ProductDetail sayfasına git
                                          navigate(`/urunler/${categorySlug}/${subcategorySlug}`)
                                        }}
                                        className={`w-full rounded-lg px-2 py-1 text-left text-sm transition hover:text-[#ff7f00] ${
                                          isSelected ? 'font-semibold text-[#ff7f00]' : ''
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

        <div className="flex-1 space-y-5">
          {selectedItem === 'MANOMETRE VE VAKUMMETRELER' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">Alt Kategoriler</p>
                  <h2 className="text-xl font-semibold">{selectedItem}</h2>
                </div>
              </div>

              {/* Alt Kategori Kartları */}
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {manometreVakummetreAltKategoriler.map((item) => {
                  const img = getProductImage(item)
                  const productSlug = encodeURIComponent(item.toLowerCase().replace(/\s+/g, '-'))
                  return (
                    <div
                      key={item}
                      onClick={() => navigate(`/urun-detay/${productSlug}`, { state: { productName: item, productImage: img } })}
                      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#ff7f00]/30 hover:shadow-xl hover:shadow-[#ff7f00]/5 max-w-md w-full mx-auto min-h-[360px]"
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
                      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 border-b border-slate-100">
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
                            Manometre & Vakummetre
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
            </>
          ) : selectedItem === 'DİŞLİ MOTORLAR' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">Alt Kategoriler</p>
                  <h2 className="text-xl font-semibold">{selectedItem}</h2>
                </div>
              </div>

              {/* DİŞLİ MOTORLAR Alt Kategori Kartları */}
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {disliMotorlarAltKategoriler.map((item) => {
                  const img = getProductImage(item)
                  const productSlug = encodeURIComponent(item.toLowerCase().replace(/\s+/g, '-'))
                  return (
                    <div
                      key={item}
                      onClick={() => navigate(`/urun-detay/${productSlug}`, { state: { productName: item, productImage: img } })}
                      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#ff7f00]/30 hover:shadow-xl hover:shadow-[#ff7f00]/5 max-w-md w-full mx-auto min-h-[360px]"
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
                      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 border-b border-slate-100">
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
                            Dişli Hidromotor
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
            </>
          ) : selectedItem === 'HORTUMLAR' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">Alt Kategoriler</p>
                  <h2 className="text-xl font-semibold">{selectedItem}</h2>
                </div>
              </div>

              {/* HORTUMLAR Alt Kategori Kartları */}
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {hortumlarAltKategoriler.map((item) => {
                  const img = getProductImage(item)
                  const productSlug = encodeURIComponent(item.toLowerCase().replace(/\s+/g, '-'))
                  return (
                    <div
                      key={item}
                      onClick={() => navigate(`/urun-detay/${productSlug}`, { state: { productName: item, productImage: img } })}
                      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#ff7f00]/30 hover:shadow-xl hover:shadow-[#ff7f00]/5 max-w-md w-full mx-auto min-h-[360px]"
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

                      {/* Content Section */}
                      <div className="relative flex flex-1 flex-col bg-white p-5 pt-8">
                        {/* Category badge */}
                        <div className="mb-2.5">
                          <span className="inline-block rounded-md bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 transition-all duration-300 group-hover:bg-[#ff7f00]/10 group-hover:text-[#ff7f00] group-hover:shadow-sm">
                            Hortum
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
            </>
          ) : selectedItem ? (
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
                    <p>Bu ürün için marka logosu bulunmamaktadır.</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {allBrandLogos.map((logo, index) => {
                      // HEMA logo için özel işlem
                      const isHema = logo === '/hema.png'
                      const brandName = logo.replace(/^\//, '').replace(/\.png$/, '')
                      const productSlug = selectedItem ? encodeURIComponent(selectedItem.toLowerCase().replace(/\s+/g, '-')) : ''
                      const isClickable =
                        (selectedItem === 'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR' && brandName === 'hema') ||
                        (selectedItem === 'ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER' && ['asc', 'casappa', 'hema'].includes(brandName))
                      
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            if (selectedItem === 'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR') {
                              if (brandName === 'hema') {
                                navigate(`/urunler/pompa/aluminyum-govdeli-disli-pompalar/${brandName}`)
                              }
                              return
                            }
                            if (selectedItem === 'ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER') {
                              if (['asc', 'casappa', 'hema'].includes(brandName)) {
                                navigate(`/urunler/akis-boluculer/aluminyum-govde-disli-akis-boluculer/${brandName}`)
                              }
                              return
                            }
                          }}
                          className={`flex h-20 w-32 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-2 transition hover:border-[#ff7f00] hover:bg-white hover:shadow-md sm:h-24 sm:w-36 sm:p-3 ${
                            isClickable ? 'cursor-pointer' : ''
                          }`}
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
                      )
                    })}
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
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {hydraulicSections.map((section) => {
                  const sectionImg = getProductImage(section.title)
                  return (
                    <button
                      key={section.title}
                      onClick={() => {
                        setActiveSection(section.title)
                        setSelectedItem(null) // Kategori kartına tıklandığında ürün seçimini temizle
                      }}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white text-left shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#ff7f00]/30 hover:shadow-xl hover:shadow-[#ff7f00]/5 max-w-md w-full mx-auto min-h-[320px]"
                    >
                      {/* Decorative top accent */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff7f00] via-[#ff9500] to-[#ff7f00] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Image Container with Professional Design */}
                      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 border-b border-slate-100">
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
                  Lütfen bir kategori seçiniz, ürünleri listeleyebilirsiniz.
                </div>
              ) : currentItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
                  Bu grup için ürün bulunmamaktadır.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {currentItems.map((item) => {
                    const img = getProductImage(item)
                    const productSlug = encodeURIComponent(item.toLowerCase().replace(/\s+/g, '-'))
                    return (
                      <div
                        key={item}
                        onClick={() => navigate(`/urun-detay/${productSlug}`, { state: { productName: item, productImage: img } })}
                      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#ff7f00]/30 hover:shadow-xl hover:shadow-[#ff7f00]/5 max-w-md w-full mx-auto min-h-[360px]"
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
                        <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 border-b border-slate-100">
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

