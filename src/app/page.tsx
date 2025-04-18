'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { tml2025Artists } from '../data';
import { isBrowser, isIOS, isMobile } from 'react-device-detect';

enum Platforms {
  Spotify = 'Spotify',
  Soundcloud = 'Soundcloud',
  'Apple Music' = 'Apple Music',
  YouTube = 'YouTube',
}

function artistLink(platform: Platforms, artist: string) {
  const encodedArtist = encodeURIComponent(artist);

  switch (platform) {
    case Platforms.Spotify:
      return `https://open.spotify.com/search/${encodedArtist}`;

    case Platforms.Soundcloud:
      switch (isMobile && isIOS) {
        case true:
          return `soundcloud://`;

        case false:
          return `https://soundcloud.com/search?q=${encodedArtist}`;
      }

    case Platforms['Apple Music']:
      return `https://music.apple.com/search?term=${encodedArtist}`;

    case Platforms.YouTube:
      return `https://www.youtube.com/results?search_query=${encodedArtist}`;

    default:
      return `https://open.spotify.com/search/${encodedArtist}`;
  }
}

function randomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

const getRandomArtist = () => {
  const randNum = randomNumber(tml2025Artists.length);

  return tml2025Artists[randNum];
};

const notifyClipboard = (artist: string, platform: string) => {
  return toast.success(`${artist} Copied. Opening ${platform}`, {
    position: 'bottom-center',
    duration: 20000,
    style: {
      border: '1px solid #1e293b',
      padding: '16px',
      color: '#1e293b',
      background: '#e2e8f0',
      fontSize: '16px',
      width: '400px',
      maxWidth: '80vw',
    },
  });
};

