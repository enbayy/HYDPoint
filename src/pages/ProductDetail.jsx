import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'

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

// Markalara göre ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR grupları
const getBrandGroups = (brandName, productName = null) => {
  // ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER için gruplar
  if (productName === 'ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER') {
    const akisBoluculerBrandGroups = {
      'asc': [
        '10. GRUP AKIŞ BÖLÜCÜLER',
        '20. GRUP AKIŞ BÖLÜCÜLER',
      ],
      'casappa': [
        '10. GRUP AKIŞ BÖLÜCÜLER',
        '20. GRUP AKIŞ BÖLÜCÜLER',
      ],
      'hema': [
        '20. GRUP AKIŞ BÖLÜCÜLER',
      ],
    }
    return akisBoluculerBrandGroups[brandName] || []
  }
  
  // DÖKÜM GÖVDELİ DİŞLİ POMPALAR için gruplar
  if (productName === 'DÖKÜM GÖVDELİ DİŞLİ POMPALAR') {
    const dokumBrandGroups = {
      'asc': [
        '20.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR',
        '20.GRUP G TİPİ KAPAK FREZELİ POMPALAR',
        '30.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR',
        '30.GRUP B TİPİ KAPAK DÜZ MİLLİ POMPALAR',
        '30.GRUP UNİ POMPALAR',
        '30.GRUP ISO POMPALAR',
        '40.GRUP UNİ POMPALAR',
        '40.GRUP ISO POMPALAR',
        '20.GRUP HELİSEL STANDART POMPALAR',
        '30.GRUP HELİSEL STANDART POMPALAR',
      ],
      'casappa': [
        '20.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR',
        '30.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR',
        '30.GRUP ÇİFT YÖNLÜ POMPALAR (T2)',
        '30.GRUP UNİ POMPALAR',
        '30.GRUP ISO POMPALAR',
        '40.GRUP UNİ POMPALAR',
        '40.GRUP ISO POMPALAR',
        '30.GRUP G TİPİ KAPAK 7/8 13 DİŞ FREZELİ POMPALAR',
        '35.GRUP SAE C KAPAK 14 DİŞ FREZELİ',
      ],
      'david-brown': [
        '20.GRUP G TİPİ KAPAK DÜZ MİLLİ POMPALAR',
        '20.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR',
        '40.GRUP END.HELİSEL G TİPİ KAPAK 7/8 DÜZ MİLLİ',
        '30.GRUP G TİPİ KAPAK DÜZ MİLLİ POMPALAR',
      ],
      'hemko': [
        '30.GRUP ISO POMPALAR',
        '40.GRUP ISO POMPALAR',
      ],
      'hidromas': [
        '40.GRUP UNİ POMPALAR',
        '40.GRUP ISO POMPALAR',
        '40.GRUP MEKANİK VANALI POMPALAR',
      ],
    }
    return dokumBrandGroups[brandName] || []
  }
  
  // ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR için gruplar (varsayılan)
  const brandGroups = {
    'hydropack': [
      '00.GRUP POMPALAR',
      '10.GRUP POMPALAR (0.5P SERİSİ)',
      '20.GRUP POMPALAR (1P SERİSİ)',
      '30.GRUP POMPALAR (2P SERİSİ)',
    ],
    'asc': [
      '10.GRUP POMPALAR (0.5P SERİSİ)',
      '20.GRUP POMPALAR (1P SERİSİ)',
      '30.GRUP POMPALAR (2P SERİSİ)',
    ],
    'casappa': [
      '10.GRUP POMPALAR (0.5P SERİSİ)',
      '20.GRUP POMPALAR (1P SERİSİ)',
      '30.GRUP POMPALAR (2P SERİSİ)',
    ],
    'hema': [
      '10.GRUP POMPALAR (0.5P SERİSİ)',
      '20.GRUP POMPALAR (1P SERİSİ)',
      '30.GRUP POMPALAR (2P SERİSİ)',
      '3P.GRUBU POMPALAR',
    ],
    'rexroth': [
      '10.GRUP POMPALAR (0.5P SERİSİ)',
    ],
    'galtech': [
      '20.GRUP POMPALAR (1P SERİSİ)',
      '30.GRUP POMPALAR (2P SERİSİ)',
    ],
    'vivolo': [
      '30.GRUP POMPALAR (2P SERİSİ)',
    ],
    'salami': [
      '30.GRUP POMPALAR (2P SERİSİ)',
    ],
  }
  return brandGroups[brandName] || []
}

// PALETLİ POMPA için markalara göre kartlar
const getPaletliPompaBrandCards = (brandName) => {
  const brandCards = {
    'berarma': [
      'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR',
    ],
    'oxim': [
      'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR',
      'V10-V20 ENDÜSTRİYEL VE MOBİL POMPALAR',
    ],
    'hystar': [
      'ENDÜSTRİYEL TİP PALETLİ POMPALAR',
      'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR',
      'V10-V20 ENDÜSTRİYEL VE MOBİL POMPALAR',
    ],
    'hytek': [
      'ENDÜSTRİYEL TİP PALETLİ POMPALAR',
      'KATRİÇ',
      'MOBİL TİP PALETLİ POMPALAR',
      'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR',
      'V10-V20 ENDÜSTRİYEL VE MOBİL POMPALAR',
    ],
    'kcl': [
      'ENDÜSTRİYEL TİP PALETLİ POMPALAR',
      'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR',
    ],
  }
  return brandCards[brandName] || []
}

// DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER için markalara göre kartlar
const getDokumGovdeDisliAkisBoluculerBrandCards = (brandName) => {
  const brandCards = {
    'casappa': [
      '30. GRUP AKIŞ BÖLÜCÜLER',
      '35. GRUP AKIŞ BÖLÜCÜLER',
    ],
  }
  return brandCards[brandName] || []
}

// PİSTONLU POMPA için markalara göre kartlar
const getPistonluPompaBrandCards = (brandName) => {
  const brandCards = {
    'casappa': [
      'EKSENEL PİSTONLU POMPA',
      'DEĞİŞKEN DEBİLİ POMPALAR',
    ],
    'hema': [
      'DEĞİŞKEN DEBİLİ POMPALAR',
    ],
    'kawasaki': [
      'DEĞİŞKEN DEBİLİ POMPALAR',
    ],
    'linde': [
      'DEĞİŞKEN DEBİLİ POMPALAR',
    ],
    'celebi': [
      'EKSENEL PİSTONLU POMPA',
    ],
    'gold': [
      'EKSENEL PİSTONLU POMPA',
    ],
    'hpt': [
      'EKSENEL PİSTONLU POMPA',
    ],
    'pzb': [
      'EKSENEL PİSTONLU POMPA',
    ],
    'samhydraulic': [
      'EKSENEL PİSTONLU POMPA',
    ],
    'sunfab': [
      'EKSENEL PİSTONLU POMPA',
    ],
    'parker': [
      'EKSENEL PİSTONLU POMPA',
    ],
  }
  return brandCards[brandName] || []
}

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
  const { slug, category, subcategory, brand: brandParam, group: groupParam } = useParams()
  const [searchParams] = useSearchParams()
  const { productName: stateProductName, productImage, productLogo, brand: stateBrand } = location.state || {}
  
  const [activeSection, setActiveSection] = useState(null)
  const [openGroups, setOpenGroups] = useState(['HİDROLİK'])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null) // Seçilen grup (örn: "00.GRUP POMPALAR")
  const [selectedGroupBrand, setSelectedGroupBrand] = useState(null) // Seçilen marka (örn: "hydropack")
  const [selectedPaletliPompaCard, setSelectedPaletliPompaCard] = useState(null) // Seçilen PALETLİ POMPA kartı
  const [selectedPistonluPompaCard, setSelectedPistonluPompaCard] = useState(null) // Seçilen PİSTONLU POMPA kartı
  const [selectedDokumGovdeDisliAkisBoluculerCard, setSelectedDokumGovdeDisliAkisBoluculerCard] = useState(null) // Seçilen DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER kartı
  
  // URL parametrelerinden veya query parameter'dan veya state'ten marka bilgisini al
  const brandFromQuery = searchParams.get('brand')
  const currentBrand = brandParam || stateBrand || brandFromQuery
  
  // URL parametrelerinden ürün adını al (yeni format: /urunler/category/subcategory)
  const [productNameFromUrl, setProductNameFromUrl] = useState(null)
  
  useEffect(() => {
    if (category && subcategory) {
      const decodedSubcategory = decodeURIComponent(subcategory.replace(/-/g, ' '))
      // Kategoriyi bul
      for (const group of catalogGroups) {
        for (const section of group.sections) {
          const sectionSlug = section.title.toLowerCase().replace(/\s+/g, '-')
          if (sectionSlug === category) {
            // Alt kategoriyi bul
            if (section.items.includes(decodedSubcategory)) {
              setProductNameFromUrl(decodedSubcategory)
              setActiveSection(section.title)
              setOpenGroups((prev) => {
                if (!prev.includes(group.title)) {
                  return [...prev, group.title]
                }
                return prev
              })
              
              // Brand parametresini oku
              if (brandParam) {
                setSelectedBrand(brandParam)
              }
              
              // Group parametresini oku
              if (groupParam) {
                const decodedGroup = decodeURIComponent(groupParam.replace(/-/g, ' '))
                // Grup adını bul
                const brandGroups = getBrandGroups(brandParam || 'hydropack', decodedSubcategory)
                for (const groupName of brandGroups) {
                  // Grup slug'ını oluştur (handleGroupCardClick ile aynı mantık)
                  const groupSlug = groupName
                    .toLowerCase()
                    .replace(/\./g, '-')
                    .replace(/[()]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/0\.5/g, '05')
                    .replace(/1p/g, '1-p')
                    .replace(/2p/g, '2-p')
                    .replace(/3p/g, '3-p')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '')
                  
                  if (groupSlug === groupParam || groupName === decodedGroup) {
                    setSelectedGroup(groupName)
                    setSelectedGroupBrand(brandParam || 'hydropack')
                    break
                  }
                }
              }
              
              return
            } else {
              // Slug'dan ürün adını bul
              for (const item of section.items) {
                const itemSlug = item.toLowerCase().replace(/\s+/g, '-')
                if (itemSlug === subcategory) {
                  setProductNameFromUrl(item)
                  setActiveSection(section.title)
                  setOpenGroups((prev) => {
                    if (!prev.includes(group.title)) {
                      return [...prev, group.title]
                    }
                    return prev
                  })
                  
                  // Brand parametresini oku
                  if (brandParam) {
                    setSelectedBrand(brandParam)
                  }
                  
                  // Group parametresini oku
                  if (groupParam) {
                    const decodedGroup = decodeURIComponent(groupParam.replace(/-/g, ' '))
                    const brandGroups = getBrandGroups(brandParam || 'hydropack', item)
                    for (const groupName of brandGroups) {
                      // Grup slug'ını oluştur (handleGroupCardClick ile aynı mantık)
                      const groupSlug = groupName
                        .toLowerCase()
                        .replace(/\./g, '-')
                        .replace(/[()]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/0\.5/g, '05')
                        .replace(/1p/g, '1-p')
                        .replace(/2p/g, '2-p')
                        .replace(/3p/g, '3-p')
                        .replace(/-+/g, '-')
                        .replace(/^-|-$/g, '')
                      
                      if (groupSlug === groupParam || groupName === decodedGroup) {
                        setSelectedGroup(groupName)
                        setSelectedGroupBrand(brandParam || 'hydropack')
                        break
                      }
                    }
                  }
                  
                  return
                }
              }
            }
          }
        }
      }
    } else {
      setProductNameFromUrl(null)
    }
  }, [category, subcategory, brandParam, groupParam])
  
  // State'ten, URL'den, slug'dan veya seçilen üründen ürün adını al
  const productName = selectedProduct || productNameFromUrl || stateProductName || decodeProductName(slug, catalogGroups)
  
  // selectedBrand değiştiğinde paletli pompa kart seçimini temizle
  useEffect(() => {
    if (productName === 'PALETLİ POMPA') {
      setSelectedPaletliPompaCard(null)
    }
    if (productName === 'DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER') {
      setSelectedDokumGovdeDisliAkisBoluculerCard(null)
    }
  }, [selectedBrand, productName])

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
    setSelectedBrand(null) // Marka seçimini temizle
    setSelectedGroup(null) // Grup seçimini temizle
    setSelectedGroupBrand(null) // Grup marka seçimini temizle
  }

  const handleBrandClick = (logoPath) => {
    // Logo path'inden marka adını çıkar (örn: '/hydropack.png' -> 'hydropack')
    const brandName = logoPath.replace(/^\//, '').replace(/\.png$/, '')
    
    // Eğer ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR veya DÖKÜM GÖVDELİ DİŞLİ POMPALAR sayfasındaysak ve bu markanın grupları varsa
    if (productName === 'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR' || productName === 'DÖKÜM GÖVDELİ DİŞLİ POMPALAR') {
      const groups = getBrandGroups(brandName, productName)
      if (groups.length > 0) {
        // URL'yi güncelle: /urunler/category/subcategory/brand
        if (category && subcategory) {
          navigate(`/urunler/${category}/${subcategory}/${brandName}`)
        } else {
          // Eski format için
          const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
          navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
            state: { productName, productImage, productLogo, brand: brandName }
          })
        }
        setSelectedBrand(brandName)
        setSelectedProduct(null) // Ürün seçimini temizle
        setSelectedGroup(null) // Grup seçimini temizle
        setSelectedGroupBrand(null) // Grup marka seçimini temizle
      } else {
        // Bu marka için grup yoksa, marka bazlı detay sayfasına navigate et
        if (category && subcategory) {
          navigate(`/urunler/${category}/${subcategory}/${brandName}`)
        } else {
          const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
          navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
            state: { productName, productImage, productLogo, brand: brandName }
          })
        }
      }
    } else if (productName === 'İŞ MAKİNESİ POMPALARI' && brandName === 'david-brown') {
      // İŞ MAKİNESİ POMPALARI için David Brown detay sayfasına navigate et
      if (category && subcategory) {
        navigate(`/urunler/${category}/${subcategory}/${brandName}`)
      } else {
        const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
        navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
          state: { productName, productImage, productLogo, brand: brandName }
        })
      }
      setSelectedBrand(brandName)
      setSelectedProduct(null)
    } else if (productName === 'PALETLİ POMPA') {
      // PALETLİ POMPA için marka kartlarını göster
      const cards = getPaletliPompaBrandCards(brandName)
      if (cards.length > 0) {
        // URL'yi güncelle: /urunler/category/subcategory/brand
        if (category && subcategory) {
          navigate(`/urunler/${category}/${subcategory}/${brandName}`)
        } else {
          // Eski format için
          const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
          navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
            state: { productName, productImage, productLogo, brand: brandName }
          })
        }
        setSelectedBrand(brandName)
        setSelectedPaletliPompaCard(null) // Kart seçimini temizle
        setSelectedProduct(null) // Ürün seçimini temizle
        setSelectedGroup(null) // Grup seçimini temizle
        setSelectedGroupBrand(null) // Grup marka seçimini temizle
      } else {
        // Bu marka için kart yoksa, marka bazlı detay sayfasına navigate et
        if (category && subcategory) {
          navigate(`/urunler/${category}/${subcategory}/${brandName}`)
        } else {
          const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
          navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
            state: { productName, productImage, productLogo, brand: brandName }
          })
        }
        setSelectedBrand(brandName)
        setSelectedPaletliPompaCard(null) // Kart seçimini temizle
      }
    } else if (productName === 'PİSTONLU POMPA') {
      // PİSTONLU POMPA için marka kartlarını göster
      const cards = getPistonluPompaBrandCards(brandName)
      if (cards.length > 0) {
        // URL'yi güncelle: /urunler/category/subcategory/brand
        if (category && subcategory) {
          navigate(`/urunler/${category}/${subcategory}/${brandName}`)
        } else {
          // Eski format için
          const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
          navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
            state: { productName, productImage, productLogo, brand: brandName }
          })
        }
        setSelectedBrand(brandName)
        setSelectedPistonluPompaCard(null) // Kart seçimini temizle
        setSelectedProduct(null) // Ürün seçimini temizle
        setSelectedGroup(null) // Grup seçimini temizle
        setSelectedGroupBrand(null) // Grup marka seçimini temizle
      } else {
        // Bu marka için kart yoksa, marka bazlı detay sayfasına navigate et
        if (category && subcategory) {
          navigate(`/urunler/${category}/${subcategory}/${brandName}`)
        } else {
          const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
          navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
            state: { productName, productImage, productLogo, brand: brandName }
          })
        }
        setSelectedBrand(brandName)
        setSelectedPistonluPompaCard(null) // Kart seçimini temizle
      }
    } else if (productName === 'DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER') {
      // DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER için marka kartlarını göster
      const cards = getDokumGovdeDisliAkisBoluculerBrandCards(brandName)
      if (cards.length > 0) {
        // URL'yi güncelle: /urunler/category/subcategory/brand
        if (category && subcategory) {
          navigate(`/urunler/${category}/${subcategory}/${brandName}`)
        } else {
          // Eski format için
          const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
          navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
            state: { productName, productImage, productLogo, brand: brandName }
          })
        }
        setSelectedBrand(brandName)
        setSelectedDokumGovdeDisliAkisBoluculerCard(null) // Kart seçimini temizle
        setSelectedProduct(null) // Ürün seçimini temizle
        setSelectedGroup(null) // Grup seçimini temizle
        setSelectedGroupBrand(null) // Grup marka seçimini temizle
      } else {
        // Bu marka için kart yoksa, marka bazlı detay sayfasına navigate et
        if (category && subcategory) {
          navigate(`/urunler/${category}/${subcategory}/${brandName}`)
        } else {
          const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
          navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
            state: { productName, productImage, productLogo, brand: brandName }
          })
        }
        setSelectedBrand(brandName)
        setSelectedDokumGovdeDisliAkisBoluculerCard(null) // Kart seçimini temizle
      }
    } else if (productName === 'EL POMPASI') {
      // EL POMPASI için direkt detay sayfasına navigate et (kart yok)
      if (category && subcategory) {
        navigate(`/urunler/${category}/${subcategory}/${brandName}`)
      } else {
        const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
        navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
          state: { productName, productImage, productLogo, brand: brandName }
        })
      }
      setSelectedBrand(brandName)
      setSelectedProduct(null)
    } else if (productName === 'İÇTEN DİŞLİ POMPALAR') {
      // İÇTEN DİŞLİ POMPALAR için direkt detay sayfasına navigate et (kart yok)
      if (category && subcategory) {
        navigate(`/urunler/${category}/${subcategory}/${brandName}`)
      } else {
        const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
        navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
          state: { productName, productImage, productLogo, brand: brandName }
        })
      }
      setSelectedBrand(brandName)
      setSelectedProduct(null)
    } else if (productName === 'İŞ MAKİNESİ POMPALARI') {
      // İŞ MAKİNESİ POMPALARI için direkt detay sayfasına navigate et (kart yok)
      if (category && subcategory) {
        navigate(`/urunler/${category}/${subcategory}/${brandName}`)
      } else {
        const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
        navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
          state: { productName, productImage, productLogo, brand: brandName }
        })
      }
      setSelectedBrand(brandName)
      setSelectedProduct(null)
    } else if (productName === 'TANDEM POMPALAR') {
      // TANDEM POMPALAR için direkt detay sayfasına navigate et
      if (category && subcategory) {
        navigate(`/urunler/${category}/${subcategory}/${brandName}`)
      } else {
        const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
        navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
          state: { productName, productImage, productLogo, brand: brandName }
        })
      }
      setSelectedBrand(brandName)
      setSelectedProduct(null)
    } else {
      // Diğer ürünler için marka bazlı detay sayfasına navigate et
      if (category && subcategory) {
        navigate(`/urunler/${category}/${subcategory}/${brandName}`)
      } else {
        const productSlug = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))
        navigate(`/urun-detay/${productSlug}?brand=${brandName}`, {
          state: { productName, productImage, productLogo, brand: brandName }
        })
      }
    }
  }

  const handleGroupCardClick = (groupName, brandName = 'hydropack') => {
    // Grup adını slug'a çevir
    // Örnek: "00.GRUP POMPALAR" -> "00-grup-pompalar"
    // Örnek: "10.GRUP POMPALAR (0.5P SERİSİ)" -> "10-grup-pompalar-05p-serisi"
    const groupSlug = groupName
      .toLowerCase()
      .replace(/\./g, '-') // Noktaları tire ile değiştir
      .replace(/[()]/g, '') // Parantezleri kaldır
      .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
      .replace(/0\.5/g, '05') // 0.5 -> 05
      .replace(/1p/g, '1-p') // 1P -> 1-p
      .replace(/2p/g, '2-p') // 2P -> 2-p
      .replace(/3p/g, '3-p') // 3P -> 3-p
      .replace(/-+/g, '-') // Birden fazla tireyi tek tireye çevir
      .replace(/^-|-$/g, '') // Başta ve sonda tire varsa kaldır
    
    // URL'yi güncelle: /urunler/category/subcategory/brand/group
    if (category && subcategory) {
      navigate(`/urunler/${category}/${subcategory}/${brandName}/${groupSlug}`)
    } else {
      // Eski format için state kullan
      setSelectedGroup(groupName)
      setSelectedGroupBrand(brandName)
      setSelectedProduct(null)
    }
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

  // Grup resimlerini al
  const getGroupImage = (groupName) => {
    const imageMap = {
      // ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER
      '10. GRUP AKIŞ BÖLÜCÜLER': '/akisboluculer/10-grup-akis-boluculer.png',
      '20. GRUP AKIŞ BÖLÜCÜLER': '/akisboluculer/20-grup-akis-boluculer.png',
      // ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR
      '00.GRUP POMPALAR': '/aliminyumgovdelidislipompalar/00grup-pompalar.png',
      '10.GRUP POMPALAR (0.5P SERİSİ)': '/aliminyumgovdelidislipompalar/10grup-pompalar.png',
      '20.GRUP POMPALAR (1P SERİSİ)': '/aliminyumgovdelidislipompalar/20grup-pompalar.png',
      '30.GRUP POMPALAR (2P SERİSİ)': '/aliminyumgovdelidislipompalar/30grup-pompalar.png',
      '3P.GRUBU POMPALAR': '/aliminyumgovdelidislipompalar/3pgrubu-pompalar.png',
      // DÖKÜM GÖVDELİ DİŞLİ POMPALAR
      '20.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR': '/dokumgovdelidislipompalar/20grup-b-tipi-kapak-1-8-kon.png',
      '20.GRUP G TİPİ KAPAK FREZELİ POMPALAR': '/dokumgovdelidislipompalar/20grup-g-tipi-kapak-frezel.png',
      '20.GRUP G TİPİ KAPAK DÜZ MİLLİ POMPALAR': '/dokumgovdelidislipompalar/20grup-g-tipi-kapak-duz-mi.png',
      '20.GRUP HELİSEL STANDART POMPALAR': '/dokumgovdelidislipompalar/20grup-helisel-standart-po.png',
      '30.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR': '/dokumgovdelidislipompalar/30grup-b-tipi-kapak-1-8-kon.png',
      '30.GRUP B TİPİ KAPAK DÜZ MİLLİ POMPALAR': '/dokumgovdelidislipompalar/30grup-b-tipi-kapak-duz-mi.png',
      '30.GRUP ÇİFT YÖNLÜ POMPALAR (T2)': '/dokumgovdelidislipompalar/30grup-cift-yonlu-pompalar(T2).png',
      '30.GRUP G TİPİ KAPAK 7/8 13 DİŞ FREZELİ POMPALAR': '/dokumgovdelidislipompalar/30grup-g-tipi-kapak-7-8-13disfrazelipompalar.png',
      '30.GRUP G TİPİ KAPAK DÜZ MİLLİ POMPALAR': '/dokumgovdelidislipompalar/30grup-g-tipi-kapak-duz-mi.png',
      '30.GRUP HELİSEL STANDART POMPALAR': '/dokumgovdelidislipompalar/30grup-helisel-standart-po.png',
      '30.GRUP UNİ POMPALAR': '/dokumgovdelidislipompalar/30grup-uni-pompalar.png',
      '30.GRUP ISO POMPALAR': '/dokumgovdelidislipompalar/30grup-iso-pompalar.png',
      '35.GRUP SAE C KAPAK 14 DİŞ FREZELİ': '/dokumgovdelidislipompalar/35grup-sae-c-kapak-14-dis.png',
      // DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER
      '30. GRUP AKIŞ BÖLÜCÜLER': '/akisboluculer/30-grup-akis-boluculer.png',
      '35. GRUP AKIŞ BÖLÜCÜLER': '/akisboluculer/35-grup-akis-boluculer.png',
      '40.GRUP END.HELİSEL G TİPİ KAPAK 7/8 DÜZ MİLLİ': '/dokumgovdelidislipompalar/40grup-endhelisel-g-tipi-kapak-7-8-duzmilli.png',
      '40.GRUP UNİ POMPALAR': '/dokumgovdelidislipompalar/40grup-uni-pompalar.png',
      '40.GRUP ISO POMPALAR': '/dokumgovdelidislipompalar/40grup-iso-pompalar.png',
      '40.GRUP MEKANİK VANALI POMPALAR': '/dokumgovdelidislipompalar/40grup-mekanik-vanali-pomp.png',
    }
    return imageMap[groupName] || '/pompa.png'
  }

  // PALETLİ POMPA kart resimlerini al
  const getPaletliPompaCardImage = (cardName) => {
    const imageMap = {
      'DEĞİŞKEN DEBİLİ PALETLİPOMPALAR': '/paletlipompa/degisken-debili-paletli-po.png',
      'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR': '/paletlipompa/degisken-debili-paletli-po.png',
      'ÖN UYARILI BASINÇ REG.DEĞ.DEB. PALETLİ POMPALAR': '/paletlipompa/degisken-debili-paletli-po.png',
      'ENDÜSTRİYEL TİP PALETLİ POMPALAR': '/paletlipompa/endustriyel-tip-paletli-po.png',
      'KATRİÇ': '/paletlipompa/katric.png',
      'MOBİL TİP PALETLİ POMPALAR': '/paletlipompa/mobil-tip-paletli-pompalar.png',
      'V10-V20 ENDÜSTRİYEL VE MOBİL POMPALAR': '/paletlipompa/v10v20-endustriyel-ve-mobilpompalar.png',
    }
    return imageMap[cardName] || '/paletli-pompa.png'
  }

  const getPistonluPompaCardImage = (cardName) => {
    const imageMap = {
      'EKSENEL PİSTONLU POMPA': '/pistonlupompa/eksenel-pistonlu-pompa.png',
      'DEĞİŞKEN DEBİLİ POMPALAR': '/pistonlupompa/degisken-debili-pompalar.png',
    }
    return imageMap[cardName] || '/pistonlu-pompa.png'
  }

  const getDokumGovdeDisliAkisBoluculerCardImage = (cardName) => {
    const imageMap = {
      '30. GRUP AKIŞ BÖLÜCÜLER': '/akisboluculer/30-grup-akis-boluculer.png',
      '35. GRUP AKIŞ BÖLÜCÜLER': '/akisboluculer/35-grup-akis-boluculer.png',
    }
    return imageMap[cardName] || '/dokum-govde-disli-akis-boluculer.png'
  }

  // CASAPPA DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER ürün verilerini al
  const getCasappaDokumGovdeDisliAkisBoluculerProductData = (cardName) => {
    if (cardName === '35. GRUP AKIŞ BÖLÜCÜLER') {
      return {
        title: '35. GRUP AKIŞ BÖLÜCÜLER',
        categories: [
          {
            name: 'İKİLİ AKIŞ BÖLÜCÜ',
            products: [
              { kod: '31179', bar: '310-335', debi: '124,81' },
            ]
          }
        ]
      }
    }
    
    if (cardName === '30. GRUP AKIŞ BÖLÜCÜLER') {
      return {
        title: '30. GRUP AKIŞ BÖLÜCÜLER',
        categories: [
          {
            name: 'İKİLİ AKIŞ BÖLÜCÜ',
            products: [
              { kod: '31177', bar: '310-335', debi: '34,39' },
              { kod: 'C03772265', bar: '310-335', debi: '51,59' },
              { kod: '31178', bar: '310-335', debi: '60,97' },
            ]
          },
          {
            name: 'ÜÇLÜ AKIŞ BÖLÜCÜ',
            products: [
              { kod: '31206', bar: '310-335', debi: '26,58' },
              { kod: '31207', bar: '310-335', debi: '38,00' },
            ]
          },
          {
            name: 'DÖRTLÜ AKIŞ BÖLÜCÜ',
            products: [
              { kod: '31270', bar: '310-335', debi: '26,58' },
            ]
          }
        ]
      }
    }
    
    return null
  }

  // HEMA PİSTONLU POMPA ürün verilerini al
  const getHemaPistonluPompaProductData = (cardName) => {
    if (cardName === 'DEĞİŞKEN DEBİLİ POMPALAR') {
      return {
        title: 'DEĞİŞKEN DEBİLİ POMPALAR',
        categories: [
          {
            name: 'YÜK DUYARLI',
            products: [
              { kod: 'EPP045105M', basinc: '280-315', devDak: '2200', pompaVersiyon: 'YÜK DUYARLI (LOAD SENSING)' },
              { kod: 'EPP045111M', basinc: '280-315', devDak: '2200', pompaVersiyon: 'YÜK DUYARLI (LOAD SENSING)' },
              { kod: 'EPP045103M', basinc: '280-315', devDak: '2200', pompaVersiyon: 'YÜK DUYARLI (LOAD SENSING)' },
            ]
          }
        ]
      }
    }
    return null
  }

  // PARKER PİSTONLU POMPA ürün verilerini al
  const getParkerPistonluPompaProductData = (cardName) => {
    if (cardName === 'EKSENEL PİSTONLU POMPA') {
      return {
        title: 'EKSENEL PİSTONLU POMPA',
        categories: [
          {
            name: 'EKSENEL (MOBİL) PİSTONLU POMPALAR',
            products: [
              { kod: '26419', basinc: '350', iletimHacmi: '25,6 CM³', maksDevir: '2600', maksGuc: '31', tork: '142' },
              { kod: '26420', basinc: '350', iletimHacmi: '40,9 CM³', maksDevir: '2400', maksGuc: '46', tork: '227' },
              { kod: 'PMH-2K-3781760', basinc: '350', iletimHacmi: '59,5 CM³', maksDevir: '2200', maksGuc: '61', tork: '331' },
              { kod: 'PMH-2K-3781080', basinc: '350', iletimHacmi: '81,6 CM³', maksDevir: '2000', maksGuc: '76', tork: '453' },
              { kod: 'PMH-2K-3781100', basinc: '350', iletimHacmi: '102,9 CM³', maksDevir: '1800', maksGuc: '86', tork: '572' },
            ]
          }
        ]
      }
    }
    return null
  }

  // ÇELEBİ PİSTONLU POMPA ürün verilerini al
  const getCelebiPistonluPompaProductData = (cardName) => {
    if (cardName === 'EKSENEL PİSTONLU POMPA') {
      return {
        title: 'EKSENEL PİSTONLU POMPA',
        categories: [
          {
            name: 'EKSENEL (ENDÜSTRİYEL) PİSTONLU POMPALAR',
            products: [
              { 
                kod: '2PBA 108 cc', 
                agirlik: 'GİRİŞ RAKORLU 15,90 KG', 
                cikintiTorku: 'GİRİŞ RAKORLU 18,45 NM', 
                girisVeCikis: '1 İNÇ', 
                iletimHacmi: '108,40 CM³', 
                maxAlanSSurekBasinc: '350 ÇUBUĞU', 
                maxAlanSaySinirliHiz: '1900 DEV/DAK', 
                maxAlanSaySurekliHiz: '1700 DEV/DAK', 
                maxAlanSay350BTork: '620 NM', 
                maxAlanSayisiAralik: 'TEPE BASINCI 400 ÇUBUĞU', 
                rotasyon: 'CW, CCW' 
              },
              { 
                kod: '2PBA 12 cc', 
                agirlik: 'GİRİŞ RAKORLU 9,40 KG', 
                cikintiTorku: 'GİRİŞ RAKORLU 9,15 NM', 
                girisVeCikis: '1 İNÇ', 
                iletimHacmi: '12,00 CM³', 
                maxAlanSSurekBasinc: '350 ÇUBUĞU', 
                maxAlanSaySinirliHiz: '3100 DEV/DAK', 
                maxAlanSaySurekliHiz: '2300 DAK/DEV', 
                maxAlanSay350BTork: '71 NM', 
                maxAlanSayisiAralik: 'TEPE BASINCI 400 ÇUBUĞU', 
                rotasyon: 'CW,CCW' 
              },
              { 
                kod: '2PBA 130 cc', 
                agirlik: 'GİRİŞ RAKORLU 17,00 KG', 
                cikintiTorku: 'GİRİŞ RAKORLU 20,45 NM', 
                girisVeCikis: '1 İNÇ', 
                iletimHacmi: '130,00 CM³', 
                maxAlanSSurekBasinc: '350 ÇUBUĞU', 
                maxAlanSaySinirliHiz: '1750 DEV/DAK', 
                maxAlanSaySurekliHiz: '1600 DEV/DAK', 
                maxAlanSay350BTork: '746 NM', 
                maxAlanSayisiAralik: 'TEPE BASINCI 400 ÇUBUĞU', 
                rotasyon: 'CW,CCW' 
              },
              { 
                kod: '2PBA 18 cc', 
                agirlik: 'GİRİŞ RAKORLU 9,40 KG', 
                cikintiTorku: 'GİRİŞ RAKORLU 9,19 NM', 
                girisVeCikis: '3/4 İNÇ', 
                iletimHacmi: '18,00 CM³', 
                maxAlanSSurekBasinc: '350 ÇUBUĞU', 
                maxAlanSaySinirliHiz: '2900 DEV/DAK', 
                maxAlanSaySurekliHiz: '2300 DEV/DAK', 
                maxAlanSay350BTork: '105 NM', 
                maxAlanSayisiAralik: '400 ÇUBUĞU', 
                rotasyon: 'CW, CCW' 
              },
              { 
                kod: '2PBA 25 cc', 
                agirlik: 'GİRİŞ RAKORLU 9,90 KG', 
                cikintiTorku: 'GİRİŞ RAKORLU 9,23 NM', 
                girisVeCikis: '3/4 İNÇ', 
                iletimHacmi: '25,00 CM³', 
                maxAlanSSurekBasinc: '350 ÇUBUĞU', 
                maxAlanSaySinirliHiz: '2700 DEV/DAK', 
                maxAlanSaySurekliHiz: '2300 DEV/DAK', 
                maxAlanSay350BTork: '146 NM', 
                maxAlanSayisiAralik: 'TEPE BASINCI 400 ÇUBUĞU', 
                rotasyon: 'CW, CCW' 
              },
              { 
                kod: '2PBA 32 cc', 
                agirlik: 'GİRİŞ RAKORLU 10,90KG', 
                cikintiTorku: 'GİRİŞ RAKORLU 11,52NM', 
                girisVeCikis: '1 İNÇ', 
                iletimHacmi: '32,00 CM³', 
                maxAlanSSurekBasinc: '350 ÇUBUĞU', 
                maxAlanSaySinirliHiz: '2700 DEV/DAK', 
                maxAlanSaySurekliHiz: '2250 DEV/DAK', 
                maxAlanSay350BTork: '190 NM', 
                maxAlanSayisiAralik: 'TEPE BASINCI - 400 ÇUBUĞU', 
                rotasyon: 'CW, CCW' 
              },
              { 
                kod: '2PBA 40 cc', 
                agirlik: 'GİRİŞ RAKORLU 10,90KG', 
                cikintiTorku: 'GİRİŞ RAKORLU 11,40 NM', 
                girisVeCikis: '1 İNÇ', 
                iletimHacmi: '40,20 CM³', 
                maxAlanSSurekBasinc: '350 ÇUBUĞU', 
                maxAlanSaySinirliHiz: '2500 DEVİR/DAKİKA', 
                maxAlanSaySurekliHiz: '1900 DEV/DAK', 
                maxAlanSay350BTork: '240 NM', 
                maxAlanSayisiAralik: 'TEPE BASINCI 400 ÇUBUĞU', 
                rotasyon: 'CW, CCW' 
              },
              { 
                kod: '2PBA 50 cc', 
                agirlik: 'GİRİŞ RAKORLU 11,40 KG', 
                cikintiTorku: 'GİRİŞ RAKORLU12,20 NM', 
                girisVeCikis: '1 İNÇ', 
                iletimHacmi: '50,00 CM³', 
                maxAlanSSurekBasinc: '350 ÇUBUĞU', 
                maxAlanSaySinirliHiz: '2500 DEVİR/DAKİKA', 
                maxAlanSaySurekliHiz: '1900 DEV/DAK', 
                maxAlanSay350BTork: '292 NM', 
                maxAlanSayisiAralik: 'TEPE BASINCI 400 ÇUBUĞU', 
                rotasyon: 'CW, CCW' 
              },
              { 
                kod: '2PBA 63 cc', 
                agirlik: 'GİRİŞ RAKORLU 11,90KG', 
                cikintiTorku: 'GİRİŞ RAKORLU 12,28NM', 
                girisVeCikis: '1 İNÇ', 
                iletimHacmi: '63,00 CM³', 
                maxAlanSSurekBasinc: '350 ÇUBUĞU', 
                maxAlanSaySinirliHiz: '2300 DEV/DAK', 
                maxAlanSaySurekliHiz: '1900 DEV/DAK', 
                maxAlanSay350BTork: '360 NM', 
                maxAlanSayisiAralik: 'TEPE BASINCI 400 ÇUBUĞU', 
                rotasyon: 'CW, CCW' 
              },
              { 
                kod: '2PBA 80 cc', 
                agirlik: 'GİRİŞ RAKORLU 25,40KG', 
                cikintiTorku: 'GİRİŞ RAKOLRU 18,33 NM', 
                girisVeCikis: '1 İNÇ', 
                iletimHacmi: '80,00 CM³', 
                maxAlanSSurekBasinc: '350 ÇUBUĞU', 
                maxAlanSaySinirliHiz: '2100 DEV/DAK', 
                maxAlanSaySurekliHiz: '1700 DEV/DAK', 
                maxAlanSay350BTork: '460 NM', 
                maxAlanSayisiAralik: 'TEPE BASINCI 400 ÇUBUĞU', 
                rotasyon: 'CW, CCW' 
              },
            ]
          }
        ]
      }
    }
    return null
  }

  // SAMHYDRAULIC PİSTONLU POMPA ürün verilerini al
  const getSamhydraulicPistonluPompaProductData = (cardName) => {
    if (cardName === 'EKSENEL PİSTONLU POMPA') {
      return {
        title: 'EKSENEL PİSTONLU POMPA',
        categories: [
          {
            name: 'EKSENEL (ENDÜSTRİYEL) PİSTONLU POMPALAR',
            products: [
              { 
                kod: '26299', 
                basinc: '350-450', 
                hiz: '4300', 
                iletimHacmi: '19,6 CM³', 
                maksDebi: '84', 
                milCapi: 'FREZELİ - KAMALI', 
                tork: '0,31' 
              },
              { 
                kod: '26300', 
                basinc: '350-450', 
                hiz: '2300', 
                iletimHacmi: '75,3 CM³', 
                maksDebi: '173', 
                milCapi: 'FREZELİ - KAMAL', 
                tork: '1,20' 
              },
              { 
                kod: '26301', 
                basinc: '350-450', 
                hiz: '2000', 
                iletimHacmi: '107,5 CM³', 
                maksDebi: '215', 
                milCapi: 'FREZELİ - KAMALI', 
                tork: '1,71' 
              },
              { 
                kod: '26303', 
                basinc: '350-450', 
                hiz: '1800', 
                iletimHacmi: '160,8 CM³', 
                maksDebi: '289', 
                milCapi: 'FREZELİ - KAMALI', 
                tork: '2,56' 
              },
            ]
          }
        ]
      }
    }
    return null
  }

  // CASAPPA PİSTONLU POMPA ürün verilerini al
  const getCasappaPistonluPompaProductData = (cardName) => {
    if (cardName === 'EKSENEL PİSTONLU POMPA') {
      return {
        title: 'EKSENEL PİSTONLU POMPA',
        categories: [
          {
            name: 'EKSENEL (ENDÜSTRİYEL) PİSTONLU POMPALAR',
            products: [
              { kod: 'C06858700', calismaBasinci: '350', iletimHacmi: '40,90 CM³', kapakTipi: 'ISO FLANŞ', maksHiz: '2500' },
              { kod: 'C06858701', calismaBasinci: '350', iletimHacmi: '40,90 CM³', kapakTipi: 'ISO FLANŞ', maksHiz: '250' },
              { kod: '26344', calismaBasinci: '350', iletimHacmi: '50,10 CM³', kapakTipi: 'ISO FLANŞ', maksHiz: '2400' },
              { kod: '26345', calismaBasinci: '350', iletimHacmi: '63,00 CM³', kapakTipi: 'ISO FLANŞ', maksHiz: '2200' },
              { kod: '26346', calismaBasinci: '315', iletimHacmi: '71,60 CM³', kapakTipi: 'ISO FLANŞ', maksHiz: '2000' },
              { kod: 'C06858764', calismaBasinci: '315', iletimHacmi: '78,30 CM³', kapakTipi: 'ISO FLANŞ', maksHiz: '2000' },
              { kod: '26348', calismaBasinci: '315', iletimHacmi: '78,30 CM³', kapakTipi: 'ISO FLANŞ', maksHiz: '2000' },
              { kod: '26349', calismaBasinci: '300', iletimHacmi: '110,00 CM³', kapakTipi: 'ISO FLANŞ', maksHiz: '2000' },
            ]
          }
        ]
      }
    } else if (cardName === 'DEĞİŞKEN DEBİLİ POMPALAR') {
      return {
        title: 'DEĞİŞKEN DEBİLİ POMPALAR',
        categories: [
          {
            name: 'YÜK DUYARLI',
            products: [
              { kod: '26151', basinc: '280', maksHiz: '2200', milKapakTipi: '06S7/34S7', pompaVersiyon: 'YÜK DUYARLI (LOAD SENSİNG)' },
              { kod: 'C06862553', basinc: '280', maksHiz: '3000', milKapakTipi: '04S5', pompaVersiyon: 'YÜK DUYARLI (LOAD SENSİNG)' },
              { kod: '26150', basinc: '280', maksHiz: '2600', milKapakTipi: '05S5', pompaVersiyon: 'YÜK DUYARLI (LOAD SENSİNG)' },
            ]
          },
          {
            name: 'GÜÇ REGÜLASYONLU',
            products: [
              { kod: '26101', basinc: '280', maksHiz: '2200', milKapakTipi: '06S7/34S7', pompaVersiyon: 'GÜÇ REGÜLASYONLU (22KW)' },
              { kod: '26099', basinc: '280', maksHiz: '3000', milKapakTipi: '04S5', pompaVersiyon: 'GÜÇ REGÜLASYONLU (5,5 KW)' },
              { kod: '26100', basinc: '280', maksHiz: '2600', milKapakTipi: '05S5', pompaVersiyon: 'GÜÇ REGÜLASYONLU (11KW)' },
            ]
          }
        ]
      }
    }
    return null
  }

  // LINDE PİSTONLU POMPA ürün verilerini al
  const getLindePistonluPompaProductData = (cardName) => {
    if (cardName === 'DEĞİŞKEN DEBİLİ POMPALAR') {
      return {
        title: 'DEĞİŞKEN DEBİLİ POMPALAR',
        categories: [
          {
            name: 'GÜÇ REGÜLASYONLU',
            products: [
              { kod: '26089', basinc: '450', devDak: '2500-2700', flansTipi: 'SAE C', iletimHacmi: '105,0 CM³', kontrolTipi: 'BASINÇ + YÜK DUYARLI', milTipi: '16/32 23 T' },
              { kod: '26090', basinc: '450', devDak: '2200-2400', flansTipi: 'SAE D', iletimHacmi: '165,6 CM³', kontrolTipi: 'BASINÇ+YÜK DUYARLI', milTipi: '16/32 27 T' },
              { kod: '26091', basinc: '450', devDak: '2500-2700', flansTipi: 'SAE C', iletimHacmi: '75,9 CM³', kontrolTipi: 'BASINÇ + YÜK DUYARLI', milTipi: '16/32 - 21 T' },
              { kod: '26088', basinc: '450', devDak: '2100-2300', flansTipi: 'SAE E', iletimHacmi: '210,0 CM³', kontrolTipi: 'BASINÇ + YÜK DUYARLI', milTipi: '8/16 15 T' },
            ]
          },
          {
            name: 'KAPALI ÇEVRİM (YÜRÜYÜŞ POMPALAR)',
            products: [
              { kod: '26127', basinc: '450', devDak: '3900-4100', flansTipi: 'SAE C', iletimHacmi: '54,8 CM³', kontrolTipi: 'ELEKTRİKLİ ORANSAL', milTipi: '16/32 21 T' },
              { kod: '26123', basinc: '450', devDak: '3400-3600', flansTipi: 'SAE C', iletimHacmi: '75,9 CM³', kontrolTipi: 'ELEKTRİKLİ ORANSAL', milTipi: '16/32 21 T' },
              { kod: '26124', basinc: '450', devDak: '2750-2950', flansTipi: 'SAE D', iletimHacmi: '165,5 CM³', kontrolTipi: 'ELEKTRİKLİ ORANSAL', milTipi: '16/32 27 T' },
              { kod: '26129', basinc: '450', devDak: '3400-3600', flansTipi: 'SAE C', iletimHacmi: '75,9 CM³', kontrolTipi: 'ELEKTRİKLİ ON-OFF', milTipi: '16/32 21 T' },
              { kod: '26125', basinc: '450', devDak: '3400-3600', flansTipi: 'SAE C', iletimHacmi: '75,9 CM³', kontrolTipi: 'MEKANİK ORANSAL', milTipi: '16/32 21T' },
              { kod: 'HPV02-135L-M100M11-01', basinc: '450', devDak: '3000-3200', flansTipi: 'SAE D', iletimHacmi: '135,6 CM³', kontrolTipi: 'MEKANİK ORANSAL', milTipi: '16/32 27 T' },
            ]
          }
        ]
      }
    }
    return null
  }

  // PZB PİSTONLU POMPA ürün verilerini al
  const getPzbPistonluPompaProductData = (cardName) => {
    if (cardName === 'EKSENEL PİSTONLU POMPA') {
      return {
        title: 'EKSENEL PİSTONLU POMPA',
        categories: [
          {
            name: 'EKSENEL (ENDÜSTRİYEL) PİSTONLU POMPALAR',
            products: [
              { kod: '26338', calismaBasinci: '350', debi: '108', maksHiz: '1700' },
              { kod: '26340', calismaBasinci: '450', debi: '34', maksHiz: '2400' },
              { kod: '26337', calismaBasinci: '450', debi: '47', maksHiz: '2100' },
              { kod: '26339', calismaBasinci: '450', debi: '64', maksHiz: '2000' },
            ]
          }
        ]
      }
    }
    return null
  }

  // KAWASAKI PİSTONLU POMPA ürün verilerini al
  const getKawasakiPistonluPompaProductData = (cardName) => {
    if (cardName === 'DEĞİŞKEN DEBİLİ POMPALAR') {
      return {
        title: 'DEĞİŞKEN DEBİLİ POMPALAR',
        categories: [
          {
            name: 'YÜK DUYARLI',
            products: [
              { kod: '26134', flansTipi: 'SAE D / 4 CİVATALI', iletimHacmi: '112 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ', milTipi: 'SAE D KAMALI' },
              { kod: '26135', flansTipi: 'SAE D / 4 CİVATALI', iletimHacmi: '140 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ', milTipi: 'SAE D FREZELİ' },
              { kod: '26136', flansTipi: 'SAE B / 2 CİVATALI', iletimHacmi: '28 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ', milTipi: 'SAE B FREZELİ' },
              { kod: '26138', flansTipi: 'SAE B / 2 CİVATALI', iletimHacmi: '45 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ', milTipi: 'SAE BB FREZELİ' },
              { kod: '26139', flansTipi: 'SAE C / 2 CİVATALI', iletimHacmi: '80 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ', milTipi: 'SAE C FREZELİ' },
              { kod: 'YKPM-E-2903340-1670', flansTipi: 'SAE D / 4 CİVATALI', iletimHacmi: '112 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ', milTipi: 'SAE D KAMALI' },
              { kod: 'YKPM-E-2903340-1669', flansTipi: 'SAE D / 4 CİVATALI', iletimHacmi: '112 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ', milTipi: 'SAE D KAMALI' },
              { kod: '41000048', flansTipi: 'SAE D / 4 CİVATALI', iletimHacmi: '112 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ', milTipi: 'SAE D KAMALI' },
            ]
          },
          {
            name: 'GÜÇ REGÜLASYONLU',
            products: [
              { kod: '26121', flansTipi: 'SAE B / 2 CİVATALI', iletimHacmi: '45 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ-G', milTipi: 'SAE BB FREZELİ' },
              { kod: '26094', flansTipi: 'SAE D/4 CİVATALI', iletimHacmi: '112 CM³', kontrolTipi: 'YÜK DUY.-BAS. KONT.-GÜÇ REG.', milTipi: 'SAE D KAMALI' },
              { kod: '26119', flansTipi: 'SAE D / 4 CİVATALI', iletimHacmi: '140 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ-G', milTipi: 'SAE D KAMALI' },
              { kod: '26086', flansTipi: 'SAE C / 2 CİVATALI', iletimHacmi: '80 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ-G', milTipi: 'SAE C KAMALI' },
              { kod: '26102', flansTipi: 'SAE C / 2 CİVATALI', iletimHacmi: '80 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ-G', milTipi: 'SAE C KAMALI' },
              { kod: '26120', flansTipi: 'SAE E / 4 CİVATALI', iletimHacmi: '200 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ-G', milTipi: 'SAE D KAMALI' },
              { kod: '26085', flansTipi: 'SAE B/2CİVATALI', iletimHacmi: '45 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ-GÜÇ REGÜLASYONLU (11 KW )', milTipi: 'SAE BB FREZE' },
              { kod: '26109', flansTipi: 'SAE C / 2 CİVATALI', iletimHacmi: '80 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ-G', milTipi: 'SAE C FREZELİ' },
              { kod: 'KPM-29L83N0BL1M4', flansTipi: 'SAE C / 2 CİVATALI', iletimHacmi: '80 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ-G', milTipi: 'SAE C FREZELİ' },
              { kod: '26087', flansTipi: 'SAE C / 2 CİVATALI', iletimHacmi: '80 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ-G', milTipi: 'SAE C FREZELİ' },
              { kod: 'KPM-29L84N0BL0', flansTipi: 'SAE C / 2 CİVATALI', iletimHacmi: '80 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ-G', milTipi: 'SAE C FREZELİ' },
              { kod: 'KPM-29L83N0SL0', flansTipi: 'SAE C / 2 CİVATALI', iletimHacmi: '80 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ-G', milTipi: 'SAE C FREZELİ' },
              { kod: '26118', flansTipi: 'SAE D / 4 CİVATALI', iletimHacmi: '140 CM³', kontrolTipi: 'YÜK DUYARLI-BASINÇ KONTROLLÜ', milTipi: 'SAE D KAMALI' },
            ]
          }
        ]
      }
    }
    return null
  }

  // HPT PİSTONLU POMPA ürün verilerini al
  const getHptPistonluPompaProductData = (cardName) => {
    if (cardName === 'EKSENEL PİSTONLU POMPA') {
      return {
        title: 'EKSENEL PİSTONLU POMPA',
        categories: [
          {
            name: 'EKSENEL (ENDÜSTRİYEL) PİSTONLU POMPALAR',
            products: [
              { kod: '26375', basinc: '400', iletimHacmi: '105,20 CM³', litre: '105', maksHiz: '2000' },
              { kod: '26367', basinc: '400', iletimHacmi: '105,20 CM³', litre: '108', maksHiz: '2000' },
              { kod: '26376', basinc: '400', iletimHacmi: '12,60 CM³', litre: '12', maksHiz: '3000' },
              { kod: '26327', basinc: '400', iletimHacmi: '12,60 CM³', litre: '12', maksHiz: '3000' },
              { kod: '26368', basinc: '300', iletimHacmi: '130,00 CM³', litre: '130', maksHiz: '2000' },
              { kod: '26295', basinc: '400', iletimHacmi: '17,00 CM³', litre: '17', maksHiz: '3000' },
              { kod: '26328', basinc: '400', iletimHacmi: '17,00 CM³', litre: '17', maksHiz: '3000' },
              { kod: '26372', basinc: '400', iletimHacmi: '25,40 CM³', litre: '25', maksHiz: '3000' },
              { kod: '26329', basinc: '400', iletimHacmi: '25,40 CM³', litre: '25', maksHiz: '3000' },
              { kod: '26373', basinc: '400', iletimHacmi: '35,00 CM³', litre: '35', maksHiz: '3000' },
              { kod: '26330', basinc: '400', iletimHacmi: '35,00 CM³', litre: '35', maksHiz: '300' },
              { kod: '26374', basinc: '400', iletimHacmi: '41,20 CM³', litre: '40', maksHiz: '2500' },
              { kod: '26362', basinc: '400', iletimHacmi: '41,20 CM³', litre: '40', maksHiz: '2500' },
              { kod: '26296', basinc: '400', iletimHacmi: '47,10 CM³', litre: '47', maksHiz: '2500' },
              { kod: '26363', basinc: '400', iletimHacmi: '47,10 CM³', litre: '47', maksHiz: '2500' },
              { kod: '26297', basinc: '400', iletimHacmi: '56,00 CM³', litre: '56', maksHiz: '2500' },
              { kod: '26364', basinc: '400', iletimHacmi: '56,00 CM³', litre: '56', maksHiz: '2500' },
              { kod: '26298', basinc: '400', iletimHacmi: '63,60 CM³', litre: '65', maksHiz: '2500' },
              { kod: '26365', basinc: '400', iletimHacmi: '63,60 CM³', litre: '65', maksHiz: '2500' },
              { kod: '26371', basinc: '400', iletimHacmi: '83,60 CM³', litre: '84', maksHiz: '2000' },
              { kod: '26366', basinc: '400', iletimHacmi: '83,60 CM³', litre: '84', maksHiz: '2000' },
            ]
          }
        ]
      }
    }
    return null
  }

  // GOLD PİSTONLU POMPA ürün verilerini al
  const getGoldPistonluPompaProductData = (cardName) => {
    if (cardName === 'EKSENEL PİSTONLU POMPA') {
      return {
        title: 'EKSENEL PİSTONLU POMPA',
        categories: [
          {
            name: 'EKSENEL (ENDÜSTRİYEL) PİSTONLU POMPALAR',
            products: [
              { 
                kod: '26304', 
                agirlik: 'GİRİŞ RAKORLU 9,90KG', 
                cikintiTorku: 'GİRİŞ RAKORLU 11,52 NM', 
                girisVeCikis: '3/4"', 
                iletimHacmi: '32,00 CM³', 
                maksSinirliPompaHizi: '2700', 
                maksSurekliPompaHizi: '2250', 
                maxAlanSSurekBasinc: '350', 
                maxAlanSay350BTork: '146', 
                maxAlanSayisiAralik: 'TEPE BASINCI 400', 
                rotasyon: 'W' 
              },
              { 
                kod: '26305', 
                agirlik: 'GİRİŞ RAKORLU 15,40 KG', 
                cikintiTorku: 'GİRİŞ RAKORLU 18,33NM', 
                girisVeCikis: '1 İNÇ', 
                iletimHacmi: '80,00 CM³', 
                maksSinirliPompaHizi: '2100', 
                maksSurekliPompaHizi: '1700', 
                maxAlanSSurekBasinc: '350', 
                maxAlanSay350BTork: '460', 
                maxAlanSayisiAralik: 'TEPE BASINCI 400', 
                rotasyon: 'W' 
              },
            ]
          },
          {
            name: 'EKSENEL (MOBİL) PİSTONLU POMPALAR',
            products: [
              { 
                kod: '26438', 
                agirlik: 'GİRİŞ REKORLU 17,00', 
                cikintiTorku: 'GİRİŞ REKORLU 20,45NM', 
                girisVeCikis: '1°', 
                iletimHacmi: '130,0 CM³', 
                maksSinirliPompaHizi: '1750', 
                maksSurekliPompaHizi: '1600', 
                maxAlanSSurekBasinc: '350', 
                maxAlanSay350BTork: '746', 
                maxAlanSayisiAralik: '400', 
                rotasyon: 'W' 
              },
              { 
                kod: '26381', 
                agirlik: 'GİRİŞ RAKORLU 11,90KG', 
                cikintiTorku: 'GİRİŞ RAKORLU 12,28 NM', 
                girisVeCikis: '3/4"', 
                iletimHacmi: '63,00 CM³', 
                maksSinirliPompaHizi: '2300', 
                maksSurekliPompaHizi: '1900', 
                maxAlanSSurekBasinc: '350', 
                maxAlanSay350BTork: '360', 
                maxAlanSayisiAralik: '400', 
                rotasyon: 'W' 
              },
            ]
          }
        ]
      }
    }
    return null
  }

  // SUNFAB PİSTONLU POMPA ürün verilerini al
  const getSunfabPistonluPompaProductData = (cardName) => {
    if (cardName === 'EKSENEL PİSTONLU POMPA') {
      return {
        title: 'EKSENEL PİSTONLU POMPA',
        categories: [
          {
            name: 'EKSENEL (ENDÜSTRİYEL) PİSTONLU POMPALAR',
            products: [
              { kod: '26361', basinc: '400', iletimHacmi: '12,60 CM³', maksHiz: '6000', milTipi: 'FREZELİ' },
              { kod: '26360', basinc: '400', iletimHacmi: '56,00 CM³', maksHiz: '3750', milTipi: 'FREZELİ' },
            ]
          },
          {
            name: 'EKSENEL (MOBİL) PİSTONLU POMPALAR',
            products: [
              { kod: 'SUNFAB23012R', iletimHacmi: '12,60 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '3000', milTipi: 'DIN MİL' },
              { kod: 'SUNFAB23017R', iletimHacmi: '17,00 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '3000', milTipi: 'DIN MİL' },
              { kod: '26394', iletimHacmi: '25,40 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '3000', milTipi: 'DIN MİL' },
              { kod: 'SUNFAB23034R', iletimHacmi: '34,20 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '3000', milTipi: 'DIN MİL' },
              { kod: '26396', iletimHacmi: '47,10 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2500', milTipi: 'DIN MİL' },
              { kod: 'SUNFAB23056L', iletimHacmi: '56,00 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2500', milTipi: 'DIN MİL' },
              { kod: 'SUNFAB23056R', iletimHacmi: '56,00 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2500', milTipi: 'DIN MİL' },
              { kod: 'SUNFAB23064R', iletimHacmi: '63,60 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2500', milTipi: 'DIN MİL' },
              { kod: 'SUNFAB23084R', iletimHacmi: '83,60 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2000', milTipi: 'DIN MİL' },
              { kod: 'SUNFAB23220R', iletimHacmi: '130,00 CM³', kapak: 'ISO FLANŞ', maksBasinc: '300', maksHiz: '2000', milTipi: 'DIN MİL' },
              { kod: '26386', iletimHacmi: '12,60 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '3000', milTipi: 'DIN MİL' },
              { kod: '26387', iletimHacmi: '17,00 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '3000', milTipi: 'DIN MİL' },
              { kod: '26388', iletimHacmi: '25,40 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '3000', milTipi: 'DIN MİL' },
              { kod: '26389', iletimHacmi: '34,20 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '3000', milTipi: 'DIN MİL' },
              { kod: '26448', iletimHacmi: '47,20 CM³', kapak: 'ISO FLASH', maksBasinc: '400', maksHiz: '2500', milTipi: 'DIN MİL' },
              { kod: '26383', iletimHacmi: '47,10 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2500', milTipi: 'DIN MİL' },
              { kod: '26449', iletimHacmi: '47,10 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2500', milTipi: 'DIN MİL' },
              { kod: '26384', iletimHacmi: '56,00 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2500', milTipi: 'DIN MİL' },
              { kod: '26385', iletimHacmi: '63,60 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2500', milTipi: 'DIN MİL' },
              { kod: '26405', iletimHacmi: '63,60 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2500', milTipi: 'DIN MİL' },
              { kod: '26391', iletimHacmi: '83,60 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2500', milTipi: 'DIN MİL' },
              { kod: '26390', iletimHacmi: '83,60 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2000', milTipi: 'DIN MİL' },
              { kod: 'SUNFAB21085R', iletimHacmi: '108,00 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2000', milTipi: 'DIN MİL' },
              { kod: 'SUNFAB21085L', iletimHacmi: '108,00 CM³', kapak: 'ISO FLANŞ', maksBasinc: '400', maksHiz: '2000', milTipi: 'DIN MİL' },
              { kod: '26397', iletimHacmi: '90,00 CM³', kapak: 'ISO FLANŞ', maksBasinc: '300', maksHiz: '2000', milTipi: 'DIN MİL' },
              { kod: '26446', iletimHacmi: '90,00 CM³', kapak: 'ISO FLANŞ', maksBasinc: '300', maksHiz: '2000', milTipi: 'DIN MİL' },
              { kod: '26398', iletimHacmi: '130,00 CM³', kapak: 'ISO FLANŞ', maksBasinc: '300', maksHiz: '2000', milTipi: 'DIN MİL' },
              { kod: '26447', iletimHacmi: '130,00 CM³', kapak: 'ISO FLANŞ', maksBasinc: '300', maksHiz: '2000', milTipi: 'DIN MİL' },
            ]
          }
        ]
      }
    }
    return null
  }

  // BERARMA ürün verilerini al
  const getBerarmaProductData = (cardName) => {
    if (cardName === 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR') {
      return {
        title: 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR',
        categories: [
          {
            name: 'MEKANİK BASINÇ REG. DEĞ. DEB. PALETLİ POMPALAR',
            products: [
              { kod: 'BE2403211010', hacim: '34,5 CM³', kontrol: 'DR', basinc: '30 - 100', hiz: '1800', regülasyon: '' },
              { kod: 'BE2410011010', hacim: '34,5 CM³', kontrol: 'DR', basinc: '30 - 100', hiz: '1800', regülasyon: '' },
              { kod: 'BE2601611010', hacim: '3,1 - 16 CM³', kontrol: '', basinc: '20 - 120', hiz: '800/1800', regülasyon: 'BASINÇ REGÜLASYON' },
              { kod: '26179', hacim: '69 CM³', kontrol: 'DR', basinc: '30 - 80', hiz: '1800', regülasyon: '' },
              { kod: '26181', hacim: '11 CM³', kontrol: 'DR', basinc: '30 - 100', hiz: '1800', regülasyon: '' },
              { kod: '26180', hacim: '11 CM³', kontrol: 'DR', basinc: '80 - 150', hiz: '1800', regülasyon: '' },
              { kod: '26182', hacim: '13,1 CM³', kontrol: 'DR', basinc: '80 - 150', hiz: '1800', regülasyon: '' },
              { kod: '26183', hacim: '17,9 CM³', kontrol: 'DR', basinc: '30-100', hiz: '1800', regülasyon: '' },
              { kod: '26184', hacim: '22,1 CM³', kontrol: 'DR', basinc: '30 - 100', hiz: '1800', regülasyon: '' },
              { kod: '26185', hacim: '26,9 CM³', kontrol: 'DR', basinc: '30 - 100', hiz: '1800', regülasyon: '' },
              { kod: 'BE2002031100', hacim: '34,5 CM³', kontrol: 'DR', basinc: '30 - 100', hiz: '1800', regülasyon: '' },
              { kod: '26178', hacim: '42,8 CM³', kontrol: 'DR', basinc: '30 - 100', hiz: '1800', regülasyon: '' },
            ]
          }
        ]
      }
    } else if (cardName === 'ÖN UYARILI BASINÇ REG.DEĞ.DEB. PALETLİ POMPALAR') {
      return {
        title: 'ÖN UYARILI BASINÇ REG.DEĞ.DEB. PALETLİ POMPALAR',
        categories: [
          {
            name: 'ÖN UYARILI BASINÇ REG.DEĞ.DEB. PALETLİ POMPALAR',
            products: [
              { kod: '26211', hacim: '26,9 CM³', kontrol: 'DR', basinc: '30-160', hiz: '1800', regülasyon: '' },
              { kod: '26212', hacim: '34,5 CM³', kontrol: 'DR', basinc: '30-160', hiz: '1800', regülasyon: '' },
              { kod: '26213', hacim: '42,8 CM³', kontrol: 'DR', basinc: '30-160', hiz: '1800', regülasyon: '' },
              { kod: '26210', hacim: '105,5 CM³', kontrol: 'DR', basinc: '30-160', hiz: '1800', regülasyon: '' },
              { kod: '26214', hacim: '86,2 CM³', kontrol: 'DR', basinc: '30-160', hiz: '1800', regülasyon: '' },
            ]
          }
        ]
      }
    }
    return null
  }

  // EL POMPASI ürün verilerini al
  const getElPompasiProductData = (brandName) => {
    const data = {
      'hydropack': {
        description: 'Hidrolik el pompaları, endüstriyel kullanım alanlarında güvenilirlik ve taşınabilirlik arayanlar için ideal çözümler sunar. Bu pompalar, kompakt yapılarıyla dar alanlarda rahatlıkla kullanılabilir. Aracınızın hidrolik sistemlerini kontrol etmekten acil durumlarda kullanıma kadar geniş bir yelpazede işlevsellik sunarlar.',
        tableHeaders: ['MODEL KODU', 'ÇALIŞMA BASINCI', 'FONKSİYON', 'İLETİM HACMİ', 'YAĞ TANKI MONTAJI'],
        products: [
          { kod: 'PRBD12', calismaBasinci: '320', fonksiyon: 'ÇİFT ETKİLİ SİLİNDİR İÇİN HER İKİ YÖNDE BASMA', iletimHacmi: '12 CM³', yagTankiMontaji: 'DİKDÖRTGEN ÇELİK TANK' },
          { kod: 'PRB25/408', calismaBasinci: '250', fonksiyon: 'TEK ETKİLİ SİLİNDİRLER İÇİN HER İKİ YÖNDE BASMA', iletimHacmi: '25 CM³', yagTankiMontaji: 'DİKDÖRTGEN ÇELİK TANK' },
          { kod: 'PRB 25 DD', calismaBasinci: '250', fonksiyon: 'ÇİFT ETKİLİ SİLİNDİR İÇİN HER İKİ YÖNDE BASMA', iletimHacmi: '25 CM³', yagTankiMontaji: 'DİKDÖRTGEN ÇELİK TANK' },
        ]
      },
      'omfb': {
        description: 'Hidrolik el pompaları, endüstriyel kullanım alanlarında güvenilirlik ve taşınabilirlik arayanlar için ideal çözümler sunar. Bu pompalar, kompakt yapılarıyla dar alanlarda rahatlıkla kullanılabilir. Aracınızın hidrolik sistemlerini kontrol etmekten acil durumlarda kullanıma kadar geniş bir yelpazede işlevsellik sunarlar.',
        tableHeaders: ['MODEL KODU', 'BASINÇ (BAR)', 'İLETİM HACMİ'],
        products: [
          { kod: '44937', basinc: '220', iletimHacmi: '45 CM³' },
          { kod: '44938', basinc: '200', iletimHacmi: '70 CM³' },
          { kod: '44930', basinc: '250', iletimHacmi: '25 CM³' },
          { kod: '44939', basinc: '250', iletimHacmi: '25 CM³' },
          { kod: '44931', basinc: '220', iletimHacmi: '45 CM³' },
          { kod: 'OMFB10600400010', basinc: '250', iletimHacmi: '25 CM³' },
          { kod: 'OMFB10601000012', basinc: '350', iletimHacmi: '15 CM³' },
          { kod: '44932', basinc: '350', iletimHacmi: '15 CM³' },
          { kod: 'OMFB10603800163', basinc: '3000', iletimHacmi: '16 CM³' },
          { kod: '44934', basinc: '220', iletimHacmi: '45 CM³' },
        ]
      },
      'cms': {
        description: 'Hidrolik el pompaları, endüstriyel kullanım alanlarında güvenilirlik ve taşınabilirlik arayanlar için ideal çözümler sunar. Bu pompalar, kompakt yapılarıyla dar alanlarda rahatlıkla kullanılabilir. Aracınızın hidrolik sistemlerini kontrol etmekten acil durumlarda kullanıma kadar geniş bir yelpazede işlevsellik sunarlar.',
        tableHeaders: ['MODEL KODU', 'HACMİ'],
        products: [
          { kod: 'ÇMSEL012', hacim: '12 CC' },
          { kod: 'ÇMSEL020', hacim: '20 CC' },
          { kod: 'ÇMSEL025Ç', hacim: '25 CC' },
          { kod: 'ÇMSEL025', hacim: '25 CC' },
          { kod: 'ÇMSEL025A', hacim: '25 CC' },
          { kod: 'ÇMSEL045Ç', hacim: '45 CC' },
          { kod: 'ÇMSEL045', hacim: '45 CC' },
        ]
      },
      'ferro': {
        description: 'Hidrolik el pompaları, endüstriyel kullanım alanlarında güvenilirlik ve taşınabilirlik arayanlar için ideal çözümler sunar. Bu pompalar, kompakt yapılarıyla dar alanlarda rahatlıkla kullanılabilir. Aracınızın hidrolik sistemlerini kontrol etmekten acil durumlarda kullanıma kadar geniş bir yelpazede işlevsellik sunarlar.',
        tableHeaders: ['MODEL KODU', 'BASINÇ (BAR)', 'LİTRE', 'YAĞ BASINCI'],
        products: [
          { kod: 'P2C1000-60', basinc: '1000', litre: '2,65 LT', yagBasinci: '18,00 CM³' },
          { kod: 'P2C700-50', basinc: '700', litre: '2,20 LT.', yagBasinci: '18,00 CM³' },
          { kod: 'P2C700-60', basinc: '700', litre: '2,65 LT.', yagBasinci: '18,00 CM³' },
          { kod: 'P2R700-80', basinc: '700', litre: '11 LT.', yagBasinci: '18,00 CM³' },
        ]
      },
      'oleocon': {
        description: 'Hidrolik el pompaları, endüstriyel kullanım alanlarında güvenilirlik ve taşınabilirlik arayanlar için ideal çözümler sunar. Bu pompalar, kompakt yapılarıyla dar alanlarda rahatlıkla kullanılabilir. Aracınızın hidrolik sistemlerini kontrol etmekten acil durumlarda kullanıma kadar geniş bir yelpazede işlevsellik sunarlar.',
        tableHeaders: ['MODEL KODU', 'ÇALIŞMA BASINCI', 'ÇALIŞMA SICAKLIĞI', 'DİŞ NORMLARI', 'DİŞ ÖLÇÜLERİ', 'MALZEME', 'SIZDIRMAZLIK'],
        products: [
          { kod: 'OHP-501', calismaBasinci: '310', calismaSicakligi: '-30 C / +110 C', disNormlari: 'BSP', disOlculeri: '25CC\'DEN 40CC', malzeme: 'GGG 40', sizdirmazlik: 'NITRILE NBR' },
          { kod: 'OHP-501T', calismaBasinci: '310', calismaSicakligi: '-30 C / +110 C', disNormlari: 'BSP', disOlculeri: '25CC\'DEN 40CC', malzeme: 'GGG 40', sizdirmazlik: 'NITRILE NBR' },
          { kod: 'OHP-502', calismaBasinci: '310', calismaSicakligi: '-30 C / +110 C', disNormlari: 'BSP', disOlculeri: '25CC\'DEN 45CC', malzeme: 'GGG 40', sizdirmazlik: 'NITRILE NBR' },
          { kod: 'OHP-601', calismaBasinci: '310', calismaSicakligi: '-30 C / +110 C', disNormlari: 'BSP', disOlculeri: '25CC\'DEN 40CC', malzeme: 'GGG 40', sizdirmazlik: 'NITRILE NBR' },
          { kod: 'OHP-602', calismaBasinci: '310', calismaSicakligi: '-30 C / +110 C', disNormlari: 'BSP', disOlculeri: '25CC\'DEN 45CC', malzeme: '666 4', sizdirmazlik: 'NITRILE NBR' },
        ]
      }
    }
    return data[brandName] || null
  }

  // İÇTEN DİŞLİ POMPALAR ürün verilerini al
  const getIctenDisliPompalarProductData = (brandName) => {
    const data = {
      'eckerle': {
        description: 'İçten dişli pompalar, yüksek verimlilik ve güvenilirlik sunan hidrolik sistem çözümleridir. Kompakt tasarımları ve yüksek performansları ile endüstriyel uygulamalarda tercih edilir.',
        tableHeaders: ['MODEL KODU', 'BASINÇ (BAR)', 'HIZ', 'İLETİM HACMİ', 'POMPA SES ŞİD.', 'VERİM (NV)'],
        products: [
          { kod: '45020', basinc: '250', hiz: '100-2500', iletimHacmi: '40,1 CM³', pompaSesSid: '65', verim: '95' },
          { kod: '45021', basinc: '250', hiz: '100-1800', iletimHacmi: '50,3 CM³', pompaSesSid: '66', verim: '95' },
          { kod: '45022', basinc: '250', hiz: '400-3000', iletimHacmi: '25,2 CM³', pompaSesSid: '63', verim: '95' },
          { kod: '45027', basinc: '330', hiz: '400-2800', iletimHacmi: '32,1 CM³', pompaSesSid: '64', verim: '94' },
          { kod: '45028', basinc: '250', hiz: '400-2200', iletimHacmi: '40,1 CM³', pompaSesSid: '65', verim: '95' },
          { kod: '45023', basinc: '250', hiz: '400-1800', iletimHacmi: '50,3 CM³', pompaSesSid: '66', verim: '95' },
          { kod: '45024', basinc: '250', hiz: '200-4000', iletimHacmi: '5,4 CM³', pompaSesSid: '55', verim: '91' },
          { kod: '45025', basinc: '250', hiz: '200-4000', iletimHacmi: '7,9 CM³', pompaSesSid: '58', verim: '93' },
          { kod: '45026', basinc: '250', hiz: '200-3600', iletimHacmi: '10,9 CM³', pompaSesSid: '59', verim: '93' },
          { kod: '45016', basinc: '250', hiz: '200-3600', iletimHacmi: '13,3 CM³', pompaSesSid: '60', verim: '94' },
          { kod: '45017', basinc: '250', hiz: '200-3600', iletimHacmi: '15,8 CM³', pompaSesSid: '61', verim: '95' },
          { kod: '45018', basinc: '250', hiz: '100-3000', iletimHacmi: '19,3 CM³', pompaSesSid: '62', verim: '95' },
          { kod: '45030', basinc: '250', hiz: '100-3000', iletimHacmi: '22,2 CM³', pompaSesSid: '63', verim: '95' },
          { kod: '45034', basinc: '250', hiz: '100-3000', iletimHacmi: '25,2 CM³', pompaSesSid: '64', verim: '95' },
        ]
      }
    }
    return data[brandName] || null
  }

  // TANDEM POMPALAR ürün verilerini al
  const getTandemPompalarProductData = (brandName) => {
    const description = 'Tandem Pompalar: Güçlü Hidrolik Performansın Anahtarı\n\nHidrolik sistemlerin temel yapı taşlarından biri olan tandem pompalar, işlevsellikleri ve sağlamlıklarıyla endüstriyel dünyada öne çıkıyor. Hidrolik pompa çeşitleri arasında önemli bir yere sahip olan tandem pompalar, birçok sektörde verimliliği artırmak ve güvenilir bir performans sunmak için tercih ediliyor.\n\nTandem Pompaların Gücü\n\nHidrolik sistemlerde kullanılan bu pompalar, hidrolik akışkanlarını yüksek basınçlar altında ileterek güç sağlar. Dişli pompa teknolojisinin yanı sıra alüminyum gövdeli dişli pompaların sağladığı dayanıklılık, uzun ömür ve yüksek performans, endüstriyel uygulamalarda tercih edilme sebeplerinin başında gelir.\n\nHidrolik Pompa Çeşitleri Arasında Öne Çıkanlar\n\nTandem pompalar, hidrolik sistemlerin ihtiyaçlarına göre farklı kapasitelerde ve özelliklerde tasarlanabilir. Bu, kullanıcılara geniş bir yelpazede seçenek sunar ve farklı endüstriyel gereksinimlere uygun çözümler sunar. Hidrolik dişli pompa modelleri arasında yer alan tandem pompalar, güvenilirlikleri ve esnek yapılarıyla dikkat çeker.\n\nPerformans ve Verimlilikte Tandem Pompaların Rolü\n\nHidrolik pompa fiyatları açısından ekonomik olmaları ve uzun ömürlü yapılarıyla, tandem pompalar uzun vadede maliyet tasarrufu sağlar. Bu pompalar, işletmeler için kesintisiz çalışma ve yüksek verimlilik anlamına gelir. Hidrolik pompası alırken, güvenilirlik, performans ve dayanıklılık gibi unsurlar göz önünde bulundurulmalıdır.\n\nTandem Pompalarla Güvenilir Hidrolik Performans\n\nHidrolik sistemlerdeki başarının anahtarı, güçlü ve dayanıklı parçaların bir araya gelmesiyle oluşur. Tandem pompalar, hidrolik pompa dünyasında bu gereklilikleri karşılayarak, kullanıcılarına güvenilir ve kesintisiz bir performans vadediyor.'
    
    const data = {
      'hydropack': {
        description,
        tableHeaders: ['MODEL', 'BASINÇ', 'DEBİ', 'İLETİM HACMİ', 'MAKS.HIZ'],
        products: [
          { model: '20A10X066', basinc: '250', debi: '32,55', iletimHacmi: '10 CM³', maksHiz: '3500' },
          { model: '20A10X067', basinc: '250', debi: '13,95-32,55', iletimHacmi: '10 CM³', maksHiz: '3500' },
          { model: '20A10X201', basinc: '250', debi: '13,95-32,55', iletimHacmi: '10 CM³', maksHiz: '3500' },
          { model: '20A11X066-H', basinc: '250', debi: '15,76-36,78', iletimHacmi: '11,3 CM³', maksHiz: '3500' },
          { model: '20A11X067-H', basinc: '250', debi: '15,76-36,78', iletimHacmi: '11,3 CM³', maksHiz: '3500' },
          { model: '20A11X097-H', basinc: '250', debi: '15,76-36,78', iletimHacmi: '11,3 CM³', maksHiz: '3500' },
          { model: '20A11X201-H', basinc: '250', debi: '15,76-36,78', iletimHacmi: '11,3 CM³', maksHiz: '3500' },
          { model: '20A11X329-H', basinc: '250', debi: '', iletimHacmi: '4,5-25 CM³', maksHiz: '3500' },
          { model: '20A12X066-H', basinc: '250', debi: '16,92-39,48', iletimHacmi: '12 CM³', maksHiz: '3500' },
          { model: '20A12X067-H', basinc: '250', debi: '16,92-39,48', iletimHacmi: '12 CM³', maksHiz: '3500' },
          { model: '20A12X201', basinc: '250', debi: '16,92-39,48', iletimHacmi: '12 CM³', maksHiz: '3500' },
          { model: '20A14X066', basinc: '250', debi: '19,95-46,55', iletimHacmi: '14 CM³', maksHiz: '3500' },
          { model: '20A14X067', basinc: '250', debi: '19,95-46,55', iletimHacmi: '14 CM³', maksHiz: '3500' },
          { model: '20A14X201', basinc: '250', debi: '19,95-46,55', iletimHacmi: '14 CM³', maksHiz: '3500' },
          { model: '20A15X066', basinc: '250', debi: '21,60-36,00', iletimHacmi: '15 CM³', maksHiz: '2500' },
          { model: '20A15X067', basinc: '250', debi: '21,60-36,00', iletimHacmi: '15 CM³', maksHiz: '2500' },
          { model: '20A15X201', basinc: '250', debi: '21,60-36,00', iletimHacmi: '15 CM³', maksHiz: '2500' },
          { model: '20A16X066', basinc: '250', debi: '23,04-38,40', iletimHacmi: '16 CM³', maksHiz: '2500' },
          { model: '20A16X067', basinc: '250', debi: '23,04-38,40', iletimHacmi: '16 CM³', maksHiz: '2500' },
          { model: '20A16X201', basinc: '250', debi: '23,04-38,40', iletimHacmi: '16 CM³', maksHiz: '2500' },
          { model: '20A19X067', basinc: '200', debi: '27,36-45,60', iletimHacmi: '19 CM³', maksHiz: '2500' },
          { model: '20A19X201', basinc: '200', debi: '27,36-46,60', iletimHacmi: '19 CM³', maksHiz: '2500' },
          { model: '20A22X066', basinc: '180', debi: '31,68-42,24', iletimHacmi: '22 CM³', maksHiz: '2000' },
          { model: '20A22X067', basinc: '180', debi: '31,68-42,24', iletimHacmi: '22 CM³', maksHiz: '2000' },
          { model: '20A22X155', basinc: '180', debi: '', iletimHacmi: '22 CM³', maksHiz: '2000' },
          { model: '20A22X201', basinc: '180', debi: '31,68-42,24', iletimHacmi: '22 CM³', maksHiz: '2000' },
          { model: '20A25X066', basinc: '160', debi: '36,00-48,00', iletimHacmi: '25 CM³', maksHiz: '2000' },
          { model: '20A25X067', basinc: '160', debi: '36,00-48,00', iletimHacmi: '25 CM³', maksHiz: '2000' },
          { model: '20A25X201', basinc: '160', debi: '36-48', iletimHacmi: '25 CM³', maksHiz: '2000' },
          { model: '20A4.5X067', basinc: '250', debi: '6,14-14,33', iletimHacmi: '4,5 CM³', maksHiz: '3500' },
          { model: '20A4.5X201', basinc: '250', debi: '6,14-14,33', iletimHacmi: '4,5 CM³', maksHiz: '3500' },
          { model: '20A6.3X201', basinc: '250', debi: '8,69-20,29', iletimHacmi: '6,3 CM³', maksHiz: '3500' },
          { model: '20A8.2X066', basinc: '250', debi: '11,32-26,40', iletimHacmi: '8,2 CM³', maksHiz: '3500' },
          { model: '20A8.2X067', basinc: '250', debi: '11,32-26,40', iletimHacmi: '8,2 CM³', maksHiz: '3500' },
          { model: '20A8.2X201', basinc: '250', debi: '11,32-26,40', iletimHacmi: '8,2 CM³', maksHiz: '3500' },
          { model: '20C10X066', basinc: '250', debi: '13,95-32,55', iletimHacmi: '10 CM³', maksHiz: '3500' },
          { model: '20C10X067', basinc: '250', debi: '13,95-32,55', iletimHacmi: '10 CM³', maksHiz: '3500' },
          { model: '20C10X201', basinc: '250', debi: '13,95-32,55', iletimHacmi: '10 CM³', maksHiz: '3500' },
          { model: '20C11X066-H', basinc: '250', debi: '15,76-36,78', iletimHacmi: '11,3 CM³', maksHiz: '3500' },
          { model: '20C11X067', basinc: '250', debi: '15,76-36,78', iletimHacmi: '11,3 CM³', maksHiz: '3500' },
          { model: '20C11X201', basinc: '250', debi: '15,76-36,78', iletimHacmi: '11,3 CM³', maksHiz: '3500' },
          { model: '20C12X066-H', basinc: '250', debi: '16,92-39,48', iletimHacmi: '12 CM³', maksHiz: '3500' },
          { model: '20C12X067', basinc: '250', debi: '16,92-39,48', iletimHacmi: '12 CM³', maksHiz: '3500' },
          { model: '20C12X201-H', basinc: '250', debi: '39,48', iletimHacmi: '12 CM³', maksHiz: '3500' },
          { model: '20C14X066', basinc: '250', debi: '19,95-46,55', iletimHacmi: '14 CM³', maksHiz: '3500' },
          { model: '20C14X067', basinc: '250', debi: '19,95-46,55', iletimHacmi: '14 CM³', maksHiz: '3500' },
          { model: '20C14X201', basinc: '250', debi: '19,95-46,55', iletimHacmi: '14 CM³', maksHiz: '3500' },
          { model: '20C15X066', basinc: '250', debi: '21,60-36,00', iletimHacmi: '15 CM³', maksHiz: '2500' },
          { model: '20C15X201', basinc: '250', debi: '21,60-36,00', iletimHacmi: '15 CM³', maksHiz: '2500' },
          { model: '20C16X066', basinc: '250', debi: '23,04-38,40', iletimHacmi: '16 CM³', maksHiz: '2500' },
          { model: '20C16X067', basinc: '250', debi: '23,04-38,40', iletimHacmi: '16 CM³', maksHiz: '2500' },
          { model: '20C16X201', basinc: '250', debi: '23,04-38,40', iletimHacmi: '16 CM³', maksHiz: '2500' },
          { model: '20C19X066', basinc: '200', debi: '27,36-45,60', iletimHacmi: '19 CM³', maksHiz: '2500' },
          { model: '20C19X067-H', basinc: '200', debi: '27,36-54,72', iletimHacmi: '19 CM³', maksHiz: '3000' },
          { model: '20C19X201', basinc: '200', debi: '27,36-45,60', iletimHacmi: '19 CM³', maksHiz: '2500' },
          { model: '20C22X066', basinc: '180', debi: '31,68-42,24', iletimHacmi: '22 CM³', maksHiz: '2000' },
          { model: '20C22X067', basinc: '180', debi: '31,68-42,24', iletimHacmi: '22 CM³', maksHiz: '2000' },
          { model: '20C22X201', basinc: '180', debi: '31,68-42,24', iletimHacmi: '22 CM³', maksHiz: '2000' },
          { model: '20C25X067', basinc: '160', debi: '36,00-48,00', iletimHacmi: '25 CM³', maksHiz: '2000' },
          { model: '20C25X201', basinc: '160', debi: '36,00-48,00', iletimHacmi: '25 CM³', maksHiz: '2000' },
          { model: '20C4.5X066', basinc: '250', debi: '6,14-14,33', iletimHacmi: '4,5 CM³', maksHiz: '3500' },
          { model: '20C4.5X201', basinc: '250', debi: '6,14-14,33', iletimHacmi: '4,5 CM³', maksHiz: '3500' },
          { model: '20C6.3X066', basinc: '250', debi: '8,69-20,29', iletimHacmi: '6,3 CM³', maksHiz: '3500' },
          { model: '20C6.3X067', basinc: '250', debi: '8,69-20,29', iletimHacmi: '6,3 CM³', maksHiz: '3500' },
          { model: '20C6.3X201', basinc: '250', debi: '8,69-20,29', iletimHacmi: '6,3 CM³', maksHiz: '3500' },
          { model: '20C8.2X066', basinc: '250', debi: '11,32-26,40', iletimHacmi: '8,2 CM³', maksHiz: '3500' },
          { model: '20C8.2X067', basinc: '250', debi: '11,32-26,40', iletimHacmi: '8,2 CM³', maksHiz: '3500' },
          { model: '20C8.2X201', basinc: '250', debi: '11,32-26,40', iletimHacmi: '8,2 CM³', maksHiz: '3500' },
          { model: '30A25X198', basinc: '250', debi: '35,3-70,5', iletimHacmi: '25 CM³', maksHiz: '3000' },
          { model: '30A28X198', basinc: '250', debi: '39,5-79,0', iletimHacmi: '28 CM³', maksHiz: '3000' },
          { model: '30A32X198', basinc: '250', debi: '45,1-75,2', iletimHacmi: '32 CM³', maksHiz: '2500' },
          { model: '30A36X198', basinc: '250', debi: '50,8-84,6', iletimHacmi: '36 CM³', maksHiz: '2500' },
          { model: '30A42X198', basinc: '230', debi: '59,9-99,8', iletimHacmi: '42 CM³', maksHiz: '2500' },
          { model: '30A46X198', basinc: '230', debi: '65,6-100,5', iletimHacmi: '46 CM³', maksHiz: '2300' },
          { model: '30A46X198+', basinc: '230', debi: '65,6-100,5', iletimHacmi: '46 CM³', maksHiz: '2300' },
          { model: '30A50X198', basinc: '200', debi: '71,3-99,8', iletimHacmi: '50 CM³', maksHiz: '2100' },
          { model: '30A55X198', basinc: '200', debi: '78,4-91,4', iletimHacmi: '55 CM³', maksHiz: '1750' },
          { model: '30C20X198', basinc: '250', debi: '28,2-56,4', iletimHacmi: '20 CM³', maksHiz: '3000' },
          { model: '30C22.5X19', basinc: '250', debi: '31,7-63,5', iletimHacmi: '22,5 CM³', maksHiz: '3000' },
          { model: '30C25X198', basinc: '250', debi: '35,3-70,5', iletimHacmi: '25 CM³', maksHiz: '3000' },
          { model: '30C28X198', basinc: '250', debi: '39,5-79,0', iletimHacmi: '28 CM³', maksHiz: '3000' },
          { model: '30C32X198', basinc: '250', debi: '45,1-75,2', iletimHacmi: '32 CM³', maksHiz: '2500' },
          { model: '30C36X198', basinc: '250', debi: '50,8-84,6', iletimHacmi: '36 CM³', maksHiz: '2500' },
          { model: '30C42X198', basinc: '230', debi: '59,9-99,8', iletimHacmi: '42 CM³', maksHiz: '2500' },
          { model: '30C46X198', basinc: '230', debi: '65,6-100,5', iletimHacmi: '46 CM³', maksHiz: '2300' },
          { model: '30C55X198', basinc: '200', debi: '78,4-91,4', iletimHacmi: '55 CM³', maksHiz: '1750' },
        ]
      },
      'asc': {
        description,
        tableHeaders: ['MODEL', 'İLETİM HACMİ', 'MAKS.BASINÇ', 'MAKS.HIZ', 'MİN.HIZ'],
        products: [
          { model: 'ASCAP20.040/AP30.CXX02SN', iletimHacmi: '3,9 CM³', maksBasinc: '250', maksHiz: '3500', minHiz: '650' },
          { model: 'ASCAP20.040/AP30.AXX02SN', iletimHacmi: '3,9 CM³', maksBasinc: '250', maksHiz: '3500', minHiz: '650' },
          { model: 'ASCTAP20.040/040.AAB02SN', iletimHacmi: '3,9 CM³', maksBasinc: '250', maksHiz: '3500', minHiz: '650' },
          { model: 'ASCAP20.060/AP30.CXX02SN', iletimHacmi: '5,9 CM³', maksBasinc: '250', maksHiz: '3500', minHiz: '650' },
          { model: 'ASCAP20.060/AP30.AXX02SN', iletimHacmi: '5,9 CM³', maksBasinc: '250', maksHiz: '3500', minHiz: '650' },
          { model: 'ASCTAP20.060/040.AAB02SN', iletimHacmi: '5,9 CM³', maksBasinc: '250', maksHiz: '250', minHiz: '650' },
          { model: 'ASCTAP20.060/060.AAB02SN', iletimHacmi: '5,9 CM³', maksBasinc: '250', maksHiz: '3500', minHiz: '650' },
          { model: 'ASCAP20.080/AP30.CXX02SN', iletimHacmi: '8,0 CM³', maksBasinc: '250', maksHiz: '3500', minHiz: '650' },
          { model: 'ASCAP20.080/AP30.AXX02SN', iletimHacmi: '8,0 CM³', maksBasinc: '250', maksHiz: '3500', minHiz: '650' },
          { model: 'ASCAP20.095/AP30.CXX02SN', iletimHacmi: '9,4 CM³', maksBasinc: '250', maksHiz: '3500', minHiz: '600' },
          { model: 'ASCAP20.095/AP30.AXX02SN', iletimHacmi: '9,4 CM³', maksBasinc: '250', maksHiz: '3500', minHiz: '600' },
          { model: 'ASCAP20.115/AP30.CXX02SN', iletimHacmi: '11,4 CM³', maksBasinc: '250', maksHiz: '3000', minHiz: '600' },
          { model: 'ASCAP20.140/AP30.CXX02SN', iletimHacmi: '13,9 CM³', maksBasinc: '250', maksHiz: '3000', minHiz: '600' },
          { model: 'ASCAP20.140/AP30.AXX02SN', iletimHacmi: '13,9 CM³', maksBasinc: '250', maksHiz: '3000', minHiz: '600' },
          { model: 'ASCAP20.160/AP30.CXX02SN', iletimHacmi: '16,0 CM³', maksBasinc: '250', maksHiz: '3000', minHiz: '600' },
          { model: 'ASCAP20.160/AP30.AXX02SN', iletimHacmi: '16,0 CM³', maksBasinc: '250', maksHiz: '3000', minHiz: '600' },
          { model: 'ASCAP20.190/AP30.CXX02SN', iletimHacmi: '19,2 CM³', maksBasinc: '250', maksHiz: '3000', minHiz: '600' },
          { model: 'ASCAP20.190/AP30.AXX02SN', iletimHacmi: '19,2 CM³', maksBasinc: '250', maksHiz: '3000', minHiz: '600' },
          { model: 'ASCAP20.220/AP30.CXX02SN', iletimHacmi: '21,9 CM³', maksBasinc: '210', maksHiz: '2500', minHiz: '600' },
          { model: 'ASCAP20.220/AP30.AXX02SN', iletimHacmi: '21,9 CM³', maksBasinc: '210', maksHiz: '2500', minHiz: '600' },
          { model: 'ASCAP20.250/AP30.CXX02SN', iletimHacmi: '24,8 CM³', maksBasinc: '190', maksHiz: '2500', minHiz: '600' },
          { model: 'ASCAP20.250/AP30.AXX02SN', iletimHacmi: '24,8 CM³', maksBasinc: '190', maksHiz: '2500', minHiz: '600' },
          { model: 'ASCAP20.280/AP30.CXX02SN', iletimHacmi: '27,9 CM³', maksBasinc: '170', maksHiz: '2200', minHiz: '600' },
          { model: 'ASCAP20.280/AP30.AXX02SN', iletimHacmi: '27,9 CM³', maksBasinc: '170', maksHiz: '2200', minHiz: '600' },
          { model: 'ASCAP30.220/AP20.AAB02SN', iletimHacmi: '21,9 CM³', maksBasinc: '210', maksHiz: '2500', minHiz: '600' },
          { model: 'ASCAP30.220/AP30.AAB02SN', iletimHacmi: '21,9 CM³', maksBasinc: '210', maksHiz: '2500', minHiz: '600' },
          { model: 'ASCAP30.220/AP20.CAB02SN', iletimHacmi: '21,9 CM³', maksBasinc: '210', maksHiz: '2500', minHiz: '600' },
          { model: 'ASCAP30.220/AP30.CAB02SN', iletimHacmi: '21,9 CM³', maksBasinc: '210', maksHiz: '2500', minHiz: '600' },
          { model: 'ASCAP30.220/AP30.CXX02SN', iletimHacmi: '21,9 CM³', maksBasinc: '210', maksHiz: '2500', minHiz: '600' },
          { model: 'ASCAP30.250/AP30.AAB02SN', iletimHacmi: '24,8 CM³', maksBasinc: '190', maksHiz: '2500', minHiz: '600' },
          { model: 'ASCAP30.250/AP20.CAB02SN', iletimHacmi: '24,8 CM³', maksBasinc: '190', maksHiz: '2500', minHiz: '600' },
          { model: 'ASCAP30.250/AP30.CAB02SN', iletimHacmi: '24,8 CM³', maksBasinc: '190', maksHiz: '2500', minHiz: '600' },
          { model: 'ASCAP30.280/AP20.AAB02SN', iletimHacmi: '27,9 CM³', maksBasinc: '170', maksHiz: '2500', minHiz: '600' },
          { model: 'ASCAP30.280/AP30.AAB02SN', iletimHacmi: '27,9 CM³', maksBasinc: '170', maksHiz: '2200', minHiz: '600' },
          { model: 'ASCAP30.280/AP20.CAB02SN', iletimHacmi: '27,9 CM³', maksBasinc: '170', maksHiz: '2200', minHiz: '600' },
          { model: 'ASCAP30.280/AP30.CAB02SN', iletimHacmi: '27,9 CM³', maksBasinc: '170', maksHiz: '2200', minHiz: '600' },
          { model: 'ASCAP30.320/AP20.AAB02SN', iletimHacmi: '32,0 CM³', maksBasinc: '160', maksHiz: '2000', minHiz: '500' },
          { model: 'ASCAP30.320/AP30.AAB02SN', iletimHacmi: '32,0 CM³', maksBasinc: '160', maksHiz: '2000', minHiz: '500' },
          { model: 'ASCAP30.320/AP20.CAB02SN', iletimHacmi: '32,0 CM³', maksBasinc: '160', maksHiz: '2000', minHiz: '500' },
          { model: 'ASCAP30.320/AP30.CAB02SN', iletimHacmi: '32,0 CM³', maksBasinc: '160', maksHiz: '2000', minHiz: '500' },
          { model: 'ASCAP30.320/AP30.CXX02SN', iletimHacmi: '32,0 CM³', maksBasinc: '160', maksHiz: '2000', minHiz: '500' },
          { model: 'ASCAP30.380/AP30.CAB02SN', iletimHacmi: '38,0 CM³', maksBasinc: '140', maksHiz: '1750', minHiz: '500' },
          { model: 'ASCAP30.420/AP20.AAB02SN', iletimHacmi: '38,0 CM³', maksBasinc: '140', maksHiz: '1750', minHiz: '500' },
        ]
      },
      'casappa': {
        description,
        tableHeaders: ['MODEL', 'ÇALIŞMA BASINCI', 'İLETİM HACMİ', 'MAKS.HIZ', 'MİL-KAPAK TİPİ', 'KAPAK', 'MAX HIZ'],
        products: [
          { model: '27303', calismaBasinci: '270', iletimHacmi: '38,00 CM³', maksHiz: '3000', milKapakTipi: '04-S3', kapak: '', maxHiz: '' },
          { model: '27302', calismaBasinci: '270', iletimHacmi: '38,00 CM³', maksHiz: '3000', milKapakTipi: '04-S3', kapak: '', maxHiz: '' },
          { model: '27301', calismaBasinci: '270', iletimHacmi: '38,00 CM³', maksHiz: '3000', milKapakTipi: '04-S3', kapak: '', maxHiz: '' },
          { model: '27445', calismaBasinci: '270', iletimHacmi: '50,77 CM³', maksHiz: '3000', milKapakTipi: '06-S8', kapak: '', maxHiz: '' },
          { model: '27167', calismaBasinci: '', iletimHacmi: '14+11 CM³', maksHiz: '', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: '27166', calismaBasinci: '', iletimHacmi: '16+8 CM³', maksHiz: '', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: 'T66610531', calismaBasinci: '', iletimHacmi: '16 + 16 CM³', maksHiz: '', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: '27170', calismaBasinci: '', iletimHacmi: '16+4 CM³', maksHiz: '', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: '27310', calismaBasinci: '200', iletimHacmi: '21,14 CM³', maksHiz: '3000', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: '27168', calismaBasinci: '', iletimHacmi: '20+11 CM³', maksHiz: '', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: 'T66610549', calismaBasinci: '', iletimHacmi: '20 + 11 CM³', maksHiz: '', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: '27169', calismaBasinci: '', iletimHacmi: '20+20 CM³', maksHiz: '', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: '27311', calismaBasinci: '', iletimHacmi: '20 + 4 CM³', maksHiz: '', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: 'T66610553', calismaBasinci: '', iletimHacmi: '20+6,3 CM³', maksHiz: '', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: '27304', calismaBasinci: '', iletimHacmi: '20+8 CM³', maksHiz: '', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: 'T66610567', calismaBasinci: '', iletimHacmi: '25+8 CM³', maksHiz: '', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: 'T66610565', calismaBasinci: '', iletimHacmi: '25+11 CM³', maksHiz: '', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: '27255', calismaBasinci: '', iletimHacmi: '25+11 CM³', maksHiz: '', milKapakTipi: '82-E2', kapak: '', maxHiz: '' },
          { model: '27446', calismaBasinci: '170', iletimHacmi: '26,42 CM³', maksHiz: '', milKapakTipi: '55-B2', kapak: '2500', maxHiz: '' },
          { model: '27256', calismaBasinci: '250', iletimHacmi: '21,99 CM³', maksHiz: '3000', milKapakTipi: '04-S5', kapak: '', maxHiz: '' },
          { model: '27174', calismaBasinci: '', iletimHacmi: '27 + 14 CM³', maksHiz: '', milKapakTipi: '32-S5', kapak: '', maxHiz: '' },
          { model: 'T666000LP', calismaBasinci: '', iletimHacmi: '43 + 11,2 CM³', maksHiz: '', milKapakTipi: '04-S5', kapak: '', maxHiz: '' },
          { model: '27300', calismaBasinci: '150', iletimHacmi: '91,1 CM³', maksHiz: '2200', milKapakTipi: '04-S5', kapak: '', maxHiz: '' },
          { model: '27257', calismaBasinci: '240', iletimHacmi: '34,55 CM³', maksHiz: '3000', milKapakTipi: '04-S5', kapak: '', maxHiz: '' },
        ]
      },
      'vivolo': {
        description,
        tableHeaders: ['MODEL', 'MAKS.BASINÇ', 'MAKS.HIZ', 'MİN.HIZ', 'YER DEĞİŞTİRME (CM³/REV)'],
        products: [
          { model: '27286', maksBasinc: '300 BAR', maksHiz: '6000 GİRİ/MİN', minHiz: '700 GİRİ/MİN', yerDegistirme: '3.64 CM3/GİRO' },
          { model: '27364', maksBasinc: '240 BAR', maksHiz: '3000 GİRİ/MİN', minHiz: '700 GİRİ/MİN', yerDegistirme: '22.8 CM3/GİRO' },
        ]
      },
      'salami': {
        description,
        tableHeaders: ['MODEL', 'ÇALIŞMA BASINCI', 'MAKS.HIZ', 'MİN.HIZ', 'YER DEĞİŞTİRME (CM³/REV)'],
        products: [
          { model: '27282', calismaBasinci: '180 BAR', maksHiz: '2500', minHiz: '400', yerDegistirme: '25,8' },
          { model: '612T-3E65E46', calismaBasinci: '200 BAR', maksHiz: '2500', minHiz: '400', yerDegistirme: '63,1' },
          { model: '612T-3E75E46DP38P2', calismaBasinci: '180 BAR', maksHiz: '2500', minHiz: '400', yerDegistirme: '73,4' },
        ]
      },
      'hydrocar': {
        description,
        tableHeaders: ['MODEL', 'MAKS.BASINÇ', 'MAKS.HIZ', 'POMPA TİPİ'],
        products: [
          { model: '27444', maksBasinc: '270/3900', maksHiz: '1400', pompaTipi: 'DP 30-43 T1 UNI' },
          { model: '27541', maksBasinc: '270/3900', maksHiz: '1400', pompaTipi: 'DP 30-43 T1 UNI' },
        ]
      }
    }
    return data[brandName] || null
  }

  // HYSTAR ürün verilerini al
  const getHystarProductData = (cardName) => {
    if (cardName === 'ENDÜSTRİYEL TİP PALETLİ POMPALAR') {
      return {
        title: 'ENDÜSTRİYEL TİP PALETLİ POMPALAR',
        categories: [
          {
            name: 'TEKLİ PALETLİ POMPALAR',
            products: [
              { kod: 'HSHQ25026', basinc: '245', hacim: '26,2 CM³', hiz: '950-1800' },
              { kod: 'HSHQ25032', basinc: '245', hacim: '32,1 CM³', hiz: '950 - 1800' },
              { kod: 'HSHQ25038', basinc: '245', hacim: '32,1 CM³', hiz: '950 - 1800' },
              { kod: 'HSHQ25043', basinc: '245', hacim: '43,2 CM³', hiz: '950 - 1800' },
              { kod: 'HSHQ25047', basinc: '245', hacim: '47,1 CM³', hiz: '950 - 1800' },
              { kod: 'HSHQ25052', basinc: '245', hacim: '52,3 CM³', hiz: '950 - 1800' },
              { kod: 'HSHQ25060', basinc: '210', hacim: '60,2 CM³', hiz: '950 - 1800' },
              { kod: 'HSHQ25065', basinc: '210', hacim: '65,3 CM³', hiz: '950 - 1800' },
              { kod: 'HSHQ25075', basinc: '175', hacim: '75 CM³', hiz: '950 - 1800' },
              { kod: 'HSHQ35108', basinc: '210', hacim: '108,2 CM³', hiz: '900 - 1800' },
              { kod: 'HSHQ350116', basinc: '175', hacim: '116,1 CM³', hiz: '900 - 1800' },
              { kod: 'HSHQ35060', basinc: '210', hacim: '60,3 CM³', hiz: '900 - 1800' },
              { kod: 'HSHQ35076', basinc: '210', hacim: '76,3 CM³', hiz: '900 - 1800' },
              { kod: 'HSHQ35082', basinc: '210', hacim: '82,2 CM³', hiz: '900 - 1800' },
              { kod: 'HSHQ35088', basinc: '210', hacim: '88,3 CM³', hiz: '900 - 1800' },
              { kod: 'HSHQ35094', basinc: '210', hacim: '94,5 CM³', hiz: '900 - 1800' },
            ]
          }
        ]
      }
    } else if (cardName === 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR') {
      return {
        title: 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR',
        categories: [
          {
            name: 'MEKANİK BASINÇ REG. DEĞ. DEB. PALETLİ POMPALAR',
            products: [
              { kod: 'HSPVF-12-70', hacim: '6,6 CM³', basinc: '15-35', hiz: '800-1800' },
              { kod: 'HSPVF-20-70', hacim: '11,1 CM³', basinc: '15-35', hiz: '800-1800' },
              { kod: 'HSPVF-30-70', hacim: '16,6 CM³', basinc: '15-35', hiz: '800-1800' },
              { kod: 'HSPVF-40-70', hacim: '22,2 CM³', basinc: '15-35', hiz: '800-1800' },
            ]
          },
          {
            name: 'MEKANİK BASINÇ REG. DEĞ. DEB. PALETLİ TANDEM POMPALAR',
            products: [
              { kod: 'HSPVDF-270270-10', basinc: '50-70', hiz: '800-1800', hacim: '11.1+11.1 CM³' },
              { kod: 'HSPVDF-370370-10', basinc: '50-70', hiz: '800-1800', hacim: '16.6+16.6 CM³' },
              { kod: 'HSPVDF-470470-10', basinc: '50-70', hiz: '800-1800', hacim: '22.2+22.2 CM³' },
            ]
          }
        ]
      }
    } else if (cardName === 'V10-V20 ENDÜSTRİYEL VE MOBİL POMPALAR') {
      return {
        title: 'V10-V20 ENDÜSTRİYEL VE MOBİL POMPALAR',
        categories: [
          {
            name: 'V10',
            products: [
              { kod: 'HSHQ15011', hacim: '11,02 CM³', basinc: '245', hiz: '950 - 1800' },
              { kod: 'HSHQ15014', hacim: '14,03 CM³', basinc: '245', hiz: '950 - 1800' },
              { kod: 'HSHQ15017', hacim: '17,01 CM³', basinc: '245', hiz: '950 - 1800' },
              { kod: 'HSHQ15019', hacim: '19,02 CM³', basinc: '245', hiz: '950 - 1800' },
              { kod: 'HSHQ15023', hacim: '23,03 CM³', basinc: '245', hiz: '950 - 1800' },
              { kod: 'HSHQ15026', hacim: '26,01 CM³', basinc: '245', hiz: '950 - 1800' },
              { kod: 'HSHQ15031', hacim: '31,01 CM³', basinc: '245', hiz: '950 - 1800' },
            ]
          }
        ]
      }
    }
    return null
  }

  // KCL ürün verilerini al
  const getKclProductData = (cardName) => {
    if (cardName === 'ENDÜSTRİYEL TİP PALETLİ POMPALAR') {
      return {
        title: 'ENDÜSTRİYEL TİP PALETLİ POMPALAR',
        categories: [
          {
            name: 'TEKLİ PALETLİ POMPALAR',
            products: [
              { kod: '26492', basinc: '240-275', hiz: '600-2800', hacim: '10,8 CM³' },
              { kod: '26493', basinc: '240-275', hiz: '600-2800', hacim: '17,2 CM³' },
              { kod: '26494', basinc: '240-275', hiz: '600-2800', hacim: '21,3 CM³' },
              { kod: '26575', basinc: '240-275', hiz: '600-2800', hacim: '26,4 CM³' },
              { kod: '26576', basinc: '240-275', hiz: '600-2800', hacim: '34,1 CM³' },
              { kod: '26577', basinc: '240-275', hiz: '600-2800', hacim: '37,1 CM³' },
              { kod: '26578', basinc: '240-275', hiz: '600-2800', hacim: '46 CM³' },
              { kod: '26579', basinc: '240-275', hiz: '600-2800', hacim: '58,3 CM³' },
              { kod: '26580', basinc: '240-275', hiz: '600-2800', hacim: '68,3 CM³' },
              { kod: '26581', basinc: '240-275', hiz: '600-2800', hacim: '70,3 CM³' },
              { kod: '26582', basinc: '240-275', hiz: '600-2500', hacim: '79,3 CM³' },
              { kod: '26583', basinc: '210-240', hiz: '600-2500', hacim: '88,8 CM³' },
              { kod: '26584', basinc: '210-240', hiz: '600-2500', hacim: '100 CM³' },
              { kod: '26585', basinc: '290-320', hiz: '3600', hacim: '9,8 CM³' },
              { kod: '26586', basinc: '290-320', hiz: '3600', hacim: '15,9 CM³' },
              { kod: '26587', basinc: '290-320', hiz: '3600', hacim: '19,8 CM³' },
              { kod: '26588', basinc: '290-320', hiz: '3600', hacim: '28 CM³' },
              { kod: '26589', basinc: '290-320', hiz: '3600', hacim: '31,8 CM³' },
              { kod: '26590', basinc: '270-300', hiz: '3600', hacim: '45,1 CM³' },
            ]
          }
        ]
      }
    } else if (cardName === 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR') {
      return {
        title: 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR',
        categories: [
          {
            name: 'MEKANİK BASINÇ REG. DEĞ. DEB. PALETLİ POMPALAR',
            products: [
              { kod: '26205', debi: '11,1', basinc: '50-70', hiz: '800-1800' },
              { kod: '26206', debi: '16,6', basinc: '50-70', hiz: '800-1800' },
              { kod: '26207', debi: '22,2', basinc: '50-70', hiz: '800-1800' },
            ]
          }
        ]
      }
    }
    return null
  }

  // HYTEK ürün verilerini al
  const getHytekProductData = (cardName) => {
    if (cardName === 'ENDÜSTRİYEL TİP PALETLİ POMPALAR') {
      return {
        title: 'ENDÜSTRİYEL TİP PALETLİ POMPALAR',
        categories: [
          {
            name: 'TEKLİ PALETLİ POMPALAR',
            products: [
              { kod: 'YHTF3-PC-20V-11-R', basinc: '210', galon: '11', hiz: '1800', seri: '20V', hacim: '' },
              { kod: 'HTP20V-11A-1C22R', basinc: '210', galon: '11', hiz: '1800', seri: '20V', hacim: '' },
              { kod: 'HTP20V-08A-1C22R', basinc: '210', galon: '8', hiz: '1800', seri: '20V', hacim: '' },
              { kod: 'HTP25V-14A-1C22R', basinc: '175', galon: '14', hiz: '1800', seri: '25V', hacim: '' },
              { kod: 'HTP25V-17A-1C22R', basinc: '175', galon: '17', hiz: '1800', seri: '25V', hacim: '' },
              { kod: 'HTP25V-19A-1C22R', basinc: '175', galon: '19', hiz: '1800', seri: '25V', hacim: '' },
              { kod: 'HTP25V-21A-1C22R', basinc: '175', galon: '21', hiz: '1800', seri: '25V', hacim: '' },
              { kod: 'HTP35V-25A-1C22R', basinc: '175', galon: '25', hiz: '1800', seri: '35V', hacim: '' },
              { kod: 'HTP35V-30A-1C22R', basinc: '175', galon: '30', hiz: '1800', seri: '35V', hacim: '' },
              { kod: 'HTP35V-35A-1C22R', basinc: '175', galon: '30', hiz: '1800', seri: '35V', hacim: '' },
              { kod: 'YHTF3-PC-45V-50-R', basinc: '175', galon: '50', hiz: '1800', seri: '45V', hacim: '' },
              { kod: 'HTP45V-60A-1C22R', basinc: '175', galon: '60', hiz: '1800', seri: '45V', hacim: '' },
              { kod: 'HTP45V-75A-1C22R', basinc: '140', galon: '75', hiz: '1800', seri: '45V', hacim: '' },
              { kod: 'HTPVL2-26-F-2R-U-10', basinc: '210', galon: '', hiz: '600-1800', seri: '', hacim: '26,06 CM³' },
              { kod: 'PVL2-33-F-2R-U-10SO', basinc: '210', galon: '', hiz: '600-1800', seri: '', hacim: '33,3 CM³' },
              { kod: 'HTPVL2-41-F-2R-U-10', basinc: '210', galon: '', hiz: '600-1800', seri: '', hacim: '41,3 CM³' },
              { kod: 'HTPVL2-47-F-2R-U-10', basinc: '210', galon: '', hiz: '600-1800', seri: '', hacim: '47,02 CM³' },
              { kod: 'HTPVL2-53-F-2R-U-10', basinc: '210', galon: '', hiz: '600-1800', seri: '', hacim: '52,2 CM³' },
              { kod: 'HTPVL2-59-F-2R-U-10', basinc: '210', galon: '', hiz: '600-1800', seri: '', hacim: '58,2 CM³' },
              { kod: 'HTPVL2-65-F-2R-U-10', basinc: '210', galon: '', hiz: '600-1800', seri: '', hacim: '64,7 CM³' },
              { kod: 'HTPVL2-75-F-2R-U-10', basinc: '210', galon: '', hiz: '600-1800', seri: '', hacim: '74,6 CM³' },
              { kod: 'HTPVL3-116-F-1R-U-10', basinc: '160', galon: '', hiz: '600-1800', seri: '', hacim: '115,6 CM³' },
              { kod: '26547', basinc: '160', galon: '', hiz: '600-1200', seri: '', hacim: '122,02 CM³' },
              { kod: 'HTPVL3-66-F-14R-U-10', basinc: '210', galon: '', hiz: '600-1800', seri: '', hacim: '66,03 CM³' },
              { kod: 'HTPVL3-76-F-1R-U-10', basinc: '210', galon: '', hiz: '600-1800', seri: '', hacim: '76,04 CM³' },
              { kod: 'HTPVL3-85-F-1R-U-10', basinc: '210', galon: '', hiz: '600-1800', seri: '', hacim: '85 CM³' },
              { kod: 'HTPVL3-94-F-1R-U-10', basinc: '210', galon: '', hiz: '600-1800', seri: '', hacim: '93,06 CM³' },
            ]
          }
        ]
      }
    } else if (cardName === 'KATRİÇ') {
      return {
        title: 'KATRİÇ',
        categories: [
          {
            name: 'MOBİL SERİ KATRİÇ',
            products: [
              { kod: 'YHTF3-PC-20VQ-11-R', basinc: '140-210', galon: '11', hiz: '2700', seri: '20VQ' },
              { kod: 'YHTF3-PC-20VQ-14-R', basinc: '140-210', galon: '14', hiz: '2700', seri: '20VQ' },
              { kod: 'YHTF3-PC-20VQ-09-R', basinc: '140-210', galon: '9', hiz: '2700', seri: '20VQ' },
              { kod: 'YHTF3-PC-25VQ-12-R', basinc: '210', galon: '12', hiz: '2500', seri: '25VQ' },
              { kod: 'YHTF3-PC-25VQ-14-R', basinc: '210', galon: '14', hiz: '2700', seri: '25VQ' },
              { kod: 'YHTF3-PC-25VQ-17-R', basinc: '210', galon: '17', hiz: '2500', seri: '25VQ' },
              { kod: 'YHTF3-PC-25VQ-19-R', basinc: '210', galon: '19', hiz: '2500', seri: '25VQ' },
              { kod: 'YHTF3-PC-25VQ-21-R', basinc: '210', galon: '21', hiz: '2500', seri: '25VQ' },
              { kod: 'YHTF3-PC-35VQ-25-R', basinc: '210', galon: '25', hiz: '2500', seri: '35VQ' },
              { kod: 'YHTF3-PC-35VQ-35-R', basinc: '210', galon: '35', hiz: '2400', seri: '35VQ' },
              { kod: 'YHTF3-PC-35VQ-38-R', basinc: '210', galon: '38', hiz: '2400', seri: '35VQ' },
              { kod: 'YHTF3-PC-45VQ-42-R', basinc: '175', galon: '42', hiz: '2400', seri: '45VQ' },
              { kod: 'YHTF3-PC-45VQ-50-R', basinc: '175', galon: '50', hiz: '2200', seri: '45VQ' },
              { kod: 'YHTF3-PC-45VQ-75-R', basinc: '175', galon: '75', hiz: '2200', seri: '45VQ' },
            ]
          },
          {
            name: 'ENDÜSTRİYEL SERİ KATRİÇ',
            products: [
              { kod: 'YHTF3-PC-25V-14-R', basinc: '175', galon: '14', hiz: '1800', seri: '25V' },
              { kod: 'YHTF3-PC-25V-15-R', basinc: '175', galon: '15', hiz: '1800', seri: '25V' },
              { kod: 'YHTF3-PC-25V-17-R', basinc: '175', galon: '17', hiz: '1800', seri: '25V' },
              { kod: 'YHTF3-PC-25V-19-R', basinc: '175', galon: '19', hiz: '1800', seri: '25V' },
              { kod: 'YHTF3-PC-25V-21-R', basinc: '175', galon: '21', hiz: '1800', seri: '25V' },
              { kod: 'YHTF3-PC-35V-21-R', basinc: '175', galon: '21', hiz: '1800', seri: '35V' },
              { kod: 'YHTF3-PC-35V-25-R', basinc: '175', galon: '25', hiz: '1800', seri: '35V' },
              { kod: 'YHTF3-PC-35V-30-R', basinc: '175', galon: '30', hiz: '1800', seri: '35V' },
              { kod: 'YHTF3-PC-35V-38-R', basinc: '175', galon: '38', hiz: '1800', seri: '35V' },
              { kod: 'YHTF3-PC-35V-45-R', basinc: '175', galon: '45', hiz: '1800', seri: '35V' },
              { kod: 'YHTF3-PC-45V-42-R', basinc: '175', galon: '42', hiz: '1800', seri: '45V' },
              { kod: 'YHTF3-PC-45V-57-R', basinc: '175', galon: '57', hiz: '1800', seri: '45V' },
              { kod: 'YHTF3-PC-45V-60-R', basinc: '175', galon: '60', hiz: '1800', seri: '45V' },
            ]
          }
        ]
      }
    } else if (cardName === 'MOBİL TİP PALETLİ POMPALAR') {
      return {
        title: 'MOBİL TİP PALETLİ POMPALAR',
        categories: [
          {
            name: 'TANDEM PALETLİ POMPALAR',
            products: [
              { kod: 'HTPF3-2520VQ-21A05-11AA20R', basinc: '210', galon: '17+14', hiz: '2500', seri: '25VQ' },
              { kod: 'HTP-2520VQ-21A05-1AA22R', basinc: '210', galon: '17+5', hiz: '2500', seri: '25VQ' },
              { kod: 'HTPF3-2520VQ-19A11-11AA20R', basinc: '210', galon: '19+11', hiz: '2500', seri: '25VQ' },
              { kod: 'HTPF3-2520VQ-19A9-11AA20R', basinc: '210', galon: '19+9', hiz: '2500', seri: '25VQ' },
              { kod: 'HTPF3-2520VQ-21A11-11AA20R', basinc: '210', galon: '21+11', hiz: '2500', seri: '25VQ' },
              { kod: 'HTPF3-2520VQ-21A14-11AA20R', basinc: '210', galon: '21+14', hiz: '2500', seri: '25VQ' },
              { kod: 'HTPF3-2520VQ-21A07-11AA20R', basinc: '210', galon: '21+7', hiz: '2500', seri: '25VQ' },
              { kod: 'HTPF3-3520VQ-21A11-11AA20R', basinc: '210', galon: '21+11', hiz: '2500', seri: '35VQ' },
              { kod: 'HTPF3-3520VQ-25A8-11AA20R', basinc: '210', galon: '25+08', hiz: '2500', seri: '35VQ' },
              { kod: 'HTPF3-3520VQ-25A11-11AA20R', basinc: '210', galon: '25+11', hiz: '2500', seri: '35VQ' },
              { kod: 'HTPF3-3520VQ-30A11-11AA20R', basinc: '210', galon: '30+11', hiz: '2500', seri: '35VQ' },
              { kod: 'HTPF3-3520VQ-38A11-11AA20R', basinc: '210', galon: '38+11', hiz: '2400', seri: '35VQ' },
              { kod: 'HTPF3-3525VQ-35A14-11AA20R', basinc: '210', galon: '35+14', hiz: '2400', seri: '35VQ' },
              { kod: '26661', basinc: '175', galon: '60+21', hiz: '2200', seri: '45VQ' },
            ]
          },
          {
            name: 'TEKLİ PALETLİ POMPALAR',
            products: [
              { kod: 'HTPF3-25VQ17A-11C20R', basinc: '210', galon: '17', hiz: '2500', seri: '25VQ' },
              { kod: 'YHTF3-PC-45VQ-60-R', basinc: '175', galon: '60', hiz: '2200', seri: '45VQ' },
            ]
          }
        ]
      }
    } else if (cardName === 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR') {
      return {
        title: 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR',
        categories: [
          {
            name: 'MEKANİK BASINÇ REG. DEĞ. DEB. PALETLİ POMPALAR',
            products: [
              { kod: 'HTPHA10VSO100DFR/31R-PSC12K04', basinc: '315', hiz: '2000', versiyon: 'BSÇ.DUYARLI-YÜK DUYARLI', tip: 'DFR', hacim: '', maksBasinc: '', minMaxHiz: '' },
              { kod: 'HTPHA10VSO18DR/31R-PSC12N00', basinc: '315', hiz: '3300', versiyon: 'BSÇ.DUYARLI-YÜK DUYARLI (LOAD SENSİNG)', tip: 'DR - DFR', hacim: '', maksBasinc: '', minMaxHiz: '' },
              { kod: '26161', basinc: '315', hiz: '3000', versiyon: 'GÜÇ REGÜLASYONLU(5,5 KW)', tip: 'DFLR', hacim: '', maksBasinc: '', minMaxHiz: '' },
              { kod: 'HTPHA10VSO28DFR/31R-PSC12N00', basinc: '315', hiz: '3000', versiyon: 'BSÇ.DUYARLI-YÜK DUYARLI (LOAD SENSİNG)', tip: 'DFR', hacim: '', maksBasinc: '', minMaxHiz: '' },
              { kod: 'HTPHA10VSO45DFLR/31R-PSC12N00', basinc: '315', hiz: '2600', versiyon: 'GÜÇ REGÜLASYONLU(11 KW)', tip: 'DFLR', hacim: '', maksBasinc: '', minMaxHiz: '' },
              { kod: 'HTPHA10VSO71DFLR/31R-PSC12N00', basinc: '315', hiz: '2200', versiyon: 'GÜÇ REGÜLASYONLU (22 KW)', tip: 'DFLR', hacim: '', maksBasinc: '', minMaxHiz: '' },
              { kod: 'HTPHA10VSO71DFR/31L-PSC12N00', basinc: '315', hiz: '2200', versiyon: 'BSÇ DUYARLI-YÜK DUYARLI', tip: 'DFR', hacim: '', maksBasinc: '', minMaxHiz: '' },
              { kod: 'HTPVPV1-12-70-10', basinc: '', hiz: '', versiyon: '', tip: '', hacim: '6,7 CM³', maksBasinc: '50-70', minMaxHiz: '800-1800' },
              { kod: 'HTPVPV1-15-70-10', basinc: '', hiz: '', versiyon: '', tip: '', hacim: '8,3 CM³', maksBasinc: '50-70', minMaxHiz: '800-1800' },
              { kod: 'HTPVPV1-20-70-10', basinc: '', hiz: '', versiyon: '', tip: '', hacim: '11,1 CM³', maksBasinc: '50-70', minMaxHiz: '800-1800' },
              { kod: 'HTPVPV2-30-70-20', basinc: '', hiz: '', versiyon: '', tip: '', hacim: '16,7 CM³', maksBasinc: '50-70', minMaxHiz: '800-1800' },
              { kod: 'HTPVPV2-40-70-20', basinc: '', hiz: '', versiyon: '', tip: '', hacim: '22,2 CM³', maksBasinc: '50-70', minMaxHiz: '800-1800' },
            ]
          }
        ]
      }
    } else if (cardName === 'V10-V20 ENDÜSTRİYEL VE MOBİL POMPALAR') {
      return {
        title: 'V10-V20 ENDÜSTRİYEL VE MOBİL POMPALAR',
        categories: [
          {
            name: 'V10',
            products: [
              { kod: 'HTPVL1-10-F-1R-U-10', basinc: '210', deplasman: '9,04 CM³', hiz: '750-1800', galon: '', seri: '' },
              { kod: 'HTPVL1-12-F-1R-U-10', basinc: '210', deplasman: '12,02 CM³', hiz: '750-1800', galon: '', seri: '' },
              { kod: 'HTPVL1-14-F-1R-U-10', basinc: '210', deplasman: '19,07 CM³', hiz: '750-1800', galon: '', seri: '' },
              { kod: 'HTPVL1-17-F-1R-U-10', basinc: '210', deplasman: '16,06 CM³', hiz: '750-1800', galon: '', seri: '' },
              { kod: 'HTPVL1-19-F-1R-U-10', basinc: '210', deplasman: '18,06 CM³', hiz: '750-1800', galon: '', seri: '' },
              { kod: 'HTPVL1-23-F-1R-U-10', basinc: '210', deplasman: '22,07 CM³', hiz: '750-1800', galon: '', seri: '' },
              { kod: 'HTPVL1-25-F-1R-U-10', basinc: '210', deplasman: '25,03 CM³', hiz: '750-1800', galon: '', seri: '' },
              { kod: 'HTPVL1-31-F-1R-U-10', basinc: '210', deplasman: '31 CM³', hiz: '750-1800', galon: '', seri: '' },
              { kod: 'HTPV10-1B2B-1C20R', basinc: '172', deplasman: '', hiz: '4500', galon: '2', seri: 'V10' },
              { kod: 'HTPV10-1B3B-1C20R', basinc: '172', deplasman: '', hiz: '4000', galon: '3', seri: 'V10' },
              { kod: 'HTPV10-1B4B-1C20R', basinc: '172', deplasman: '', hiz: '3400', galon: '4', seri: 'V10' },
              { kod: 'HTPV10-1B5B-1C20R', basinc: '172', deplasman: '', hiz: '3200', galon: '5', seri: 'V10' },
              { kod: 'HTPV10-1B6B-1C20R', basinc: '152', deplasman: '', hiz: '3000', galon: '6', seri: 'V10' },
              { kod: 'HTPV10-1B7B-1C20R', basinc: '138', deplasman: '', hiz: '2800', galon: '7', seri: 'V10' },
            ]
          },
          {
            name: 'V20',
            products: [
              { kod: 'HTPV20-1B6B-1C10R', galon: '6', basinc: '172', hiz: '3400', seri: 'V20' },
              { kod: 'HTPV20-1B7B-1C10R', galon: '7', basinc: '172', hiz: '3000', seri: 'V20' },
              { kod: 'HTPV20-1B8B-1C10R', galon: '8', basinc: '172', hiz: '2800', seri: 'V20' },
              { kod: 'HTPV20-1B9B-1A10R', galon: '9', basinc: '172', hiz: '2800', seri: 'V20' },
              { kod: 'HTPV20-1B11B-1A10R', galon: '11', basinc: '172', hiz: '2500', seri: 'V20' },
              { kod: 'HTPV20-1B13B-1C10R', galon: '13', basinc: '152', hiz: '2400', seri: 'V20' },
            ]
          }
        ]
      }
    }
    return null
  }

  // PALETLİ POMPA kartına tıklandığında
  const handlePaletliPompaCardClick = (cardName, brandName) => {
    setSelectedPaletliPompaCard(cardName)
  }

  // Grup detay sayfasında mıyız?
  const isGroupDetailPage = selectedGroup && selectedGroupBrand

  return (
    <div className="bg-slate-50 pb-16 text-slate-900">
      <section className={`mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pt-8 sm:gap-8 sm:px-6 ${isGroupDetailPage ? 'lg:px-8' : 'lg:flex-row lg:px-8'}`}>
        {/* Sol Menü - Sadece grup detay sayfası değilse göster */}
        {!isGroupDetailPage && (
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
                                    const categorySlug = section.title.toLowerCase().replace(/\s+/g, '-')
                                    const subcategorySlug = item.toLowerCase().replace(/\s+/g, '-')
                                    const itemImage = getProductImage(item)
                                    return (
                                      <li key={item}>
                                        <button
                                          onClick={() => {
                                            // URL'yi güncelle - yeni format: /urunler/category/subcategory
                                            navigate(`/urunler/${categorySlug}/${subcategorySlug}`, {
                                              state: { 
                                                productName: item, 
                                                productImage: itemImage,
                                                productLogo: null
                                              },
                                              replace: false
                                            })
                                            // State'leri güncelle
                                            setSelectedProduct(item)
                                            setSelectedBrand(null) // Marka seçimini temizle
                                            setSelectedGroup(null) // Grup seçimini temizle
                                            setSelectedGroupBrand(null) // Grup marka seçimini temizle
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
        )}

        {/* Sağ İçerik - Grup detay sayfasında tam genişlik */}
        <div className={`${isGroupDetailPage ? 'w-full' : 'flex-1'} space-y-5`}>
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
                        setSelectedBrand(null) // Marka seçimini temizle
                        setSelectedGroup(null) // Grup seçimini temizle
                        setSelectedGroupBrand(null) // Grup marka seçimini temizle
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
                        <h3 className="mb-4 text-lg font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
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
                        setSelectedBrand(null) // Marka seçimini temizle
                        setSelectedGroup(null) // Grup seçimini temizle
                        setSelectedGroupBrand(null) // Grup marka seçimini temizle
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
                        <h3 className="mb-4 text-lg font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
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
                        <h3 className="mb-4 text-lg font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
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
          ) : selectedGroup && selectedGroupBrand ? (
            <>
              {/* Grup Detay Sayfası - Profesyonel Tasarım */}
              <div className="max-w-6xl mx-auto space-y-6">
                {/* Başlık ve Geri Dön Butonu */}
                <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00] mb-1">Grup Detayı</p>
                    <h1 className="text-2xl font-bold text-slate-900">{selectedGroup}</h1>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedGroup(null)
                      setSelectedGroupBrand(null)
                    }}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[#ff7f00] hover:bg-[#ff7f00]/5 hover:text-[#ff7f00]"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Geri Dön
                  </button>
                </div>

                {/* Resim ve İçerik Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Sol: Ürün Resmi (Küçültülmüş, Sağa Hizalı) */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 via-white to-slate-50 p-4 sm:p-6">
                        <img 
                          src={getGroupImage(selectedGroup)} 
                          alt={selectedGroup} 
                          className="h-auto w-full max-h-[250px] sm:max-h-[300px] lg:max-h-[400px] object-contain"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/400x400.png?text=${encodeURIComponent(selectedGroup)}`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sağ: Ürün Bilgileri ve Logo */}
                  <div className="lg:col-span-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                      {/* Başlık ve Logo - Sol ve Sağ, Dikey Ortalanmış */}
                      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-slate-900">Ürün Bilgileri</h2>
                        </div>
                        {/* Marka Logosu - Sağda */}
                        <div className="flex-shrink-0">
                          <div className="flex h-20 w-32 items-center justify-center rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-3 shadow-sm transition hover:border-[#ff7f00] hover:shadow-md">
                            <img 
                              src={`/${selectedGroupBrand}.png`} 
                              alt={selectedGroupBrand} 
                              className="h-14 w-auto object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none'
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* İçerik Alanı */}
                      <div className="prose prose-slate max-w-none">
                        <div className="text-slate-700 space-y-6">
                          {selectedGroup === '00.GRUP POMPALAR' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  Hidrolik pompalar, endüstriyel alanlardan tarım sektörüne kadar geniş bir kullanım yelpazesine sahip olan önemli bir ekipmandır. Bu pompalar, mekanik enerjiyi hidrolik sıvıya dönüştürerek makine sistemlerinin gücünü artırır. Hydropack, dişli pompa, OP (operasyonel pompa) gibi farklı tipleri bulunan hidrolik pompalar, işlevselliği ve verimliliği ile dikkat çeker.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitleri ve Özellikleri</h3>

                                <h4 className="text-base font-semibold text-slate-900 mt-4 mb-2">Hydropack Nedir?</h4>
                                <p>
                                  Hydropack, hidrolik sistemlerde sıkça kullanılan bir pompa çeşididir. Küçük boyutlarıyla bilinen bu pompa, taşınabilirlik ve etkin performansıyla öne çıkar. Genellikle mobil ekipmanlarda ve küçük ölçekli hidrolik uygulamalarda tercih edilir.
                                </p>

                                <h4 className="text-base font-semibold text-slate-900 mt-4 mb-2">Dişli Pompaların Avantajları</h4>
                                <p>
                                  Hidrolik sistemlerde sıkça kullanılan bir başka pompa çeşidi ise dişli pompadır. Basit yapısı ve dayanıklılığı ile bilinen bu pompa, düşük maliyeti ve etkili performansıyla tanınır. Dişli pompalar, akışkanın istikrarlı bir şekilde hareket etmesini sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Fiyatları ve Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompaların fiyatları, tipine, markasına ve performansına göre değişkenlik gösterir. Genel olarak, dişli pompalar daha ekonomik seçenekler sunarken, hydropack gibi daha taşınabilir ve özelleştirilebilir modeller farklı fiyat aralıklarında yer alabilir. OP (operasyonel pompa) ise yüksek performanslı hidrolik pompalar arasında yer alır ve bu nedenle daha yüksek fiyat aralıklarında bulunabilir.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Kullanım Alanları</h3>
                                <p>
                                  Hidrolik pompalar, endüstriyel makinelerden tarım ekipmanlarına kadar geniş bir yelpazede kullanılır. İnşaat sektöründen otomotiv endüstrisine kadar birçok alanda hidrolik pompaların sağladığı güç ve verimlilik önemlidir.
                                </p>
                                <p>
                                  Hidrolik pompalar, hidrolik sistemlerin temel yapı taşlarıdır ve birçok endüstriyel işlemde kritik bir rol oynarlar. Bu pompaların seçimi, kullanılacak alana, gereksinimlere ve bütçeye göre dikkatlice yapılmalıdır.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Sonuç</h3>
                                <p>
                                  Hidrolik pompalar, endüstriyel ve tarımsal alanlarda güç ve performans sağlayan kritik ekipmanlardır. Hydropack, dişli pompa, OP gibi farklı tipleri bulunan bu pompalar, çeşitlilikleri ve özellikleri ile iş dünyasında geniş bir kabul görmektedir. Fiyatları ve kullanım alanlarına göre seçim yapılırken, ihtiyaca en uygun çözümün belirlenmesi önemlidir.
                                </p>
                                <p>
                                  Hidrolik pompalarla ilgili daha fazla bilgi edinmek ve fiyatlandırma konusunda detaylı bilgi almak için uzman bir danışmanla iletişime geçebilirsiniz.
                                </p>
                              </div>

                              {/* Teknik Özellikler */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Teknik Özellikleri</h3>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-start">
                                    <span className="font-semibold text-slate-900 mr-2">İletim Hacmi:</span>
                                    <span>0.25 cc/devir'den 2 cc/devir'e kadar</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="font-semibold text-slate-900 mr-2">Nominal basınç:</span>
                                    <span>200 bar'a kadar</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="font-semibold text-slate-900 mr-2">Maks. hız:</span>
                                    <span>3500 devir/dk'ye kadar</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="font-semibold text-slate-900 mr-2">Akışkan sıcaklık aralığı:</span>
                                    <span>-10…+80 °C</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="font-semibold text-slate-900 mr-2">Akışkan Tipi:</span>
                                    <span>Mineral bazlı hidrolik yağ</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="font-semibold text-slate-900 mr-2">Viskozite:</span>
                                    <span>10-100 cSt (46 cSt mineral bazlı hidrolik yağ önerilmektedir. Farklı iklim koşullarında viskozite değerleri değişebilir.)</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="font-semibold text-slate-900 mr-2">Filtrasyon:</span>
                                    <span>15-25 µm</span>
                                  </li>
                                </ul>
                              </div>

                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Ürün Listesi</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çalışma Basıncı</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Litre</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Maks. Hız</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">00A0.5X047</td>
                                          <td className="px-4 py-3 text-slate-700">200</td>
                                          <td className="px-4 py-3 text-slate-700">0,50 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">0,75</td>
                                          <td className="px-4 py-3 text-slate-700">3500</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">00A0.75X04</td>
                                          <td className="px-4 py-3 text-slate-700">200</td>
                                          <td className="px-4 py-3 text-slate-700">0,75 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">1,12</td>
                                          <td className="px-4 py-3 text-slate-700">3500</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">00C0.25X032</td>
                                          <td className="px-4 py-3 text-slate-700">200</td>
                                          <td className="px-4 py-3 text-slate-700">0,25 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">0,37</td>
                                          <td className="px-4 py-3 text-slate-700">3500</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">00C0.25X04</td>
                                          <td className="px-4 py-3 text-slate-700">200</td>
                                          <td className="px-4 py-3 text-slate-700">0,25 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">0,37</td>
                                          <td className="px-4 py-3 text-slate-700">3500</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">00C0.50X03</td>
                                          <td className="px-4 py-3 text-slate-700">200</td>
                                          <td className="px-4 py-3 text-slate-700">0,50 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">0,75</td>
                                          <td className="px-4 py-3 text-slate-700">3500</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">00C0.5X047-H</td>
                                          <td className="px-4 py-3 text-slate-700">200</td>
                                          <td className="px-4 py-3 text-slate-700">0,50 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">0,75</td>
                                          <td className="px-4 py-3 text-slate-700">3500</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">00C0.75X03</td>
                                          <td className="px-4 py-3 text-slate-700">200</td>
                                          <td className="px-4 py-3 text-slate-700">0,75 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">1,12</td>
                                          <td className="px-4 py-3 text-slate-700">3500</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">00C0.75X04</td>
                                          <td className="px-4 py-3 text-slate-700">200</td>
                                          <td className="px-4 py-3 text-slate-700">0,75 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">1,12</td>
                                          <td className="px-4 py-3 text-slate-700">3500</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">00C1.25X047-H</td>
                                          <td className="px-4 py-3 text-slate-700">200</td>
                                          <td className="px-4 py-3 text-slate-700">1,25 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">1,87</td>
                                          <td className="px-4 py-3 text-slate-700">2500</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '10.GRUP POMPALAR (0.5P SERİSİ)' && selectedGroupBrand === 'asc' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>ASC</strong>
                                </p>
                                <p>
                                  0.5P Serisi Hidrolik Pompalar: Alüminyum Gövdeli Dişli Pompalarla Yüksek Performans
                                </p>
                                <p>
                                  Hidrolik pompalar, endüstriyel ve tarımsal sektörlerde güç sağlama konusunda önemli bir rol oynar. Özellikle alüminyum gövdeli dişli pompalarla donatılan 0.5P Serisi Hidrolik Pompalar, teknolojik üstünlükleriyle dikkat çeker.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Alüminyum Gövdeli Dişli Pompaların Avantajları</h3>
                                <p>
                                  Bu seri, alüminyum gövdeye sahip dişli pompa teknolojisiyle donatılmıştır. Bu teknoloji, hafif ancak dayanıklı yapısıyla güvenilirlik ve uzun ömür sağlar. Aynı zamanda, yüksek basınç ve akış oranları ile istikrarlı bir performans sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Çeşitli Uygulama Alanları</h3>
                                <p>
                                  Alüminyum gövdeli dişli pompalar, çeşitli endüstriyel sektörlerde geniş bir uygulama yelpazesine sahiptir. Tarım makinelerinden hidrolik sistemli araçlara kadar birçok alanda etkili bir şekilde kullanılabilirler.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Fiyat Dengesi</h3>
                                <p>
                                  0.5P Serisi, yüksek performansı rekabetçi fiyatlarla birleştirir. Bu da kullanıcılar için mükemmel bir performans/fiyat oranı sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompaların geniş bir çeşitliliği bulunur ve her birinin özellikleri ve kullanım alanları farklılık gösterir. Alüminyum gövdeli dişli pompalar, hafif yapıları ve dayanıklılıklarıyla öne çıkar ve geniş bir talep görürler.
                                </p>
                                <p>
                                  Her bir işletmenin ihtiyaçları farklı olduğundan, hangi hidrolik pompayı seçerken uzman bir danışmana danışmak önemlidir.
                                </p>
                              </div>

                              {/* Tablo: 0.5P A/C B (STANDART POMPALAR) */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">0.5P A/C B (STANDART POMPALAR)</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">GENEL BİLGİLER</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCAP10.010.CAB02SN</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCAP10.016.CAB01SV</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCAP10.020.CAB01SN</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCAP10.045.CAB01SV</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '10.GRUP POMPALAR (0.5P SERİSİ)' && selectedGroupBrand === 'casappa' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>CASAPPA</strong>
                                </p>
                                <p>
                                  0.5P Serisi Hidrolik Pompalar: Alüminyum Gövdeli Dişli Pompalarla Yüksek Performans
                                </p>
                                <p>
                                  Hidrolik pompalar, endüstriyel ve tarımsal sektörlerde güç sağlama konusunda önemli bir rol oynar. Özellikle alüminyum gövdeli dişli pompalarla donatılan 0.5P Serisi Hidrolik Pompalar, teknolojik üstünlükleriyle dikkat çeker.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Alüminyum Gövdeli Dişli Pompaların Avantajları</h3>
                                <p>
                                  Bu seri, alüminyum gövdeye sahip dişli pompa teknolojisiyle donatılmıştır. Bu teknoloji, hafif ancak dayanıklı yapısıyla güvenilirlik ve uzun ömür sağlar. Aynı zamanda, yüksek basınç ve akış oranları ile istikrarlı bir performans sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Çeşitli Uygulama Alanları</h3>
                                <p>
                                  Alüminyum gövdeli dişli pompalar, çeşitli endüstriyel sektörlerde geniş bir uygulama yelpazesine sahiptir. Tarım makinelerinden hidrolik sistemli araçlara kadar birçok alanda etkili bir şekilde kullanılabilirler.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Fiyat Dengesi</h3>
                                <p>
                                  0.5P Serisi, yüksek performansı rekabetçi fiyatlarla birleştirir. Bu da kullanıcılar için mükemmel bir performans/fiyat oranı sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompaların geniş bir çeşitliliği bulunur ve her birinin özellikleri ve kullanım alanları farklılık gösterir. Alüminyum gövdeli dişli pompalar, hafif yapıları ve dayanıklılıklarıyla öne çıkar ve geniş bir talep görürler.
                                </p>
                                <p>
                                  Her bir işletmenin ihtiyaçları farklı olduğundan, hangi hidrolik pompayı seçerken uzman bir danışmana danışmak önemlidir.
                                </p>
                              </div>

                              {/* Tablo: 0.5P A/C B (STANDART POMPALAR) */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">0.5P A/C B (STANDART POMPALAR)</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Kapak</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Maks.Hız</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Şaft Tipi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C00372852</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">1,07 CM³</td><td className="px-4 py-3 text-slate-700">E1</td><td className="px-4 py-3 text-slate-700">4000</td><td className="px-4 py-3 text-slate-700">81</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C00372920</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">1,6 CM³</td><td className="px-4 py-3 text-slate-700">E1</td><td className="px-4 py-3 text-slate-700">4000</td><td className="px-4 py-3 text-slate-700">81</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C00372854</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">2,13 CM³</td><td className="px-4 py-3 text-slate-700">E1</td><td className="px-4 py-3 text-slate-700">4000</td><td className="px-4 py-3 text-slate-700">81</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C00372922</td><td className="px-4 py-3 text-slate-700">290</td><td className="px-4 py-3 text-slate-700">2,13 CM³</td><td className="px-4 py-3 text-slate-700">E1</td><td className="px-4 py-3 text-slate-700">4000</td><td className="px-4 py-3 text-slate-700">81</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C00372856</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">3,34 CM³</td><td className="px-4 py-3 text-slate-700">E1</td><td className="px-4 py-3 text-slate-700">4000</td><td className="px-4 py-3 text-slate-700">81</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C00372858</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">4,27 CM³</td><td className="px-4 py-3 text-slate-700">E1</td><td className="px-4 py-3 text-slate-700">4000</td><td className="px-4 py-3 text-slate-700">81</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C00372860</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">5,34 CM³</td><td className="px-4 py-3 text-slate-700">E1</td><td className="px-4 py-3 text-slate-700">4000</td><td className="px-4 py-3 text-slate-700">81</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">42982</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">6,2 CM³</td><td className="px-4 py-3 text-slate-700">E1</td><td className="px-4 py-3 text-slate-700">3500</td><td className="px-4 py-3 text-slate-700">81</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C00372862</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">6,67 CM³</td><td className="px-4 py-3 text-slate-700">E1</td><td className="px-4 py-3 text-slate-700">3500</td><td className="px-4 py-3 text-slate-700">81</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">42985</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">8,51 CM³</td><td className="px-4 py-3 text-slate-700">E1</td><td className="px-4 py-3 text-slate-700">3500</td><td className="px-4 py-3 text-slate-700">86</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '10.GRUP POMPALAR (0.5P SERİSİ)' && selectedGroupBrand === 'rexroth' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>REXROTH</strong>
                                </p>
                                <p>
                                  0.5P Serisi Hidrolik Pompalar: Alüminyum Gövdeli Dişli Pompalarla Yüksek Performans
                                </p>
                                <p>
                                  Hidrolik pompalar, endüstriyel ve tarımsal sektörlerde güç sağlama konusunda önemli bir rol oynar. Özellikle alüminyum gövdeli dişli pompalarla donatılan 0.5P Serisi Hidrolik Pompalar, teknolojik üstünlükleriyle dikkat çeker.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Alüminyum Gövdeli Dişli Pompaların Avantajları</h3>
                                <p>
                                  Bu seri, alüminyum gövdeye sahip dişli pompa teknolojisiyle donatılmıştır. Bu teknoloji, hafif ancak dayanıklı yapısıyla güvenilirlik ve uzun ömür sağlar. Aynı zamanda, yüksek basınç ve akış oranları ile istikrarlı bir performans sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Çeşitli Uygulama Alanları</h3>
                                <p>
                                  Alüminyum gövdeli dişli pompalar, çeşitli endüstriyel sektörlerde geniş bir uygulama yelpazesine sahiptir. Tarım makinelerinden hidrolik sistemli araçlara kadar birçok alanda etkili bir şekilde kullanılabilirler.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Fiyat Dengesi</h3>
                                <p>
                                  0.5P Serisi, yüksek performansı rekabetçi fiyatlarla birleştirir. Bu da kullanıcılar için mükemmel bir performans/fiyat oranı sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompaların geniş bir çeşitliliği bulunur ve her birinin özellikleri ve kullanım alanları farklılık gösterir. Alüminyum gövdeli dişli pompalar, hafif yapıları ve dayanıklılıklarıyla öne çıkar ve geniş bir talep görürler.
                                </p>
                                <p>
                                  Her bir işletmenin ihtiyaçları farklı olduğundan, hangi hidrolik pompayı seçerken uzman bir danışmana danışmak önemlidir.
                                </p>
                              </div>

                              {/* Tablo: 0.5P A/C B (STANDART POMPALAR) */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">0.5P A/C B (STANDART POMPALAR)</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ÇAP</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KAPAK</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ÖLÇÜ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ŞAFT TİPİ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">42969</td>
                                          <td className="px-4 py-3 text-slate-700">⌀32 MM</td>
                                          <td className="px-4 py-3 text-slate-700">B</td>
                                          <td className="px-4 py-3 text-slate-700">7,1 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">5 P</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '10.GRUP POMPALAR (0.5P SERİSİ)' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  0.5P Serisi Hidrolik Pompalar: Alüminyum Gövdeli Dişli Pompalarla Yüksek Performans
                                </p>
                                <p>
                                  Hidrolik pompalar, endüstriyel ve tarımsal sektörlerde güç sağlama konusunda önemli bir rol oynar. Özellikle alüminyum gövdeli dişli pompalarla donatılan 0.5P Serisi Hidrolik Pompalar, teknolojik üstünlükleriyle dikkat çeker.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Alüminyum Gövdeli Dişli Pompaların Avantajları</h3>
                                <p>
                                  Bu seri, alüminyum gövdeye sahip dişli pompa teknolojisiyle donatılmıştır. Bu teknoloji, hafif ancak dayanıklı yapısıyla güvenilirlik ve uzun ömür sağlar. Aynı zamanda, yüksek basınç ve akış oranları ile istikrarlı bir performans sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Çeşitli Uygulama Alanları</h3>
                                <p>
                                  Alüminyum gövdeli dişli pompalar, çeşitli endüstriyel sektörlerde geniş bir uygulama yelpazesine sahiptir. Tarım makinelerinden hidrolik sistemli araçlara kadar birçok alanda etkili bir şekilde kullanılabilirler.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Fiyat Dengesi</h3>
                                <p>
                                  0.5P Serisi, yüksek performansı rekabetçi fiyatlarla birleştirir. Bu da kullanıcılar için mükemmel bir performans/fiyat oranı sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompaların geniş bir çeşitliliği bulunur ve her birinin özellikleri ve kullanım alanları farklılık gösterir. Alüminyum gövdeli dişli pompalar, hafif yapıları ve dayanıklılıklarıyla öne çıkar ve geniş bir talep görürler.
                                </p>
                                <p>
                                  Her bir işletmenin ihtiyaçları farklı olduğundan, hangi hidrolik pompayı seçerken uzman bir danışmana danışmak önemlidir.
                                </p>
                              </div>

                              {/* İlk Tablo: 0.5P A/C B (STANDART POMPALAR) */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">0.5P A/C B (STANDART POMPALAR)</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çalışma Basıncı</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Litre</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Maks. Hız</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A027X</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">1.22 CM³</td><td className="px-4 py-3 text-slate-700">1.83</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A036X</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">1.63 CM³</td><td className="px-4 py-3 text-slate-700">2.45</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A048X</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">2.18 CM³</td><td className="px-4 py-3 text-slate-700">3.27</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A060X</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">2.72 CM³</td><td className="px-4 py-3 text-slate-700">4.08</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A072X</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">3.27 CM³</td><td className="px-4 py-3 text-slate-700">4.90</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A084X</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">3.81 CM³</td><td className="px-4 py-3 text-slate-700">5.71</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A096X</td><td className="px-4 py-3 text-slate-700">120</td><td className="px-4 py-3 text-slate-700">4.36 CM³</td><td className="px-4 py-3 text-slate-700">6.54</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A12X</td><td className="px-4 py-3 text-slate-700">125</td><td className="px-4 py-3 text-slate-700">5.7 CM³</td><td className="px-4 py-3 text-slate-700">8.55</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C027X</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">1.22 CM³</td><td className="px-4 py-3 text-slate-700">1.83</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C036X</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">1.63 CM³</td><td className="px-4 py-3 text-slate-700">2.45</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C048X</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">2.18 CM³</td><td className="px-4 py-3 text-slate-700">3.27</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C060X</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">2.72 CM³</td><td className="px-4 py-3 text-slate-700">4.08</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C072X</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">3.27 CM³</td><td className="px-4 py-3 text-slate-700">4.90</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C084X</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">3.81 CM³</td><td className="px-4 py-3 text-slate-700">5.71</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C096X</td><td className="px-4 py-3 text-slate-700">120</td><td className="px-4 py-3 text-slate-700">4.36 CM³</td><td className="px-4 py-3 text-slate-700">6.54</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C12X</td><td className="px-4 py-3 text-slate-700">125</td><td className="px-4 py-3 text-slate-700">5.7 CM³</td><td className="px-4 py-3 text-slate-700">8.55</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">DP10C4.20X026</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">4.2 CM³</td><td className="px-4 py-3 text-slate-700">6,3</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* İkinci Tablo: 0.5P A/C DR (MİNİ GÜÇ ÜNİTESİ POMPALARI) */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">0.5P A/C DR (MİNİ GÜÇ ÜNİTESİ POMPALARI)</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çalışma Basıncı</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Litre</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Maks. Hız</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A1.8X302</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">1,8 CM³</td><td className="px-4 py-3 text-slate-700">2,7</td><td className="px-4 py-3 text-slate-700">6000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A1.25X30</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">1,25 CM³</td><td className="px-4 py-3 text-slate-700">1,87</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A2.1X302</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">2,1 CM³</td><td className="px-4 py-3 text-slate-700">3,15</td><td className="px-4 py-3 text-slate-700">6000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A2.7X302</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">2,7 CM³</td><td className="px-4 py-3 text-slate-700">4,00</td><td className="px-4 py-3 text-slate-700">6000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A2.1X001-S</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">2,1 CM³</td><td className="px-4 py-3 text-slate-700">3,75</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A2.5X001</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">2,5 CM³</td><td className="px-4 py-3 text-slate-700">3,75</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A2.5X027</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">2,5 CM³</td><td className="px-4 py-3 text-slate-700">3,75</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A3.15X00</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">3,15 CM³</td><td className="px-4 py-3 text-slate-700">4,72</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A3.15X02</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">3,15 CM³</td><td className="px-4 py-3 text-slate-700">4,72</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A3.15X30</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">3,15 CM³</td><td className="px-4 py-3 text-slate-700">4,8</td><td className="px-4 py-3 text-slate-700">5000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A3.65X001-S</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">3,15 CM³</td><td className="px-4 py-3 text-slate-700">4,72</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A4.2X027</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">4,20 CM³</td><td className="px-4 py-3 text-slate-700">6,30</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A4.2X302-SC</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">4,2 CM³</td><td className="px-4 py-3 text-slate-700">6,3</td><td className="px-4 py-3 text-slate-700">4000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43083</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">5,8 CM³</td><td className="px-4 py-3 text-slate-700">8,7</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A5X027 7</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">5,0 CM³</td><td className="px-4 py-3 text-slate-700">7,50</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A5X302-H</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">5,0 CM³</td><td className="px-4 py-3 text-slate-700">7,50</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A6.1X302</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">6,1 CM³</td><td className="px-4 py-3 text-slate-700">9,15</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10A9X302-H</td><td className="px-4 py-3 text-slate-700">130</td><td className="px-4 py-3 text-slate-700">9,0 CM³</td><td className="px-4 py-3 text-slate-700">13,5</td><td className="px-4 py-3 text-slate-700">1800</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C0.8X302-H</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">8,0 CM³</td><td className="px-4 py-3 text-slate-700">12,0</td><td className="px-4 py-3 text-slate-700">2100</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C1.1X302</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">1,1 CM³</td><td className="px-4 py-3 text-slate-700">1,6</td><td className="px-4 py-3 text-slate-700">6000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C1.3X302-H</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">1,3 CM³</td><td className="px-4 py-3 text-slate-700">1,95</td><td className="px-4 py-3 text-slate-700">6000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C1.8X302</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">1,8 CM³</td><td className="px-4 py-3 text-slate-700">2,7</td><td className="px-4 py-3 text-slate-700">6000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C2X001</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">2,0 CM³</td><td className="px-4 py-3 text-slate-700">3,0</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C2.1X302</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">2,1 CM³</td><td className="px-4 py-3 text-slate-700">3,15</td><td className="px-4 py-3 text-slate-700">6000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">153 1C12689</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C2.7X302</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">2,7 CM³</td><td className="px-4 py-3 text-slate-700">4,00</td><td className="px-4 py-3 text-slate-700">6000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C3.2X302</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">3,2 CM³</td><td className="px-4 py-3 text-slate-700">4,8</td><td className="px-4 py-3 text-slate-700">5000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C3.7X302</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">3,7 CM³</td><td className="px-4 py-3 text-slate-700">5,5</td><td className="px-4 py-3 text-slate-700">4500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C4.8X302</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">4,8 CM³</td><td className="px-4 py-3 text-slate-700">7,2</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C4.2X302</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">4,2 CM³</td><td className="px-4 py-3 text-slate-700">6,3</td><td className="px-4 py-3 text-slate-700">4000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C5.8X302</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">5,8 CM³</td><td className="px-4 py-3 text-slate-700">8,7</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C7X302-H</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">7,00 CM³</td><td className="px-4 py-3 text-slate-700">10,5</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C8X302-H</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">8,00 CM³</td><td className="px-4 py-3 text-slate-700">12,00</td><td className="px-4 py-3 text-slate-700">2100</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">10C9X302-H</td><td className="px-4 py-3 text-slate-700">130</td><td className="px-4 py-3 text-slate-700">9,00 CM³</td><td className="px-4 py-3 text-slate-700">13,5</td><td className="px-4 py-3 text-slate-700">1800</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '10.GRUP POMPALAR (0.5P SERİSİ)' && selectedGroupBrand === 'hema' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>HEMA</strong>
                                </p>
                                <p>
                                  <strong>Alüminyum Dişli Pompalar</strong>
                                </p>
                                <p>
                                  Yüksek çalışma basınçlarında üstün performans, yüksek verimlilik ve düşük gürültü ile çalışırlar.
                                </p>
                                <p>
                                  On iki farklı tipte alüminyum gövdeli dişli pompa 1.1 cm³/dev'den 116.7 cm³/dev'e kadar olan iletim hacimlerinde üretilebilmektedir.
                                </p>
                                <p>
                                  Alüminyum gövdeli dişli motorlar ise üç tip seri adı altında 6.1 cm³/dev'den 73 cm³/dev'e kadar olan iletim hacimlerinde üretilmektedir.
                                  Özel uygulama ihtiyaçları için geniş standart opsiyonları mevcuttur.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Teknik Özellikleri</h3>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-start">
                                    <span className="font-semibold text-slate-900 mr-2">250 bar'a kadar sürekli basınç:</span>
                                    <span>Yüksek mukavemetli malzemeler ve yüksek basınç şartlarında düşük yatak yükü sağlayan büyük kaymalı yatak çapları.</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="font-semibold text-slate-900 mr-2">Sessiz:</span>
                                    <span>1PN: 12 diş dişli profili. 1PH ve 1.5PH: 18 diş helisel dişli profilleri ile basınç dalgalanmaları azaltılarak akış en uygun hale getirilmiş ve son derece sessiz bir çalışma sağlanmıştır. 1PS: 12 diş, diş yan boşluğu sıfır olacak şekilde taşlanmış dişli profilleri ile basınç dalgalanması azaltılarak akış en uygun bir hale getirilerek, çok sessiz bir çalışma sağlanmıştır.</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="font-semibold text-slate-900 mr-2">Yüksek verimlilik:</span>
                                    <span>Burçlardaki basınç dengelenmesi ile bütün çalışma koşullarında maksimum verim sağlanmıştır.</span>
                                  </li>
                                  <li className="flex items-start">
                                    <span className="font-semibold text-slate-900 mr-2">Uygulama esnekliği:</span>
                                    <span>Uluslararası standartlara uygun kapak, bağlantı tipleri ve entegre valf uygulamaları ile benzersiz dizayn ve uygulama çeşitliliği sağlanır.</span>
                                  </li>
                                </ul>
                              </div>

                              {/* Tablo: 0.5P A/C B (STANDART POMPALAR) */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">0.5P A/C B (STANDART POMPALAR)</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ÇALIŞMA BASINCI</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ÇIKIŞ PORTU</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">DÖNÜŞ YÖNÜ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">GİRİŞ PORTU</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KAPAK</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ŞAFT TİPİ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P008AB1/H101</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">1,10 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P008CB1/H102</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">1,10 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P011AB1/H103</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">1,10 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P011CB1/H104</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">1,10 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P011CB3/H304</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">1,10 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P013AB1/H105</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">1,30 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P013CB1/H106</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">1,30 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">05P013CB3/H306</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">1,30 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P016AB3/H307</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">1,60 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P016CB1/H108</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">1,60 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">05P016CB3H308</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">1,60 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P018AB1/H109</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">4,8 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P018CB1/H110</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">4,8 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P021AB1/H111</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">2,1 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P021CB1/H112</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">2,1 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P021CB3/H312</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">2,1 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P027AB1/H113</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">2,7 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P027AB2/H213</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">2,70 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P027CB1/H114</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">2,70 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P027CB3/H314</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">2,70 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">05P030AB2/H115</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">3,0 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P030CB1/H115</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">3,0 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P032AB1/H115</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">3,20 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P032CB1/H116</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">3,20 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P032CB3/H316</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">3,20 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P037AB1/H117</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">3,7 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P037CB1/H118</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">3,7 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P037CB3/H318</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">3,7 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P042AB1/H119</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">4,20 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">05P042AB3/H319</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">4,2 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P042CB1/H120</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">4,20 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P042CB3/H320</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">4,2 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P048AB1/H121</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">4,8 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P048CB1/H122</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">4,8 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P048CB3/H322</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">4,8 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P058AB1/H123</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">5,80 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P058CB1/H124</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">5,80 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P058CB3/H324</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">5,80 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P070AB1/H125</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">7,00 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P070CB1/H126</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">7,00 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P080AB1/H127</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">8,00 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P080CB1/H128</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">8,00 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P080CB3/H328</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">8,0 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">1/8</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Tablo: 0.5P A/C DR (MİNİ GÜÇ ÜNİTESİ POMPALARI) */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">0.5P A/C DR (MİNİ GÜÇ ÜNİTESİ POMPALARI)</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">DÖNÜŞ YÖNÜ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">GİRİŞ PORTU</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KAPAK</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ŞAFT TİPİ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P008CDR6/H602</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">1,10 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P011ADR6/H603</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">1,10 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P011CDR6/H604</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">1,10 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P013ADR6/H605</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">1,30 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P013CDR6/H606</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">1,30 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P016ADR6/H607</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">1,60 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P016CDR6/H608</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">1,60 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P018ADR6/H609</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">1,60 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P018CDR6/H610</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">1,60 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P021ADR6/H611</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">2,10 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P021CDR6/H612</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">2,10 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P027ADR6/H613</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">2,70 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P027CDR6/H614</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">2,70 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P032ADR6/H615</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">3,20 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P032CDR6/H616</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">3,20 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P037ADR6/H617</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">3,70 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P037CDR6/H618</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">3,70 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P042ADR6/H619</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">3,20 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P042CDR6/H620</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">4,20 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P048ADR6/H621</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">4,8 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P048CDR6/H622</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">4,8 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P058ADR6/H623</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">5,8 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P058CDR6/H624</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">5,8 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">KESİK ŞAFT - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P070ADR6/H625</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">7 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">DRİVE DOG - R</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">0.5P080ADR6/H627</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3/8</td><td className="px-4 py-3 text-slate-700">8 CM³</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">DRİVE DOG - R</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '20.GRUP POMPALAR (1P SERİSİ)' && selectedGroupBrand === 'asc' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>ASC</strong>
                                </p>
                                <p>
                                  1P Serisi Hidrolik Pompalar: Alüminyum Gövdeli Dişli Pompalarla Yenilikçi Çözümler
                                </p>
                                <p>
                                  Hidrolik pompalar, endüstriyel sektörde önemli bir yer tutan, enerji dönüşümü ve güç sağlama konusunda kritik bir rol oynayan ekipmanlardır. 1P Serisi Hidrolik Pompalar, özellikle alüminyum gövdeli dişli pompa teknolojisiyle dikkat çeker.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Alüminyum Gövdeli Dişli Pompaların Özellikleri</h3>
                                <p>
                                  1P Serisi, dayanıklı alüminyum gövdeli dişli pompalarla tasarlanmıştır. Bu teknoloji, hafiflik ve dayanıklılığı bir araya getirerek uzun ömürlü ve güvenilir performans sunar. Yüksek basınç ve akış oranlarıyla istikrarlı çalışma sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Geniş Uygulama Alanları</h3>
                                <p>
                                  Bu pompalar, endüstriyel makinelerden tarım ekipmanlarına kadar çeşitli sektörlerde kullanılabilir. Esnek montaj seçenekleri ve farklı kapasite seçenekleri, çeşitli ihtiyaçları karşılayacak şekilde tasarlanmıştır.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Fiyat Dengesi</h3>
                                <p>
                                  1P Serisi, yüksek performansı rekabetçi fiyatlarla birleştirir. Bu, kullanıcılar için etkili bir performans/fiyat oranı sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompalar, geniş bir çeşitliliğe sahiptir ve her biri farklı özelliklere sahiptir. Alüminyum gövdeli dişli pompalar, endüstriyel kullanım için ideal olan hafif ve dayanıklı yapılarıyla dikkat çeker.
                                </p>
                                <p>
                                  Her işletmenin ihtiyaçları farklı olduğundan, hangi hidrolik pompanın uygun olduğunu belirlerken uzman tavsiyesi almak önemlidir.
                                </p>
                              </div>

                              {/* İlk Tablo: 20.GRUP MUHTELİF POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">20.GRUP MUHTELİF POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (Bar)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Maks. Hız</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Min. Hız</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">20A22X205</td>
                                          <td className="px-4 py-3 text-slate-700">210</td>
                                          <td className="px-4 py-3 text-slate-700">21,9 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">2500</td>
                                          <td className="px-4 py-3 text-slate-700">600</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* İkinci Tablo: 20.GRUP ÖN YATAKLI POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">20.GRUP ÖN YATAKLI POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çalışma Basıncı</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Litre</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Maks. Hız</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A16X155</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">16,00 CM³</td><td className="px-4 py-3 text-slate-700">24</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A25X155</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">25,00 CM³</td><td className="px-4 py-3 text-slate-700">37.5</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C12X155</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">12,00 CM³</td><td className="px-4 py-3 text-slate-700">18</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C15X155</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">15,00 CM³</td><td className="px-4 py-3 text-slate-700">22.5</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C16X155</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">16,00 CM³</td><td className="px-4 py-3 text-slate-700">24</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">DP20C19X155</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">19,00 CM³</td><td className="px-4 py-3 text-slate-700">28.5</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C22X155</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">22,00 CM³</td><td className="px-4 py-3 text-slate-700">33</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C4.5X155</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">4,5 CM³</td><td className="px-4 py-3 text-slate-700">6,75</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Üçüncü Tablo: 1PA A/C 175 BARLIK POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">1PA A/C 175 BARLIK POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çalışma Basıncı</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Litre</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Maks. Hız</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A10X</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">4,5 CM³</td><td className="px-4 py-3 text-slate-700">6.75</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A14X</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">6,3 CM³</td><td className="px-4 py-3 text-slate-700">9.45</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A18X</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">8,2 CM³</td><td className="px-4 py-3 text-slate-700">12.3</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A25X</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">11,3 CM³</td><td className="px-4 py-3 text-slate-700">16.9</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A33X</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">15,0 CM³</td><td className="px-4 py-3 text-slate-700">22,5</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A42XSSN DI</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">19,0 CM³</td><td className="px-4 py-3 text-slate-700">18,5</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C10X</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">4,5 CM³</td><td className="px-4 py-3 text-slate-700">6,75</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C14X</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">6,3 CM³</td><td className="px-4 py-3 text-slate-700">9,45</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C18X</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">8,2 CM³</td><td className="px-4 py-3 text-slate-700">12,3</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C25X</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">11,3 CM³</td><td className="px-4 py-3 text-slate-700">16,9</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C33X</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">15,0 CM³</td><td className="px-4 py-3 text-slate-700">22,5</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C42X</td><td className="px-4 py-3 text-slate-700">175</td><td className="px-4 py-3 text-slate-700">19,0 CM³</td><td className="px-4 py-3 text-slate-700">18,5</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Dördüncü Tablo: 1PN A/C B B TİPİ KAPAK 1/8 KONİK (STANDART POMPALAR) */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">1PN A/C B B TİPİ KAPAK 1/8 KONİK (STANDART POMPALAR)</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (Bar)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">CM3</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Litre</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Maks. Hız</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A10X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">10,00 CM³</td><td className="px-4 py-3 text-slate-700">15</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A11X006F-SC</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">11,00 CM³</td><td className="px-4 py-3 text-slate-700">16,5</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A12X006-H</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">12,00 CM³</td><td className="px-4 py-3 text-slate-700">18</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A14X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">14,00 CM³</td><td className="px-4 py-3 text-slate-700">21</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A15X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">15,00 CM³</td><td className="px-4 py-3 text-slate-700">22,5</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A16X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">16,00 CM³</td><td className="px-4 py-3 text-slate-700">24</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A19X006</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">19,00 CM³</td><td className="px-4 py-3 text-slate-700">28,5</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A22X006</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">22,00 CM³</td><td className="px-4 py-3 text-slate-700">33</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A25X006</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">25,00 CM³</td><td className="px-4 py-3 text-slate-700">37,5</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A28X006</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">28,00 CM³</td><td className="px-4 py-3 text-slate-700">42</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A4.5X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">4,5 CM³</td><td className="px-4 py-3 text-slate-700">6,75</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A6.3X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">6,3 CM³</td><td className="px-4 py-3 text-slate-700">9,45</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A8.2X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">8,2 CM³</td><td className="px-4 py-3 text-slate-700">12,3</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C10X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">10,00 CM³</td><td className="px-4 py-3 text-slate-700">15</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C11X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">11,00 CM³</td><td className="px-4 py-3 text-slate-700">16,5</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C12X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">12,00 CM³</td><td className="px-4 py-3 text-slate-700">18</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C14X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">14,00 CM³</td><td className="px-4 py-3 text-slate-700">21</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C15X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">15,00 CM³</td><td className="px-4 py-3 text-slate-700">22,5</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C16X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">16,00 CM³</td><td className="px-4 py-3 text-slate-700">24</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C19X006</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">19,00 CM³</td><td className="px-4 py-3 text-slate-700">28,5</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C22X006</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">22,00 CM³</td><td className="px-4 py-3 text-slate-700">33</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C25X006</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">25,00 CM³</td><td className="px-4 py-3 text-slate-700">37,5</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C28X006</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">28,00 CM³</td><td className="px-4 py-3 text-slate-700">42</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C4.5X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">45,00 CM³</td><td className="px-4 py-3 text-slate-700">6,75</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C6.3X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">63,00 CM³</td><td className="px-4 py-3 text-slate-700">9,45</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C8.2X006</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">82,00 CM³</td><td className="px-4 py-3 text-slate-700">12,3</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C8.2X104-S</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">8,20 CM³</td><td className="px-4 py-3 text-slate-700">12,3</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Beşinci Tablo: 1PN A/C GS G TİPİ KAPAK FREZELİ */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">1PN A/C GS G TİPİ KAPAK FREZELİ</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çalışma Basıncı</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Litre</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Maks. Hız</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A11X104-H</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">11,00 CM³</td><td className="px-4 py-3 text-slate-700">16,5</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A12X104</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">12,00 CM³</td><td className="px-4 py-3 text-slate-700">18,00</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A15X104</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">15,00 CM³</td><td className="px-4 py-3 text-slate-700">22,5</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A22X104</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">22,00 CM³</td><td className="px-4 py-3 text-slate-700">33,00</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20A25X104</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">25,00 CM³</td><td className="px-4 py-3 text-slate-700">37,5</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">20C22X104</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">22,00 CM³</td><td className="px-4 py-3 text-slate-700">33,00</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '20.GRUP POMPALAR (1P SERİSİ)' && selectedGroupBrand === 'casappa' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>CASAPPA</strong>
                                </p>
                                <p>
                                  1P Serisi Hidrolik Pompalar: Alüminyum Gövdeli Dişli Pompalarla Yenilikçi Çözümler
                                </p>
                                <p>
                                  Hidrolik pompalar, endüstriyel sektörde önemli bir yer tutan, enerji dönüşümü ve güç sağlama konusunda kritik bir rol oynayan ekipmanlardır. 1P Serisi Hidrolik Pompalar, özellikle alüminyum gövdeli dişli pompa teknolojisiyle dikkat çeker.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Alüminyum Gövdeli Dişli Pompaların Özellikleri</h3>
                                <p>
                                  1P Serisi, dayanıklı alüminyum gövdeli dişli pompalarla tasarlanmıştır. Bu teknoloji, hafiflik ve dayanıklılığı bir araya getirerek uzun ömürlü ve güvenilir performans sunar. Yüksek basınç ve akış oranlarıyla istikrarlı çalışma sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Geniş Uygulama Alanları</h3>
                                <p>
                                  Bu pompalar, endüstriyel makinelerden tarım ekipmanlarına kadar çeşitli sektörlerde kullanılabilir. Esnek montaj seçenekleri ve farklı kapasite seçenekleri, çeşitli ihtiyaçları karşılayacak şekilde tasarlanmıştır.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Fiyat Dengesi</h3>
                                <p>
                                  1P Serisi, yüksek performansı rekabetçi fiyatlarla birleştirir. Bu, kullanıcılar için etkili bir performans/fiyat oranı sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompalar, geniş bir çeşitliliğe sahiptir ve her biri farklı özelliklere sahiptir. Alüminyum gövdeli dişli pompalar, endüstriyel kullanım için ideal olan hafif ve dayanıklı yapılarıyla dikkat çeker.
                                </p>
                                <p>
                                  Her işletmenin ihtiyaçları farklı olduğundan, hangi hidrolik pompanın uygun olduğunu belirlerken uzman tavsiyesi almak önemlidir.
                                </p>
                              </div>

                              {/* Tablo 1: 20.GRUP ÖN YATAKLI POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">20.GRUP ÖN YATAKLI POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çıkış Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Dönüş Yönü</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Giriş Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Kapak</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Şaft Tipi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çalışma Basıncı</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Maks.Hız</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Mil-Kapak Tipi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02003705</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">4,95 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">55</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43779</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">11,23 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">55</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43780</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">35 EKSEN</td><td className="px-4 py-3 text-slate-700">16,85 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">55</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02003716</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">55</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43796</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">55</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43782</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">26,42 CM³</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">170</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">55-B2</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43783</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">6,61 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">55</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Tablo 2: 1PN A/C B B TİPİ KAPAK 1/8 KONİK (STANDART POMPALAR) */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">1PN A/C B B TİPİ KAPAK 1/8 KONİK (STANDART POMPALAR)</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çıkış Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Dönüş Yönü</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Giriş Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Kapak</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Şaft Tipi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004642</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">11,23 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004643</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">11,23 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004644</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">14,53 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43160</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">14,53 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004646</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">16,85 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43203</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004648</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43205</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004650</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">26,42 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004651</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">26,42 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004652</td><td className="px-4 py-3 text-slate-700">170</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">33,03 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">GEÇC117</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">4,95 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999918</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">4,95 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004636</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">4,95 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43212</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">4,95 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004638</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">6,61 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43209</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">6,61 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004640</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">8,26 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43210</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">8,26 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43211</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">9,15 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Tablo 3: 1PN A/C BS B TİPİ KAPAK FREZELİ */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">1PN A/C BS B TİPİ KAPAK FREZELİ</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Dönüş Yönü</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Kapak</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Şaft Tipi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43902</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">12</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004783</td><td className="px-4 py-3 text-slate-700">170</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">33,03 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Tablo 4: 1PN A/C FT F TİPİ KAPAK 1/5 KONİK */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">1PN A/C FT F TİPİ KAPAK 1/5 KONİK</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çıkış Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Dönüş Yönü</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Giriş Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Kapak</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Şaft Tipi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43329</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">11,23 CM³</td><td className="px-4 py-3 text-slate-700">B5</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999925</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">11,23 CM³</td><td className="px-4 py-3 text-slate-700">B5</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999927</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">B5</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999929</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">16,85 CM³</td><td className="px-4 py-3 text-slate-700">B5</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43334</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">16,85 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999931</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">B5</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43336</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">26,42 CM³</td><td className="px-4 py-3 text-slate-700">B5</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Tablo 5: 1PN A/C GS G TİPİ KAPAK FREZELİ */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">1PN A/C GS G TİPİ KAPAK FREZELİ</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çıkış Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Dönüş Yönü</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Giriş Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Kapak</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Şaft Tipi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43526</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">11,23 CM³</td><td className="px-4 py-3 text-slate-700">S1</td><td className="px-4 py-3 text-slate-700">03</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004776</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">14,53 CM³</td><td className="px-4 py-3 text-slate-700">S1</td><td className="px-4 py-3 text-slate-700">03</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43523</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">16,85 CM³</td><td className="px-4 py-3 text-slate-700">S5</td><td className="px-4 py-3 text-slate-700">04</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43528</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">16,85 CM³</td><td className="px-4 py-3 text-slate-700">S1</td><td className="px-4 py-3 text-slate-700">03</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004777</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">16,85 CM³</td><td className="px-4 py-3 text-slate-700">S1</td><td className="px-4 py-3 text-slate-700">03</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004779</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">S1</td><td className="px-4 py-3 text-slate-700">03</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43524</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">S5</td><td className="px-4 py-3 text-slate-700">04</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004780</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">S1</td><td className="px-4 py-3 text-slate-700">03</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004781</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">26,42 CM³</td><td className="px-4 py-3 text-slate-700">S1</td><td className="px-4 py-3 text-slate-700">03</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43525</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">26,42 CM³</td><td className="px-4 py-3 text-slate-700">S5</td><td className="px-4 py-3 text-slate-700">04</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004782</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">26,42 CM³</td><td className="px-4 py-3 text-slate-700">S1</td><td className="px-4 py-3 text-slate-700">03</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43520</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">26,42 CM³</td><td className="px-4 py-3 text-slate-700">S1</td><td className="px-4 py-3 text-slate-700">04</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C0199854C</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">16,85 CM³</td><td className="px-4 py-3 text-slate-700">S1</td><td className="px-4 py-3 text-slate-700">03</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C02004769</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">6,61 CM³</td><td className="px-4 py-3 text-slate-700">S1</td><td className="px-4 py-3 text-slate-700">03</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43522</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">6,61 CM³</td><td className="px-4 py-3 text-slate-700">S5</td><td className="px-4 py-3 text-slate-700">04</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43531</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">8,26 CM³</td><td className="px-4 py-3 text-slate-700">S1</td><td className="px-4 py-3 text-slate-700">03</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Tablo 6: 1PN A/C JT J TİPİ KAPAK 1/5 KONİK */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">1PN A/C JT J TİPİ KAPAK 1/5 KONİK</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çıkış Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Dönüş Yönü</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Giriş Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Kapak</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Şaft Tipi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43588</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">4,95 CM³</td><td className="px-4 py-3 text-slate-700">B4</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43585</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">11,23 CM³</td><td className="px-4 py-3 text-slate-700">B4</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999908</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">14,53 CM³</td><td className="px-4 py-3 text-slate-700">B4</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999910</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">16,85 CM³</td><td className="px-4 py-3 text-slate-700">B4</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999912</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">B4</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999930</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">B4</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Tablo 7: 1PN A/C SS S TİPİ KAPAK FREZELİ */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">1PN A/C SS S TİPİ KAPAK FREZELİ</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çıkış Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Dönüş Yönü</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Giriş Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Kapak</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Şaft Tipi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999865</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">11,23 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">12</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43693</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">14,53 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">12</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999869</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">16,85 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">12</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43695</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">12</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999871</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">12</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43696</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">26,42 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">12</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43706</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">4,95 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">12</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Tablo 8: 1PN A/C ST S TİPİ KAPAK 1/5 KONİK */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">1PN A/C ST S TİPİ KAPAK 1/5 KONİK</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çıkış Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Dönüş Yönü</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Giriş Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Kapak</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Şaft Tipi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43626</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">35 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">35 EKSEN</td><td className="px-4 py-3 text-slate-700">11,23 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43627</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">35 EKSEN</td><td className="px-4 py-3 text-slate-700">14,53 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43625</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">35 EKSEN</td><td className="px-4 py-3 text-slate-700">14,53 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999969</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">35 EKSEN</td><td className="px-4 py-3 text-slate-700">16,85 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999966</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">35 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43675</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">35 EKSEN</td><td className="px-4 py-3 text-slate-700">21,14 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43676</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">35 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">35 EKSEN</td><td className="px-4 py-3 text-slate-700">6,61 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01999952</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">35 EKSEN</td><td className="px-4 py-3 text-slate-700">8,26 CM³</td><td className="px-4 py-3 text-slate-700">B2</td><td className="px-4 py-3 text-slate-700">54</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '30.GRUP POMPALAR (2P SERİSİ)' && selectedGroupBrand === 'vivolo' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>VIVOLO</strong>
                                </p>
                                <p>
                                  2P Serisi Hidrolik Pompalar: Alüminyum Gövdeli Dişli Pompalarla Güç ve Dayanıklılık
                                </p>
                                <p>
                                  Hidrolik pompalar, endüstriyel sektördeki temel ekipmanlardan biridir ve mekanik enerjiyi hidrolik enerjiye dönüştürerek birçok endüstriyel uygulamada kullanılır. 2P Serisi Hidrolik Pompalar, alüminyum gövdeli dişli pompa teknolojisiyle ön plana çıkıyor ve çeşitli işletme ihtiyaçlarına cevap veriyor.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Alüminyum Gövdeli Dişli Pompaların Özellikleri</h3>
                                <p>
                                  Bu seri, alüminyum gövdeli dişli pompalarla donatılmıştır. Bu teknoloji, dayanıklılığı ve hafifliği bir araya getirerek uzun ömürlü ve güvenilir performans sunar. Yüksek basınç ve akış oranlarıyla istikrarlı bir çalışma sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Uygulama Çeşitliliği</h3>
                                <p>
                                  2P Serisi, geniş bir endüstriyel yelpazede kullanım için tasarlanmıştır. Esnek montaj seçenekleri ve farklı kapasiteler, farklı işletme gereksinimlerini karşılayacak şekilde özelleştirilebilir.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Fiyat Dengesi</h3>
                                <p>
                                  Yüksek performansı uygun fiyatlarla birleştiren 2P Serisi, işletmeler için etkili bir performans/fiyat oranı sunar. Bu da işletme maliyetlerini minimize ederken kaliteli bir çözüm sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompaların geniş bir çeşitliliği vardır ve her biri farklı gereksinimlere yanıt verecek şekilde tasarlanmıştır. Alüminyum gövdeli dişli pompalar, dayanıklı ve hafif yapılarıyla endüstriyel kullanım için idealdir.
                                </p>
                                <p>
                                  Her işletmenin farklı gereksinimleri olduğundan, hangi hidrolik pompaların en uygun olduğunu belirlemek için uzman tavsiyesi almak önemlidir.
                                </p>
                              </div>

                              {/* Tablo: 2P1 B TİPİ KAPAK KONİK MİLLİ STANDART POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">2P1 B TİPİ KAPAK KONİK MİLLİ STANDART POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çalışma Basıncı (BAR) P1</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çalışma Basıncı (BAR) P3</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44047</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">60,81 CM³</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44048</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">43,44 CM³</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44049</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">60,81 CM³</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '30.GRUP POMPALAR (2P SERİSİ)' && selectedGroupBrand === 'salami' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>SALAMI</strong>
                                </p>
                                <p>
                                  2P Serisi Hidrolik Pompalar: Alüminyum Gövdeli Dişli Pompalarla Güç ve Dayanıklılık
                                </p>
                                <p>
                                  Hidrolik pompalar, endüstriyel sektördeki temel ekipmanlardan biridir ve mekanik enerjiyi hidrolik enerjiye dönüştürerek birçok endüstriyel uygulamada kullanılır. 2P Serisi Hidrolik Pompalar, alüminyum gövdeli dişli pompa teknolojisiyle ön plana çıkıyor ve çeşitli işletme ihtiyaçlarına cevap veriyor.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Alüminyum Gövdeli Dişli Pompaların Özellikleri</h3>
                                <p>
                                  Bu seri, alüminyum gövdeli dişli pompalarla donatılmıştır. Bu teknoloji, dayanıklılığı ve hafifliği bir araya getirerek uzun ömürlü ve güvenilir performans sunar. Yüksek basınç ve akış oranlarıyla istikrarlı bir çalışma sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Uygulama Çeşitliliği</h3>
                                <p>
                                  2P Serisi, geniş bir endüstriyel yelpazede kullanım için tasarlanmıştır. Esnek montaj seçenekleri ve farklı kapasiteler, farklı işletme gereksinimlerini karşılayacak şekilde özelleştirilebilir.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Fiyat Dengesi</h3>
                                <p>
                                  Yüksek performansı uygun fiyatlarla birleştiren 2P Serisi, işletmeler için etkili bir performans/fiyat oranı sunar. Bu da işletme maliyetlerini minimize ederken kaliteli bir çözüm sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompaların geniş bir çeşitliliği vardır ve her biri farklı gereksinimlere yanıt verecek şekilde tasarlanmıştır. Alüminyum gövdeli dişli pompalar, dayanıklı ve hafif yapılarıyla endüstriyel kullanım için idealdir.
                                </p>
                                <p>
                                  Her işletmenin farklı gereksinimleri olduğundan, hangi hidrolik pompaların en uygun olduğunu belirlemek için uzman tavsiyesi almak önemlidir.
                                </p>
                              </div>

                              {/* Tablo: 30.GRUP MUHTELİF POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">30.GRUP MUHTELİF POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Debi (LT/DAK.)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Max. Dönüş</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44242</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">27 CM³</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '30.GRUP POMPALAR (2P SERİSİ)' && selectedGroupBrand === 'asc' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>ASC</strong>
                                </p>
                                <p>
                                  2P Serisi Hidrolik Pompalar: Alüminyum Gövdeli Dişli Pompalarla Güç ve Dayanıklılık
                                </p>
                                <p>
                                  Hidrolik pompalar, endüstriyel sektördeki temel ekipmanlardan biridir ve mekanik enerjiyi hidrolik enerjiye dönüştürerek birçok endüstriyel uygulamada kullanılır. 2P Serisi Hidrolik Pompalar, alüminyum gövdeli dişli pompa teknolojisiyle ön plana çıkıyor ve çeşitli işletme ihtiyaçlarına cevap veriyor.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Alüminyum Gövdeli Dişli Pompaların Özellikleri</h3>
                                <p>
                                  Bu seri, alüminyum gövdeli dişli pompalarla donatılmıştır. Bu teknoloji, dayanıklılığı ve hafifliği bir araya getirerek uzun ömürlü ve güvenilir performans sunar. Yüksek basınç ve akış oranlarıyla istikrarlı bir çalışma sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Uygulama Çeşitliliği</h3>
                                <p>
                                  2P Serisi, geniş bir endüstriyel yelpazede kullanım için tasarlanmıştır. Esnek montaj seçenekleri ve farklı kapasiteler, farklı işletme gereksinimlerini karşılayacak şekilde özelleştirilebilir.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Fiyat Dengesi</h3>
                                <p>
                                  Yüksek performansı uygun fiyatlarla birleştiren 2P Serisi, işletmeler için etkili bir performans/fiyat oranı sunar. Bu da işletme maliyetlerini minimize ederken kaliteli bir çözüm sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompaların geniş bir çeşitliliği vardır ve her biri farklı gereksinimlere yanıt verecek şekilde tasarlanmıştır. Alüminyum gövdeli dişli pompalar, dayanıklı ve hafif yapılarıyla endüstriyel kullanım için idealdir.
                                </p>
                                <p>
                                  Her işletmenin farklı gereksinimleri olduğundan, hangi hidrolik pompaların en uygun olduğunu belirlemek için uzman tavsiyesi almak önemlidir.
                                </p>
                              </div>

                              {/* İlk Tablo: 30.GRUP MUHTELİF POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">30.GRUP MUHTELİF POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">CM3</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">40C46X371</td>
                                          <td className="px-4 py-3 text-slate-700">46</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">40C55X371</td>
                                          <td className="px-4 py-3 text-slate-700">55</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* İkinci Tablo: 2P1 B TİPİ KAPAK KONİK MİLLİ STANDART POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">2P1 B TİPİ KAPAK KONİK MİLLİ STANDART POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çalışma Basıncı</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Litre</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Maks. Hız</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A20X146</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">20,00 CM³</td><td className="px-4 py-3 text-slate-700">30</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A22.5X14</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">22,5 CM³</td><td className="px-4 py-3 text-slate-700">33.7</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A25X146</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">25,00 CM³</td><td className="px-4 py-3 text-slate-700">37.5</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A28X146</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">28,00 CM³</td><td className="px-4 py-3 text-slate-700">42</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A32X146</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">32,00 CM³</td><td className="px-4 py-3 text-slate-700">48</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A36X146</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">36,00 CM³</td><td className="px-4 py-3 text-slate-700">54</td><td className="px-4 py-3 text-slate-700">2300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A42X146</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">42,00 CM³</td><td className="px-4 py-3 text-slate-700">63</td><td className="px-4 py-3 text-slate-700">2300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A46X146</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">46,00 CM³</td><td className="px-4 py-3 text-slate-700">69</td><td className="px-4 py-3 text-slate-700">2100</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A50X146</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">50,00 CM³</td><td className="px-4 py-3 text-slate-700">75</td><td className="px-4 py-3 text-slate-700">2100</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A55X146</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">55,00 CM³</td><td className="px-4 py-3 text-slate-700">82.5</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A60X146-H</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">60,00 CM³</td><td className="px-4 py-3 text-slate-700">90</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C22.5X14</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">22,5 CM³</td><td className="px-4 py-3 text-slate-700">33.7</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C25X146</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">25,00 CM³</td><td className="px-4 py-3 text-slate-700">37.5</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C28X146</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">28,00 CM³</td><td className="px-4 py-3 text-slate-700">42</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C32X146</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">32,00 CM³</td><td className="px-4 py-3 text-slate-700">48</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C36X146</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">36,00 CM³</td><td className="px-4 py-3 text-slate-700">54</td><td className="px-4 py-3 text-slate-700">2300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C42X146</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">42,00 CM³</td><td className="px-4 py-3 text-slate-700">63</td><td className="px-4 py-3 text-slate-700">2300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C46X146</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">46,00 CM³</td><td className="px-4 py-3 text-slate-700">69</td><td className="px-4 py-3 text-slate-700">2100</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C50X146</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">50,00 CM³</td><td className="px-4 py-3 text-slate-700">75</td><td className="px-4 py-3 text-slate-700">2100</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C55X146</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">55,00 CM³</td><td className="px-4 py-3 text-slate-700">82.5</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C60X146</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">60,00 CM³</td><td className="px-4 py-3 text-slate-700">90</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C60X198</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">60,00 CM³</td><td className="px-4 py-3 text-slate-700">90</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A43X</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">20,00 CM³</td><td className="px-4 py-3 text-slate-700">30</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A54X</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">25,00 CM³</td><td className="px-4 py-3 text-slate-700">37.5</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A72X</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">32,7 CM³</td><td className="px-4 py-3 text-slate-700">49</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">A94X</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">42,7 CM³</td><td className="px-4 py-3 text-slate-700">64</td><td className="px-4 py-3 text-slate-700">1500</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Üçüncü Tablo: 2P1 B TİPİ KAPAK DÜZ MİLLİ POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">2P1 B TİPİ KAPAK DÜZ MİLLİ POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çalışma Basıncı</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Litre</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Maks. Hız</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A32X353</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">32 CM³</td><td className="px-4 py-3 text-slate-700">48</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A50X353</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">50 CM³</td><td className="px-4 py-3 text-slate-700">75</td><td className="px-4 py-3 text-slate-700">2100</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A55X353</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">55 CM³</td><td className="px-4 py-3 text-slate-700">82.5</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C42X353</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">42 CM³</td><td className="px-4 py-3 text-slate-700">63</td><td className="px-4 py-3 text-slate-700">2300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C46X353</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">46 CM³</td><td className="px-4 py-3 text-slate-700">69</td><td className="px-4 py-3 text-slate-700">2100</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C50X353</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">50 CM³</td><td className="px-4 py-3 text-slate-700">75</td><td className="px-4 py-3 text-slate-700">2100</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Dördüncü Tablo: 2P1 G TİPİ KAPAK FREZELİ POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">2P1 G TİPİ KAPAK FREZELİ POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çalışma Basıncı</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Litre</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Maks. Hız</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A36X236</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">36,00 CM³</td><td className="px-4 py-3 text-slate-700">54</td><td className="px-4 py-3 text-slate-700">2300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A42X236</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">42,00 CM³</td><td className="px-4 py-3 text-slate-700">63</td><td className="px-4 py-3 text-slate-700">2300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A46X236</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">46,00 CM³</td><td className="px-4 py-3 text-slate-700">69</td><td className="px-4 py-3 text-slate-700">2100</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A50X236</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">50,00 CM³</td><td className="px-4 py-3 text-slate-700">75</td><td className="px-4 py-3 text-slate-700">2100</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A55X236</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">55,00 CM³</td><td className="px-4 py-3 text-slate-700">82.5</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30A60X236</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">60,00 CM³</td><td className="px-4 py-3 text-slate-700">90</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C22X236</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">22,5 CM³</td><td className="px-4 py-3 text-slate-700">33,7</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C25X236</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">25,00 CM³</td><td className="px-4 py-3 text-slate-700">37,5</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C32X236</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">32,00 CM³</td><td className="px-4 py-3 text-slate-700">48</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C36X236</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">36,00 CM³</td><td className="px-4 py-3 text-slate-700">54</td><td className="px-4 py-3 text-slate-700">2300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C42X236</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">42,00 CM³</td><td className="px-4 py-3 text-slate-700">63</td><td className="px-4 py-3 text-slate-700">2300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">30C50X236</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">50,00 CM³</td><td className="px-4 py-3 text-slate-700">75</td><td className="px-4 py-3 text-slate-700">2100</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '20.GRUP POMPALAR (1P SERİSİ)' && selectedGroupBrand === 'galtech' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>GALTEC</strong>
                                </p>
                                <p>
                                  1P Serisi Hidrolik Pompalar: Alüminyum Gövdeli Dişli Pompalarla Yenilikçi Çözümler
                                </p>
                                <p>
                                  Hidrolik pompalar, endüstriyel sektörde önemli bir yer tutan, enerji dönüşümü ve güç sağlama konusunda kritik bir rol oynayan ekipmanlardır. 1P Serisi Hidrolik Pompalar, özellikle alüminyum gövdeli dişli pompa teknolojisiyle dikkat çeker.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Alüminyum Gövdeli Dişli Pompaların Özellikleri</h3>
                                <p>
                                  1P Serisi, dayanıklı alüminyum gövdeli dişli pompalarla tasarlanmıştır. Bu teknoloji, hafiflik ve dayanıklılığı bir araya getirerek uzun ömürlü ve güvenilir performans sunar. Yüksek basınç ve akış oranlarıyla istikrarlı çalışma sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Geniş Uygulama Alanları</h3>
                                <p>
                                  Bu pompalar, endüstriyel makinelerden tarım ekipmanlarına kadar çeşitli sektörlerde kullanılabilir. Esnek montaj seçenekleri ve farklı kapasite seçenekleri, çeşitli ihtiyaçları karşılayacak şekilde tasarlanmıştır.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Fiyat Dengesi</h3>
                                <p>
                                  1P Serisi, yüksek performansı rekabetçi fiyatlarla birleştirir. Bu, kullanıcılar için etkili bir performans/fiyat oranı sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompalar, geniş bir çeşitliliğe sahiptir ve her biri farklı özelliklere sahiptir. Alüminyum gövdeli dişli pompalar, endüstriyel kullanım için ideal olan hafif ve dayanıklı yapılarıyla dikkat çeker.
                                </p>
                                <p>
                                  Her işletmenin ihtiyaçları farklı olduğundan, hangi hidrolik pompanın uygun olduğunu belirlerken uzman tavsiyesi almak önemlidir.
                                </p>
                              </div>

                              {/* Tablo: 1PN A/C B B TİPİ KAPAK 1/8 KONİK (STANDART POMPALAR) */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">1PN A/C B B TİPİ KAPAK 1/8 KONİK (STANDART POMPALAR)</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">HACİM</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">LİTRE</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MİN. HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MİN. LİTRE</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43149</td><td className="px-4 py-3 text-slate-700">95</td><td className="px-4 py-3 text-slate-700">11,00 CM³</td><td className="px-4 py-3 text-slate-700">38,5</td><td className="px-4 py-3 text-slate-700">3500</td><td className="px-4 py-3 text-slate-700">500</td><td className="px-4 py-3 text-slate-700">5,22</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43150</td><td className="px-4 py-3 text-slate-700">95</td><td className="px-4 py-3 text-slate-700">14,00 CM³</td><td className="px-4 py-3 text-slate-700">49</td><td className="px-4 py-3 text-slate-700">3500</td><td className="px-4 py-3 text-slate-700">500</td><td className="px-4 py-3 text-slate-700">6,65</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43151</td><td className="px-4 py-3 text-slate-700">95</td><td className="px-4 py-3 text-slate-700">16,5 CM³</td><td className="px-4 py-3 text-slate-700">57,7</td><td className="px-4 py-3 text-slate-700">3500</td><td className="px-4 py-3 text-slate-700">500</td><td className="px-4 py-3 text-slate-700">7,83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43152</td><td className="px-4 py-3 text-slate-700">95</td><td className="px-4 py-3 text-slate-700">19,5 CM³</td><td className="px-4 py-3 text-slate-700">64,3</td><td className="px-4 py-3 text-slate-700">3300</td><td className="px-4 py-3 text-slate-700">500</td><td className="px-4 py-3 text-slate-700">9,26</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43153</td><td className="px-4 py-3 text-slate-700">95</td><td className="px-4 py-3 text-slate-700">22,5 CM³</td><td className="px-4 py-3 text-slate-700">63</td><td className="px-4 py-3 text-slate-700">2800</td><td className="px-4 py-3 text-slate-700">500</td><td className="px-4 py-3 text-slate-700">10,68</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43154</td><td className="px-4 py-3 text-slate-700">95</td><td className="px-4 py-3 text-slate-700">26,00 CM³</td><td className="px-4 py-3 text-slate-700">65</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">500</td><td className="px-4 py-3 text-slate-700">12,35</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43155</td><td className="px-4 py-3 text-slate-700">95</td><td className="px-4 py-3 text-slate-700">4,00 CM³</td><td className="px-4 py-3 text-slate-700">16</td><td className="px-4 py-3 text-slate-700">4000</td><td className="px-4 py-3 text-slate-700">500</td><td className="px-4 py-3 text-slate-700">1,9</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43156</td><td className="px-4 py-3 text-slate-700">95</td><td className="px-4 py-3 text-slate-700">6,00 CM³</td><td className="px-4 py-3 text-slate-700">24</td><td className="px-4 py-3 text-slate-700">4000</td><td className="px-4 py-3 text-slate-700">500</td><td className="px-4 py-3 text-slate-700">2,85</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">43148</td><td className="px-4 py-3 text-slate-700">95</td><td className="px-4 py-3 text-slate-700">8,5 CM³</td><td className="px-4 py-3 text-slate-700">29,7</td><td className="px-4 py-3 text-slate-700">3500</td><td className="px-4 py-3 text-slate-700">500</td><td className="px-4 py-3 text-slate-700">4,03</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '30.GRUP POMPALAR (2P SERİSİ)' && selectedGroupBrand === 'galtech' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>GALTEC</strong>
                                </p>
                                <p>
                                  2P Serisi Hidrolik Pompalar: Alüminyum Gövdeli Dişli Pompalarla Güç ve Dayanıklılık
                                </p>
                                <p>
                                  Hidrolik pompalar, endüstriyel sektördeki temel ekipmanlardan biridir ve mekanik enerjiyi hidrolik enerjiye dönüştürerek birçok endüstriyel uygulamada kullanılır. 2P Serisi Hidrolik Pompalar, alüminyum gövdeli dişli pompa teknolojisiyle ön plana çıkıyor ve çeşitli işletme ihtiyaçlarına cevap veriyor.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Alüminyum Gövdeli Dişli Pompaların Özellikleri</h3>
                                <p>
                                  Bu seri, alüminyum gövdeli dişli pompalarla donatılmıştır. Bu teknoloji, dayanıklılığı ve hafifliği bir araya getirerek uzun ömürlü ve güvenilir performans sunar. Yüksek basınç ve akış oranlarıyla istikrarlı bir çalışma sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Uygulama Çeşitliliği</h3>
                                <p>
                                  2P Serisi, geniş bir endüstriyel yelpazede kullanım için tasarlanmıştır. Esnek montaj seçenekleri ve farklı kapasiteler, farklı işletme gereksinimlerini karşılayacak şekilde özelleştirilebilir.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Fiyat Dengesi</h3>
                                <p>
                                  Yüksek performansı uygun fiyatlarla birleştiren 2P Serisi, işletmeler için etkili bir performans/fiyat oranı sunar. Bu da işletme maliyetlerini minimize ederken kaliteli bir çözüm sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompaların geniş bir çeşitliliği vardır ve her biri farklı gereksinimlere yanıt verecek şekilde tasarlanmıştır. Alüminyum gövdeli dişli pompalar, dayanıklı ve hafif yapılarıyla endüstriyel kullanım için idealdir.
                                </p>
                                <p>
                                  Her işletmenin farklı gereksinimleri olduğundan, hangi hidrolik pompaların en uygun olduğunu belirlemek için uzman tavsiyesi almak önemlidir.
                                </p>
                              </div>

                              {/* Tablo: 2P1 B TİPİ KAPAK KONİK MİLLİ STANDART POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">2P1 B TİPİ KAPAK KONİK MİLLİ STANDART POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ÇALIŞMA BASINCI (BAR) P1</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ÇALIŞMA BASINCI (BAR) P2</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ÇALIŞMA BASINCI (BAR) PİK</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KAPAK TİPİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAX. HIZ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44016</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">29,3 CM³</td><td className="px-4 py-3 text-slate-700">10-N</td><td className="px-4 py-3 text-slate-700">3300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44014</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">19,00 CM³</td><td className="px-4 py-3 text-slate-700">10-N</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44015</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">290</td><td className="px-4 py-3 text-slate-700">22,5 CM³</td><td className="px-4 py-3 text-slate-700">10-N</td><td className="px-4 py-3 text-slate-700">3500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44017</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">32,6 CM³</td><td className="px-4 py-3 text-slate-700">10-N</td><td className="px-4 py-3 text-slate-700">3300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44018</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">36,4 CM³</td><td className="px-4 py-3 text-slate-700">10-N</td><td className="px-4 py-3 text-slate-700">3300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44019</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">43,5 CM³</td><td className="px-4 py-3 text-slate-700">10-N</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44020</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">51,7 CM³</td><td className="px-4 py-3 text-slate-700">10-N</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '30.GRUP POMPALAR (2P SERİSİ)' && selectedGroupBrand === 'casappa' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>CASAPPA</strong>
                                </p>
                                <p>
                                  2P Serisi Hidrolik Pompalar: Alüminyum Gövdeli Dişli Pompalarla Güç ve Dayanıklılık
                                </p>
                                <p>
                                  Hidrolik pompalar, endüstriyel sektördeki temel ekipmanlardan biridir ve mekanik enerjiyi hidrolik enerjiye dönüştürerek birçok endüstriyel uygulamada kullanılır. 2P Serisi Hidrolik Pompalar, alüminyum gövdeli dişli pompa teknolojisiyle ön plana çıkıyor ve çeşitli işletme ihtiyaçlarına cevap veriyor.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Alüminyum Gövdeli Dişli Pompaların Özellikleri</h3>
                                <p>
                                  Bu seri, alüminyum gövdeli dişli pompalarla donatılmıştır. Bu teknoloji, dayanıklılığı ve hafifliği bir araya getirerek uzun ömürlü ve güvenilir performans sunar. Yüksek basınç ve akış oranlarıyla istikrarlı bir çalışma sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Uygulama Çeşitliliği</h3>
                                <p>
                                  2P Serisi, geniş bir endüstriyel yelpazede kullanım için tasarlanmıştır. Esnek montaj seçenekleri ve farklı kapasiteler, farklı işletme gereksinimlerini karşılayacak şekilde özelleştirilebilir.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Fiyat Dengesi</h3>
                                <p>
                                  Yüksek performansı uygun fiyatlarla birleştiren 2P Serisi, işletmeler için etkili bir performans/fiyat oranı sunar. Bu da işletme maliyetlerini minimize ederken kaliteli bir çözüm sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompaların geniş bir çeşitliliği vardır ve her biri farklı gereksinimlere yanıt verecek şekilde tasarlanmıştır. Alüminyum gövdeli dişli pompalar, dayanıklı ve hafif yapılarıyla endüstriyel kullanım için idealdir.
                                </p>
                                <p>
                                  Her işletmenin farklı gereksinimleri olduğundan, hangi hidrolik pompaların en uygun olduğunu belirlemek için uzman tavsiyesi almak önemlidir.
                                </p>
                              </div>

                              {/* Tablo 1: 30.GRUP MUHTELİF POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">30.GRUP MUHTELİF POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çıkış Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Dönüş Yönü</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Giriş Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Kapak</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Şaft Tipi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03591065</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">51,83 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44241</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">51,83 CM³</td><td className="px-4 py-3 text-slate-700">E4</td><td className="px-4 py-3 text-slate-700">84</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590336</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">51,83 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590022</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">61,26 CM³</td><td className="px-4 py-3 text-slate-700">E4</td><td className="px-4 py-3 text-slate-700">84</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03591073</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">61,26 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44259</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">73,82 CM³</td><td className="px-4 py-3 text-slate-700">E4</td><td className="px-4 py-3 text-slate-700">84</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44246</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">73,82 CM³</td><td className="px-4 py-3 text-slate-700">E4</td><td className="px-4 py-3 text-slate-700">84</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44244</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">81,68 CM³</td><td className="px-4 py-3 text-slate-700">E4</td><td className="px-4 py-3 text-slate-700">84</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44247</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">81,68 CM³</td><td className="px-4 py-3 text-slate-700">E4</td><td className="px-4 py-3 text-slate-700">84</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590028</td><td className="px-4 py-3 text-slate-700">170</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">91,10 CM³</td><td className="px-4 py-3 text-slate-700">E4</td><td className="px-4 py-3 text-slate-700">84</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Tablo 2: 2P1 B TİPİ KAPAK KONİK MİLLİ STANDART POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">2P1 B TİPİ KAPAK KONİK MİLLİ STANDART POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çıkış Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Dönüş Yönü</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Giriş Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Kapak</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Şaft Tipi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590325</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">21,99 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44100</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">21,99 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590327</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">26,70 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44102</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">26,70 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590329</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">34,55 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44104</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">30 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">34,55 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590331</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">39,27 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44106</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">39,27 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590333</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">43,98 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03591069</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">43,98 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590334</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">43,98 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590335</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">51,83 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44058</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">51,83 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590337</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">61,26 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44060</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590339</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">73,92 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44051</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">73,92 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Tablo 3: 2P1 G TİPİ KAPAK FREZELİ POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">2P1 G TİPİ KAPAK FREZELİ POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çıkış Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Dönüş Yönü</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Giriş Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Kapak</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Şaft Tipi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C0200548E</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">21,99 CM³</td><td className="px-4 py-3 text-slate-700">S5</td><td className="px-4 py-3 text-slate-700">04</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44162</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">21,99 CM³</td><td className="px-4 py-3 text-slate-700">S5</td><td className="px-4 py-3 text-slate-700">04</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590184</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">34,55 CM³</td><td className="px-4 py-3 text-slate-700">S5</td><td className="px-4 py-3 text-slate-700">04</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44164</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">39,27 CM³</td><td className="px-4 py-3 text-slate-700">S5</td><td className="px-4 py-3 text-slate-700">04</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44165</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">43,98 CM³</td><td className="px-4 py-3 text-slate-700">S5</td><td className="px-4 py-3 text-slate-700">04</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590190</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">51,83 CM³</td><td className="px-4 py-3 text-slate-700">S5</td><td className="px-4 py-3 text-slate-700">04</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44167</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">51,83 CM³</td><td className="px-4 py-3 text-slate-700">S5</td><td className="px-4 py-3 text-slate-700">04</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44160</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">61,26 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Tablo 4: 2P1 S TİPİ KAPAK 1/5 KONİK POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">2P1 S TİPİ KAPAK 1/5 KONİK POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Basınç (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Çıkış Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Dönüş Yönü</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Giriş Portu</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İletim Hacmi</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Kapak</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Şaft Tipi</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44190</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">43,98 CM³</td><td className="px-4 py-3 text-slate-700">B3</td><td className="px-4 py-3 text-slate-700">56</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590446</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">SO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">43,98 CM³</td><td className="px-4 py-3 text-slate-700">B3</td><td className="px-4 py-3 text-slate-700">56</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03590448</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">40 EKSEN</td><td className="px-4 py-3 text-slate-700">DO</td><td className="px-4 py-3 text-slate-700">51 EKSEN</td><td className="px-4 py-3 text-slate-700">51,83 CM³</td><td className="px-4 py-3 text-slate-700">B3</td><td className="px-4 py-3 text-slate-700">56</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '20.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR' && selectedGroupBrand === 'asc' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">20.GRUP B Tipi Kapak 1/8 Konik Milli Pompalar: Hassas ve Güvenilir Hidrolik Çözümler</h3>
                                <p>
                                  Hidrolik pompalar, endüstriyel sektörde kritik bir role sahip olup, mekanik enerjiyi hidrolik enerjiye dönüştüren önemli ekipmanlardır. 20.GRUP B Tipi Kapak 1/8 Konik Milli Pompalar, hassasiyeti ve güvenilirliğiyle öne çıkarak çeşitli işletme ihtiyaçlarına çözüm sunmaktadır.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">B Tipi Kapak 1/8 Konik Milli Pompaların Özellikleri</h4>
                                <p>
                                  Bu seri, hassas işler için tasarlanmış ve yüksek performanslı B Tipi Kapak 1/8 Konik Milli Pompalarla donatılmıştır. Hassas işlemlerde güvenilirlik ve hassasiyet sunarak, endüstriyel uygulamalarda önemli bir yer tutar.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Çeşitli Uygulama Alanları</h4>
                                <p>
                                  20.GRUP'un B Tipi Kapak 1/8 Konik Milli Pompaları, çeşitli endüstriyel sektörlerde kullanım için optimize edilmiştir. Hassas hidrolik ihtiyaçlarını karşılamak üzere tasarlanmıştır.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Güvenilirlik Dengesi</h4>
                                <p>
                                  Bu pompa serisi, yüksek performansı güvenilirlikle birleştirerek işletmelere sağlam bir çözüm sunar. Hassas işlemlerde bile istikrarlı bir performans sergiler.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h4>
                                <p>
                                  Hidrolik pompaların geniş bir yelpazesi bulunur ve her biri farklı gereksinimleri karşılamak üzere tasarlanmıştır. B Tipi Kapak 1/8 Konik Milli Pompalar, özellikle hassas işler için idealdir.
                                </p>
                                <p>
                                  Her işletmenin farklı gereksinimleri olduğundan, hangi hidrolik pompaların en uygun olduğunu belirlemek için uzman danışmanlık almak önemlidir.
                                </p>
                              </div>

                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">20.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">DÖNÜŞ YÖNÜ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETIM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KAPAK</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Min.HIZ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.040.CAB02SN</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">3,9 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">3500</td><td className="px-4 py-3 text-slate-700">650</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.060.CAB02SN</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">5,9 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">3500</td><td className="px-4 py-3 text-slate-700">650</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.080.CAB02SN</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">8,0 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">3500</td><td className="px-4 py-3 text-slate-700">650</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.095.CAB02SN</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">9,4 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">3500</td><td className="px-4 py-3 text-slate-700">600</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.115.CAB02SN</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">11,4 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">600</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.140.CAB02SN</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">13,9 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">600</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.160.CAB02SN</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">16,00 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">600</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.190.CAB02SN</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">19,2 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">600</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.220.CAB02SN</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">21,9 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">600</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.250.CAB02SN</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">24,8 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">600</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.280.AAB02SN</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">27,9 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">2200</td><td className="px-4 py-3 text-slate-700">600</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.280.CAB02SN</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">27,9 CM³</td><td className="px-4 py-3 text-slate-700">B</td><td className="px-4 py-3 text-slate-700">2200</td><td className="px-4 py-3 text-slate-700">600</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '20.GRUP G TİPİ KAPAK FREZELİ POMPALAR' && selectedGroupBrand === 'asc' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">20.GRUP G Tipi Kapak Frezeli Pompalar: Güçlü Performans ve Hassas Çalışma</h3>
                                <p>
                                  Hidrolik pompalar, endüstriyel dünyada önemli bir role sahip olan, mekanik enerjiyi hidrolik enerjiye dönüştüren kritik ekipmanlardır. 20.GRUP G Tipi Kapak Frezeli Pompalar, güçlü performansı ve hassas çalışma özellikleriyle endüstriyel ihtiyaçlara cevap vermek için tasarlanmıştır.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">G Tipi Kapak Frezeli Pompaların Özellikleri</h4>
                                <p>
                                  Bu seri, güçlü performansı ve hassas çalışma özellikleri ile donatılmıştır. Frezeli yapısı, hassas hidrolik işlemlerde üstün bir performans sunar.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Geniş Uygulama Alanları</h4>
                                <p>
                                  20.GRUP'un G Tipi Kapak Frezeli Pompaları, endüstriyel sektörde geniş bir uygulama alanına sahiptir. Hassas işlemler ve yüksek performans gerektiren durumlar için idealdir.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Hassasiyet Dengesi</h4>
                                <p>
                                  Bu seri, güçlü performansı hassas çalışma ile birleştirerek işletmelere güvenilir bir çözüm sunar. Yüksek performanslı işlemlerde bile hassasiyeti korur.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h4>
                                <p>
                                  Hidrolik pompaların geniş bir yelpazesi bulunur ve her biri farklı gereksinimleri karşılamak üzere tasarlanmıştır. G Tipi Kapak Frezeli Pompalar, hassas ve güçlü yapısıyla endüstriyel kullanım için idealdir.
                                </p>
                                <p>
                                  Her işletmenin farklı gereksinimleri olduğundan, hangi hidrolik pompaların en uygun olduğunu belirlemek için uzman danışmanlık almak önemlidir.
                                </p>
                              </div>

                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">20.GRUP G TİPİ KAPAK FREZELİ POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETIM HACMİ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.320.ADM5PN</td><td className="px-4 py-3 text-slate-700">32 CM³</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.320.CDM5PN</td><td className="px-4 py-3 text-slate-700">32 CM³</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP20.400.CAD05SON</td><td className="px-4 py-3 text-slate-700">40 CM³</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '30.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR' && selectedGroupBrand === 'asc' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">30.GRUP B Tipi Kapak 1/8 Konik Milli Pompa: Hidrolik Sistemleriniz İçin Güçlü Çözüm</h3>
                                <p>
                                  Hidrolik sistemlerin temel parçalarından biri olan 30.GRUP B Tipi Kapak 1/8 Konik Milli Pompa, güçlü performansı ve geniş uygulama alanlarıyla öne çıkıyor. Bu pompa, hidrolik enerjiyi verimli bir şekilde kullanarak sistemlerinizin sorunsuz çalışmasını sağlar.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Teknoloji ve Fonksiyonellik Bir Arada</h4>
                                <p>
                                  30.GRUP'un sunduğu bu dişli pompa, yüksek kaliteli malzemelerden üretilmiştir ve dayanıklılığıyla öne çıkar. Alüminyum gövdeli dişli pompalar arasında yer alan bu ürün, hafif yapısıyla montajı kolaylaştırırken aynı zamanda uzun ömürlü bir performans sunar.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Geniş Uygulama Alanları</h4>
                                <p>
                                  Hidrolik pompa çeşitleri arasında bulunan B Tipi Kapak 1/8 Konik Milli Pompa, farklı endüstriyel alanlarda yaygın olarak kullanılır. Yüksek basınç gerektiren sistemlerden daha düşük basınçlı sistemlere kadar geniş bir yelpazede verimli çalışma sağlar.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Ekonomik Seçenekler</h4>
                                <p>
                                  Hidrolik pompa fiyatları arasında ekonomik bir seçenek sunan bu ürün, yüksek performansıyla maliyet-etkin bir çözüm sunar. Sistemlerinizin gereksinimlerini karşılamak için uygun bir seçenek olarak öne çıkar.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Doğru Seçim İçin Uzman Destek</h4>
                                <p>
                                  Hidrolik sistemleriniz için doğru pompa seçimi, performansın ve verimliliğin anahtarıdır. 30.GRUP'un sunduğu uzman desteğiyle, ihtiyaçlarınıza uygun en iyi çözümü belirleyebilirsiniz.
                                </p>
                                <p>
                                  30.GRUP B Tipi Kapak 1/8 Konik Milli Pompa, hidrolik sistemlerinizde güvenilir ve etkili bir performans sunar. Üstün teknoloji ve dayanıklılığıyla, işlerinizi verimli bir şekilde yürütmenize olanak tanır.
                                </p>
                              </div>

                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">30.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETIM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP30.270.CAB02SN</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">27 CM³</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP30.820.CAB02SN</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">82 CM³</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '30.GRUP B TİPİ KAPAK DÜZ MİLLİ POMPALAR' && selectedGroupBrand === 'asc' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">30.GRUP B Tipi Kapak Düz Milli Pompalar: Hidrolik Sistemleriniz İçin Güçlü Performans</h3>
                                <p>
                                  Hidrolik sistemlerde önemli bir yer tutan 30.GRUP'un B Tipi Kapak Düz Milli Pompaları, güvenilirlikleri ve etkili performanslarıyla öne çıkıyor. Bu pompa çeşidi, hidrolik enerjiyi dönüştürerek sistemlerinizin sorunsuz çalışmasını sağlar.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Teknoloji ve Güvenilirlik</h4>
                                <p>
                                  Alüminyum gövdeli dişli pompalar kategorisinde yer alan bu ürün, dayanıklı malzemeler kullanılarak tasarlanmıştır. Bu özellik, uzun ömürlü kullanım ve dayanıklılık sağlar. Sistemlerinizin ihtiyaç duyduğu güvenilirlik ve performansı sunar.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Çeşitlilik ve Uygulanabilirlik</h4>
                                <p>
                                  Hidrolik dişli pompa çeşitleri arasında yer alan B Tipi Kapak Düz Milli Pompa, farklı hidrolik sistemlerde geniş bir kullanım alanına sahiptir. Yüksek basınçlı sistemlerden düşük basınçlı sistemlere kadar çeşitli uygulamalarda etkin bir şekilde çalışır.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Ekonomik Seçenekler</h4>
                                <p>
                                  Hidrolik pompa fiyatları arasında rekabetçi bir seçenek olan bu ürün, yüksek performansı ile maliyet-etkin bir çözüm sunar. Bu sayede, işletme maliyetlerinizi optimize ederken kaliteli bir hidrolik sisteme sahip olabilirsiniz.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Uzman Destek ile Doğru Seçim</h4>
                                <p>
                                  Hidrolik pompaların doğru seçimi, sisteminizin verimliliği ve dayanıklılığı için kritik öneme sahiptir. 30.GRUP'un uzman ekibi, ihtiyaçlarınıza en uygun çözümü belirlemenizde size yardımcı olabilir.
                                </p>
                                <p>
                                  30.GRUP B Tipi Kapak Düz Milli Pompaları, hidrolik sistemlerinizin temel taşlarından biri olarak güçlü ve güvenilir performans sunar. Endüstri standartlarını karşılayan kalite ve dayanıklılığıyla öne çıkar.
                                </p>
                              </div>

                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">30.GRUP B TİPİ KAPAK DÜZ MİLLİ POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETIM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP30.610.AAH05SN</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">61 CM³</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDKP30.610.CAH05SN</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">61 CM³</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '30.GRUP UNİ POMPALAR' && selectedGroupBrand === 'asc' ? (
                            <>
                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">30.GRUP UNİ POMPALAR</h3>
                                <p className="text-sm font-semibold text-slate-700 mb-4">TEK YÖN POMPALAR</p>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETIM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">YAĞ ÇIKIŞI</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">YAĞ GİRİŞİ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.017.AST1N</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">17,2 CM³</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">G 1/2"</td><td className="px-4 py-3 text-slate-700">G 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.017.CST1N</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">17,2 CM³</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">G 1/2"</td><td className="px-4 py-3 text-slate-700">G 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.027.AST1N</td><td className="px-4 py-3 text-slate-700">290</td><td className="px-4 py-3 text-slate-700">27,1 CM³</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 3/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.027.CST1N</td><td className="px-4 py-3 text-slate-700">290</td><td className="px-4 py-3 text-slate-700">27,1 CM³</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 3/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.034.AST1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">34,4 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 3/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.034.CST1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">34,4 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 3/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.043.AST1N</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">42,9 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 3/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.043.CST1N</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">42,9 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 3/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.051.AST1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">51,2 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.051.CST1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">51,2 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.061.AST1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">60,7 CM³</td><td className="px-4 py-3 text-slate-700">2000</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.061.CST1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">60,7 CM³</td><td className="px-4 py-3 text-slate-700">2000</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.073.AST1N</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">73 CM³</td><td className="px-4 py-3 text-slate-700">1750</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.073.CST1N</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">73 CM³</td><td className="px-4 py-3 text-slate-700">1750</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.082.AST1N</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">81,4 CM³</td><td className="px-4 py-3 text-slate-700">1750</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.082.CST1N</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">81,4 CM³</td><td className="px-4 py-3 text-slate-700">1750</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.100.AST1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">99,7 CM³</td><td className="px-4 py-3 text-slate-700">1750</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.100.CST1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">99,7 CM³</td><td className="px-4 py-3 text-slate-700">1750</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.017.AST1N</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">17,2 CM³</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">G 1/2"</td><td className="px-4 py-3 text-slate-700">G 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.017.CST1N</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">17,2 CM³</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">G 1/2"</td><td className="px-4 py-3 text-slate-700">G 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.027.AST1N</td><td className="px-4 py-3 text-slate-700">290</td><td className="px-4 py-3 text-slate-700">27,1 CM³</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 3/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.027.CST1N</td><td className="px-4 py-3 text-slate-700">290</td><td className="px-4 py-3 text-slate-700">27,1 CM³</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 3/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.034.AST1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">34,4 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 3/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.034.CST1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">34,4 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 3/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.043.AST1N</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">42,9 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 3/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.043.CST1N</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">42,9 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 3/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.051.AST1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">51,2 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.051.CST1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">51,2 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.061.AST1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">60,7 CM³</td><td className="px-4 py-3 text-slate-700">2000</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.061.CST1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">60,7 CM³</td><td className="px-4 py-3 text-slate-700">2000</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.073.AST1N</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">73 CM³</td><td className="px-4 py-3 text-slate-700">1750</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.073.CST1N</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">73 CM³</td><td className="px-4 py-3 text-slate-700">1750</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.082.AST1N</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">81,4 CM³</td><td className="px-4 py-3 text-slate-700">1750</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.082.CST1N</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">81,4 CM³</td><td className="px-4 py-3 text-slate-700">1750</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.100.AST1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">99,7 CM³</td><td className="px-4 py-3 text-slate-700">1750</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.100.CST1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">99,7 CM³</td><td className="px-4 py-3 text-slate-700">1750</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td><td className="px-4 py-3 text-slate-700">G 1-1/4"</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '30.GRUP ISO POMPALAR' && selectedGroupBrand === 'hemko' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>HEMKO</strong>
                                </p>
                                <p>
                                  30.GRUP ISO POMPALAR: Döküm Gövdeli Dişli Pompalar ile Yüksek Performans
                                </p>
                                <p>
                                  HEMKO 30.GRUP ISO POMPALAR, döküm gövdeli dişli pompa teknolojisiyle üretilmiş, yüksek basınç ve güvenilir performans sunan hidrolik pompalardır. ISO standartlarına uygun olarak tasarlanmış bu pompalar, endüstriyel uygulamalarda geniş bir kullanım alanına sahiptir.
                                </p>
                              </div>

                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">30.GRUP ISO POMPALAR</h3>
                                <p className="text-sm font-semibold text-slate-700 mb-4">ISO TEK YÖN</p>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Min.HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">YAĞ ÇIKIŞI</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">YAĞ GİRİŞİ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">130 043 2X2</td>
                                          <td className="px-4 py-3 text-slate-700">250</td>
                                          <td className="px-4 py-3 text-slate-700">43 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">2000</td>
                                          <td className="px-4 py-3 text-slate-700">400</td>
                                          <td className="px-4 py-3 text-slate-700">R3/4"</td>
                                          <td className="px-4 py-3 text-slate-700">R1"</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">130 082 2X2</td>
                                          <td className="px-4 py-3 text-slate-700">210</td>
                                          <td className="px-4 py-3 text-slate-700">82 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">2000</td>
                                          <td className="px-4 py-3 text-slate-700">400</td>
                                          <td className="px-4 py-3 text-slate-700">R1"</td>
                                          <td className="px-4 py-3 text-slate-700">R1" 1/4</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '40.GRUP ISO POMPALAR' && selectedGroupBrand === 'hemko' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>HEMKO</strong>
                                </p>
                                <p>
                                  40.GRUP ISO POMPALAR: Döküm Gövdeli Dişli Pompalar ile Yüksek Performans
                                </p>
                                <p>
                                  HEMKO 40.GRUP ISO POMPALAR, döküm gövdeli dişli pompa teknolojisiyle üretilmiş, yüksek basınç ve güvenilir performans sunan hidrolik pompalardır. ISO standartlarına uygun olarak tasarlanmış bu pompalar, endüstriyel uygulamalarda geniş bir kullanım alanına sahiptir.
                                </p>
                              </div>

                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">40.GRUP ISO POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS. HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MİN. HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">YAĞ ÇIKIŞI</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">YAĞ GİRİŞİ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">44874</td>
                                          <td className="px-4 py-3 text-slate-700">440</td>
                                          <td className="px-4 py-3 text-slate-700">87 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">2000</td>
                                          <td className="px-4 py-3 text-slate-700">400</td>
                                          <td className="px-4 py-3 text-slate-700">R1"</td>
                                          <td className="px-4 py-3 text-slate-700">R1" 1/4</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                          <td className="px-4 py-3 font-medium text-slate-900">140 087 2X2</td>
                                          <td className="px-4 py-3 text-slate-700">440</td>
                                          <td className="px-4 py-3 text-slate-700">87 CM³</td>
                                          <td className="px-4 py-3 text-slate-700">2000</td>
                                          <td className="px-4 py-3 text-slate-700">400</td>
                                          <td className="px-4 py-3 text-slate-700">R1"</td>
                                          <td className="px-4 py-3 text-slate-700">R1" 1/4</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '40.GRUP UNİ POMPALAR' && selectedGroupBrand === 'hidromas' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>HİDROMAS</strong>
                                </p>
                                <p>
                                  40.GRUP UNİ POMPALAR: Döküm Gövdeli Dişli Pompalarla Güçlü ve Dayanıklı Performans
                                </p>
                                <p>
                                  HİDROMAS 40.GRUP UNİ POMPALAR, döküm gövdeli dişli pompa teknolojisiyle üretilmiş, yüksek basınç ve geniş hacim aralığında çalışabilen pompalardır. Tek yön pompa özelliği ile endüstriyel uygulamalarda güvenilir performans sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Döküm Gövdeli Dişli Pompaların Avantajları</h3>
                                <p>
                                  Döküm gövde yapısı sayesinde yüksek dayanıklılık ve uzun ömür sağlar. Yüksek basınç değerlerinde bile güvenilir çalışma performansı gösterir.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Geniş Uygulama Alanları</h3>
                                <p>
                                  40.GRUP UNİ POMPALAR, tarım makineleri, inşaat ekipmanları, endüstriyel makineler ve mobil uygulamalar gibi geniş bir yelpazede kullanılabilir.
                                </p>
                              </div>

                              {/* Tablo: 40.GRUP UNİ POMPALAR - TEK YÖN POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">40.GRUP UNİ POMPALAR</h3>
                                <p className="text-sm font-semibold text-slate-700 mb-4">TEK YÖN POMPALAR</p>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Min.HIZ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44771</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">107,60 CM³</td><td className="px-4 py-3 text-slate-700">1500</td><td className="px-4 py-3 text-slate-700">250</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44788</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">132,38 CM³</td><td className="px-4 py-3 text-slate-700">1500</td><td className="px-4 py-3 text-slate-700">250</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44768</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">148,90 CM³</td><td className="px-4 py-3 text-slate-700">1500</td><td className="px-4 py-3 text-slate-700">250</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44759</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">60,60 CM³</td><td className="px-4 py-3 text-slate-700">1800</td><td className="px-4 py-3 text-slate-700">300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44769</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">71,70 CM³</td><td className="px-4 py-3 text-slate-700">1800</td><td className="px-4 py-3 text-slate-700">300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44770</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">85,50 CM³</td><td className="px-4 py-3 text-slate-700">1500</td><td className="px-4 py-3 text-slate-700">300</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '40.GRUP ISO POMPALAR' && selectedGroupBrand === 'hidromas' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>HİDROMAS</strong>
                                </p>
                                <p>
                                  40.GRUP ISO POMPALAR: Döküm Gövdeli Dişli Pompalarla Standart Uyumlu Çözümler
                                </p>
                                <p>
                                  HİDROMAS 40.GRUP ISO POMPALAR, ISO standartlarına uygun olarak tasarlanmış döküm gövdeli dişli pompalardır. Yüksek basınç değerlerinde güvenilir çalışma ve geniş hacim seçenekleri sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">ISO Standartlarına Uyum</h3>
                                <p>
                                  ISO standartlarına uygun tasarım sayesinde, farklı marka ve modellerle uyumlu çalışabilir. Bu özellik, sistem entegrasyonunu kolaylaştırır.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Yüksek Performans</h3>
                                <p>
                                  Döküm gövde yapısı ve optimize edilmiş dişli tasarımı sayesinde yüksek verimlilik ve uzun ömür sağlar.
                                </p>
                              </div>

                              {/* Tablo: 40.GRUP ISO POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">40.GRUP ISO POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Min.HIZ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44870</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">107,60 CM³</td><td className="px-4 py-3 text-slate-700">1500</td><td className="px-4 py-3 text-slate-700">250</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44871</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">132,38 CM³</td><td className="px-4 py-3 text-slate-700">1500</td><td className="px-4 py-3 text-slate-700">250</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44872</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">148,90 CM³</td><td className="px-4 py-3 text-slate-700">1500</td><td className="px-4 py-3 text-slate-700">250</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44845</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">60,60 CM³</td><td className="px-4 py-3 text-slate-700">1800</td><td className="px-4 py-3 text-slate-700">300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44846</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">71,70 CM³</td><td className="px-4 py-3 text-slate-700">1800</td><td className="px-4 py-3 text-slate-700">300</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44847</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">85,50 CM³</td><td className="px-4 py-3 text-slate-700">1500</td><td className="px-4 py-3 text-slate-700">300</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '40.GRUP MEKANİK VANALI POMPALAR' && selectedGroupBrand === 'hidromas' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>HİDROMAS</strong>
                                </p>
                                <p>
                                  40.GRUP MEKANİK VANALI POMPALAR: Döküm Gövdeli Dişli Pompalarla Gelişmiş Kontrol
                                </p>
                                <p>
                                  HİDROMAS 40.GRUP MEKANİK VANALI POMPALAR, mekanik valf kontrolü ile donatılmış döküm gövdeli dişli pompalardır. Yüksek basınç değerlerinde güvenilir çalışma ve hassas kontrol imkanı sunar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Mekanik Valf Kontrolü</h3>
                                <p>
                                  Mekanik valf sistemi sayesinde pompa performansı ve akış kontrolü optimize edilir. Bu özellik, sistem verimliliğini artırır ve enerji tasarrufu sağlar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Yüksek Basınç Kapasitesi</h3>
                                <p>
                                  Döküm gövde yapısı sayesinde yüksek basınç değerlerinde bile güvenilir çalışma performansı gösterir. 250-300 bar aralığında çalışabilme özelliği ile zorlu uygulamalarda tercih edilir.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Uygulama Alanları</h3>
                                <p>
                                  Endüstriyel makineler, tarım ekipmanları, inşaat makineleri ve mobil uygulamalar gibi geniş bir yelpazede kullanılabilir.
                                </p>
                              </div>

                              {/* Tablo: 40.GRUP MEKANİK VANALI POMPALAR */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">40.GRUP MEKANİK VANALI POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Min.HIZ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44904</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">107,60 CM³</td><td className="px-4 py-3 text-slate-700">1500</td><td className="px-4 py-3 text-slate-700">250</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44905</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">71,70 CM³</td><td className="px-4 py-3 text-slate-700">1800</td><td className="px-4 py-3 text-slate-700">300</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '30.GRUP ISO POMPALAR' && selectedGroupBrand === 'asc' ? (
                            <>
                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">30.GRUP ISO POMPALAR</h3>
                                <p className="text-sm font-semibold text-slate-700 mb-4">ISO TEK YÖN</p>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETIM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.017.ARM1N</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">17,2 CM³</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.017.CRM1N</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">17,2 CM³</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.027.ARM1N</td><td className="px-4 py-3 text-slate-700">290</td><td className="px-4 py-3 text-slate-700">27,1 CM³</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.027.CRM1N</td><td className="px-4 py-3 text-slate-700">290</td><td className="px-4 py-3 text-slate-700">27,1 CM³</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.034.ARM1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">34,4 CM³</td><td className="px-4 py-3 text-slate-700">2750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.034.CRM1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">34,4 CM³</td><td className="px-4 py-3 text-slate-700">2750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.043.ARM1N</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">42,9 CM³</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.043.CRM1N</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">42,9 CM³</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.051.ARM1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">51,2 CM³</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.051.CRM1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">51,2 CM³</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.061.ARM1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">60,7 CM³</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.061.CRM1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">60,7 CM³</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.073.ARM1N</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">73 CM³</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.073.CRM1N</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">73 CM³</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.082.ARM1N</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">81,4 CM³</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.082.CRM1N</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">81,4 CM³</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.100.ARM1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">99,7 CM³</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP30.100.CRM1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">99,7 CM³</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.017.ARM1N</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">17,2 CM³</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.017.CRM1N</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">17,2 CM³</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.027.ARM1N</td><td className="px-4 py-3 text-slate-700">290</td><td className="px-4 py-3 text-slate-700">27,1 CM³</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.027.CRM1N</td><td className="px-4 py-3 text-slate-700">290</td><td className="px-4 py-3 text-slate-700">27,1 CM³</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.034.ARM1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">34,4 CM³</td><td className="px-4 py-3 text-slate-700">2750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.034.CRM1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">34,4 CM³</td><td className="px-4 py-3 text-slate-700">2750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.043.ARM1N</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">42,9 CM³</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.043.CRM1N</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">42,9 CM³</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.051.ARM1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">51,2 CM³</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.051.CRM1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">51,2 CM³</td><td className="px-4 py-3 text-slate-700">2500</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.061.ARM1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">60,7 CM³</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.061.CRM1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">60,7 CM³</td><td className="px-4 py-3 text-slate-700">2000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.073.ARM1N</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">73 CM³</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.073.CRM1N</td><td className="px-4 py-3 text-slate-700">200</td><td className="px-4 py-3 text-slate-700">73 CM³</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.082.ARM1N</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">81,4 CM³</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.082.CRM1N</td><td className="px-4 py-3 text-slate-700">190</td><td className="px-4 py-3 text-slate-700">81,4 CM³</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.100.ARM1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">99,7 CM³</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR30.100.CRM1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">99,7 CM³</td><td className="px-4 py-3 text-slate-700">1750</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '40.GRUP UNİ POMPALAR' && selectedGroupBrand === 'asc' ? (
                            <>
                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">40.GRUP UNİ POMPALAR</h3>
                                <p className="text-sm font-semibold text-slate-700 mb-4">TEK YÖN POMPALAR</p>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETIM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MİN. HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">YAĞ ÇIKIŞI</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">YAĞ GİRİŞİ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.063.AST1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">63,8 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.063.CST1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">63,8 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.073.AST1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">72,2 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.073.CST1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">72,2 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.087.AST1N</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">86,1 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.087.CST1N</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">86,1 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.109.AST1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">107,3 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.109.CST1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">107,3 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.133.AST1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">131,6 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.133.CST1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">131,6 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.151.AST1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">148,3 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.151.CST1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">148,3 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.063.AST1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">63,8 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.063.CST1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">63,8 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.073.AST1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">72,2 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.073.CST1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">72,2 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.087.AST1N</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">86,1 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.087.CST1N</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">86,1 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.109.AST1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">107,3 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.109.CST1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">107,3 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.133.AST1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">131,6 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.133.CST1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">131,6 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.151.AST1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">148,3 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.151.CST1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">148,3 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '20.GRUP G TİPİ KAPAK DÜZ MİLLİ POMPALAR' && selectedGroupBrand === 'david-brown' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">20.GRUP G Tipi Kapak Düz Milli Pompalar: Dayanıklı ve Yüksek Performanslı Hidrolik Çözümler</h3>
                                <p>
                                  Hidrolik pompalar, endüstriyel sektörde önemli bir rol oynayan, mekanik enerjiyi hidrolik enerjiye dönüştüren ekipmanlardır. 20.GRUP G Tipi Kapak Düz Milli Pompalar, dayanıklılığı ve yüksek performansıyla farklı endüstriyel ihtiyaçlara uygun çözümler sunmaktadır.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">G Tipi Kapak Düz Milli Pompaların Özellikleri</h4>
                                <p>
                                  Bu seri, dayanıklı ve yüksek performanslı G Tipi Kapak Düz Milli Pompalarla donatılmıştır. Endüstriyel kullanım için tasarlanmış olan bu pompa serisi, sağlam yapısıyla güvenilirlik sunar.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Geniş Uygulama Alanları</h4>
                                <p>
                                  20.GRUP'un G Tipi Kapak Düz Milli Pompaları, çeşitli endüstriyel sektörlerde yaygın olarak kullanılır. Güçlü yapısı ve dayanıklılığı, farklı hidrolik ihtiyaçlarını karşılamak için optimize edilmiştir.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Dayanıklılık Dengesi</h4>
                                <p>
                                  Bu seri, yüksek performansı dayanıklılıkla birleştirerek işletmelere güçlü bir çözüm sunar. Zorlu çalışma koşullarında bile istikrarlı bir performans gösterir.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h4>
                                <p>
                                  Hidrolik pompaların geniş bir yelpazesi vardır ve her biri farklı gereksinimleri karşılamak üzere tasarlanmıştır. G Tipi Kapak Düz Milli Pompalar, dayanıklı yapılarıyla endüstriyel kullanım için idealdir.
                                </p>
                                <p>
                                  Her işletmenin farklı gereksinimleri olduğundan, hangi hidrolik pompaların en uygun olduğunu belirlemek için uzman danışmanlık almak önemlidir.
                                </p>
                              </div>

                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">20.GRUP G TİPİ KAPAK DÜZ MİLLİ POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ÇIKIŞ PORTU</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">DÖNÜŞ YÖNÜ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">GİRİŞ PORTU</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KAPAK</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ŞAFT TİPİ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110423M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">G 1/2</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">G 3/4</td><td className="px-4 py-3 text-slate-700">23 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G</td><td className="px-4 py-3 text-slate-700">7/8 DÜZ</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110521M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">G 1/2"</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">G 3/4</td><td className="px-4 py-3 text-slate-700">16 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G - SAE B</td><td className="px-4 py-3 text-slate-700">7/8 - PARALEL</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110522M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">G 1/2"</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">G 3/4</td><td className="px-4 py-3 text-slate-700">19 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G - SAE B</td><td className="px-4 py-3 text-slate-700">7/8 - PARALEL</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110523M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">G 3/4</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">23 CM³</td><td className="px-4 py-3 text-slate-700">G</td><td className="px-4 py-3 text-slate-700">7/8 - PARALEL</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110525M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">G 3/4</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">27 CM³</td><td className="px-4 py-3 text-slate-700">2P-G / SAE B</td><td className="px-4 py-3 text-slate-700">7/8 DÜZ</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110527M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">G 3/4</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">30 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G - SAE B</td><td className="px-4 py-3 text-slate-700">7/8" - PARALEL</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110528M</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">G 3/4</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">33 CM³</td><td className="px-4 py-3 text-slate-700">2P1 - G</td><td className="px-4 py-3 text-slate-700">7/8 DÜZ</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110529M</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">G 3/4</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">35 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G - SAE B</td><td className="px-4 py-3 text-slate-700">7/8" - PARALEL</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110530M</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">G 3/4</td><td className="px-4 py-3 text-slate-700">41 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G - SAE B</td><td className="px-4 py-3 text-slate-700">7/8" - PARALEL</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110531M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">G 1/2</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">G 3/4</td><td className="px-4 py-3 text-slate-700">16 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G - SAE B</td><td className="px-4 py-3 text-slate-700">7/8" - PARALEL</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110532M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">G 1/2</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">G 3/4</td><td className="px-4 py-3 text-slate-700">19 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G - SAE B</td><td className="px-4 py-3 text-slate-700">7/8" - PARALEL</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110533M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">G 3/4</td><td className="px-4 py-3 text-slate-700">23 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G - SAE B</td><td className="px-4 py-3 text-slate-700">7/8" - PARALEL</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110535M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">27 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G - SAE B</td><td className="px-4 py-3 text-slate-700">7/8" - PARALEL</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110537M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">30 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G - SAE B</td><td className="px-4 py-3 text-slate-700">7/8" - PARALEL</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110538M</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">33 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G - SAE B</td><td className="px-4 py-3 text-slate-700">7/8" - PARALEL</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110539M</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">35 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G - SAE B</td><td className="px-4 py-3 text-slate-700">7/8" - PARALEL</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110540M</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">41 CM³</td><td className="px-4 py-3 text-slate-700">2P1 G - SAE B</td><td className="px-4 py-3 text-slate-700">7/8" - PARALEL</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '20.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR' && selectedGroupBrand === 'david-brown' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">20.GRUP B Tipi Kapak 1/8 Konik Milli Pompalar: Hassas ve Güvenilir Hidrolik Çözümler</h3>
                                <p>
                                  Hidrolik pompalar, endüstriyel sektörde kritik bir role sahip olup, mekanik enerjiyi hidrolik enerjiye dönüştüren önemli ekipmanlardır. 20.GRUP B Tipi Kapak 1/8 Konik Milli Pompalar, hassasiyeti ve güvenilirliğiyle öne çıkarak çeşitli işletme ihtiyaçlarına çözüm sunmaktadır.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">B Tipi Kapak 1/8 Konik Milli Pompaların Özellikleri</h4>
                                <p>
                                  Bu seri, hassas işler için tasarlanmış ve yüksek performanslı B Tipi Kapak 1/8 Konik Milli Pompalarla donatılmıştır. Hassas işlemlerde güvenilirlik ve hassasiyet sunarak, endüstriyel uygulamalarda önemli bir yer tutar.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Çeşitli Uygulama Alanları</h4>
                                <p>
                                  20.GRUP'un B Tipi Kapak 1/8 Konik Milli Pompaları, çeşitli endüstriyel sektörlerde kullanım için optimize edilmiştir. Hassas hidrolik ihtiyaçlarını karşılamak üzere tasarlanmıştır.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Güvenilirlik Dengesi</h4>
                                <p>
                                  Bu pompa serisi, yüksek performansı güvenilirlikle birleştirerek işletmelere sağlam bir çözüm sunar. Hassas işlemlerde bile istikrarlı bir performans sergiler.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h4>
                                <p>
                                  Hidrolik pompaların geniş bir yelpazesi bulunur ve her biri farklı gereksinimleri karşılamak üzere tasarlanmıştır. B Tipi Kapak 1/8 Konik Milli Pompalar, özellikle hassas işler için idealdir.
                                </p>
                                <p>
                                  Her işletmenin farklı gereksinimleri olduğundan, hangi hidrolik pompaların en uygun olduğunu belirlemek için uzman danışmanlık almak önemlidir.
                                </p>
                              </div>

                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">20.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ÇIKIŞ PORTU</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">DÖNÜŞ YÖNÜ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">GİRİŞ PORTU</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KAPAK</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ŞAFT TİPİ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110541M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">16 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110542M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">19 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110543M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">23 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110545M</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">27 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110547M</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">30 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110548M</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">33 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110549M</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">35 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110550M</td><td className="px-4 py-3 text-slate-700">150</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">41 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110551M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">16 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110552M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">30 - M6*1*13</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">19 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110553M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">23 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110555M</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">27 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110557M</td><td className="px-4 py-3 text-slate-700">230</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">30 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110558M</td><td className="px-4 py-3 text-slate-700">210</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">33 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110559M</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">35 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110560M</td><td className="px-4 py-3 text-slate-700">150</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SOL</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">41 CM³</td><td className="px-4 py-3 text-slate-700">1PN - B KAPAK</td><td className="px-4 py-3 text-slate-700">1PN - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110563M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">23 CM³</td><td className="px-4 py-3 text-slate-700">2P1 - B KAPAK</td><td className="px-4 py-3 text-slate-700">2P1 - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110565M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">27 CM³</td><td className="px-4 py-3 text-slate-700">2P1 - B KAPAK</td><td className="px-4 py-3 text-slate-700">2P1 - 1/8 KONİK</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">1CP110567M</td><td className="px-4 py-3 text-slate-700">276</td><td className="px-4 py-3 text-slate-700">40 - M8*1,25*13</td><td className="px-4 py-3 text-slate-700">SAĞ</td><td className="px-4 py-3 text-slate-700">51 - M10*1,5*13</td><td className="px-4 py-3 text-slate-700">30 CM³</td><td className="px-4 py-3 text-slate-700">2P1 - B KAPAK</td><td className="px-4 py-3 text-slate-700">2P1 - 1/8 KONİK</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '40.GRUP END.HELİSEL G TİPİ KAPAK 7/8 DÜZ MİLLİ' && selectedGroupBrand === 'david-brown' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">40.GRUP END.HELİSEL G TİPİ KAPAK 7/8 DÜZ MİLLİ</h3>
                                <p>
                                  Bu seri, endüstriyel hidrolik sistemler için tasarlanmış helisel dişli pompalardır. G Tipi Kapak ve 7/8 Düz Milli özellikleriyle yüksek performans ve güvenilirlik sunar.
                                </p>
                              </div>

                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">40.GRUP END.HELİSEL G TİPİ KAPAK 7/8 DÜZ MİLLİ</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">HEMA KODU</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">HPS41003</td><td className="px-4 py-3 text-slate-700">S1A4016F3A1D1AC</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">HPS41005</td><td className="px-4 py-3 text-slate-700">S1A4023F21A1D1AC</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">HPS41006</td><td className="px-4 py-3 text-slate-700">S1A4032F21A1F1BC</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">HPS41011</td><td className="px-4 py-3 text-slate-700">S1A4016F21A1D1AC</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">HPS41012</td><td className="px-4 py-3 text-slate-700">S1A4036F21A1D1AC</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">HPS41016</td><td className="px-4 py-3 text-slate-700">S1A4027F21A1F1BC</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '30.GRUP G TİPİ KAPAK DÜZ MİLLİ POMPALAR' && selectedGroupBrand === 'david-brown' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">30.GRUP G Tipi Kapak Düz Milli Pompalar: Hidrolik Sistemlerinizin Güçlü Desteği</h3>
                                <p>
                                  30.GRUP'un önde gelen ürünlerinden biri olan G Tipi Kapak Düz Milli Pompalar, hidrolik sistemlerinizde verimli ve güvenilir bir performans sağlamak üzere tasarlanmıştır. Bu pompa çeşidi, endüstri standartlarını aşarak öne çıkan özellikleriyle dikkat çeker.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Teknoloji ve Güvenilirlik</h4>
                                <p>
                                  Alüminyum gövdeli dişli pompalar arasında yer alan G Tipi Kapak Düz Milli Pompa, en son teknolojiyle üretilmiş dayanıklı malzemeler kullanılarak tasarlanmıştır. Bu sayede uzun ömürlü ve güvenilir bir performans sunar.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Çeşitli Uygulama Alanları</h4>
                                <p>
                                  Bu pompa, geniş bir endüstriyel yelpazede kullanılabilecek şekilde tasarlanmıştır. Yüksek basınçlı sistemlerden daha düşük basınçlı sistemlere kadar çeşitli uygulama alanlarına uyum sağlar.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Ekonomik Seçenekler</h4>
                                <p>
                                  Hidrolik pompa fiyatları arasında rekabetçi bir seçenek olan G Tipi Kapak Düz Milli Pompa, yüksek performans sunarken maliyet-etkin bir çözüm sunar. Güçlü yapısı ve uzun ömürlü kullanım avantajıyla dikkat çeker.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Uzman Danışmanlık</h4>
                                <p>
                                  Hidrolik sistemleriniz için doğru pompa seçimi önemlidir. 30.GRUP'un deneyimli ekibi, ihtiyaçlarınıza uygun en iyi çözümü belirlemenize yardımcı olabilir.
                                </p>
                                <p>
                                  30.GRUP G Tipi Kapak Düz Milli Pompalar, hidrolik sistemlerinizin verimli ve güvenilir çalışmasını sağlar. Endüstri standartlarına uygunluğu ve güçlü performansıyla öne çıkar.
                                </p>
                              </div>

                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">30.GRUP G TİPİ KAPAK DÜZ MİLLİ POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">HEMA KODU</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">HPS41022</td><td className="px-4 py-3 text-slate-700">S1A4016BF11C (S4 POMPA)</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">HPS41023</td><td className="px-4 py-3 text-slate-700">S1A4023BF11C (S4 POMPA)</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">HPS41025</td><td className="px-4 py-3 text-slate-700">S1A4032BH21A1F1BC (S4 POMPA)</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">HPS41026</td><td className="px-4 py-3 text-slate-700">S1A4037BH21C (S4 POMPA)</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '40.GRUP ISO POMPALAR' && selectedGroupBrand === 'asc' ? (
                            <>
                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">40.GRUP ISO POMPALAR</h3>
                                <p className="text-sm font-semibold text-slate-700 mb-4">GP40 ISO</p>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETIM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MİN. HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">YAĞ ÇIKIŞI</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">YAĞ GİRİŞİ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.063.ARM1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">63,8 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.063.CRM1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">63,8 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.073.ARM1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">72,2 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.073.CRM1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">72,2 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.087.ARM1N</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">86,1 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.087.CRM1N</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">86,1 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.109.ARM1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">107,3 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.109.CRM1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">107,3 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.109.RRM1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">107,3 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.133.ARM1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">131,6 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.133.CRM1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">131,6 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.151.ARM1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">148,3 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGP40.151.CRM1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">148,3 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <p className="text-sm font-semibold text-slate-700 mb-4">GP40 ARKADAN ÇIKIŞLI</p>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETIM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MİN. HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">YAĞ ÇIKIŞI</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">YAĞ GİRİŞİ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.063.ARM1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">63,8 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.063.CRM1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">63,8 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.073.ARM1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">72,2 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.073.CRM1N</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">72,2 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 3/4"</td><td className="px-4 py-3 text-slate-700">G 1"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.087.ARM1N</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">86,1 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.087.CRM1N</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">86,1 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.109.ARM1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">107,3 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.109.CRM1N</td><td className="px-4 py-3 text-slate-700">240</td><td className="px-4 py-3 text-slate-700">107,3 CM³</td><td className="px-4 py-3 text-slate-700">2750</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/4"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.133.ARM1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">131,6 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.133.CRM1N</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">131,6 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.151.ARM1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">148,3 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCGPR40.151.CRM1N</td><td className="px-4 py-3 text-slate-700">180</td><td className="px-4 py-3 text-slate-700">148,3 CM³</td><td className="px-4 py-3 text-slate-700">2500</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">G 1"</td><td className="px-4 py-3 text-slate-700">G 1 1/2"</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '20.GRUP HELİSEL STANDART POMPALAR' && selectedGroupBrand === 'asc' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Hidrolik Pompalar: Yüksek Performans, Çeşitlilik ve Ekonomik Seçenekler</h3>
                                <p>
                                  Hidrolik sistemlerin temel yapı taşlarından biri olan hidrolik pompalar, 20.GRUP tarafından sunulan geniş ürün yelpazesiyle ihtiyaçlarınıza yönelik çözümler sunuyor. Bu pompalar, hidrolik enerjiyi mekanik enerjiye dönüştürerek sistemdeki hareketi sağlar. İşte hidrolik pompa çeşitleri ve avantajlarıyla ilgili detaylı bilgi.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Çeşitlilik ve Fonksiyonellik</h4>
                                <p>
                                  Hidrolik pompa çeşitleri, farklı sistem gereksinimlerini karşılamak üzere tasarlanmıştır. Hidrolik dişli pompa, sağlamlığı ve verimliliğiyle öne çıkar. Alüminyum gövdeli dişli pompalar ise hafif yapılarıyla dikkat çeker ve farklı uygulama alanları için idealdir.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Güvenilirlik</h4>
                                <p>
                                  Hidrolik pompalar, dayanıklı malzemelerden üretilerek uzun ömürlü kullanım sağlar. Yüksek performanslarıyla işlerinizi verimli bir şekilde yürütmenizi sağlarlar. Özellikle hidrolik pompa fiyatları ve çeşitleri arasında yapacağınız seçim, işlevselliği ve bütçenizi dengelemenize yardımcı olur.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompa Seçiminde Dikkat Edilmesi Gerekenler</h4>
                                <p>
                                  Hidrolik pompa seçerken, sistem gereksinimlerinizi dikkate almalısınız. Akış hızı, basınç kapasitesi ve uygulama alanı gibi faktörler, doğru pompa seçiminde önemlidir. Firmamızın sunduğu geniş ürün yelpazesi ile ihtiyaçlarınıza uygun bir çözüm bulabilirsiniz.
                                </p>
                                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompa Satın Alırken Nelere Dikkat Etmelisiniz?</h4>
                                <p>
                                  Hidrolik pompa satın alırken, performans, kalite, garanti süresi ve satış sonrası destek gibi unsurları göz önünde bulundurmalısınız. Hidrolik pompası alırken uzman desteği almak, doğru ürünü seçmenize yardımcı olabilir.
                                </p>
                                <p>
                                  20.GRUP, hidrolik sistemlerinizi güçlendirmek için geniş ürün yelpazesi ve uzman desteğiyle yanınızda. Hidrolik pompa çeşitleri, kalite standartları ve ekonomik seçenekleriyle size özel çözümler sunmak için burada!
                                </p>
                              </div>

                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">20.GRUP HELİSEL STANDART POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">DÖNÜŞ YÖNÜ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETIM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KAPAK</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Min.HIZ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDPH20.080.CAB01SN</td><td className="px-4 py-3 text-slate-700">320</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">8 CM³</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3500</td><td className="px-4 py-3 text-slate-700">650</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44408</td><td className="px-4 py-3 text-slate-700">320</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">11.5 CM³</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">600</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDPH20.140.CAB02SN</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">14 CM³</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">600</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDPH20.160.CAB02SN</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">16 CM³</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">600</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDPH20.190.CAB01SN</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">19 CM³</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">3000</td><td className="px-4 py-3 text-slate-700">600</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '30.GRUP HELİSEL STANDART POMPALAR' && selectedGroupBrand === 'asc' ? (
                            <>
                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">30.GRUP HELİSEL STANDART POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETIM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDPH30.220.CAB02SN</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">22 CM³</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDPH30.270.CAB02SN</td><td className="px-4 py-3 text-slate-700">300</td><td className="px-4 py-3 text-slate-700">27 CM³</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">ASCDPH30.340.CAB02SN</td><td className="px-4 py-3 text-slate-700">280</td><td className="px-4 py-3 text-slate-700">34 CM³</td><td className="px-4 py-3 text-slate-700">3000</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : selectedGroup === '20.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR' && selectedGroupBrand === 'casappa' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>CASAPPA</strong>
                                </p>
                                <p>
                                  20.GRUP B Tipi Kapak 1/8 Konik Milli Pompalar: Hassas ve Güvenilir Hidrolik Çözümler
                                </p>
                                <p>
                                  Hidrolik pompalar, endüstriyel sektörde kritik bir role sahip olup, mekanik enerjiyi hidrolik enerjiye dönüştüren önemli ekipmanlardır. 20.GRUP B Tipi Kapak 1/8 Konik Milli Pompalar, hassasiyeti ve güvenilirliğiyle öne çıkarak çeşitli işletme ihtiyaçlarına çözüm sunmaktadır.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">B Tipi Kapak 1/8 Konik Milli Pompaların Özellikleri</h3>
                                <p>
                                  Bu seri, hassas işler için tasarlanmış ve yüksek performanslı B Tipi Kapak 1/8 Konik Milli Pompalarla donatılmıştır. Hassas işlemlerde güvenilirlik ve hassasiyet sunarak, endüstriyel uygulamalarda önemli bir yer tutar.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Çeşitli Uygulama Alanları</h3>
                                <p>
                                  20.GRUP'un B Tipi Kapak 1/8 Konik Milli Pompaları, çeşitli endüstriyel sektörlerde kullanım için optimize edilmiştir. Hassas hidrolik ihtiyaçlarını karşılamak üzere tasarlanmıştır.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Güvenilirlik Dengesi</h3>
                                <p>
                                  Bu pompa serisi, yüksek performansı güvenilirlikle birleştirerek işletmelere sağlam bir çözüm sunar. Hassas işlemlerde bile istikrarlı bir performans sergiler.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompaların Çeşitliliği</h3>
                                <p>
                                  Hidrolik pompaların geniş bir yelpazesi bulunur ve her biri farklı gereksinimleri karşılamak üzere tasarlanmıştır. B Tipi Kapak 1/8 Konik Milli Pompalar, özellikle hassas işler için idealdir.
                                </p>
                                <p>
                                  Her işletmenin farklı gereksinimleri olduğundan, hangi hidrolik pompaların en uygun olduğunu belirlemek için uzman danışmanlık almak önemlidir.
                                </p>
                              </div>

                              {/* Tablo */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">20.GRUP B TİPİ KAPAK 1/8 KONİK MİLLİ POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">Model</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KAPAK</th>
                                          <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ŞAFT TİPİ</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03564120</td><td className="px-4 py-3 text-slate-700">320</td><td className="px-4 py-3 text-slate-700">14.53 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03564140</td><td className="px-4 py-3 text-slate-700">320</td><td className="px-4 py-3 text-slate-700">16.85 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03564160</td><td className="px-4 py-3 text-slate-700">250</td><td className="px-4 py-3 text-slate-700">21.14 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03564180</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">26.42 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03564200</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">33.03 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03564020</td><td className="px-4 py-3 text-slate-700">330</td><td className="px-4 py-3 text-slate-700">6.61 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03564040</td><td className="px-4 py-3 text-slate-700">330</td><td className="px-4 py-3 text-slate-700">8.26 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03564080</td><td className="px-4 py-3 text-slate-700">320</td><td className="px-4 py-3 text-slate-700">11.23 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">44345</td><td className="px-4 py-3 text-slate-700">320</td><td className="px-4 py-3 text-slate-700">11.23 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C03563980</td><td className="px-4 py-3 text-slate-700">330</td><td className="px-4 py-3 text-slate-700">4.95 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">BE2402011010</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">39,27 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01980978</td><td className="px-4 py-3 text-slate-700">260</td><td className="px-4 py-3 text-slate-700">25 CM³</td><td className="px-4 py-3 text-slate-700">E2</td><td className="px-4 py-3 text-slate-700">82</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">CÖ020000N3</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">39,27 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">C01980982</td><td className="px-4 py-3 text-slate-700">270</td><td className="px-4 py-3 text-slate-700">39,27 CM³</td><td className="px-4 py-3 text-slate-700">E3</td><td className="px-4 py-3 text-slate-700">83</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : productName === 'TANDEM POMPALAR' && currentBrand === 'hema' ? (
                            <>
                              {/* Açıklama Metni */}
                              <div className="space-y-4 text-base leading-relaxed">
                                <p>
                                  <strong>TANDEM POMPALAR</strong>
                                </p>
                                <p>
                                  <strong>HEMA</strong>
                                </p>
                                <p>
                                  <strong>Tandem Pompalar: Güçlü Hidrolik Performansın Anahtarı</strong>
                                </p>
                                <p>
                                  Hidrolik sistemlerin temel yapı taşlarından biri olan tandem pompalar, işlevsellikleri ve sağlamlıklarıyla endüstriyel dünyada öne çıkıyor. Hidrolik pompa çeşitleri arasında önemli bir yere sahip olan tandem pompalar, birçok sektörde verimliliği artırmak ve güvenilir bir performans sunmak için tercih ediliyor.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Tandem Pompaların Gücü</h3>
                                <p>
                                  Hidrolik sistemlerde kullanılan bu pompalar, hidrolik akışkanlarını yüksek basınçlar altında ileterek güç sağlar. Dişli pompa teknolojisinin yanı sıra alüminyum gövdeli dişli pompaların sağladığı dayanıklılık, uzun ömür ve yüksek performans, endüstriyel uygulamalarda tercih edilme sebeplerinin başında gelir.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik Pompa Çeşitleri Arasında Öne Çıkanlar</h3>
                                <p>
                                  Tandem pompalar, hidrolik sistemlerin ihtiyaçlarına göre farklı kapasitelerde ve özelliklerde tasarlanabilir. Bu, kullanıcılara geniş bir yelpazede seçenek sunar ve farklı endüstriyel gereksinimlere uygun çözümler sunar. Hidrolik dişli pompa modelleri arasında yer alan tandem pompalar, güvenilirlikleri ve esnek yapılarıyla dikkat çeker.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Performans ve Verimlilikte Tandem Pompaların Rolü</h3>
                                <p>
                                  Hidrolik pompa fiyatları açısından ekonomik olmaları ve uzun ömürlü yapılarıyla, tandem pompalar uzun vadede maliyet tasarrufu sağlar. Bu pompalar, işletmeler için kesintisiz çalışma ve yüksek verimlilik anlamına gelir. Hidrolik pompası alırken, güvenilirlik, performans ve dayanıklılık gibi unsurlar göz önünde bulundurulmalıdır.
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Tandem Pompalarla Güvenilir Hidrolik Performans</h3>
                                <p>
                                  Hidrolik sistemlerdeki başarının anahtarı, güçlü ve dayanıklı parçaların bir araya gelmesiyle oluşur. Tandem pompalar, hidrolik pompa dünyasında bu gereklilikleri karşılayarak, kullanıcılarına güvenilir ve kesintisiz bir performans vadediyor.
                                </p>
                              </div>

                              {/* Ürün Tablosu */}
                              <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">TANDEM POMPALAR</h3>
                                <div className="rounded-lg border border-slate-200 overflow-hidden">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                      <thead className="bg-slate-50">
                                        <tr>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">MODEL</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">DEBİ (LT/DAK.)</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">KAPAK</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">DÖNÜŞ YÖNÜ</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">DEBİ</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">İLETİM HACMİ</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">MAKS. ÇIKIŞ BASINCI</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">MAKS.HIZ</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">MİN.HIZ</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">BAR</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">LİTRE</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">HACİM</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">MAKİNE TİPLERİ</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">ÇIKIŞ PORTU</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">GİRİŞ PORTU</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">İŞLETİM BASINCI (BAR)</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">ŞAFT TİPİ</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">KAPAK TİPİ</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">BASINÇ (BAR)</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">MAKS.BASINÇ</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">MAKS.DEVİR</th>
                                          <th className="px-2 py-2 text-left font-semibold text-slate-900 border-b border-slate-200 whitespace-nowrap">ÇALIŞMA BASINCI</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">1P1/1P1 /178</td><td className="px-2 py-2 text-slate-700">119+082</td><td className="px-2 py-2 text-slate-700">G TİPİ KAPAK (SAE A)</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">1P1/1P1 /276</td><td className="px-2 py-2 text-slate-700">119+082</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">SOL</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">1P1/1P1 /277</td><td className="px-2 py-2 text-slate-700">119+082</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">27628</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">11,8</td><td className="px-2 py-2 text-slate-700">8,2 CM³</td><td className="px-2 py-2 text-slate-700">250</td><td className="px-2 py-2 text-slate-700">3000</td><td className="px-2 py-2 text-slate-700">600</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">1PN.192.AG10 /247</td><td className="px-2 py-2 text-slate-700">27,6</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">19,2 CM³</td><td className="px-2 py-2 text-slate-700">250</td><td className="px-2 py-2 text-slate-700">3000</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">600</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">27369</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">280</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">3,9</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">27627</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">4 CM³</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">250</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">5,7</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">MF18-30001</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">250</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">8,7</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">27632</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">250</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">13,1</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">2P1/2P1/484</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">C</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">33,3+16,7</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">KOMATSU GD 655 / MAİN - STEERİ</td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">27505</td><td className="px-2 py-2 text-slate-700">119+082</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">F1PN040AGS3/101</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">4 CM³</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">35 - M6*1*13</td><td className="px-2 py-2 text-slate-700">40 - M6*1*13</td><td className="px-2 py-2 text-slate-700">250</td><td className="px-2 py-2 text-slate-700">SAE 16-4 9 DİŞ/15,5</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">F1PN040CGS3/102</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">5,7</td><td className="px-2 py-2 text-slate-700">4,0 CM³</td><td className="px-2 py-2 text-slate-700">250</td><td className="px-2 py-2 text-slate-700">3000</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">600</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">F1PN040CJT3/082</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">5,7</td><td className="px-2 py-2 text-slate-700">4,0 CM³</td><td className="px-2 py-2 text-slate-700">250</td><td className="px-2 py-2 text-slate-700">3000</td><td className="px-2 py-2 text-slate-700">600</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">F1PN040AB12/001</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">4,0 CM³</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">30 - M6*1*13</td><td className="px-2 py-2 text-slate-700">30 - M6*1*13</td><td className="px-2 py-2 text-slate-700">250</td><td className="px-2 py-2 text-slate-700">1/8</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">F1PN040AJT3/081</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">4,00 CM³</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">35 - M6*1*13</td><td className="px-2 py-2 text-slate-700">40 - M6*1*13</td><td className="px-2 py-2 text-slate-700">250</td><td className="px-2 py-2 text-slate-700">1/5</td><td className="px-2 py-2 text-slate-700">J</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                        <tr className="hover:bg-slate-50"><td className="px-2 py-2 font-medium text-slate-900">F1PN040CB12/002</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">4,0 CM³</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700">35 - M6*1*13</td><td className="px-2 py-2 text-slate-700">40 - M6*1*13</td><td className="px-2 py-2 text-slate-700">250</td><td className="px-2 py-2 text-slate-700">SAE 16-4 9 DİŞ/15,5</td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td><td className="px-2 py-2 text-slate-700"></td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="px-4 py-3 text-xs text-slate-500 bg-slate-50 border-t border-slate-200">
                                    <p className="mb-2"><strong>Not:</strong> Bu tablo, HEMA markasına ait TANDEM POMPALAR ürün serisinin örneklerini içermektedir. Tabloda yüzlerce ürün kodu bulunmaktadır. Tüm ürünler için detaylı bilgi, teknik özellikler ve fiyat bilgisi almak için lütfen bizimle iletişime geçin.</p>
                                    <p>Daha fazla ürün kodu ve detaylı teknik bilgiler için kataloğumuzu inceleyebilir veya satış ekibimizle görüşebilirsiniz.</p>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                              <p className="text-sm text-slate-500 italic">İçerik eklenecek...</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : selectedBrand && productName === 'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">{selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} Grupları</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Grup Kartları */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {getBrandGroups(selectedBrand, productName).map((group) => {
                  const img = getGroupImage(group)
                  return (
                    <div
                      key={group}
                      onClick={() => {
                        handleGroupCardClick(group, selectedBrand)
                      }}
                      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#ff7f00]/40 hover:shadow-2xl hover:shadow-[#ff7f00]/10"
                    >
                      {/* Image Container with Enhanced Design */}
                      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <img 
                          src={img} 
                          alt={group} 
                          className="h-full w-full object-contain p-6 transition-all duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/320x200.png?text=${encodeURIComponent(group)}`
                          }}
                        />
                        {/* Professional gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ff7f00]/0 via-transparent to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/5 group-hover:to-[#1e4294]/5" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex flex-1 flex-col p-6 pt-5">
                        <h3 className="mb-4 text-lg font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
                          {group}
                        </h3>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors duration-300 group-hover:text-slate-700">
                            Grup Detayı
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
          ) : selectedBrand && productName === 'ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">{selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} Grupları</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Grup Kartları */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {getBrandGroups(selectedBrand, productName).map((group) => {
                  const img = getGroupImage(group)
                  return (
                    <div
                      key={group}
                      onClick={() => {
                        handleGroupCardClick(group, selectedBrand)
                      }}
                      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#ff7f00]/40 hover:shadow-2xl hover:shadow-[#ff7f00]/10"
                    >
                      {/* Image Container with Enhanced Design */}
                      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <img 
                          src={img} 
                          alt={group} 
                          className="h-full w-full object-contain p-6 transition-all duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/320x200.png?text=${encodeURIComponent(group)}`
                          }}
                        />
                        {/* Professional gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ff7f00]/0 via-transparent to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/5 group-hover:to-[#1e4294]/5" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex flex-1 flex-col p-6 pt-5">
                        <h3 className="mb-4 text-lg font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
                          {group}
                        </h3>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors duration-300 group-hover:text-slate-700">
                            Grup Detayı
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
          ) : selectedBrand && productName === 'DÖKÜM GÖVDELİ DİŞLİ POMPALAR' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">{selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} Grupları</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Grup Kartları */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {getBrandGroups(selectedBrand, productName).map((group) => {
                  const img = getGroupImage(group)
                  return (
                    <div
                      key={group}
                      onClick={() => {
                        handleGroupCardClick(group, selectedBrand)
                      }}
                      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#ff7f00]/40 hover:shadow-2xl hover:shadow-[#ff7f00]/10"
                    >
                      {/* Image Container with Enhanced Design */}
                      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <img 
                          src={img} 
                          alt={group} 
                          className="h-full w-full object-contain p-6 transition-all duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/320x200.png?text=${encodeURIComponent(group)}`
                          }}
                        />
                        {/* Professional gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ff7f00]/0 via-transparent to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/5 group-hover:to-[#1e4294]/5" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex flex-1 flex-col p-6 pt-5">
                        <h3 className="mb-4 text-lg font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
                          {group}
                        </h3>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors duration-300 group-hover:text-slate-700">
                            Grup Detayı
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
          ) : selectedBrand && productName === 'PALETLİ POMPA' && !selectedPaletliPompaCard ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">{selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} Ürünleri</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedBrand(null)
                    setSelectedPaletliPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Kartlar */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {getPaletliPompaBrandCards(selectedBrand).map((card) => {
                  const img = getPaletliPompaCardImage(card)
                  return (
                    <div
                      key={card}
                      onClick={() => setSelectedPaletliPompaCard(card)}
                      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#ff7f00]/40 hover:shadow-2xl hover:shadow-[#ff7f00]/10"
                    >
                      {/* Image Container */}
                      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <img 
                          src={img} 
                          alt={card} 
                          className="h-full w-full object-contain p-6 transition-all duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/320x200.png?text=${encodeURIComponent(card)}`
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ff7f00]/0 via-transparent to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/5 group-hover:to-[#1e4294]/5" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex flex-1 flex-col p-6 pt-5">
                        <h3 className="mb-4 line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
                          {card}
                        </h3>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors duration-300 group-hover:text-slate-700">
                            Detay
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
          ) : selectedBrand && productName === 'PİSTONLU POMPA' && !selectedPistonluPompaCard ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">{selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} Ürünleri</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedBrand(null)
                    setSelectedPistonluPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Kartlar */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {getPistonluPompaBrandCards(selectedBrand).map((card) => {
                  const img = getPistonluPompaCardImage(card)
                  return (
                    <div
                      key={card}
                      onClick={() => setSelectedPistonluPompaCard(card)}
                      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#ff7f00]/40 hover:shadow-2xl hover:shadow-[#ff7f00]/10"
                    >
                      {/* Image Container */}
                      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <img 
                          src={img} 
                          alt={card} 
                          className="h-full w-full object-contain p-6 transition-all duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/320x200.png?text=${encodeURIComponent(card)}`
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ff7f00]/0 via-transparent to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/5 group-hover:to-[#1e4294]/5" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex flex-1 flex-col p-6 pt-5">
                        <h3 className="mb-4 line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
                          {card}
                        </h3>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors duration-300 group-hover:text-slate-700">
                            Detay
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
          ) : selectedBrand && productName === 'DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER' && !selectedDokumGovdeDisliAkisBoluculerCard ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">{selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} Ürünleri</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedBrand(null)
                    setSelectedDokumGovdeDisliAkisBoluculerCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Kartlar */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {getDokumGovdeDisliAkisBoluculerBrandCards(selectedBrand).map((card) => {
                  const img = getDokumGovdeDisliAkisBoluculerCardImage(card)
                  return (
                    <div
                      key={card}
                      onClick={() => setSelectedDokumGovdeDisliAkisBoluculerCard(card)}
                      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#ff7f00]/40 hover:shadow-2xl hover:shadow-[#ff7f00]/10"
                    >
                      {/* Image Container */}
                      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <img 
                          src={img} 
                          alt={card} 
                          className="h-full w-full object-contain p-6 transition-all duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/320x200.png?text=${encodeURIComponent(card)}`
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ff7f00]/0 via-transparent to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/5 group-hover:to-[#1e4294]/5" />
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex flex-1 flex-col p-6 pt-5">
                        <h3 className="mb-4 line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
                          {card}
                        </h3>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors duration-300 group-hover:text-slate-700">
                            Detay
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
          ) : selectedPistonluPompaCard && selectedBrand === 'casappa' && productName === 'PİSTONLU POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">CASAPPA</p>
                  <h2 className="text-xl font-semibold">{selectedPistonluPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPistonluPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getCasappaPistonluPompaProductData(selectedPistonluPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  {selectedPistonluPompaCard === 'EKSENEL PİSTONLU POMPA' ? (
                                    <>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ÇALIŞMA BASINCI</th>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KAPAK TİPİ</th>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                    </>
                                  ) : (
                                    <>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MİL-KAPAK TİPİ</th>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">POMPA VERSİYON</th>
                                    </>
                                  )}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    {selectedPistonluPompaCard === 'EKSENEL PİSTONLU POMPA' ? (
                                      <>
                                        <td className="px-4 py-3 text-slate-700">{product.calismaBasinci}</td>
                                        <td className="px-4 py-3 text-slate-700">{product.iletimHacmi}</td>
                                        <td className="px-4 py-3 text-slate-700">{product.kapakTipi}</td>
                                        <td className="px-4 py-3 text-slate-700">{product.maksHiz}</td>
                                      </>
                                    ) : (
                                      <>
                                        <td className="px-4 py-3 text-slate-700">{product.basinc}</td>
                                        <td className="px-4 py-3 text-slate-700">{product.maksHiz}</td>
                                        <td className="px-4 py-3 text-slate-700">{product.milKapakTipi}</td>
                                        <td className="px-4 py-3 text-slate-700">{product.pompaVersiyon}</td>
                                      </>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, CASAPPA {selectedPistonluPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedPistonluPompaCard && selectedBrand === 'hema' && productName === 'PİSTONLU POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">HEMA</p>
                  <h2 className="text-xl font-semibold">{selectedPistonluPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPistonluPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getHemaPistonluPompaProductData(selectedPistonluPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">DEV/DAK</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">POMPA VERSİYON</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.basinc}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.devDak}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.pompaVersiyon}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, HEMA {selectedPistonluPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedPistonluPompaCard && selectedBrand === 'gold' && productName === 'PİSTONLU POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">GOLD</p>
                  <h2 className="text-xl font-semibold">{selectedPistonluPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPistonluPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getGoldPistonluPompaProductData(selectedPistonluPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">AĞIRLIK</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ÇIKINTI TORKU</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">GİRİŞ VE ÇIKIŞ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS. SINIRLI POMPA HIZI</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS. SÜREKLİ POMPA HIZI</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAX.ALAN S. SÜREK BASINÇ (BAR)</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAX.ALAN SAY. 350 B. TORK</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAX.ALAN SAYISI ARALIK</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ROTASYON</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.agirlik}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.cikintiTorku}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.girisVeCikis}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.iletimHacmi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.maksSinirliPompaHizi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.maksSurekliPompaHizi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.maxAlanSSurekBasinc}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.maxAlanSay350BTork}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.maxAlanSayisiAralik}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.rotasyon}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, GOLD {selectedPistonluPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedPistonluPompaCard && selectedBrand === 'celebi' && productName === 'PİSTONLU POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">ÇELEBİ</p>
                  <h2 className="text-xl font-semibold">{selectedPistonluPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPistonluPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getCelebiPistonluPompaProductData(selectedPistonluPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">AĞIRLIK</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ÇIKINTI TORKU</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">GİRİŞ VE ÇIKIŞ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAX.ALAN S. SÜREK BASINÇ (BAR)</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAX.ALAN SAY SINIRLI HIZ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAX.ALAN SAY SÜREKLİ HIZ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAX.ALAN SAY. 350 B. TORK</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAX.ALAN SAYISI ARALIK</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ROTASYON</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.agirlik}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.cikintiTorku}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.girisVeCikis}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.iletimHacmi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.maxAlanSSurekBasinc}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.maxAlanSaySinirliHiz}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.maxAlanSaySurekliHiz}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.maxAlanSay350BTork}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.maxAlanSayisiAralik}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.rotasyon}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, ÇELEBİ {selectedPistonluPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedPistonluPompaCard && selectedBrand === 'samhydraulic' && productName === 'PİSTONLU POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">SAMHYDRAULIC</p>
                  <h2 className="text-xl font-semibold">{selectedPistonluPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPistonluPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getSamhydraulicPistonluPompaProductData(selectedPistonluPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">HIZ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.DEBİ (LT./DAK)</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MİL ÇAPI</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">TORK</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.basinc}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.hiz}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.iletimHacmi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.maksDebi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.milCapi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.tork}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, SAMHYDRAULIC {selectedPistonluPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedPistonluPompaCard && selectedBrand === 'linde' && productName === 'PİSTONLU POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">LINDE</p>
                  <h2 className="text-xl font-semibold">{selectedPistonluPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPistonluPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getLindePistonluPompaProductData(selectedPistonluPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">DEV/DAK</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">FLANŞ TİPİ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KONTROL TİPİ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MİL TİPİ</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.basinc}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.devDak}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.flansTipi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.iletimHacmi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.kontrolTipi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.milTipi}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, LINDE {selectedPistonluPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedPistonluPompaCard && selectedBrand === 'kawasaki' && productName === 'PİSTONLU POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">KAWASAKI</p>
                  <h2 className="text-xl font-semibold">{selectedPistonluPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPistonluPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getKawasakiPistonluPompaProductData(selectedPistonluPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">FLANŞ TİPİ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KONTROL TİPİ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MİL TİPİ</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.flansTipi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.iletimHacmi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.kontrolTipi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.milTipi}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, KAWASAKI {selectedPistonluPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedPistonluPompaCard && selectedBrand === 'pzb' && productName === 'PİSTONLU POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">PZB</p>
                  <h2 className="text-xl font-semibold">{selectedPistonluPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPistonluPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getPzbPistonluPompaProductData(selectedPistonluPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ÇALIŞMA BASINCI</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">DEBİ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.calismaBasinci}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.debi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.maksHiz}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, PZB {selectedPistonluPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedPistonluPompaCard && selectedBrand === 'hpt' && productName === 'PİSTONLU POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">HPT</p>
                  <h2 className="text-xl font-semibold">{selectedPistonluPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPistonluPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getHptPistonluPompaProductData(selectedPistonluPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">LİTRE</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.basinc}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.iletimHacmi}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.litre}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.maksHiz}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, HPT {selectedPistonluPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedPistonluPompaCard && selectedBrand === 'sunfab' && productName === 'PİSTONLU POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">SUNFAB</p>
                  <h2 className="text-xl font-semibold">{selectedPistonluPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPistonluPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getSunfabPistonluPompaProductData(selectedPistonluPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  {category.name === 'EKSENEL (ENDÜSTRİYEL) PİSTONLU POMPALAR' ? (
                                    <>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MİL TİPİ</th>
                                    </>
                                  ) : (
                                    <>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KAPAK</th>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.BASINÇ (BAR)</th>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MİL TİPİ</th>
                                    </>
                                  )}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    {category.name === 'EKSENEL (ENDÜSTRİYEL) PİSTONLU POMPALAR' ? (
                                      <>
                                        <td className="px-4 py-3 text-slate-700">{product.basinc}</td>
                                        <td className="px-4 py-3 text-slate-700">{product.iletimHacmi}</td>
                                        <td className="px-4 py-3 text-slate-700">{product.maksHiz}</td>
                                        <td className="px-4 py-3 text-slate-700">{product.milTipi}</td>
                                      </>
                                    ) : (
                                      <>
                                        <td className="px-4 py-3 text-slate-700">{product.iletimHacmi}</td>
                                        <td className="px-4 py-3 text-slate-700">{product.kapak}</td>
                                        <td className="px-4 py-3 text-slate-700">{product.maksBasinc}</td>
                                        <td className="px-4 py-3 text-slate-700">{product.maksHiz}</td>
                                        <td className="px-4 py-3 text-slate-700">{product.milTipi}</td>
                                      </>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, SUNFAB {selectedPistonluPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedPaletliPompaCard && selectedBrand === 'berarma' && productName === 'PALETLİ POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">BERARMA</p>
                  <h2 className="text-xl font-semibold">{selectedPaletliPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPaletliPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getBerarmaProductData(selectedPaletliPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">KONTROL TİPİ</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.BASINÇ (BAR)</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.HIZ</th>
                                  {category.products.some(p => p.regülasyon) && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">REGÜLASYON TİPİ</th>
                                  )}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.hacim}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.kontrol || '-'}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.basinc || '-'}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.hiz || '-'}</td>
                                    {category.products.some(p => p.regülasyon) && (
                                      <td className="px-4 py-3 text-slate-700">{product.regülasyon || '-'}</td>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, BERARMA {selectedPaletliPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedPaletliPompaCard && selectedBrand === 'hystar' && productName === 'PALETLİ POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">HYSTAR</p>
                  <h2 className="text-xl font-semibold">{selectedPaletliPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPaletliPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getHystarProductData(selectedPaletliPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL</th>
                                  {category.products[0].basinc && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BASINÇ (BAR)</th>
                                  )}
                                  {category.products[0].hacim && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">
                                      {selectedPaletliPompaCard === 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR' && category.name.includes('TANDEM') ? 'İLETİM HACMİ' : category.name.includes('TANDEM') ? 'İLETİM HACMİ' : selectedPaletliPompaCard === 'V10-V20 ENDÜSTRİYEL VE MOBİL POMPALAR' ? 'DEPLASMAN(CC/DEV)' : 'İLETİM HACMİ'}
                                    </th>
                                  )}
                                  {category.products[0].hiz && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">
                                      {category.name.includes('TANDEM') ? 'DEV/DAK' : selectedPaletliPompaCard === 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR' ? 'MİN-MAX HIZ (D/DK)' : 'MAKS.HIZ'}
                                    </th>
                                  )}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    {product.basinc && (
                                      <td className="px-4 py-3 text-slate-700">{product.basinc}</td>
                                    )}
                                    {product.hacim && (
                                      <td className="px-4 py-3 text-slate-700">{product.hacim}</td>
                                    )}
                                    {product.hiz && (
                                      <td className="px-4 py-3 text-slate-700">{product.hiz}</td>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, HYSTAR {selectedPaletliPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedPaletliPompaCard && selectedBrand === 'hytek' && productName === 'PALETLİ POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">HYTEK</p>
                  <h2 className="text-xl font-semibold">{selectedPaletliPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPaletliPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getHytekProductData(selectedPaletliPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  {category.products.some(p => p.basinc || p.maksBasinc) && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">
                                      {selectedPaletliPompaCard === 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR' ? 'BASINÇ (BAR)' : 'BASINÇ (BAR)'}
                                    </th>
                                  )}
                                  {category.products.some(p => p.galon || p.hacim || p.deplasman) && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">
                                      {selectedPaletliPompaCard === 'V10-V20 ENDÜSTRİYEL VE MOBİL POMPALAR' ? (category.name === 'V10' ? 'DEPLASMAN(CC/DEV)' : 'GALON') : 
                                       category.products.some(p => p.galon) ? 'GALON' : 
                                       category.products.some(p => p.deplasman) ? 'DEPLASMAN(CC/DEV)' : 
                                       'İLETİM HACMİ'}
                                    </th>
                                  )}
                                  {category.products.some(p => p.hiz || p.minMaxHiz) && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">
                                      {selectedPaletliPompaCard === 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR' ? 'MİN-MAX HIZ (D/DK)' : 'MAKS.HIZ'}
                                    </th>
                                  )}
                                  {category.products.some(p => p.seri) && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">SERİ</th>
                                  )}
                                  {category.products.some(p => p.versiyon) && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">POMPA VERSİYON</th>
                                  )}
                                  {category.products.some(p => p.tip) && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">TİPİ</th>
                                  )}
                                  {category.products.some(p => p.maksBasinc && !p.basinc) && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKS.BASINÇ (BAR)</th>
                                  )}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => {
                                  const hasBasinc = category.products.some(p => p.basinc || p.maksBasinc)
                                  const hasGalonHacim = category.products.some(p => p.galon || p.hacim || p.deplasman)
                                  const hasHiz = category.products.some(p => p.hiz || p.minMaxHiz)
                                  const hasSeri = category.products.some(p => p.seri)
                                  const hasVersiyon = category.products.some(p => p.versiyon)
                                  const hasTip = category.products.some(p => p.tip)
                                  const hasMaksBasinc = category.products.some(p => p.maksBasinc && !p.basinc)
                                  
                                  return (
                                    <tr key={prodIndex} className="hover:bg-slate-50">
                                      <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                      {hasBasinc && (
                                        <td className="px-4 py-3 text-slate-700">{product.basinc || product.maksBasinc || '-'}</td>
                                      )}
                                      {hasGalonHacim && (
                                        <td className="px-4 py-3 text-slate-700">{product.galon || product.hacim || product.deplasman || '-'}</td>
                                      )}
                                      {hasHiz && (
                                        <td className="px-4 py-3 text-slate-700">{product.hiz || product.minMaxHiz || '-'}</td>
                                      )}
                                      {hasSeri && (
                                        <td className="px-4 py-3 text-slate-700">{product.seri || '-'}</td>
                                      )}
                                      {hasVersiyon && (
                                        <td className="px-4 py-3 text-slate-700">{product.versiyon || '-'}</td>
                                      )}
                                      {hasTip && (
                                        <td className="px-4 py-3 text-slate-700">{product.tip || '-'}</td>
                                      )}
                                      {hasMaksBasinc && (
                                        <td className="px-4 py-3 text-slate-700">{product.maksBasinc || '-'}</td>
                                      )}
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, HYTEK {selectedPaletliPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedPaletliPompaCard && selectedBrand === 'oxim' && productName === 'PALETLİ POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">OXIM</p>
                  <h2 className="text-xl font-semibold">{selectedPaletliPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPaletliPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* İçerik */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                {selectedPaletliPompaCard === 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR' ? (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">DEĞİŞKEN DEBİLİ PALETLİ POMPALAR</h3>
                      <p className="text-sm text-slate-600 mb-4">MEKANİK BASINÇ REG. DEĞ. DEB. PALETLİ POMPALAR</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gradient-to-r from-[#1e4294] to-[#1e4294]/90 text-white">
                            <th className="border border-slate-300 px-4 py-3 text-left font-semibold">İLETİM HACMİ</th>
                            <th className="border border-slate-300 px-4 py-3 text-left font-semibold">MAKS.BASINÇ (BAR)</th>
                            <th className="border border-slate-300 px-4 py-3 text-left font-semibold">MAKS.HIZ</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">VPV1-08-70</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">5,3 CM³</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">70</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">800-1800</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">VPV1-12-70</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">6,6 CM³</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">70</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">800-1800</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">VPV1-15-70</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">8,3 CM³</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">70</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">800-1800</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">VPV1-20-70</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">11,10 CM³</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">50-70</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">800-1800</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">VPV2-30-70</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">16,70 CM³</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">50-70</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">800-1800</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : selectedPaletliPompaCard === 'V10-V20 ENDÜSTRİYEL VE MOBİL POMPALAR' ? (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">V10-V20 ENDÜSTRİYEL VE MOBİL POMPALAR</h3>
                      <p className="text-sm text-slate-600 mb-4">V10</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gradient-to-r from-[#1e4294] to-[#1e4294]/90 text-white">
                            <th className="border border-slate-300 px-4 py-3 text-left font-semibold">DEPLASMAN(CC/DEV)</th>
                            <th className="border border-slate-300 px-4 py-3 text-left font-semibold">MAKS.BASINÇ (BAR)</th>
                            <th className="border border-slate-300 px-4 py-3 text-left font-semibold">MAKS.HIZ</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">PVL1-10-F-1R-U-10</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">9,04 CM³</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">210</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">750-1800</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">PVL1-12-F-1R-U-10</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">12,02 CM³</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">210</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">750-1800</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">PVL1-14-F-1R-U-10</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">13,07 CM³</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">210</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">750-1800</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">PVL1-23-F-1R-U-10</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">22,07 CM³</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">210</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">750-1800</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="border border-slate-300 px-4 py-3 font-medium text-slate-900">PVL1-25-F-1R-U-10</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">25,03 CM³</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">210</td>
                            <td className="border border-slate-300 px-4 py-3 text-slate-700">750-1800</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : null}
              </div>
            </>
          ) : selectedPaletliPompaCard && selectedBrand === 'kcl' && productName === 'PALETLİ POMPA' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">KCL</p>
                  <h2 className="text-xl font-semibold">{selectedPaletliPompaCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedPaletliPompaCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getKclProductData(selectedPaletliPompaCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  {category.products[0].debi && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">DEBİ</th>
                                  )}
                                  {category.products[0].basinc && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">
                                      {selectedPaletliPompaCard === 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR' ? 'MAKS.BASINÇ (BAR)' : 'BASINÇ (BAR)'}
                                    </th>
                                  )}
                                  {category.products[0].hiz && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">
                                      {selectedPaletliPompaCard === 'DEĞİŞKEN DEBİLİ PALETLİ POMPALAR' ? 'MİN-MAX HIZ (D/DK)' : 'DEV/DAK'}
                                    </th>
                                  )}
                                  {category.products[0].hacim && (
                                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">İLETİM HACMİ</th>
                                  )}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    {product.debi && (
                                      <td className="px-4 py-3 text-slate-700">{product.debi}</td>
                                    )}
                                    {product.basinc && (
                                      <td className="px-4 py-3 text-slate-700">{product.basinc}</td>
                                    )}
                                    {product.hiz && (
                                      <td className="px-4 py-3 text-slate-700">{product.hiz}</td>
                                    )}
                                    {product.hacim && (
                                      <td className="px-4 py-3 text-slate-700">{product.hacim}</td>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, KCL {selectedPaletliPompaCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedDokumGovdeDisliAkisBoluculerCard && selectedBrand === 'casappa' && productName === 'DÖKÜM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">CASAPPA</p>
                  <h2 className="text-xl font-semibold">{selectedDokumGovdeDisliAkisBoluculerCard}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedDokumGovdeDisliAkisBoluculerCard(null)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Ürün Tablosu */}
              {(() => {
                const productData = getCasappaDokumGovdeDisliAkisBoluculerProductData(selectedDokumGovdeDisliAkisBoluculerCard)
                if (!productData) return null
                
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {productData.categories.map((category, catIndex) => (
                      <div key={catIndex} className={catIndex > 0 ? 'mt-8 pt-8 border-t border-slate-200' : ''}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{category.name}</h3>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MODEL KODU</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">BAR</th>
                                  <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">DEBİ</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {category.products.map((product, prodIndex) => (
                                  <tr key={prodIndex} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{product.kod}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.bar}</td>
                                    <td className="px-4 py-3 text-slate-700">{product.debi}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-6 border-t border-slate-200 px-4 py-3 text-xs text-slate-500 bg-slate-50 rounded-lg">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, CASAPPA {selectedDokumGovdeDisliAkisBoluculerCard} ürün serisinin teknik özelliklerini içermektedir. Detaylı bilgi, fiyat ve teknik destek için lütfen bizimle iletişime geçin.</p>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedBrand && productName === 'İŞ MAKİNESİ POMPALARI' && currentBrand === 'david-brown' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">DAVID BROWN</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedBrand(null)
                    navigate(`/urunler/pompa/is-makinesi-pompalari`)
                  }}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* İçerik */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                {/* Açıklama Metni */}
                <div className="space-y-4 text-base leading-relaxed mb-8">
                  <h1 className="text-2xl font-bold text-slate-900 mb-4">İş Makinelerinde Hidrolik Pompalar: Verimliliğin Anahtarı</h1>
                  <p>
                    Hidrolik pompalar, iş makinelerinin güç kaynağıdır. David Brown ve Hema gibi öncü markaların ürettiği çeşitleriyle, iş makinelerinin performansını artırmak ve güvenilirlik sağlamak için vazgeçilmezdir.
                  </p>

                  <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik İş Makinası Pompalarının Çeşitleri</h3>
                  <p>
                    Alüminyum gövdeli dişli pompalar, sağlamlık ve hafiflikleriyle öne çıkar. Diğer çeşitler ise farklı basınç ve debi ihtiyaçlarını karşılamak üzere özel olarak tasarlanmıştır. Her iş makinesi için en uygun hidrolik pompa, güç, dayanıklılık ve performans açısından en iyi sonucu verir.
                  </p>

                  <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik İş Makinası Pompalarının Özellikleri</h3>
                  <p>
                    Bu pompaların dayanıklı yapıları ve yüksek performansı, iş makinelerinde kesintisiz bir çalışma sağlar. Alüminyum gövdeli dişli pompalar, uzun ömürleri ve düşük bakım gereksinimleriyle maliyet-etkin bir seçenek sunar. David Brown ve Hema'nın ürünleri, sektörde kalite ve güvenilirlik standartlarını belirler.
                  </p>

                  <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">Hidrolik İş Makinası Pompaları Fiyatları</h3>
                  <p>
                    Fiyatlar, pompaların özellikleri ve markalarına göre değişir. Alüminyum gövdeli dişli pompalar, genellikle ekonomik bir seçenek sunar. Ancak, özel fonksiyonlara sahip veya yüksek performans gerektiren iş makineleri için tasarlanmış modeller daha yüksek maliyetlere sahip olabilir.
                  </p>

                  <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">İş Makinelerinde Hidrolik Pompaların Önemi</h3>
                  <p>
                    Hidrolik pompalar, iş makinelerinin gücünü ve verimliliğini belirler. Her iş makinesi, doğru pompa seçimiyle performansını artırabilir ve uzun vadede işletme maliyetlerini azaltabilir. David Brown ve Hema gibi lider markalar, sektördeki en iyi hidrolik pompaları sunarak iş makinelerinin güvenilirliğini ve verimliliğini artırır.
                  </p>

                  <p className="mt-6 text-slate-600">
                    Bu ürün sayfası, iş makinelerinde kritik bir rol oynayan hidrolik pompaların çeşitliliği, özellikleri ve fiyatları hakkında bilgi sunmaktadır. İş makineleri sahipleri, işletmecileri ve endüstri profesyonelleri için doğru seçimi yapmalarına yardımcı olacak temel bilgileri içermektedir.
                  </p>
                </div>

                {/* Ürün Tablosu */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">İŞ MAKİNESİ POMPALARI - ÜRÜN LİSTESİ</h3>
                  <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">PARTİ KODU</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">DÖNÜŞ YÖNÜ</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">HACİM</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">MAKİNE TİPLERİ</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">ORİJİNAL KODU</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">001101</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">KOMATSU HD785-5 ( 785-3-2 )</td><td className="px-4 py-3 text-slate-700">705-22-44020</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">002602</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">53+53</td><td className="px-4 py-3 text-slate-700">KOMATSU HANOMAG WA270-3</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">002608</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">53</td><td className="px-4 py-3 text-slate-700">KOMATSU HANOMAG WA270</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">002610</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">53+53</td><td className="px-4 py-3 text-slate-700">KOMATSU HANOMAG WA270</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">002611</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">53+32</td><td className="px-4 py-3 text-slate-700">KOMATSU HANOMAG WA270 PT</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">002616</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">41+29</td><td className="px-4 py-3 text-slate-700">CUMITAS 885,888</td><td className="px-4 py-3 text-slate-700">CUKUROVA 885</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">003702</td><td className="px-4 py-3 text-slate-700">SET</td><td className="px-4 py-3 text-slate-700">SET</td><td className="px-4 py-3 text-slate-700">SANKO BHL MEC.SET- OLD</td><td className="px-4 py-3 text-slate-700">MST422,442,444</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">003704</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">37+36</td><td className="px-4 py-3 text-slate-700">FERMEC 960 NEW 2002 VE ÖNCESİ</td><td className="px-4 py-3 text-slate-700">6102161M91</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">003901</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">85</td><td className="px-4 py-3 text-slate-700">KOMATSU 420/FRONT PUMP</td><td className="px-4 py-3 text-slate-700">LOADER</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">004101</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">24.3</td><td className="px-4 py-3 text-slate-700">TAMROCK T35D/T40D</td><td className="px-4 py-3 text-slate-700">04702910</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">004202</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">70.1</td><td className="px-4 py-3 text-slate-700">JCB 416/430 Z</td><td className="px-4 py-3 text-slate-700">919/74700</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">006101</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">58.7</td><td className="px-4 py-3 text-slate-700">LANSING LINDE - 356 F/L TRUCK</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">006201</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">45+63</td><td className="px-4 py-3 text-slate-700">KOM.420 DZ-3</td><td className="px-4 py-3 text-slate-700">705-52-30560 - 58</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">006601</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">85+73</td><td className="px-4 py-3 text-slate-700">LINDE 356 TRUCK - C360/C400 KO</td><td className="px-4 py-3 text-slate-700">H729933-(3563001000)</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">006602</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">73+53</td><td className="px-4 py-3 text-slate-700">LINDE 356 TRUCK - C360/C400 KO</td><td className="px-4 py-3 text-slate-700">H729755-(3563001001)</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">006901</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">65.86</td><td className="px-4 py-3 text-slate-700">MF 60H,60NX</td><td className="px-4 py-3 text-slate-700">147143M92</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">007201</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">70.1</td><td className="px-4 py-3 text-slate-700">KOMATSU WA 320-1/380-1/400-1/4</td><td className="px-4 py-3 text-slate-700">705-11-35010</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">007701</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">85+23</td><td className="px-4 py-3 text-slate-700">KOMATSU HD325-7R / HD405-7</td><td className="px-4 py-3 text-slate-700">705-52-31250</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">008801</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">85+85</td><td className="px-4 py-3 text-slate-700">TEREX EQUIPMENT LIMITED</td><td className="px-4 py-3 text-slate-700">15259248</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">009001</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">MINE SCOOP UNATRAC</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">009302</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">45+45+45</td><td className="px-4 py-3 text-slate-700">CVS CONTAINER CRANE</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">009501</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">70,1+58,7+58,7</td><td className="px-4 py-3 text-slate-700">GROVE COLES CRANE</td><td className="px-4 py-3 text-slate-700">919/24700</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">010105</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">DRESSER RAND GAS TURBINE</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">010704</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">POWERSCREEN-ROCK SCREEN</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">010708</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">27+27+27</td><td className="px-4 py-3 text-slate-700">POWERSCREEN</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">010709</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">27</td><td className="px-4 py-3 text-slate-700">POWERSCREEN</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">011104</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">TEREX</td><td className="px-4 py-3 text-slate-700">15247491</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">011106</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">137</td><td className="px-4 py-3 text-slate-700">KALMAR CONTAINER FORKLIFT</td><td className="px-4 py-3 text-slate-700">FORKLIFT</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">011109</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">220+19</td><td className="px-4 py-3 text-slate-700">TEREX</td><td className="px-4 py-3 text-slate-700">15255604</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">012001</td><td className="px-4 py-3 text-slate-700">D</td><td className="px-4 py-3 text-slate-700">70.1</td><td className="px-4 py-3 text-slate-700">GROVE COLES CRANE RT620 KİTS</td><td className="px-4 py-3 text-slate-700">7722990146</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">012101</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">85,7+51,8</td><td className="px-4 py-3 text-slate-700">LINDE LANSING</td><td className="px-4 py-3 text-slate-700">H760023000</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">015502</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">85,7+24,3</td><td className="px-4 py-3 text-slate-700">BOSS</td><td className="px-4 py-3 text-slate-700">9740374</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">015701</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">32</td><td className="px-4 py-3 text-slate-700">MARINE CRANE HYDRALIFT</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">015702</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">45</td><td className="px-4 py-3 text-slate-700">MARINE CRANE HYDRALIFT</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">015704</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">27</td><td className="px-4 py-3 text-slate-700">MARINE CRANE HYDRALIFT</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">015705</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">38</td><td className="px-4 py-3 text-slate-700">MARINE CRANE HYDRALIFT</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">015711</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">53+23</td><td className="px-4 py-3 text-slate-700">HIDROMEK- BEFORE 2003</td><td className="px-4 py-3 text-slate-700">HMK100</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">015801</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">239.8</td><td className="px-4 py-3 text-slate-700">UMOE SCHAT-FOR EMERGENCY BOAT</td><td className="px-4 py-3 text-slate-700">VİNÇ</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">015802</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">220</td><td className="px-4 py-3 text-slate-700">UMOE SCHAT</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">015810</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">239.8</td><td className="px-4 py-3 text-slate-700">UMOE SCHAT-FOR EMERGENCY BOAT</td><td className="px-4 py-3 text-slate-700">VİNÇ</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">016201</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">53+19</td><td className="px-4 py-3 text-slate-700">CASE 580SL</td><td className="px-4 py-3 text-slate-700">3239529099</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">016202</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">187</td><td className="px-4 py-3 text-slate-700">KOM.D155A DOZER</td><td className="px-4 py-3 text-slate-700">07446-66104</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">016203</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">130</td><td className="px-4 py-3 text-slate-700">HL 780-3 LOADER</td><td className="px-4 py-3 text-slate-700">31L6-01400</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">016205</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">KOMATSU HD785-5 (785-3-2)</td><td className="px-4 py-3 text-slate-700">705-22-44020</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">016301</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">70.1</td><td className="px-4 py-3 text-slate-700">BOSS</td><td className="px-4 py-3 text-slate-700">7583189</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">016702</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">31.6</td><td className="px-4 py-3 text-slate-700">TOYOTA FORKLIFT</td><td className="px-4 py-3 text-slate-700">FORKLIFT</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">017202</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">63</td><td className="px-4 py-3 text-slate-700">MOXY - MT36 DUMPER</td><td className="px-4 py-3 text-slate-700">55692</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">017203</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">36+26</td><td className="px-4 py-3 text-slate-700">CUMITAS 883,885,888 -2010</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">020101</td><td className="px-4 py-3 text-slate-700">SET</td><td className="px-4 py-3 text-slate-700">SET</td><td className="px-4 py-3 text-slate-700">SANKO BHL MEC.SET- 2008</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">020303</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">101.1</td><td className="px-4 py-3 text-slate-700">GROVE COLES CRANE</td><td className="px-4 py-3 text-slate-700">8871297</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">020501</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">85,7+41,5</td><td className="px-4 py-3 text-slate-700">JCB 428</td><td className="px-4 py-3 text-slate-700">919/72700</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">021817</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">149.9</td><td className="px-4 py-3 text-slate-700">SAMSUNG W/LOADER LX473</td><td className="px-4 py-3 text-slate-700">P2045-02310</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">021818</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">67,7+16</td><td className="px-4 py-3 text-slate-700">SAMSUNG LX473 WHEELED LOADER</td><td className="px-4 py-3 text-slate-700">P2042-07730</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">021824</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">67,7+16</td><td className="px-4 py-3 text-slate-700">SAMSUNG W/LOADER LX473</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">021827</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">155</td><td className="px-4 py-3 text-slate-700">SAMSUNG W/LOADER LX473 - B</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">021903</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">100+100</td><td className="px-4 py-3 text-slate-700">HYUNDAI HL 770-3</td><td className="px-4 py-3 text-slate-700">21903</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">022101</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">58.7</td><td className="px-4 py-3 text-slate-700">HYUNDAI - HL770-4</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">022505</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">85+73</td><td className="px-4 py-3 text-slate-700">MOXY - MT40 B HAULER</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">023101</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">41.3</td><td className="px-4 py-3 text-slate-700">MOXY - MT40 B + COLES AT633/RT</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">024001</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">85,7+70,1</td><td className="px-4 py-3 text-slate-700">MOXY - MT40 B HAULER</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">024002</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">70.1</td><td className="px-4 py-3 text-slate-700">MOXY - MT40 B HAULER</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">025604</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">LANSING LINDE - 357 REACH TRUC</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">025605</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">73+45</td><td className="px-4 py-3 text-slate-700">LANSING LINDE- 357 REACH TRUCK</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">025701</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">85,7+31,6</td><td className="px-4 py-3 text-slate-700">GROVE COLES CRANE</td><td className="px-4 py-3 text-slate-700">7722990148</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">026301</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">73+53</td><td className="px-4 py-3 text-slate-700">TAMROCK</td><td className="px-4 py-3 text-slate-700">DRILL.MAC.</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">026701</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">70,1+41,5+41,5</td><td className="px-4 py-3 text-slate-700">GROVE COLES CRANE</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">027302</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">85+32</td><td className="px-4 py-3 text-slate-700">CLARK FORKLIFT TRUCK OME GA 16</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">027303</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">70+70</td><td className="px-4 py-3 text-slate-700">CLARK FORKLIFT TRUCK</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">028711</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">70,1+51,8</td><td className="px-4 py-3 text-slate-700">KAWASAKI 80Z</td><td className="px-4 py-3 text-slate-700">LOADER</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">030011</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">53+53</td><td className="px-4 py-3 text-slate-700">HYDALIFT MARINE CRANE</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">030014</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">117</td><td className="px-4 py-3 text-slate-700">UMOE SCHAT</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">030801</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">70,1+29,5</td><td className="px-4 py-3 text-slate-700">TIGER CAT</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">032113</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">187+137</td><td className="px-4 py-3 text-slate-700">VALMET GEAR</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">032116</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">42+23</td><td className="px-4 py-3 text-slate-700">VALMET GEAR</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">032136</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">42+42</td><td className="px-4 py-3 text-slate-700">VALMET GEAR</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">032137</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">42+42</td><td className="px-4 py-3 text-slate-700">VALMET GEAR</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">032145</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">239,8+109,3</td><td className="px-4 py-3 text-slate-700">VALMET GEAR</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">032704</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">117</td><td className="px-4 py-3 text-slate-700">TAMROCK TORO DUMPER T35D/T40D</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">035703</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">51.8+14.6+19.4</td><td className="px-4 py-3 text-slate-700">TAMROCK 400-500</td><td className="px-4 py-3 text-slate-700">81491389</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">035806</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">100+16</td><td className="px-4 py-3 text-slate-700">HYUNDAI HL 780-3 LOADER</td><td className="px-4 py-3 text-slate-700">31L6-01380</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">035809</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">16</td><td className="px-4 py-3 text-slate-700">HYUNDAI HL 780-3 LOADER</td><td className="px-4 py-3 text-slate-700">31L6-01380</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">036003</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">63+63</td><td className="px-4 py-3 text-slate-700">HYUNDAI HL 760 WHEELED LOADER</td><td className="px-4 py-3 text-slate-700">34L4-01670</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">036006</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">63+63</td><td className="px-4 py-3 text-slate-700">HYUNDAI</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">036009</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">63+63</td><td className="px-4 py-3 text-slate-700">HYUNDAI HL 760 WHEEL LOADER</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">036901</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">38</td><td className="px-4 py-3 text-slate-700">POCLAIN P90 EXCAVATOR 1984</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">037101</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">117+117</td><td className="px-4 py-3 text-slate-700">TAMROCK TORO LOADER</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">037102</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">117</td><td className="px-4 py-3 text-slate-700">TAMROCK TORO LOADER</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">037501</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">110,8+85,7</td><td className="px-4 py-3 text-slate-700">TEREX</td><td className="px-4 py-3 text-slate-700">15255603</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">037702</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">51,8+24</td><td className="px-4 py-3 text-slate-700">VOLVO BM 4200 LOADER</td><td className="px-4 py-3 text-slate-700">286-1764-1468</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">038001</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">120</td><td className="px-4 py-3 text-slate-700">KAELBLE DUMP TRUCK</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">039402</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">73+45</td><td className="px-4 py-3 text-slate-700">DEMAG H 185 EXCAVATOR</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">039404</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">73+45</td><td className="px-4 py-3 text-slate-700">DEMAG</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">039801</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">41,5+28</td><td className="px-4 py-3 text-slate-700">JCB 4CX-P8</td><td className="px-4 py-3 text-slate-700">919/71900,68700</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">039901</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">85.7</td><td className="px-4 py-3 text-slate-700">FRUKAWA</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">040101</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">41.5</td><td className="px-4 py-3 text-slate-700">SANDERSON TELEPORTER</td><td className="px-4 py-3 text-slate-700">1002959-1002566</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">040301</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">100+100+63</td><td className="px-4 py-3 text-slate-700">BOSS</td><td className="px-4 py-3 text-slate-700">9782072</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">040302</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">100+100+63</td><td className="px-4 py-3 text-slate-700">BOSS</td><td className="px-4 py-3 text-slate-700">9704146</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">040402</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">63</td><td className="px-4 py-3 text-slate-700">CVS CONTAINER FORKLIFT 2812 3</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">041001</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">85,7+51,8</td><td className="px-4 py-3 text-slate-700">LANSING LINDE HERMES 28 T</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">041101</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">120+100</td><td className="px-4 py-3 text-slate-700">KALMAR FORKLIFT TRUCK</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">041501</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">14.6</td><td className="px-4 py-3 text-slate-700">CVS CONTAINER FORKLIFT</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">042606</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">41</td><td className="px-4 py-3 text-slate-700">SCHAEFF SKL 863 LOADER</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">043501</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">73+63</td><td className="px-4 py-3 text-slate-700">C.V.S. FL 4212 FLT</td><td className="px-4 py-3 text-slate-700">LOADER</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">043502</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">85</td><td className="px-4 py-3 text-slate-700">CVS CONTAINER CRANE</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">043504</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">85+14</td><td className="px-4 py-3 text-slate-700">CVS CONT.STACKER 42 TON</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">044501</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">53+19</td><td className="px-4 py-3 text-slate-700">MAXEIM FORKLIFT TRUCK</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">044701</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">187</td><td className="px-4 py-3 text-slate-700">TEREX 40 TON DUMP TRUCK 4066C</td><td className="px-4 py-3 text-slate-700">15257085</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">044702</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">187</td><td className="px-4 py-3 text-slate-700">-</td><td className="px-4 py-3 text-slate-700">15257085</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">045002</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">160</td><td className="px-4 py-3 text-slate-700">AVELING BARFORD LOADER</td><td className="px-4 py-3 text-slate-700">-</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">045401</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">52</td><td className="px-4 py-3 text-slate-700">MF 860-960</td><td className="px-4 py-3 text-slate-700">1471430M92</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">045601</td><td className="px-4 py-3 text-slate-700">C</td><td className="px-4 py-3 text-slate-700">85.7</td><td className="px-4 py-3 text-slate-700">KOMATSU HANOMAG D600C DOZER</td><td className="px-4 py-3 text-slate-700">3086252M91</td></tr>
                          <tr className="hover:bg-slate-50"><td className="px-4 py-3 font-medium text-slate-900">045702</td><td className="px-4 py-3 text-slate-700">A</td><td className="px-4 py-3 text-slate-700">85.7</td><td className="px-4 py-3 text-slate-700">KAWASAKI Z80-Z70B-1</td><td className="px-4 py-3 text-slate-700">YT22PL220004</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="px-4 py-3 text-xs text-slate-500 bg-slate-50 border-t border-slate-200">
                      <p className="mb-2"><strong>Not:</strong> Bu tablo, İŞ MAKİNESİ POMPALARI ürün serisinin örneklerini içermektedir. Tabloda yüzlerce ürün kodu bulunmaktadır. Tüm ürünler için detaylı bilgi, teknik özellikler ve fiyat bilgisi almak için lütfen bizimle iletişime geçin.</p>
                      <p>Daha fazla ürün kodu ve detaylı teknik bilgiler için kataloğumuzu inceleyebilir veya satış ekibimizle görüşebilirsiniz.</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : selectedBrand && productName === 'TANDEM POMPALAR' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">{selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Detay Sayfası İçeriği */}
              {(() => {
                const productData = getTandemPompalarProductData(selectedBrand)
                if (!productData) {
                  return (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                      <div className="space-y-4 text-base leading-relaxed">
                        <h1 className="text-2xl font-bold text-slate-900 mb-4">{productName} - {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}</h1>
                        <p className="text-slate-700">
                          {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} markasına ait {productName} ürünleri hakkında detaylı bilgi için lütfen bizimle iletişime geçin.
                        </p>
                        <p className="text-slate-600 text-sm mt-4">
                          Detaylı teknik özellikler, fiyat bilgisi ve teknik destek için satış ekibimizle görüşebilirsiniz.
                        </p>
                      </div>
                    </div>
                  )
                }

                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="space-y-6">
                      <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-4">{productName} - {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}</h1>
                        <div className="space-y-4 text-base leading-relaxed text-slate-700 whitespace-pre-line">
                          {productData.description.split('\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                          ))}
                        </div>
                      </div>

                      {/* Ürün Tablosu */}
                      <div className="mt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{productName}</h2>
                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                          <table className="w-full text-sm">
                            <thead className="bg-slate-50">
                              <tr>
                                {productData.tableHeaders.map((header, index) => (
                                  <th key={index} className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {productData.products.map((product, index) => {
                                // Header'lara göre değerleri sırayla al
                                const getCellValue = (header) => {
                                  if (header === 'MODEL') return product.model
                                  if (header === 'BASINÇ') return product.basinc || ''
                                  if (header === 'DEBİ') return product.debi || ''
                                  if (header === 'İLETİM HACMİ') return product.iletimHacmi || ''
                                  if (header === 'MAKS.HIZ') return product.maksHiz || ''
                                  if (header === 'MAKS.BASINÇ') return product.maksBasinc || ''
                                  if (header === 'MİN.HIZ') return product.minHiz || ''
                                  if (header === 'ÇALIŞMA BASINCI') return product.calismaBasinci || ''
                                  if (header === 'MİL-KAPAK TİPİ') return product.milKapakTipi || ''
                                  if (header === 'KAPAK') return product.kapak || ''
                                  if (header === 'MAX HIZ') return product.maxHiz || ''
                                  if (header === 'YER DEĞİŞTİRME (CM³/REV)') return product.yerDegistirme || ''
                                  if (header === 'POMPA TİPİ') return product.pompaTipi || ''
                                  return ''
                                }

                                return (
                                  <tr key={index} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                                    {productData.tableHeaders.map((header, headerIndex) => (
                                      <td key={headerIndex} className="px-4 py-3 text-slate-700">
                                        {headerIndex === 0 ? (
                                          <span className="font-medium text-slate-900">{getCellValue(header)}</span>
                                        ) : (
                                          getCellValue(header)
                                        )}
                                      </td>
                                    ))}
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedBrand && productName === 'EL POMPASI' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">{selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Detay Sayfası İçeriği */}
              {(() => {
                const productData = getElPompasiProductData(selectedBrand)
                if (!productData) {
                  return (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                      <div className="space-y-4 text-base leading-relaxed">
                        <h1 className="text-2xl font-bold text-slate-900 mb-4">{productName} - {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}</h1>
                        <p className="text-slate-700">
                          {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} markasına ait {productName} ürünleri hakkında detaylı bilgi için lütfen bizimle iletişime geçin.
                        </p>
                        <p className="text-slate-600 text-sm mt-4">
                          Detaylı teknik özellikler, fiyat bilgisi ve teknik destek için satış ekibimizle görüşebilirsiniz.
                        </p>
                      </div>
                    </div>
                  )
                }

                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="space-y-6">
                      <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-4">{productName} - {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}</h1>
                        <div className="space-y-4 text-base leading-relaxed text-slate-700">
                          <p>{productData.description}</p>
                          <div className="mt-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-2">Fiyat ve Performans Dengesi</h2>
                            <p>Hidrolik el pompası fiyatı, sağladığı özelliklerle doğrudan ilişkilidir. Piyasada farklı modeller ve markalar bulunmakta; daha düşük fiyatlı pompalar temel ihtiyaçları karşılarken, daha yüksek fiyatlı olanlar genellikle daha gelişmiş özellikler ve dayanıklılık sunarlar.</p>
                          </div>
                          <div className="mt-4">
                            <h2 className="text-lg font-semibold text-slate-900 mb-2">Kullanım Kolaylığı ve Güvenilirlik</h2>
                            <p>Bu pompaların en büyük avantajlarından biri kullanım kolaylığıdır. Genellikle taşınabilir sistemlerde, acil durumlarda veya dar alanlarda kullanılmak üzere tasarlanmışlardır. Dayanıklı yapılarıyla uzun ömürlü ve güvenilir bir performans sunarlar.</p>
                          </div>
                          <div className="mt-4">
                            <h2 className="text-lg font-semibold text-slate-900 mb-2">Hidrolik El Pompalarıyla İşlerinizi Kolaylaştırın</h2>
                            <p>Hidrolik el pompaları, güvenilirlik, taşınabilirlik ve performans açısından geniş bir yelpazede kullanıcı ihtiyaçlarına yanıt verir. Uygun fiyatlı modelleriyle temel ihtiyaçları karşılamaktan, daha gelişmiş özelliklere sahip olanlarla profesyonel kullanım için ideal bir seçenek sunarlar.</p>
                          </div>
                        </div>
                      </div>

                      {/* Ürün Tablosu */}
                      <div className="mt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{productName}</h2>
                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                          <table className="w-full text-sm">
                            <thead className="bg-slate-50">
                              <tr>
                                {productData.tableHeaders.map((header, index) => (
                                  <th key={index} className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {productData.products.map((product, index) => {
                                // Header'lara göre değerleri sırayla al
                                const getCellValue = (header) => {
                                  if (header === 'MODEL KODU') return product.kod
                                  if (header === 'ÇALIŞMA BASINCI') return product.calismaBasinci || ''
                                  if (header === 'BASINÇ (BAR)') return product.basinc || ''
                                  if (header === 'FONKSİYON') return product.fonksiyon || ''
                                  if (header === 'İLETİM HACMİ') return product.iletimHacmi || ''
                                  if (header === 'HACMİ') return product.hacim || ''
                                  if (header === 'YAĞ TANKI MONTAJI') return product.yagTankiMontaji || ''
                                  if (header === 'LİTRE') return product.litre || ''
                                  if (header === 'YAĞ BASINCI') return product.yagBasinci || ''
                                  if (header === 'ÇALIŞMA SICAKLIĞI') return product.calismaSicakligi || ''
                                  if (header === 'DİŞ NORMLARI') return product.disNormlari || ''
                                  if (header === 'DİŞ ÖLÇÜLERİ') return product.disOlculeri || ''
                                  if (header === 'MALZEME') return product.malzeme || ''
                                  if (header === 'SIZDIRMAZLIK') return product.sizdirmazlik || ''
                                  return ''
                                }

                                return (
                                  <tr key={index} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                                    {productData.tableHeaders.map((header, headerIndex) => (
                                      <td key={headerIndex} className="px-4 py-3 text-slate-700">
                                        {headerIndex === 0 ? (
                                          <span className="font-medium text-slate-900">{getCellValue(header)}</span>
                                        ) : (
                                          getCellValue(header)
                                        )}
                                      </td>
                                    ))}
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedBrand && productName === 'İÇTEN DİŞLİ POMPALAR' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">{selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Detay Sayfası İçeriği */}
              {(() => {
                const productData = getIctenDisliPompalarProductData(selectedBrand)
                if (!productData) {
                  return (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                      <div className="space-y-4 text-base leading-relaxed">
                        <h1 className="text-2xl font-bold text-slate-900 mb-4">{productName} - {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}</h1>
                        <p className="text-slate-700">
                          {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} markasına ait {productName} ürünleri hakkında detaylı bilgi için lütfen bizimle iletişime geçin.
                        </p>
                        <p className="text-slate-600 text-sm mt-4">
                          Detaylı teknik özellikler, fiyat bilgisi ve teknik destek için satış ekibimizle görüşebilirsiniz.
                        </p>
                      </div>
                    </div>
                  )
                }

                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="space-y-6">
                      <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-4">{productName} - {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}</h1>
                        <div className="space-y-4 text-base leading-relaxed text-slate-700">
                          <p>{productData.description}</p>
                        </div>
                      </div>

                      {/* Ürün Tablosu */}
                      <div className="mt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{productName}</h2>
                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                          <table className="w-full text-sm">
                            <thead className="bg-slate-50">
                              <tr>
                                {productData.tableHeaders.map((header, index) => (
                                  <th key={index} className="px-4 py-3 text-left font-semibold text-slate-900 border-b border-slate-200">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {productData.products.map((product, index) => {
                                // Header'lara göre değerleri sırayla al
                                const getCellValue = (header) => {
                                  if (header === 'MODEL KODU') return product.kod
                                  if (header === 'BASINÇ (BAR)') return product.basinc || ''
                                  if (header === 'HIZ') return product.hiz || ''
                                  if (header === 'İLETİM HACMİ') return product.iletimHacmi || ''
                                  if (header === 'POMPA SES ŞİD.') return product.pompaSesSid || ''
                                  if (header === 'VERİM (NV)') return product.verim || ''
                                  return ''
                                }

                                return (
                                  <tr key={index} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                                    {productData.tableHeaders.map((header, headerIndex) => (
                                      <td key={headerIndex} className="px-4 py-3 text-slate-700">
                                        {headerIndex === 0 ? (
                                          <span className="font-medium text-slate-900">{getCellValue(header)}</span>
                                        ) : (
                                          getCellValue(header)
                                        )}
                                      </td>
                                    ))}
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedBrand && productName === 'İŞ MAKİNESİ POMPALARI' ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">{selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}</p>
                  <h2 className="text-xl font-semibold">{productName}</h2>
                </div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-sm text-slate-600 hover:text-[#ff7f00] transition-colors"
                >
                  ← Geri Dön
                </button>
              </div>

              {/* Detay Sayfası İçeriği */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="space-y-4 text-base leading-relaxed">
                  <h1 className="text-2xl font-bold text-slate-900 mb-4">{productName} - {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}</h1>
                  <p className="text-slate-700">
                    {selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} markasına ait {productName} ürünleri hakkında detaylı bilgi için lütfen bizimle iletişime geçin.
                  </p>
                  <p className="text-slate-600 text-sm mt-4">
                    Detaylı teknik özellikler, fiyat bilgisi ve teknik destek için satış ekibimizle görüşebilirsiniz.
                  </p>
                </div>
              </div>
            </>
          ) : selectedProduct || (productName && !activeSection) ? (
            <>
              {/* Ürün Başlığı */}
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#ff7f00]">Ürün Detayı</p>
                  <h2 className="text-xl font-semibold">
                    {productName}
                    {currentBrand && (
                      <span className="ml-2 text-base font-normal text-slate-600">
                        - {currentBrand.charAt(0).toUpperCase() + currentBrand.slice(1)}
                      </span>
                    )}
                  </h2>
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
                    {allBrandLogos.map((logo, index) => {
                      const logoBrandName = logo.replace(/^\//, '').replace(/\.png$/, '')
                      const isSelected = currentBrand === logoBrandName
                      return (
                        <div
                          key={index}
                          onClick={() => handleBrandClick(logo)}
                          className={`flex h-16 cursor-pointer items-center justify-center rounded-lg border p-2 transition hover:border-[#ff7f00] hover:bg-white hover:shadow-md sm:h-20 sm:p-3 ${
                            isSelected 
                              ? 'border-[#ff7f00] bg-[#ff7f00]/5 shadow-md' 
                              : 'border-slate-200 bg-slate-50'
                          }`}
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
                      )
                    })}
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
                          setSelectedBrand(null) // Marka seçimini temizle
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
