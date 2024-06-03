'use server';

import * as React from 'react';
import AppNavbar from '@/app/components/Navbar';
import Image from 'next/image';
import navigation from '@/app/lib/navigation';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import LandingForm from '@/app/components/LandingForm';

type Member = {
  avatar: {
    src: string
    alt: string
  }
  name: string
  social: {
    email?: string
    twitter?: string
    telegram?: string
    linkedin?: string
    warpcast?: string
  }
};
const team: Member[] = [{
  avatar: {
    src: '/avatar-1.png',
    alt: 'Divergent',
  },
  name: 'Divergent',
  social: {
    email: 'divergentcrypto0@gmail.com',
    twitter: 'op_divergent',
    telegram: 'dragunovski',
    warpcast: 'divergent',
  },
}, {
  avatar: {
    src: '/avatar-2.png',
    alt: 'Sergo',
  },
  name: 'Sergo',
  social: {
    email: 'crutikvertik@gmail.com',
    twitter: 'zefirium_crypto',
    telegram: 'serg260597',
    warpcast: 'zefirium',
  },
}, {
  avatar: {
    src: '/avatar-3.png',
    alt: 'Dmytro Holova',
  },
  name: 'Dmytro Holova',
  social: {
    email: 'info@devs.ltd',
    twitter: 'dmytro_holova',
    telegram: 'website_devs_bot',
    linkedin: 'dmytro-holova',
    warpcast: 'holova',
  },
}];

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="none" className="size-6 p-0.5" aria-hidden="true">
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" fill="currentColor" className="size-6" xmlSpace="preserve">
      <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M16.9,8.1l-1.7,8.2c-0.1,0.6-0.5,0.7-0.9,0.4l-2.6-2 c-0.6,0.6-1.2,1.1-1.3,1.3c-0.2,0.1-0.3,0.3-0.5,0.3c-0.3,0-0.3-0.2-0.4-0.4l-0.9-3L5.9,12c-0.6-0.2-0.6-0.6,0.1-0.9l10.2-3.9 C16.6,7.1,17.1,7.3,16.9,8.1z M14.5,9l-5.7,3.6l0.9,3l0.2-2l4.9-4.4C15.1,8.9,14.9,8.9,14.5,9z" />
      <rect fill="none" width="24" height="24" />
    </svg>
  );
}

function WarpcastIcon() {
  return (
    <svg className="size-6" viewBox="0 0 150 102" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M34.0909 0H0L30.6818 101.136H61.3636L75 54.5815L88.6364 101.136H119.318L150 0H115.909L103.977 43.3442L90.3409 0H59.6591L46.0227 43.3442L34.0909 0Z" />
    </svg>
  );
}

