const Footer = () => {
  return (
    <footer className=" text-black shadow-top h-20 flex items-center justify-end pr-4 lg:pr-10">
      <div className="flex items-end gap-1 italic">
        <img src="/bottomicon.png" alt="logo" className="h-10 w-10" />
        <span className="font-bold text-xl">HBM IT</span>
        <span className="font-semibold tracking-tighter">INFRASTRUCTURE</span>
      </div>
    </footer>
  );
};

export default Footer;
