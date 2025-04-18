import React, { useState } from "react";
import {
  FaWhatsapp,
  FaFacebookMessenger,
  FaTwitter,
  FaLinkedin,
  FaRegClipboard,
  FaClipboardCheck,
  FaShare,
  FaTelegram,
  FaVk,
} from "react-icons/fa";

const ShareButton = ({ text, url }) => {
  const [shareNow, setShareNow] = useState(false);
  const message = encodeURIComponent(`${text} ${url}`);

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank");
  };

  const handleVKShare = () => {
    const vkUrl = `https://vk.com/share.php?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(text)}`;
    window.open(vkUrl, "_blank");
  };

  const handleTelegramShare = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  // Clipboard functionality
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div>
      <button
        className="fixed bottom-2 right-2 w-10 h-10 rounded-full bg-green-500 z-50 flex justify-center items-center transition-all duration-150"
        onClick={() => setShareNow(!shareNow)}
      >
        <FaShare size={24} />
      </button>

      <div className="fixed bottom-2 right-2 z-40 flex items-end">
        <div
          className={`flex gap-2 transition-all duration-300 transform ${
            shareNow
              ? "translate-x-[-50px] opacity-100"
              : "translate-x-20 opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
          >
            <FaWhatsapp size={24} />
          </button>
          <button
            onClick={handleTelegramShare}
            className="flex items-center justify-center p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500"
          >
            <FaTelegram size={24} />
          </button>
          <button
            onClick={handleVKShare}
            className="flex items-center justify-center p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
          >
            <FaVk size={24} />
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ${
              copied ? "bg-green-600 hover:bg-green-700" : ""
            }`}
          >
            {copied ? (
              <FaClipboardCheck size={24} />
            ) : (
              <FaRegClipboard size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareButton;