export default async function Landing() {
  return (
    <main>
      <AppNavbar />
      <section style={{ backgroundImage: 'url("/Frame-3.png")' }} className="bg-cover bg-center">
        <div className="flex h-full min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-4 py-16 dark:bg-[#00000080]">
          <h1 className="pb-5 text-center font-audiowide text-xl uppercase leading-none sm:text-2xl md:text-3xl">
            Create your first Farcaster frame
          </h1>
          <LandingForm />
        </div>
      </section>

      <section id="about" className="container mx-auto scroll-mt-16 px-6 py-8 text-center lg:py-16">
        <h2 className="pb-10 font-audiowide text-2xl uppercase leading-none dark:text-main lg:text-5xl">
          What is frames?
        </h2>
        <div className="m-auto max-w-xl lg:text-xl">
          <p>
            A Frame lets you turn any cast into an interactive app.
          </p>
          <br />
          <p>
            It’s a standard for creating interactive and authenticated experiences on Farcaster.
            Create polls, live feeds or interactive galleries inside Warpcast or any other FC
            client.
          </p>
        </div>
      </section>

      <section id="explore" className="container mx-auto scroll-mt-16 px-6 py-8 lg:py-16">
        <h2 className="pb-10 text-center font-audiowide text-2xl uppercase leading-none dark:text-main lg:pb-20 lg:text-5xl">
          Explore the FramesMaker
        </h2>
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-20">
          <Image src="/Frame-2.png" alt="frame 35" width={850} height={475} className="w-full" />
          <div className="flex flex-col gap-6 lg:max-w-md">
            <p className="text-justify">
              FramesMaker solves the problem of accessibility of creating Frames in the Warpcast
              application. Now anyone can easily create Frames without having to go through the
              software complexities.
            </p>
            <p className="text-justify">
              This is a new experience, to simplify user interaction and the full functionality
              of the app.
            </p>
            <div className="flex justify-center">
              <Button
                as={Link}
                href={navigation.DASHBOARD}
                title="Dashboard"
                className="rounded-none bg-main px-10 py-[22px] font-audiowide text-black"
              >
                Create Frame
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="container mx-auto scroll-mt-16 px-6 py-8 lg:py-16">
        <h2 className="pb-10 text-center font-audiowide text-2xl dark:text-main lg:pb-24 lg:text-5xl">Team</h2>
        <div className="flex flex-col gap-10 md:flex-row lg:gap-32">
          {team.map(((member) => (
            <div key={member.name} className="basis-1/3">
              <Image src={member.avatar.src} alt={member.avatar.alt} width={420} height={420} className="w-full" />
              <p className="pt-10 text-center font-audiowide text-4xl dark:text-main">{member.name}</p>
              <div className="flex justify-center gap-1.5 py-4">
                {member.social.email && (
                  <Link
                    href={`mailto:${member.social.email}`}
                    target="_blank"
                    aria-label="Email (opens in a new tab)"
                    title="Email"
                    className="hover:drop-shadow-[0_0_0.3rem_#00000050] hover:dark:text-main hover:dark:drop-shadow-[0_0_0.3rem_#f0fc0070]"
                  >
                    <EnvelopeIcon className="size-6" />
                  </Link>
                )}
                {member.social.twitter && (
                  <Link
                    href={`https://twitter.com/${member.social.twitter}`}
                    target="_blank"
                    title="Twitter"
                    aria-label="Twitter (opens in a new tab)"
                    className="hover:drop-shadow-[0_0_0.3rem_#00000050] hover:dark:text-main hover:dark:drop-shadow-[0_0_0.3rem_#f0fc0070]"
                  >
                    <XIcon />
                  </Link>
                )}
                {member.social.telegram && (
                  <Link
                    href={`https://t.me/${member.social.telegram}`}
                    target="_blank"
                    title="Telegram"
                    aria-label="Telegram (opens in a new tab)"
                    className="hover:drop-shadow-[0_0_0.3rem_#00000050] hover:dark:text-main hover:dark:drop-shadow-[0_0_0.3rem_#f0fc0070]"
                  >
                    <TelegramIcon />
                  </Link>
                )}
                {member.social.linkedin && (
                  <Link
                    href={`https://www.linkedin.com/in/${member.social.linkedin}`}
                    target="_blank"
                    title="Linkedin"
                    aria-label="Linkedin (opens in a new tab)"
                    className="hover:drop-shadow-[0_0_0.3rem_#00000050] hover:dark:text-main hover:dark:drop-shadow-[0_0_0.3rem_#f0fc0070]"
                  >
                    <LinkedinIcon />
                  </Link>
                )}
                {member.social.warpcast && (
                  <Link
                    href={`https://warpcast.com/${member.social.warpcast}`}
                    target="_blank"
                    title="Warpcast"
                    aria-label="Warpcast (opens in a new tab)"
                    className="hover:drop-shadow-[0_0_0.3rem_#00000050] hover:dark:text-main hover:dark:drop-shadow-[0_0_0.3rem_#f0fc0070]"
                  >
                    <WarpcastIcon />
                  </Link>
                )}
              </div>
            </div>
          )))}
        </div>
      </section>

      <div className="container mx-auto flex flex-col items-center justify-between gap-10 px-6 py-16 md:flex-row-reverse">
        <div className="flex gap-2">
          <Link
            href="https://t.me/FrameMaker_Global"
            target="_blank"
            title="Telegram"
            aria-label="Telegram (opens in a new tab)"
            className="bg-main p-1 hover:drop-shadow-[0_0_0.3rem_#00000050] dark:text-black hover:dark:drop-shadow-[0_0_0.3rem_#f0fc0090]"
          >
            <TelegramIcon />
          </Link>
          <Link
            href="https://twitter.com/devs_degens"
            target="_blank"
            title="Twitter"
            aria-label="Twitter (opens in a new tab)"
            className="bg-main p-1 hover:drop-shadow-[0_0_0.3rem_#00000050] dark:text-black hover:dark:drop-shadow-[0_0_0.3rem_#f0fc0090]"
          >
            <XIcon />
          </Link>
          <Link
            href="https://warpcast.com/mayers"
            target="_blank"
            title="Warpcast"
            aria-label="Warpcast (opens in a new tab)"
            className="bg-main p-1 hover:drop-shadow-[0_0_0.3rem_#00000050] dark:text-black hover:dark:drop-shadow-[0_0_0.3rem_#f0fc0090]"
          >
            <WarpcastIcon />
          </Link>
        </div>

        <p className="text-center">
          Copyright ©
          {new Date().getFullYear()}
          {' '}
          FrameMaker. All rights reserved.
        </p>
      </div>
    </main>
  );
}
