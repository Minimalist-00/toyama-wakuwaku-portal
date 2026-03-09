import BottomNav from "@/components/BottomNav";
import CommunityCard from "@/components/CommunityCard";
import EventCardCarousel from "@/components/EventCardCarousel";
import EventCardRow from "@/components/EventCardRow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import data from "@/data/data.json";
import Head from "next/head";
import { useMemo, useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showMoreUpcoming, setShowMoreUpcoming] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // HOTなイベント（締切が近い順）
  const hotEvents = data.events
    .filter((e) => e.isHot)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  // タグ切り替え
  const toggleTag = (label) => {
    setSelectedTags((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label],
    );
  };

  // フィルタリング
  const filteredEvents = useMemo(() => {
    return data.events.filter((event) => {
      // 検索
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = event.title.toLowerCase().includes(q);
        const matchTag = event.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchTag) return false;
      }
      // タグフィルタ
      if (selectedTags.length > 0) {
        const hasTag = selectedTags.some((tag) => event.tags.includes(tag));
        if (!hasTag) return false;
      }
      return true;
    });
  }, [searchQuery, selectedTags]);

  // 今日のイベント
  const todayEvents = filteredEvents.filter((e) => e.date === today);

  // 近日開催イベント（今日以降、日付順）
  const upcomingEvents = filteredEvents
    .filter((e) => e.date > today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const visibleUpcoming = showMoreUpcoming
    ? upcomingEvents
    : upcomingEvents.slice(0, 10);

  return (
    <>
      <Head>
        <title>TOYAMA WAKUWAKU PORTAL - イベントを探す</title>
        <meta
          name="description"
          content="富山の若者向けイベント・コミュニティポータル。気になるイベントを見つけて参加しよう！"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page-main">
        <Header />

        {/* 検索バー */}
        <div className="search-bar" id="search-bar">
          <div className="search-bar__input-wrapper">
            <span className="search-bar__icon">🔍</span>
            <input
              type="text"
              className="search-bar__input"
              placeholder="イベントを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-input"
            />
          </div>
        </div>

        {/* HOTなイベント カルーセル */}
        <section className="carousel-section" id="hot-events">
          <h2 className="section-title">🔥 締切が近いイベント</h2>
          <div className="carousel">
            {hotEvents.map((event) => (
              <EventCardCarousel key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* 絞り込みタグ */}
        <div className="filter-tags" id="filter-tags">
          {data.tags.map((tag) => (
            <button
              key={tag.id}
              className={`filter-tag ${
                selectedTags.includes(tag.label)
                  ? "filter-tag--active"
                  : "filter-tag--inactive"
              }`}
              onClick={() => toggleTag(tag.label)}
              id={`tag-${tag.id}`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* 今日のイベント */}
        <section id="today-events">
          <h2 className="section-title">📍 今日のイベント</h2>
          {todayEvents.length > 0 ? (
            <div className="event-list stagger-children">
              {todayEvents.map((event) => (
                <EventCardRow key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="empty-message">今日のイベントはありません 🌤️</p>
          )}
        </section>

        {/* 近日開催のイベント */}
        <section id="upcoming-events">
          <h2 className="section-title">📅 近日開催のイベント</h2>
          {visibleUpcoming.length > 0 ? (
            <div className="event-list stagger-children">
              {visibleUpcoming.map((event) => (
                <EventCardRow key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="empty-message">該当するイベントはありません</p>
          )}
          {!showMoreUpcoming && upcomingEvents.length > 10 && (
            <div className="more-btn-wrapper">
              <button
                className="more-btn"
                onClick={() => setShowMoreUpcoming(true)}
                id="more-upcoming-btn"
              >
                もっと見る
              </button>
            </div>
          )}
        </section>

        {/* コミュニティ */}
        <section id="communities">
          <h2 className="section-title">🤝 富山のコミュニティ</h2>
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
