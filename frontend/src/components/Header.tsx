import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, username, setIsAuthenticated, setUsername } = useAuth();

  const handleLogOut = () => {
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <header className="p-4 text-black shadow-md shadow-gray-300 min-h-[5rem] flex items-center justify-between lg:p-10">
      <img src="/icon.png" alt="logo" className="h-8 w-8 flex-shrink-0" />
      <div className="flex items-center gap-3 sm:gap-4">
        {isAuthenticated && (
          <span
            className="text-base font-semibold text-gray-800 truncate max-w-[12rem] sm:max-w-[16rem] md:max-w-none"
            title={username}
          >
            Username : {username}
          </span>
        )}
        <button
          type="button"
          className="bg-buttonColor text-white font-semibold py-2 px-4 sm:px-6 rounded-lg hover:bg-blue-400 transition flex-shrink-0"
          onClick={handleLogOut}
        >
          {isAuthenticated ? "Log out" : "Log in"}
        </button>
      </div>
    </header>
  );
};

export default Header;
