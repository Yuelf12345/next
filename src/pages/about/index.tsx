import Link from "next/link";
import { useRouter } from "next/router";

import Style from "./index.module.css";
export default function About() {
  const router = useRouter();

  return (
    <div className={Style.container}>
      <Link href="/about/1">
        <p>here to 1</p>
      </Link>
      <Link href={{ pathname: "/about", query: { id: "2" } }}>
        <p>here to 2</p>
        <div>
          <p>Query参数: {JSON.stringify(router.query)}</p>
        </div>
      </Link>
      <button onClick={() => router.push("/about/3")}>here to 3</button>
    </div>
  );
};
