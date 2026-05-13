const Footer = () => {
  return (
    <footer className="border-t border-black/10 py-8 text-center text-sm text-zinc-500 dark:border-white/10">
      Backend Engineer Portfolio © {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
