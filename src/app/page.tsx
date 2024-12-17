import Link from 'next/link'

// example header component
export default () =>
  <nav>
    <ul>
      <li>
        <Link prefetch href="/">
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link prefetch href="/about">
          <span>About</span>
        </Link>
      </li>
      <li>
        <Link prefetch href="/contact">
          <span>Contact</span>
        </Link>
      </li>
    </ul>
  </nav>