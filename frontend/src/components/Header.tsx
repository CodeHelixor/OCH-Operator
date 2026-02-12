import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, username, setIsAuthenticated, setUsername } = useAuth();

  const handleLogOut = () => {
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <header className="p-4 min-h-[5rem] flex items-center justify-between lg:p-10 bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/80 transition-[box-shadow,border-color] duration-280 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <img src="/icon.png" alt="logo" className="h-8 w-8 flex-shrink-0" />
      <div className="flex items-center gap-3 sm:gap-4">
        {isAuthenticated && (
          <span
            className="text-base font-semibold text-slate-800 truncate max-w-[12rem] sm:max-w-[16rem] md:max-w-none"
            title={username}
          >
            Username : {username}
          </span>
        )}
        <button
          type="button"
          className="btn-primary flex-shrink-0"
          onClick={handleLogOut}
        >
          {isAuthenticated ? "Log out" : "Log in"}
        </button>
      </div>
    </header>
  );
};

export default Header;
