import imgIfscaLogo21 from '../assets/bf58fade2d0f655487506695245c57d0b250b66f.png';
import imgNsdl11 from '../assets/0254c07aa37e753054b1f9e2d5ecb58c49c0e4d6.png';
import imgImage775 from '../assets/89c9f80eade451c273cc982915894a67d24a3722.png';
import imgG1 from '../assets/893e962417dd61a3aae2dd868d7a6557d3b8b11e.svg';

export default function TrustSection() {
  const desktopPartners = [
    {
      img: imgG1,
      label: 'SEBI Registered',
      alt: 'SEBI logo',
      imgClass: 'w-[138px] h-[131px] object-contain',
      wrapClass: 'items-start',
    },
    {
      img: imgIfscaLogo21,
      label: 'IFSCA Compliant',
      alt: 'IFSCA logo',
      imgClass: 'w-[215px] h-[210px] object-contain',
      wrapClass: 'items-center',
    },
    {
      img: imgNsdl11,
      label: 'NSDL Participant',
      alt: 'NSDL logo',
      imgClass: 'w-[123px] h-[134px] object-contain',
      wrapClass: 'items-center',
    },
    {
      img: imgImage775,
      label: 'GIFT City, India',
      alt: 'GIFT City logo',
      imgClass: 'w-[181px] h-[129px] object-contain',
      wrapClass: 'items-center',
    },
  ];

  const mobilePartners = [
    {
      img: imgG1,
      label: 'SEBI Registered',
      alt: 'SEBI logo',
      imgClass: 'w-[100px] h-[95px] object-contain',
      wrapClass: 'items-start',
    },
    {
      img: imgIfscaLogo21,
      label: 'IFSCA Compliant',
      alt: 'IFSCA logo',
      imgClass: 'w-[110px] h-[107px] object-contain',
      wrapClass: 'items-center',
    },
    {
      img: imgNsdl11,
      label: 'NSDL Participant',
      alt: 'NSDL logo',
      imgClass: 'w-[90px] h-[98px] object-contain',
      wrapClass: 'items-center',
    },
    {
      img: imgImage775,
      label: 'GIFT City, India',
      alt: 'GIFT City logo',
      imgClass: 'w-[120px] h-[85px] object-contain',
      wrapClass: 'items-center',
    },
  ];

  return (
    <section className="bg-white border-t border-b border-gray-100 py-20 overflow-hidden" id="trust-badges">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-display font-medium text-brand-dark text-center leading-tight mb-16">
          Backed by entities already trusted
        </h2>

        {/* Desktop View: Static row of logos */}
        <div className="hidden sm:flex flex-row items-center justify-around gap-6">
          {desktopPartners.map((partner) => (
            <div
              key={partner.label}
              className={`flex flex-col gap-5 ${partner.wrapClass}`}
            >
              <div className="flex items-center justify-center h-[135px]">
                <img
                  src={partner.img}
                  alt={partner.alt}
                  className={`${partner.imgClass} transition-transform duration-300 hover:scale-105`}
                />
              </div>
              <p className="font-sans font-extrabold text-[#516259] text-base text-center">
                {partner.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View: Logos Marquee Wrapper - Full Width */}
      <div className="relative w-full overflow-hidden sm:hidden">
        {/* Linear gradient fade overlays on sides for smooth blending */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-max gap-24 animate-marquee-x py-4">
          {/* First Set */}
          <div className="flex gap-24 items-center flex-shrink-0">
            {mobilePartners.map((partner, index) => (
              <div
                key={`${partner.label}-${index}`}
                className={`flex flex-col gap-5 ${partner.wrapClass}`}
              >
                <div className="flex items-center justify-center h-[100px]">
                  <img
                    src={partner.img}
                    alt={partner.alt}
                    className={`${partner.imgClass} transition-transform duration-300 hover:scale-105`}
                  />
                </div>
                <p className="font-sans font-extrabold text-[#516259] text-base text-center whitespace-nowrap">
                  {partner.label}
                </p>
              </div>
            ))}
          </div>

          {/* Second Duplicate Set for Seamless Looping */}
          <div className="flex gap-24 items-center flex-shrink-0">
            {mobilePartners.map((partner, index) => (
              <div
                key={`${partner.label}-${index}-dup`}
                className={`flex flex-col gap-5 ${partner.wrapClass}`}
              >
                <div className="flex items-center justify-center h-[100px]">
                  <img
                    src={partner.img}
                    alt={partner.alt}
                    className={`${partner.imgClass} transition-transform duration-300 hover:scale-105`}
                  />
                </div>
                <p className="font-sans font-extrabold text-[#516259] text-base text-center whitespace-nowrap">
                  {partner.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
