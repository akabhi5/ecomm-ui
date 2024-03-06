const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content flex justify-between items-center bg-slate-100">
      <aside>
        <p>Tech used to build this app</p>

        <div>
          <ul className="list-disc ml-10">
            <li>Next.js</li>
            <li>Zustand</li>
            <li>TainwindCSS</li>
            <li>Shadcn UI</li>
            <li>React Hook Form</li>
          </ul>
        </div>
      </aside>

      <aside>
        <a
          href="https://www.abhishekkumar.bio/"
          target="_blank"
          className="hover:underline"
        >
          abhishekkumar.bio
        </a>
      </aside>
    </footer>
  );
};

export default Footer;
