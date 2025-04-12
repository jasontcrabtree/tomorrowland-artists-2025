'use client';

import { useState } from 'react';
import Image from 'next/image';

import { tml2025Artists } from '../data';

enum Platforms {
  'Spotify',
  'Soundcloud',
  'Apple Music',
}

function artistLink(platform: Platforms, artist: string) {
  switch (platform) {
    case Platforms.Spotify:
      return `https://open.spotify.com/search/${artist}%20artist`;

    case Platforms.Soundcloud:
      return `https://soundcloud.com/search/people?q=${artist}`;

    case Platforms['Apple Music']:
      return `https://music.apple.com/search?term=${artist}`;

    default:
      return `https://open.spotify.com/search/${artist}%20artist`;
  }
}

const getRandomArtist = () => {
  const randNum = Math.floor(Math.random() * tml2025Artists.length);

  return tml2025Artists[randNum];
};

export default function Home() {
  const artists = tml2025Artists;
  const randomArtist = getRandomArtist();

  const [platform, setPlatform] = useState<Platforms>(Platforms['Apple Music']);

  // console.log(artists[0]);

  return (
    <main className="min-h-screen text-white items-center justify-center grid grid-cols-1 grid-rows-1 relative">
      <div className="col-span-full row-span-full p-24">
        <div className="lg:p-16 rounded-xl bg-black/40 backdrop-blur-2xl p-2">
          <div className="text-6xl font-bold py-8 text-center">
            {randomArtist}
          </div>

          <div className="flex flex-row text-sm flex-wrap items-center gap-4">
            {artists.map((artist, i) => (
              <a
                key={i}
                href={artistLink(platform, artist)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline cursor-pointer"
              >
                {artist}
              </a>
            ))}
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
