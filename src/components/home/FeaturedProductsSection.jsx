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
]

// Öne çıkan ürünler - her kategoriden en popüler olanları
const featuredProducts = [
  'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR',
  'DÖKÜM GÖVDELİ DİŞLİ POMPALAR',
  'EL POMPASI',
  'İŞ MAKİNESİ POMPALARI',
  'PİSTONLU POMPA',
  'ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER',
  'MEMBRANLI AKÜLER',
  'DİŞLİ MOTORLAR',
]

const getProductImage = (itemName) => {
  const imageMap = {
    'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR': '/aligodi.png',
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
    'DİŞLİ MOTORLAR': '/disli-motorlar.png',
    'EĞİK EKSENLİ HİDROMOTORLAR': '/egik-eksenli-hidromotorlar.png',
    'GEROTOR MOTORLAR (ORBİT)': '/gerotor-motorlar-orbit.png',
    'YILDIZ (RADIAL) MOTOR': '/yildiz-radial-motor.png',
  }
  return imageMap[itemName] || '/hydropack.png'
}

const getProductLogo = (itemName) => {
  const logoMap = {
    'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR': 'https://metosan.com.tr/Storage/Upload/cache/637557325862393960-b-39hydrocar-175-90.png',
    'DÖKÜM GÖVDELİ DİŞLİ POMPALAR': 'https://metosan.com.tr/Storage/Upload/cache/638340098660595043-b-73grimet-175-90.png',
    'EL POMPASI': 'https://metosan.com.tr/Storage/Upload/cache/637333620284483912-b-11salami-175-90.png',
    'İŞ MAKİNESİ POMPALARI': 'https://metosan.com.tr/Storage/Upload/cache/637532341975657085-b-30kawasaki-175-90.png',
    'PİSTONLU POMPA': 'https://metosan.com.tr/Storage/Upload/cache/637613397761965452-b-46zhenjiang-175-90.png',
    'ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER': 'https://metosan.com.tr/Storage/Upload/cache/637532342525093881-b-33gold-175-90.png',
    'MEMBRANLI AKÜLER': 'https://metosan.com.tr/Storage/Upload/cache/637557325862393960-b-39hydrocar-175-90.png',
    'DİŞLİ MOTORLAR': 'https://metosan.com.tr/Storage/Upload/cache/637661968877589422-b-67walvoil-175-90.png',
  }
  return logoMap[itemName] || 'https://metosan.com.tr/Storage/Upload/cache/637557325862393960-b-39hydrocar-175-90.png'
}

function FeaturedProductsSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-1">
      <div className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-1 w-12 rounded-full bg-[#ff7f00]" />
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Ürünlerimiz</h2>
          <span className="h-1 w-12 rounded-full bg-[#ff7f00]" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => {
          const productImage = getProductImage(product)
          const productLogo = getProductLogo(product)
          const productSlug = encodeURIComponent(product.toLowerCase().replace(/\s+/g, '-'))
          
          return (
            <Link
              key={product}
              to={`/urun-detay/${productSlug}`}
              state={{ productName: product, productImage, productLogo }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#ff7f00]/40 hover:shadow-2xl hover:shadow-[#ff7f00]/10"
            >
              {/* Ürün Görseli - Enhanced Design */}
              <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
                <img
                  src={productImage}
                  alt={product}
                  className="h-full w-full object-contain p-5 transition-all duration-500 group-hover:scale-110"
                />
                {/* Professional gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff7f00]/0 via-transparent to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/5 group-hover:to-[#1e4294]/5" />
              </div>

              {/* Ürün Bilgileri - Enhanced Typography */}
              <div className="flex flex-1 flex-col border-t border-slate-100 bg-white p-6">
                <h3 className="mb-4 line-clamp-2 min-h-[3.5rem] text-base font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
                  {product}
                </h3>
                
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors duration-300 group-hover:text-slate-700">
                    Detaylar
                  </span>
                  <div className="flex items-center gap-1.5 text-[#ff7f00] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    <span className="text-xs font-semibold">İncele</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Tüm Ürünlere Git Butonu */}
      <div className="mt-12 text-center">
        <Link
          to="/urunler"
          className="inline-flex items-center gap-2 rounded-full bg-[#ff7f00] px-8 py-4 text-base font-semibold uppercase tracking-wide text-white shadow-lg transition-all hover:bg-[#e07000] hover:shadow-xl hover:-translate-y-0.5"
        >
          Tüm Ürünleri Görüntüle
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default FeaturedProductsSection
