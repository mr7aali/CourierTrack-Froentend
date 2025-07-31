import { Package } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 text-white bg-gray-900">
      <div className="container px-4 mx-auto text-center">
        <div className="flex items-center justify-center mb-4 space-x-2">
          <Package className="w-6 h-6" />
          <span className="text-xl font-bold">CourierTrack</span>
        </div>
        <p className="text-gray-400">
          © 2024 CourierTrack. All rights reserved. Built with Next.js 15.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
