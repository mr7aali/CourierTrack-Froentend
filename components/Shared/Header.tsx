import { Package } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <div className="flex items-center space-x-2">
          <Package className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            CourierTrack
          </span>
        </div>
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
