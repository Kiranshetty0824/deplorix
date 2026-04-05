import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919999999999?text=Hi%20DeploriX%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full px-5 py-3.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
    >
      <MessageCircle className="w-6 h-6 fill-white stroke-white" />
      <span className="text-sm font-semibold hidden sm:inline group-hover:inline">Chat with us</span>
    </a>
  );
};

export default WhatsAppButton;
