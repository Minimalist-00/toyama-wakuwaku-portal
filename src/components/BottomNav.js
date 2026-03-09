import Link from "next/link";
import { useRouter } from "next/router";

export default function BottomNav() {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const isMypage = router.pathname === "/mypage";

  return (
    <nav className="bottom-nav" id="bottom-nav">
      <Link
        href="/"
        className={`bottom-nav__item ${isHome ? "bottom-nav__item--active" : ""}`}
      >
        <span className="bottom-nav__icon">🔍</span>
        <span className="bottom-nav__label">イベントを探す</span>
      </Link>
      <Link
        href="/mypage"
        className={`bottom-nav__item ${isMypage ? "bottom-nav__item--active" : ""}`}
      >
        <span className="bottom-nav__icon">👤</span>
        <span className="bottom-nav__label">マイページ</span>
      </Link>
    </nav>
  );
}
