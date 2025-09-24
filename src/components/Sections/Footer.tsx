import React from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";
import { footerData } from "../../assets/data/Footer";

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-8 md:mt-16 lg:mt-24">
      <div className="footer__container flex flex-col">
        <div className="w-full bg-primary">
          <div className="container mx-auto flex flex-col items-center">
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
            <hr className="footer__top__hr w-full border-gray-300" />
            <div className="footer__top__a flex flex-wrap justify-evenly my-5 w-full text-white text-s">
              {footerData.map((section) => (
                <div
                  key={section.title}
                  className="footer__top__a__card text-center"
                >
                  <h5 className="font-bold mb-2">{section.title}</h5>
                  <div className="footer__top__a__card__selects flex flex-col">
                    {section.links.map((link) => (
                      <div
                        key={link.text}
                        className="footer__top__a__card__selects__options cursor-pointer hover:text-accent"
                      >
                        {link.text}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="footer__bot bg-accent py-4">
          <div className="container mx-auto">
            <div className="text-center">
              <a
                href="https://www.ramirezsandro.com"
                target="_blank"
                className="hover:text-white"
              >
                Sandro Ramirez | Alkas Telecom
              </a>
              <p>Proyecto demostrativo</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
