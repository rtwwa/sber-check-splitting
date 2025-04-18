import React, { useState } from "react";
import {
  FaWhatsapp,
  FaRegClipboard,
  FaClipboardCheck,
  FaShare,
  FaTelegram,
  FaVk,
} from "react-icons/fa";

const ShareUrl = ({ text, url }) => {
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

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div>
      <section className="my-2">
        <div className="flex flex-col items-center justify-center py-2 ">
          <div className="flex space-x-4 py-3">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
            >
              <FaWhatsapp size={24} />
            </button>
            <button
              onClick={handleTelegramShare}
              className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              <FaTelegram size={24} />
            </button>
            <button
              onClick={handleVKShare}
              className="flex items-center justify-center p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500"
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
              <span className="ml-2">{copied ? "Copied!" : "Copy URL"}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShareUrl;
