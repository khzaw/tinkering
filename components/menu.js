import Link from "next/link";

const Menu = () => (
  <nav>
    <Link href="/">
      <a>Infinite</a>
    </Link>
    {/* <Link href="/paged">
      <a>Paged</a>
    </Link> */}
    <style jsx>
      {`
        nav {
          display: flex;
          margin-bottom: 32px;
        }

        a {
          margin-left: 10px;
          margin-right: 10px;
        }
      `}
    </style>
  </nav>
);

export default Menu;