export default function Home() {
  const artists = tml2025Artists;

  const [isFullListVisible, setIsFullListVisible] = useState(false);
  const [randomArtist, setRandomArtist] = useState(getRandomArtist());

  const [isSoundCloud, setIsSoundCloud] = useState(false);

  const [platform, setPlatform] = useState<Platforms>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('platform') as Platforms | null;
      return saved ?? Platforms.Spotify;
    }
    return Platforms.Spotify;
  });

  useEffect(() => {
    localStorage.setItem('platform', platform);
  }, [platform]);

  useEffect(() => {
    if (platform === Platforms.Soundcloud) {
      setIsSoundCloud(true);
    }
  }, [platform]);

  const randomArtists = [];
  const randomArtistsMax = 50;

  for (let i = 0; i < randomArtistsMax; i++) {
    const randArtist = randomNumber(artists.length);

    randomArtists.push(artists[randArtist]);
  }

  const router = useRouter();

  return (
    <main className="min-h-screen text-white lg:items-center justify-center grid grid-cols-1 grid-rows-1 relative items-start">
      <div className="col-span-full row-span-full p-4 lg:pt-2 pt-8">
        <div className="lg:p-12 p-4 py-8 rounded-2xl bg-black/70 backdrop-blur-3xl flex flex-col gap-8 items-center max-w-[1440px] w-full mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-2 gap-8 w-full text-slate-200">
            <div className="flex-1">
              <button
                className="flex flex-row items-center gap-4 text-sm cursor-pointer  rounded-full py-1 px-6 bg-indigo-600 text-white font-semibold fit-content"
                onClick={() => {
                  setRandomArtist(getRandomArtist());
                }}
              >
                New Artist
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 14 4 4-4 4" />
                  <path d="m18 2 4 4-4 4" />
                  <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
                  <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />
                  <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />
                </svg>
              </button>
            </div>

            <h1 className="flex-1 text-xl font-bold text-center text-white">
              <span className="text-yellow-500">
                Explore the {artists.length} Artists of Tomorrowland 2025
              </span>
            </h1>

            <div className="flex flex-row gap-8 lg:gap-4 items-center w-full flex-1 justify-center lg:w-fit lg:justify-end">
              <span className="text-sm">Search On:</span>
              <button
                onClick={() => {
                  setPlatform(Platforms.Spotify);
                }}
                className={`w-8 cursor-pointer hover:opacity-100 ${
                  platform === Platforms.Spotify ? 'opacity-100' : 'opacity-15'
                }`}
              >
                <img src="./spotify.png" alt="" />
              </button>
              <button
                onClick={() => {
                  setPlatform(Platforms['Apple Music']);
                }}
                className={`w-8 cursor-pointer hover:opacity-100 ${
                  platform === Platforms['Apple Music']
                    ? 'opacity-100'
                    : 'opacity-15'
                }`}
              >
                <img src="./apple-music.svg" alt="" />
              </button>
              <button
                onClick={() => {
                  setPlatform(Platforms.Soundcloud);
                }}
                className={`w-8 cursor-pointer hover:opacity-100 ${
                  platform === Platforms.Soundcloud
                    ? 'opacity-100'
                    : 'opacity-15'
                }`}
              >
                <img src="./soundcloud.jpg" alt="" />
              </button>
            </div>
          </div>

          {isSoundCloud && <Toaster />}

          <div className="flex flex-row w-[61%] mx-auto items-center gap-16 justify-center">
            <div className="text-6xl font-bold py-2 lg:py-8 text-center flex flex-row items-center gap-2 text-rose-600">
              {platform === Platforms.Soundcloud && isIOS ? (
                <button
                  className="min-h-[120px] flex flex-row items-center gap-4 cursor-pointer"
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(randomArtist);
                    const clipboardToast = notifyClipboard(
                      randomArtist,
                      platform
                    );

                    setTimeout(() => {
                      toast.dismiss(clipboardToast);

                      setTimeout(() => {
                        const url = artistLink(platform, randomArtist);
                        router.push(url);
                      }, 1000);
                    }, 1000);
                  }}
                >
                  {randomArtist}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                  <Toaster />
                </button>
              ) : (
                <a
                  className="cursor-pointer flex flex-row items-center min-h-[120px] gap-4"
                  href={artistLink(platform, randomArtist)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {randomArtist}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-center">
            <button
              onClick={() => {
                setIsFullListVisible(!isFullListVisible);
              }}
              className="cursor-pointer text-indigo-300 flex flex-row items-center gap-1 mx-auto"
            >
              {isFullListVisible ? 'Close' : 'Open'} Full Lineup
              {isFullListVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevrons-down-up-icon lucide-chevrons-down-up"
                >
                  <path d="m7 20 5-5 5 5" />
                  <path d="m7 4 5 5 5-5" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevrons-up-down-icon lucide-chevrons-up-down"
                >
                  <path d="m7 15 5 5 5-5" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
              )}
            </button>

            {!isFullListVisible && (
              <button
                onClick={() => {
                  setIsFullListVisible(!isFullListVisible);
                }}
                className="flex flex-row items-center gap-2 text-xs flex-wrap justify-center blur-[2px] cursor-pointer"
              >
                {artists.map((artist, i) => {
                  if (i >= 40) {
                    return;
                  }
                  return <div key={i}>{artist}</div>;
                })}
              </button>
            )}
          </div>

          {isFullListVisible && (
            <div className="flex flex-row text-sm flex-wrap items-center gap-4">
              {artists.map((artist, i) => {
                return (
                  <a
                    key={i}
                    href={artistLink(platform, artist)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline cursor-pointer"
                  >
                    {artist}
                  </a>
                );
              })}
            </div>
          )}

          <div className="w-full flex flex-row items-center justify-between">
            <a
              className="text-sm underline flex-1 flex flex-row items-center gap-1"
              href="https://belgium.tomorrowland.com/en/line-up/?_gl=1*1oesf02*_up*MQ..*_ga*MTU0NzIzODI2Ny4xNzQ0NDU3MjU3*_ga_Q1V4WG41M4*MTc0NDQ1NzI1Ni4xLjAuMTc0NDQ1NzI1Ni4wLjAuMA..&page=artists"
            >
              Official Lineup
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </a>
            <div className="flex flex-row items-center gap-1 text-sm text-slate-300">
              Made with
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="red"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              by{' '}
              <a className="underline" href="https://jasontcrabtree.com">
                Jason
              </a>
              from 🇳🇿
            </div>
          </div>
        </div>
      </div>

      <Image
        aria-hidden
        src="/tml5.jpg"
        alt="Tomorrowland background image"
        className="object-cover w-screen h-[-webkit-fill-available] -z-10 col-span-full row-span-full"
        fill={true}
      />
    </main>
  );
}
