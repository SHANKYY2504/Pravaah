"use client"; 

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";


type TeamMember = {
  name: string;
  position: string;
  email: string;
  contact: string;
  linkedin: string;
  photo: string;
};


const teamMembers: TeamMember[] = [
  {
    name: "Kondeti Aravind",
    position: "Chief Coordinator",
    email: "coord.pravaah@iitbbs.ac.in ",
    contact: "9392851998",
    linkedin: "https://www.linkedin.com/in/aravind-kondeti ",
    photo: "/shashank.jpg",
  },
  {
    name: "Subhranshu Sekhar Das ",
    position: "Marketing Coordinator ",
    email: "marketing.pravaah@iitbbs.ac.in",
    contact: "7848017800",
    linkedin: "https://www.linkedin.com/in/subhranshu-sekhar-das-b74b88261?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
    photo: "/das.jpg",
  },
  {
    name: "Akshaya Kumar sethi  ",
    position: "Logistics coordinator  ",
    email: "logistics.pravaah@iitbbs.ac.in",
    contact: "8900273239",
    linkedin: "https://www.linkedin.com/in/akshayakumarsethi04  ",
    photo: "/sethi.jpg",
  },
  {
    name: "Pate Sravan sri sai ",
    position: "Events coordinator  ",
    email: "events.pravaah@iitbbs.ac.in",
    contact: "7036450098",
    linkedin: "https://www.linkedin.com/in/sravan-sri-sai-pate-620967259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app  ",
    photo: "/sai.jpeg",
  },
  {
    name: "Yubraj Das  ",
    position: "Marketing Coordinator  ",
    email: "marketing.pravaah@iitbbs.ac.in",
    contact: "7099684955",
    linkedin: "https://www.linkedin.com/in/yubraj-das-869969261?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app  ",
    photo: "/yubraj.jpg",
  },
  {
    name: "Nithin Kumar Kotipatruni  ",
    position: "Events coordinator   ",
    email: "events.pravaah@iitbbs.ac.in",
    contact: "9618469367",
    linkedin: " https://www.linkedin.com/in/nithin-kumar-kotipatruni-4bba09258   ",
    photo: "/nithin.png",
  },
  {
    name: "Mangipudi Lakshmi Sravya  ",
    position: "Treasurer   ",
    email: "treasurer.pravaah@iitbbs.ac.in",
    contact: "8688224140",
    linkedin: "https://www.linkedin.com/in/sravya-mangipudi-1779aa276   ",
    photo: "/mangi.jpg",
  },
  {
    name: "Murali Krishna  ",
    position: "Web and Design coordinator   ",
    email: "",
    contact: "8074101617",
    linkedin: "https://www.linkedin.com/in/murali-krishna-ganta-072102288   ",
    photo: "/dhruvi.jpg",
  },
  {
    name: "VEERENDRA PASUPULETI ",
    position: "Hospitality Team Coordinator   ",
    email: "21ce01030@iitbbs.ac.in",
    contact: "8688289991",
    linkedin: "linkedin.com/in/pasupuleti-veerendra/   ",
    photo: "/dhruvi.jpg",
  },

];

const OurTeam: React.FC = () => {
  return (
    <section id="contacts" className="relative py-16 bg-[#020617] text-white overflow-hidden">
     
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-40 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl"></div>
      </div>

      <div className="relative container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Team
        </motion.h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/80 p-6 rounded-xl shadow-lg text-center backdrop-blur-md border border-gray-800"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={member.photo}
                alt={member.name}
                width={128}
                height={128}
                className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-gray-700"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-400">{member.position}</p>
              <div className="mt-4 flex justify-center gap-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <FaEnvelope size={24} />
                </a>
                <a
                  href={`tel:${member.contact}`}
                  className="text-green-400 hover:text-green-300 transition"
                >
                  <FaPhone size={24} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
