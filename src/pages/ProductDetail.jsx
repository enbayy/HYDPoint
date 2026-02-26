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
const getBrandGroups = (brandName) => {
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
                const brandGroups = getBrandGroups(brandParam || 'hydropack')
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
                    const brandGroups = getBrandGroups(brandParam || 'hydropack')
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
    
    // Eğer ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR sayfasındaysak ve bu markanın grupları varsa
    if (productName === 'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR') {
      const groups = getBrandGroups(brandName)
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
      '00.GRUP POMPALAR': '/aliminyumgovdelidislipompalar/00grup-pompalar.png',
      '10.GRUP POMPALAR (0.5P SERİSİ)': '/aliminyumgovdelidislipompalar/10grup-pompalar.png',
      '20.GRUP POMPALAR (1P SERİSİ)': '/aliminyumgovdelidislipompalar/20grup-pompalar.png',
      '30.GRUP POMPALAR (2P SERİSİ)': '/aliminyumgovdelidislipompalar/30grup-pompalar.png',
      '3P.GRUBU POMPALAR': '/aliminyumgovdelidislipompalar/3pgrubu-pompalar.png',
    }
    return imageMap[groupName] || '/pompa.png'
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
                {getBrandGroups(selectedBrand).map((group) => {
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
                        <h3 className="mb-4 line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
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
