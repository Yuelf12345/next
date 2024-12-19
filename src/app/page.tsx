import Link from "next/link";

// example header component
export default function Pages() {
  return (
    <nav>
      <ul>
        <li>
          <Link prefetch href="/about">
            <span>About</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
