import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#080818] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Pravaah</h3>
            <p className="text-gray-400 mb-6">
              The Cultural Technopreneurial Fest of IIT Bhubaneswar
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/iitbbs.pravaah/"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "About", "Events", "Sponsors", "Register", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Events</h3>
            <ul className="space-y-2">
              {["Hackathon", "Cultural Night", "Startup Pitch", "Robotics Challenge", "Art Exhibition", "Panel Discussion"].map((item) => (
                <li key={item}>
                  <Link
                    href="https://forms.gle/zv23pCVk2aK5qSei7"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-yellow-500 mr-3 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400">
                  IIT Bhubaneswar, Argul, Khordha, Odisha - 752050
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-yellow-500 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">+91 9392851998</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-yellow-500 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">pravaah@iitbbs.ac.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Pravaah, IIT Bhubaneswar. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-500 hover:text-gray-400 text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-400 text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-6">
          Made with ❤️ by Web and Design Society of IIT Bhubaneswar
        </p>
      </div>
    </footer>
  );
}