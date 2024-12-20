import Link from "next/link";
import { useRouter } from "next/router";
import Style from "./index.module.css";

// Router.beforePopState(({ url, as, options }) => {
//   console.log(url, as, options);
  
//   if (as !== "/") {

//     return false;
//   }
//   return true;
// });

export default function About() {
  const router = useRouter();
  const avatar = "/static/avatar.png";
  return (
    <div className={Style.container}>
      <p>about page</p>
      <img src={avatar} width={100} height={100} alt="avatar" />
      <Link href="/about/1">
        <p>here to 1</p>
      </Link>
      <Link href={{ pathname: "/about", query: { id: "2" } }}>
        <p>here to 2</p>
        <div>
          <p>Query参数: {JSON.stringify(router.query)}</p>
        </div>
      </Link>
      <button onClick={() => router.back()}>go Back</button>
    </div>
  );
}
