import { useContext, useState, useEffect } from "react";
import { LandRegistryContext } from "@/context/LandRegistryContext";
import { Nav1, Nav2, Nav3 } from ".";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [state, setState] = useState(false);
  const { connectWallet, currentUser, disconnectWallet} = useContext(LandRegistryContext);
  const router = useRouter();

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Register Land", path: "/land-registry" },
    { title: "Government Survey", path: "/survey-land" },
    { title: "Mint Land", path: "/mint-land" },
    { title: "Verify Land", path: "/verify-land" },
    { title: "Sell Land", path: "/sell-land" },
    { title: "Buy Land", path: "/buy-land" },
    //{ title: "About Us", path: "/about-us" },
    { title: "Contact Us", path: "/contact-us" },
  ];

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-button")) setState(false);
    };
  }, []);

  return (
    <nav
      className={`bg-white pb-5 md:text-sm ${
        state
          ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
          : ""
      }`}
    >
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <a href="/">
            <h1 className="title-font sm:text-xl text-3xl mb-4 font-medium text-indigo-600">
              DEEDNFT
            </h1>
          </a>
          <div className="md:hidden">
            <button
              className="menu-button text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? <Nav1 /> : <Nav2 />}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, key) => (
              <li key={key}>
                <Link href={item.path}>
                  <p
                    className={`text-gray-700 hover:text-gray-900 ${
                      router.pathname === item.path ? "text-blue-600 font-semibold" : ""
                    }`}
                  >
                    {item.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
          {/*<div className="relative inline-block text-left">*/}
            {currentUser ? (
              <button className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex" onClick={toggleDropdown}>
                {/*Wallet Connected {currentUser.slice(0, 10)}...*/}
                
                {`Connected ${currentUser.substring(0, 6)}...${currentUser.substring(
                    currentUser.length - 4
                )}`}
              </button>
            ) : (
              <button
                onClick={() => connectWallet()}
                className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
              >
                Connect Wallet <Nav3 />
              </button>
            )}

            {isDropdownOpen && currentUser && (
                <div className="absolute right-0 mt-200 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="px-4 py-2 text-sm text-gray-700">
                    <p>Connected to:</p>
                    <p className="font-bold">{currentUser}</p>
                </div>
                <button
                    onClick={() => {
                    disconnectWallet();
                    setDropdownOpen(false); // Close the dropdown after disconnecting
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                    Disconnect
                </button>
                </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
