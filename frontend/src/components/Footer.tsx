const Footer = () => {
  return (
    <footer className="h-20 flex items-center justify-end pr-4 lg:pr-10 bg-white/30 backdrop-blur-sm border-t border-slate-200/80 shadow-top text-slate-700 transition-[box-shadow,border-color] duration-280 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div className="flex items-end gap-1 italic">
        <img src="/bottomicon.png" alt="logo" className="h-10 w-10" />
        <span className="font-bold text-xl text-slate-800">HBM IT</span>
        <span className="font-semibold tracking-tighter">INFRASTRUCTURE</span>
      </div>
    </footer>
  );
};

export default Footer;
