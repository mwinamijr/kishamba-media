import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/users/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const socialLinks = [
    { icon: "twitter", link: "https://twitter.com/kishambamedia" },
    { icon: "facebook", link: "https://facebook.com/kishambamedia" },
    { icon: "linkedin", link: "https://linkedin.com/kishambamedia" },
    { icon: "instagram", link: "https://instagram.com/kishambamedia" },
    { icon: "youtube", link: "https://youtube.com/@kishambamedia" },
  ];

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "twitter":
        return (
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M23 3a10.9 10.9 0 01-3.14.86 5.48 5.48 0 002.4-3.04 10.65 10.65 0 01-3.38 1.29 5.42 5.42 0 00-9.24 4.94A15.41 15.41 0 013 4.9a5.41 5.41 0 001.68 7.22 5.35 5.35 0 01-2.46-.68v.07a5.42 5.42 0 004.34 5.31 5.4 5.4 0 01-2.45.09 5.43 5.43 0 005.06 3.77A10.86 10.86 0 013 19.54a15.37 15.37 0 008.29 2.42c9.95 0 15.4-8.24 15.4-15.4 0-.24 0-.48-.02-.71A11 11 0 0023 3z" />
          </svg>
        );
      case "facebook":
        return (
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.45 20.45h-3.6v-5.7c0-1.36-.03-3.1-1.89-3.1-1.89 0-2.18 1.48-2.18 3v5.8h-3.6V9h3.46v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.34 2.41 4.34 5.55v6.19zM5.34 7.43a2.1 2.1 0 01-2.12-2.1 2.1 2.1 0 112.12 2.1zm-1.8 13.02h3.6V9h-3.6v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.97 0 1.78-.78 1.78-1.75V1.75C24 .78 23.19 0 22.22 0z" />
          </svg>
        );
      case "instagram":
        return (
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a1 1 0 110 2 1 1 0 010-2zm-5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
          </svg>
        );
      case "youtube":
        return (
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19.8 7.2c-.2-.7-.8-1.3-1.5-1.4C16.8 5.5 12 5.5 12 5.5s-4.8 0-6.3.3c-.7.1-1.3.7-1.5 1.4-.2.7-.2 2.2-.2 2.2s0 1.5.2 2.2c.2.7.8 1.3 1.5 1.4 1.5.3 6.3.3 6.3.3s4.8 0 6.3-.3c.7-.1 1.3-.7 1.5-1.4.2-.7.2-2.2.2-2.2s0-1.5-.2-2.2zM10 14.5v-5l4 2.5-4 2.5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <header>
      {/* Topbar */}
      <div className="hidden lg:block bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 flex justify-between items-center h-10">
          <ul className="flex space-x-4 text-sm">
            <li className="border-r border-gray-600 pr-4">{formattedDate}</li>
            <li className="border-r border-gray-600 pr-4">
              <NavLink
                to="#"
                className="hover:text-orange-500 transition-colors"
              >
                Tangaza Nasi
              </NavLink>
            </li>
            {userInfo ? (
              <>
                <li className="border-r border-gray-600 pr-4">
                  <NavLink
                    to="/profile"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Habari, {userInfo.username}
                  </NavLink>
                </li>
                <li className="border-r border-gray-600 pr-4">
                  <button
                    onClick={handleLogout}
                    className="hover:text-orange-500 transition-colors"
                  >
                    Toka Nje
                  </button>
                </li>
                {userInfo.role === "admin" && (
                  <li className="border-r border-gray-600 pr-4">
                    <NavLink
                      to="/admin"
                      className="hover:text-orange-500 transition-colors"
                    >
                      Admin Dashboard
                    </NavLink>
                  </li>
                )}
                {userInfo.role === "reporter" && (
                  <li className="border-r border-gray-600 pr-4">
                    <NavLink
                      to="/posts"
                      className="hover:text-orange-500 transition-colors"
                    >
                      Reporter Dashboard
                    </NavLink>
                  </li>
                )}
                {userInfo.role === "editor" && (
                  <li className="border-r border-gray-600 pr-4">
                    <NavLink
                      to="/articles"
                      className="hover:text-orange-500 transition-colors"
                    >
                      Editor Dashboard
                    </NavLink>
                  </li>
                )}
              </>
            ) : (
              <li>
                <NavLink
                  to="/ingia"
                  className="hover:text-orange-500 transition-colors"
                >
                  Ingia
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="flex space-x-4 text-gray-300">
            {socialLinks.map(({ icon, link }) => (
              <li key={icon}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                  aria-label={icon}
                >
                  {renderIcon(icon)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle section */}
        <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row items-center justify-between bg-white">
          <NavLink to="/" className="text-center lg:text-left w-full lg:w-auto">
            <h1
              className="text-4xl font-extrabold uppercase text-primary leading-none"
              style={{ wordBreak: "break-word" }}
            >
              Kishamba <span className="text-gray-600 font-normal">Media</span>
            </h1>
          </NavLink>

          <img
            src="/img/ads-728x90.png"
            alt="ads"
            className="w-full lg:w-auto mt-4 lg:mt-0"
          />
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 lg:py-4">
            <NavLink to="/" className="lg:hidden">
              <h1 className="text-3xl font-extrabold uppercase text-primary leading-none">
                Kishamba <span className="text-white font-normal">Media</span>
              </h1>
            </NavLink>

            {/* Toggle button (optional, implement mobile menu functionality if needed) */}
            <button
              type="button"
              aria-label="Toggle menu"
              className="text-white lg:hidden focus:outline-none focus:ring-2 focus:ring-orange-500"
              // onClick={} // Implement menu toggle logic here if needed
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Menu items */}
            <div className="hidden lg:flex lg:space-x-6">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link relative px-2 py-1 text-sm font-medium uppercase ${
                    isActive ? "text-orange-500" : "hover:text-orange-400"
                  }`
                }
              >
                Nyumbani
              </NavLink>
              <NavLink
                to="/michezo"
                className={({ isActive }) =>
                  `nav-link relative px-2 py-1 text-sm font-medium uppercase ${
                    isActive ? "text-orange-500" : "hover:text-orange-400"
                  }`
                }
              >
                Michezo
              </NavLink>
              <NavLink
                to="/kuhusu"
                className={({ isActive }) =>
                  `nav-link relative px-2 py-1 text-sm font-medium uppercase ${
                    isActive ? "text-orange-500" : "hover:text-orange-400"
                  }`
                }
              >
                Kuhusu
              </NavLink>

              <div className="relative group">
                <span
                  className="nav-link cursor-pointer relative px-2 py-1 text-sm font-medium uppercase hover:text-orange-400"
                  aria-haspopup="true"
                >
                  Habari Nyingine
                </span>
                <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-gray-800 rounded shadow-lg min-w-[160px] z-10">
                  <NavLink
                    to="/afya"
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm hover:bg-orange-500 hover:text-white ${
                        isActive ? "bg-orange-500 text-white" : "text-gray-300"
                      }`
                    }
                  >
                    Afya
                  </NavLink>
                  <NavLink
                    to="/biashara"
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm hover:bg-orange-500 hover:text-white ${
                        isActive ? "bg-orange-500 text-white" : "text-gray-300"
                      }`
                    }
                  >
                    Biashara
                  </NavLink>
                  <NavLink
                    to="/mitindo"
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm hover:bg-orange-500 hover:text-white ${
                        isActive ? "bg-orange-500 text-white" : "text-gray-300"
                      }`
                    }
                  >
                    Mitindo
                  </NavLink>
                  <NavLink
                    to="/burudani"
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm hover:bg-orange-500 hover:text-white ${
                        isActive ? "bg-orange-500 text-white" : "text-gray-300"
                      }`
                    }
                  >
                    Burudani
                  </NavLink>
                </div>
              </div>

              <NavLink
                to="/wasiliana-nasi"
                className={({ isActive }) =>
                  `nav-link relative px-2 py-1 text-sm font-medium uppercase ${
                    isActive ? "text-orange-500" : "hover:text-orange-400"
                  }`
                }
              >
                Wasiliana Nasi
              </NavLink>
            </div>

            {/* Search */}
            <div className="hidden lg:flex ml-auto max-w-xs w-full">
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Keyword"
                  className="w-full px-3 py-1 text-sm rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="bg-orange-500 hover:bg-orange-600 px-3 rounded-r text-white">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
