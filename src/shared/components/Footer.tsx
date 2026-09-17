export const Footer: React.FC = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <svg
          className="h-10 w-10"
          role="presentation"
          aria-hidden="true"
        >
          <use href="/icons.svg#footer-logo"></use>
        </svg>
        <p>Copyright © 2026 - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="#">
          <svg
            className="h-6 w-6"
            role="presentation"
            aria-hidden="true"
          >
            <use href="/icons.svg#twitter-logo"></use>
          </svg>
        </a>
        <a href="#">
          <svg
            className="h-6 w-6"
            role="presentation"
            aria-hidden="true"
          >
            <use href="/icons.svg#youtube-logo"></use>
          </svg>
        </a>
        <a href="#">
          <svg
            className="h-6 w-6"
            role="presentation"
            aria-hidden="true"
          >
            <use href="/icons.svg#facebook-logo"></use>
          </svg>
        </a>
      </nav>
    </footer>
  )
}
