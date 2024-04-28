import Image from "next/image";

import UnstyledLink from "../link/unstyled-link";
import { SiInstagram, SiLinkedin, SiYoutube } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#11afdf29] h-fit p-10">
      <div className="">
        <div className="flex flex-col lg:hidden gap-4 justify-center items-center w-full text-center pb-10">
          <Image
            src="/img/logo-lnt.png"
            width={250}
            height={40}
            alt="BNCC Logo"
          />
          <p className="text-sm text-muted-foreground">
            Paskal Hyper Square, Jl. Pasir Kaliki No.25-27, Ciroyom, Kec. Andir,
            Kota Bandung, Jawa Barat 40181
          </p>

          <div className="flex text-lg gap-4 text-muted-foreground">
            <UnstyledLink
              href="https://www.instagram.com/bncc.bandung"
              className="text-muted-foreground hover:text-blue-400"
            >
              <SiInstagram />
            </UnstyledLink>
            <UnstyledLink
              href="https://www.linkedin.com/company/bina-nusantara-computer-club"
              className="text-muted-foreground hover:text-blue-400"
            >
              <SiLinkedin />
            </UnstyledLink>
            <UnstyledLink
              href="https://www.youtube.com/channel/UCI85BEBZRoh4-6FSHqOjUfw"
              className="text-muted-foreground hover:text-blue-400"
            >
              <SiYoutube />
            </UnstyledLink>
          </div>
        </div>
      </div>

      <div className="layout grid-cols-4 gap-10 mb-10 hidden lg:grid">
        <div className="flex flex-col">
          <Image
            src="/img/logo-lnt.png"
            width={250}
            height={40}
            alt="BNCC Logo"
          />
          <p className="text-sm text-muted-foreground">
            Paskal Hyper Square, Jl. Pasir Kaliki No.25-27, Ciroyom, Kec. Andir,
            Kota Bandung, Jawa Barat 40181
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground mb-2 font-bold">
            SOCIAL MEDIA
          </p>
          <UnstyledLink
            href="https://www.instagram.com/bncc.bandung"
            className="text-sm text-muted-foreground hover:text-blue-400"
          >
            Instagram
          </UnstyledLink>
          <UnstyledLink
            href="https://www.linkedin.com/company/bina-nusantara-computer-club"
            className="text-sm text-muted-foreground hover:text-blue-400"
          >
            LinkedIn
          </UnstyledLink>
          <UnstyledLink
            href="https://www.youtube.com/channel/UCI85BEBZRoh4-6FSHqOjUfw"
            className="text-sm text-muted-foreground hover:text-blue-400"
          >
            YouTube
          </UnstyledLink>
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground mb-2 font-bold">
            CONTACTS
          </p>
          <UnstyledLink
            href="mailto:bnccbandung.general@gmail.com"
            className="text-sm text-muted-foreground hover:text-blue-400"
          >
            bnccbandung.general@gmail.com
          </UnstyledLink>
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground mb-2 font-bold">ABOUT</p>
          <UnstyledLink
            href="https://bnccbandung.vercel.app/"
            className="text-sm text-muted-foreground hover:text-blue-400"
          >
            Our main website
          </UnstyledLink>
        </div>
      </div>

      <p className="text-center text-sm lg:text-md text-muted-foreground">
        Copyright © 2024, BNCC LnT Bandung. All rights reserved. Created with ❤️
        by RnD BNCC Bandung.
      </p>
    </footer>
  );
}
