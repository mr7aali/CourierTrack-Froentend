import { Package } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <Link href={"/"} className="flex items-center space-x-2">
          <Package className="w-6 h-6 text-blue-600 sm:w-8 sm:h-8" />
          <span className="text-[20px] font-bold text-gray-900 sm:text-2xl dark:text-white">
            CourierTrack
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/auth/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
