import { motion as m } from "framer-motion";

function Footer() {
  return (
    <m.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-center text-white fixed-bottom"
    >
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(39, 191, 245, 0.7)" }}
      >
        © 2023 Copyright
      </div>
    </m.footer>
  );
}

export default Footer;
