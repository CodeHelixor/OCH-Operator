import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, username, setIsAuthenticated, setUsername } = useAuth();

  const handleLogOut = () => {
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <header className="p-4 min-h-[5rem] flex items-center justify-between gap-4 lg:p-10 bg-white/30 backdrop-blur-sm shadow-sm border-b border-slate-200/80 transition-[box-shadow,border-color] duration-280 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <img src="/icon.png" alt="" className="h-8 w-8 flex-shrink-0 rounded-lg object-contain" aria-hidden />
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-800 truncate ml-24">
          <span className="text-indigo-600 font-bold">OCH</span>
          <span className="text-slate-600 font-medium"> Phone Number Porting System</span>
        </h1>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
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
