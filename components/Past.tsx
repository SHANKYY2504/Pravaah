import Image from "next/image";

const speakers = [
  { src: "/jag.png", name: "DR. JAGANNATH NAYAK (DRDO)" },
  { src: "/omr.png", name: "DR. OMKAR RAI (STARTUP ODISHA)" },
  { src: "/mishra.png", name: "BRAHMA MISHRA (UCCI)" },
  { src: "/tkc.png", name: "DR. TAPAN KUMAR CHAND (VEDANTA)" },
  { src: "/panda.png", name: "SHRI MANAS PANDA (OCAC)" },
  { src: "/patanaik.png", name: "SHRI DR. AMAR PATANAIK (MP, ODISHA)" },
];

const PastSpeakers: React.FC = () => {
  return (
    <section className="bg-[#0B0F2F] py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">
          Previous Speakers
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-yellow-300 to-orange-500 mx-auto"></div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-12 px-4 mt-10">
          {speakers.map((speaker, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={speaker.src}
                alt={speaker.name}
                width={200}
                height={200}
                className="rounded-full object-cover w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px]"
              />
              <p className="text-white text-sm sm:text-base mt-2 text-center max-w-[150px]">
                {speaker.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastSpeakers;

