import BottomNav from "@/components/BottomNav";
import CommunityCard from "@/components/CommunityCard";
import Footer from "@/components/Footer";
import data from "@/data/data.json";
import Head from "next/head";
import Link from "next/link";

export default function CommunitiesPage() {
  return (
    <>
      <Head>
        <title>コミュニティ一覧 - TOYAMA WAKUWAKU PORTAL</title>
        <meta
          name="description"
          content="富山で活動するコミュニティの一覧ページ"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page-main">
        {/* ヘッダー */}
        <div className="detail-header" id="communities-header">
          <Link href="/" className="detail-header__back">
            ←
          </Link>
          <span className="detail-header__title">コミュニティ一覧</span>
        </div>

        {/* コミュニティ一覧 */}
        <section id="all-communities">
          <h1 className="section-title">🤝 すべてのコミュニティ</h1>
          <div className="community-list stagger-children">
            {data.communities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </section>

        <Footer />
      </div>

      <BottomNav />
    </>
  );
}
