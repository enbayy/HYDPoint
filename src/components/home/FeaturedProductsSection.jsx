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

// Öne çıkan ürünler - her kategoriden bir ürün
const featuredProducts = [
  'ALÜMİNYUM GÖVDELİ DİŞLİ POMPALAR', // POMPA
  'ALÜMİNYUM GÖVDE DİŞLİ AKIŞ BÖLÜCÜLER', // AKIŞ BÖLÜCÜLER
  'MEMBRANLI AKÜLER', // AKÜLER
  'EMNİYETLİ NORMAL', // DİREKSİYON BEYİNLERİ
  'BASINÇ ŞALTERLERİ', // BASINÇ, ISI ÖLÇÜM VE KONTROL CİHAZLARI
  'DİŞLİ MOTORLAR', // HİDROMOTORLAR
  'DİLİMLİ KUMANDA KOLU', // KUMANDA KOLLARI, JOİSTİK VE LOADER VALF
  'HORTUM BAĞLANTI ELEMANLARI', // HİDROLİK BAĞLANTI ELEMANLARI
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
    'EMNİYETLİ NORMAL': 'https://metosan.com.tr/Storage/Upload/cache/637557325862393960-b-39hydrocar-175-90.png',
    'BASINÇ ŞALTERLERİ': 'https://metosan.com.tr/Storage/Upload/cache/637557325862393960-b-39hydrocar-175-90.png',
    'DİŞLİ MOTORLAR': 'https://metosan.com.tr/Storage/Upload/cache/637661968877589422-b-67walvoil-175-90.png',
    'DİLİMLİ KUMANDA KOLU': 'https://metosan.com.tr/Storage/Upload/cache/637557325862393960-b-39hydrocar-175-90.png',
    'HORTUM BAĞLANTI ELEMANLARI': 'https://metosan.com.tr/Storage/Upload/cache/637557325862393960-b-39hydrocar-175-90.png',
  }
  return logoMap[itemName] || 'https://metosan.com.tr/Storage/Upload/cache/637557325862393960-b-39hydrocar-175-90.png'
}

function FeaturedProductsSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-1 w-12 rounded-full bg-[#ff7f00]" />
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Ürünlerimiz</h2>
          <span className="h-1 w-12 rounded-full bg-[#ff7f00]" />
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          Endüstriyel hidrolik çözümlerimizle işinize güç katın
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product, index) => {
          const productImage = getProductImage(product)
          const productLogo = getProductLogo(product)
          const productSlug = encodeURIComponent(product.toLowerCase().replace(/\s+/g, '-'))
          
          return (
            <Link
              key={product}
              to={`/urun-detay/${productSlug}`}
              state={{ productName: product, productImage, productLogo }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#ff7f00]/30 hover:shadow-xl hover:shadow-[#ff7f00]/5"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Decorative top accent - more visible */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff7f00] via-[#ff9500] to-[#ff7f00] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              {/* Ürün Görseli - Premium Design */}
              <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 border-b border-slate-100">
                {/* Background pattern - more subtle */}
                <div className="absolute inset-0 opacity-[0.015] group-hover:opacity-[0.03] transition-opacity duration-500" 
                     style={{
                       backgroundImage: 'radial-gradient(circle at 2px 2px, #1e4294 1px, transparent 0)',
                       backgroundSize: '32px 32px'
                     }}
                />
                
                {/* Product Image */}
                <div className="relative z-10 h-full w-full p-5">
                  <img
                    src={productImage}
                    alt={product}
                    className="h-full w-full object-contain transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Gradient overlays - refined */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff7f00]/0 via-transparent to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/6 group-hover:to-[#1e4294]/6" />
                
                {/* Shine effect on hover - more subtle */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100" />
              </div>

              {/* Ürün Bilgileri - Professional Typography */}
              <div className="relative flex flex-1 flex-col bg-white p-5">
                {/* Category badge */}
                <div className="mb-2.5">
                  <span className="inline-block rounded-md bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 transition-all duration-300 group-hover:bg-[#ff7f00]/10 group-hover:text-[#ff7f00] group-hover:shadow-sm">
                    {product.includes('POMPA') ? 'Pompa' : 
                     product.includes('AKIŞ') ? 'Akış Bölücü' :
                     product.includes('AKÜ') ? 'Akü' :
                     product.includes('DİREKSİYON') || product.includes('EMNİYET') ? 'Direksiyon' :
                     product.includes('BASINÇ') || product.includes('ŞALTER') || product.includes('MANOMETRE') || product.includes('TRANSMİTTER') || product.includes('ISI') ? 'Ölçüm & Kontrol' :
                     product.includes('KUMANDA') || product.includes('JOİSTİK') || product.includes('LOADER') ? 'Kumanda' :
                     product.includes('BAĞLANTI') || product.includes('HORTUM') ? 'Bağlantı' :
                     product.includes('MOTOR') ? 'Motor' : 'Ürün'}
                  </span>
                </div>
                
                {/* Product Title */}
                <h3 className="mb-3 line-clamp-2 min-h-[3rem] text-base font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#1e4294]">
                  {product}
                </h3>
                
                {/* Bottom section with CTA */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-100/80 pt-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-400 transition-colors duration-300 group-hover:text-slate-600">
                    Ürün Detayları
                  </span>
                  <div className="relative flex items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-r from-[#ff9500] to-[#ffaa33] px-4 py-2 text-white opacity-0 shadow-lg transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:shadow-xl group-hover:shadow-[#ff9500]/20">
                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative z-10 text-xs font-bold uppercase tracking-wide">İncele</span>
                    <svg
                      className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
              
              {/* Corner decoration - more subtle */}
              <div className="absolute top-4 right-4 h-6 w-6 rounded-bl-lg bg-gradient-to-br from-[#ff7f00]/0 to-[#1e4294]/0 transition-all duration-500 group-hover:from-[#ff7f00]/8 group-hover:to-[#1e4294]/8" />
            </Link>
          )
        })}
      </div>

      {/* Tüm Ürünlere Git Butonu - Enhanced */}
      <div className="mt-16 text-center">
        <Link
          to="/urunler"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#ff7f00] to-[#ff9500] px-10 py-4 text-base font-bold uppercase tracking-wide text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105"
        >
          <span className="relative z-10">Tüm Ürünleri Görüntüle</span>
          <svg 
            className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
          {/* Button shine effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </Link>
      </div>
    </section>
  )
}

export default FeaturedProductsSection
