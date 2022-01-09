import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";

const colors = [
  "from-indigo-500",
  "from-red-500",
  "from-yellow-500",
  "from-green-500",
  "from-blue-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const { data: session, status } = useSession();
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [color]);

  if (status === "loading") {
    return renderLoading();
  } else {
    return (
      <div className="flex-grow">
        <header className="absolute top-5 right-8">
          <div className="flex items-center bg-red-300 space-x-4 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
            {session.user.image ? (
              <img
                className="rounded-full w-10 h-10"
                src={session.user.image}
                alt="user-image"
              />
            ) : (
              renderSVGIcon()
            )}
            <h2>{session.user?.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        </header>
        <section
          className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
        ></section>
      </div>
    );
  }
}

function renderLoading() {
  return (
    <div className="flex flex-grow text-white">
      <header>
        <div>
          <h1>I am loading....</h1>
        </div>
      </header>
    </div>
  );
}

function renderSVGIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

export default Center;