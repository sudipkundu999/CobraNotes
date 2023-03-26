import Link from "next/link";
import React from "react";

const Footer: React.FC<{}> = () => {
  return (
    <div className="mt-auto w-full pt-2 text-center">
      Made by
      <Link
        href="https://www.sudipkundu.com/"
        target="_blank"
        className="ml-1 underline underline-offset-1"
      >
        Sudip Kundu
      </Link>
    </div>
  );
};

export default Footer;
