import React from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";
import { footerData } from "../../assets/data/Footer";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container flex flex-col">
        {/* Top Section */}
        <div className="w-full bg-primary">
          <div className="container mx-auto flex flex-col items-center">
            {/* Social Icons */}
            <div className="footer__top__t flex flex-row w-[275px] justify-between my-5">
              <div className="footer__top__t__icon w-[50px] h-[50px] rounded-full cursor-pointer opacity-60 hover:bg-accent hover:scale-105 flex items-center justify-center bg-white">
                <FaInstagram className="text-black w-[24px] h-[24px]" />
              </div>
              <div className="footer__top__t__icon w-[50px] h-[50px] rounded-full cursor-pointer opacity-60 hover:bg-accent hover:scale-105 flex items-center justify-center bg-white">
                <FaTwitter className="text-black w-[24px] h-[24px]" />
              </div>
              <div className="footer__top__t__icon w-[50px] h-[50px] rounded-full cursor-pointer opacity-60 hover:bg-accent hover:scale-105 flex items-center justify-center bg-white">
                <FaFacebook className="text-black w-[24px] h-[24px]" />
              </div>
              <div className="footer__top__t__icon w-[50px] h-[50px] rounded-full cursor-pointer opacity-60 hover:bg-accent hover:scale-105 flex items-center justify-center bg-white">
                <FaYoutube className="text-black w-[24px] h-[24px]" />
              </div>
            </div>

            {/* Divider */}
            <hr className="footer__top__hr w-full border-gray-300" />

            {/* Links Section */}
            <div className="footer__top__a flex flex-wrap justify-evenly my-5 w-full text-white text-s">
              {footerData.map((section) => (
                <div key={section.title} className="footer__top__a__card text-center">
                  <h5 className="font-bold mb-2">{section.title}</h5>
                  <div className="footer__top__a__card__selects flex flex-col">
                    {section.links.map((link) => (
                      <a
                        key={link.text}
                        href={link.href}
                        className="footer__top__a__card__selects__options cursor-pointer hover:text-accent"
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer__bot bg-accent py-4">
          <div className="container mx-auto">
            <h6 className="footer__bot__text text-black text-center">
              <b>Sandro Ramirez</b> | Todos los derechos reservados |{" "}
              <b>Alkas Telecom</b>
            </h6>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
