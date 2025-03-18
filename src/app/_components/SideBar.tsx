import React from "react";
import { FaEnvelope, FaGithub, FaTelegram, FaPhone } from "react-icons/fa";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-black text-white p-4">
      <div className="w-80  rounded-lg p-4 flex flex-col items-center">
        
        <h2 className="text-xl font-semibold">Abdullayev S.</h2>

        <div className="flex flex-wrap gap-2 mt-2">
          <span className="bg-gray-700 px-3 py-1 text-sm rounded-lg">
            Veb dasturchi
          </span>
          <span className="bg-gray-700 px-3 py-1 text-sm rounded-lg">
            Dizayner
          </span>
          <span className="bg-gray-700 px-3 py-1 text-sm rounded-lg">
            Junior
          </span>
          <span className="bg-gray-700 px-3 py-1 text-sm rounded-lg">
            AI bot
          </span>
          <span className="bg-gray-700 px-3 py-1 text-sm rounded-lg">Web3</span>
        </div>

        <div className="mt-4 w-full">
          <ContactItem
            icon={<FaEnvelope className="text-red-500" />}
            title="E-pochta"
            info="pubgn9642@gmail.com"
          />
          <ContactItem
            icon={<FaGithub className="text-gray-300" />}
            title="Github"
            info="github.com/yaxyobekuz"
          />
          <ContactItem
            icon={<FaTelegram className="text-blue-400" />}
            title="Telegram"
            info="t.me/mryaxyobek"
          />
          <ContactItem
            icon={<FaPhone className="text-green-500" />}
            title="Telefon raqam"
            info="+998 (20) 007-77-29"
          />
        </div>
      </div>
    </div>
  );
};

const ContactItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  info: string;
}> = ({ icon, title, info }) => {
  return (
    <div className="flex items-center gap-3 p-3 border-b border-gray-700 w-full">
      {icon}
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-md">{info}</p>
      </div>
    </div>
  );
};

export default App;
