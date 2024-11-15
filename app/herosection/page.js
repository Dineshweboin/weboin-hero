import { fetchHeroSections } from "@/services/api";
import Image from "next/image";

export async function generateStaticParams() {
  try {
    const heroSectionsData = await fetchHeroSections();
    const heroSection = heroSectionsData.data[0];
    
    // Return only necessary fields for pre-rendering
    return { 
      title: heroSection.Herotitle, 
      description: heroSection.Heropara, 
      images: {
        leftBg: heroSection.herobackgroundleft?.url,
        rightBg: heroSection.herobackgroundright?.url,
        card1: heroSection.herocard1?.url,
        card2Main: heroSection.herocard2Main?.url,
        card2Outline: heroSection.herocard2OOutline?.url,
        card3: heroSection.herocard3?.url,
      }
    };
  } catch (error) {
    console.error("Failed to fetch hero sections:", error);
    return [];
  }
}

export default async function HeroSectionPage() {
  const heroData = await generateStaticParams();

  if (!heroData) {
    return <div>Error loading hero sections.</div>;
  }

  const { title, description, images } = heroData;

  return (
    <div className="relative bg-transparent overflow-y-hidden overflow-x-hidden w-full h-screen">
      {/* Left Background Image */}
      <div className="absolute top-0 left-0 h-screen overflow-y-hidden overflow-x-hidden">
        {images.leftBg && (
          <Image
            src={`http://localhost:1337${images.leftBg}`}
            alt="left background"
            layout="fill"
            objectFit="cover"
            className="h-full"
          />
        )}
      </div>

      {/* Right Background Image */}
      <div className="absolute top-0 right-0 h-screen overflow-y-hidden overflow-x-hidden">
        {images.rightBg && (
          <Image
            src={`http://localhost:1337${images.rightBg}`}
            alt="right background"
            layout="fill"
            objectFit="cover"
            className="h-full"
          />
        )}
      </div>

      {/* Text Section */}
      <div className="flex flex-col items-center h-full">
        <div className="overflow-hidden">
          <p data-aos="fade-up" data-aos-delay="200" className="text-center mt-8 font-black sm:text-3xl lg:text-7xl text-black mx-6 py-8">
            {title}
          </p>
          <p className="text-center sm:text-xl text-black mx-6 py-4">
            {description}
          </p>
        </div>

        {/* Button Section */}
        <div className="group relative cursor-pointer p-2 w-32 border bg-white rounded-full overflow-hidden text-black text-center font-semibold">
          <span className="translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block">
            Our Work
          </span>
          <div className="flex gap-2 text-white bg-green-400 z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-full group-hover:rounded-none">
            <span>Our Work</span>
          </div>
        </div>

        <div className="relative z-20 w-full pt-6 grid grid-cols-2 justify-items-center">
          {/* Card 1 */}
          {images.card1 && (
            <Image
              src={`http://localhost:1337${images.card1}`}
              alt="card1"
              width={288} // adjust width and height based on your layout
              height={288}
              className="w-72 h-auto hover:rotate-12 transform hover:-translate-y-16 duration-300"
            />
          )}

          {/* Card 2 (Centered using absolute positioning) */}
          <div className="absolute mt-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 p-2 h-auto z-0 overflow-hidden">
            <div className="relative overflow-hidden hover:bottom-3 rounded-3xl hover:shadow-lg duration-300">
              {images.card2Main && (
                <Image
                  src={`http://localhost:1337${images.card2Main}`}
                  alt="card2"
                  width={288}
                  height={288}
                  className="p-2 hero-card"
                />
              )}
              {images.card2Outline && (
                <Image
                  src={`http://localhost:1337${images.card2Outline}`}
                  alt="outline"
                  width={288}
                  height={288}
                  className="absolute bottom-0 z-30 hover:bottom-3 duration-300"
                />
              )}
            </div>
          </div>

          {/* Card 3 */}
          {images.card3 && (
            <Image
              src={`http://localhost:1337${images.card3}`}
              alt="card3"
              width={288}
              height={288}
              className="w-72 h-auto hover:-rotate-12 transform hover:-translate-y-16 duration-300"
            />
          )}
        </div>
      </div>
    </div>
  );
}