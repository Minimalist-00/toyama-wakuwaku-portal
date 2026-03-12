import BottomNav from "@/components/BottomNav";
import CommunityCard from "@/components/CommunityCard";
import EventCardRow from "@/components/EventCardRow";
import EventCardVertical from "@/components/EventCardVertical";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import data from "@/data/data.json";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

function getDayOfWeek(dateStr) {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const d = new Date(dateStr);
  return days[d.getDay()];
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showMoreUpcoming, setShowMoreUpcoming] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  // HOTなイベント（締切が近い順）
  const hotEvents = data.events
    .filter((e) => e.isHot)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  // 自動スライド（3秒ごと）
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % hotEvents.length);
  }, [hotEvents.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + hotEvents.length) % hotEvents.length);
  }, [hotEvents.length]);

  useEffect(() => {
    if (hotEvents.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [hotEvents.length, nextSlide]);

  // タグ切り替え
  const toggleTag = (label) => {
    setSelectedTags((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label],
    );
  };

  // フィルタリング
  const filteredEvents = useMemo(() => {
    return data.events.filter((event) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = event.title.toLowerCase().includes(q);
        const matchTag = event.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchTag) return false;
      }
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

        <div style={{ padding: "10px", margin: "15px", backgroundColor: "#fff3cd", color: "#856404", borderRadius: "5px", textAlign: "center", fontSize: "0.9rem", border: "1px solid #ffeeba" }}>
          ※このアプリは現在プロトタイプ（試作版）です。
        </div>

        {/* ヒーローバナー */}
        <div className="hero-banner" id="hero-banner">
          <img
            src="/images/hero_banner.jpg"
            alt="富山のワクワクするイベント"
            className="hero-banner__image"
          />
        </div>
        <div className="hero-catchphrase" id="hero-catchphrase">
          <p className="hero-catchphrase__text">
            富山で新しい<em>ワクワク</em>を見つけよう
          </p>
          <p className="hero-catchphrase__sub">
            イベントやコミュニティ情報をまとめてチェック
          </p>
        </div>

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

        {/* 締切が近いイベント カルーセル（自動スライド） */}
        <section className="carousel-section" id="hot-events">
          <h2 className="section-title">🔥 締切が近いイベント</h2>
          <div className="slideshow">
            <div className="slideshow__track">
              {hotEvents.map((event, index) => (
                <Link
                  key={event.id}
                  href={`/event/${event.id}`}
                  className={`slideshow__slide ${index === currentSlide ? "slideshow__slide--active" : ""}`}
                >
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="slideshow__slide-image"
                  />
                  <div className="slideshow__slide-info">
                    <p className="slideshow__slide-title">{event.title}</p>
                    <p className="slideshow__slide-meta">
                      📅 {event.date}（{getDayOfWeek(event.date)}） {event.time}
                    </p>
                    <p className="slideshow__slide-tags">
                      🏷️ {event.tags.join("　")}
                    </p>
                    <p className="slideshow__slide-deadline">
                      ⏰ 締切 {event.deadline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* 矢印ボタン */}
            {hotEvents.length > 1 && (
              <>
                <button
                  className="slideshow__arrow slideshow__arrow--prev"
                  onClick={(e) => {
                    e.preventDefault();
                    prevSlide();
                  }}
                  aria-label="前のイベント"
                >
                  ‹
                </button>
                <button
                  className="slideshow__arrow slideshow__arrow--next"
                  onClick={(e) => {
                    e.preventDefault();
                    nextSlide();
                  }}
                  aria-label="次のイベント"
                >
                  ›
                </button>
              </>
            )}

            {/* ドット */}
            <div className="slideshow__dots">
              {hotEvents.map((_, index) => (
                <button
                  key={index}
                  className={`slideshow__dot ${index === currentSlide ? "slideshow__dot--active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`スライド ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 絞り込みタグ */}
        <section id="filter-section">
          <h2 className="section-title">🔎 絞り込んで探す</h2>
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
        </section>

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

        {/* 近日開催のイベント（カードグリッド） */}
        <section id="upcoming-events">
          <h2 className="section-title">📅 近日開催のイベント</h2>
          {visibleUpcoming.length > 0 ? (
            <div className="event-grid stagger-children">
              {visibleUpcoming.map((event) => (
                <EventCardVertical key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="empty-message">該当するイベントはありません</p>
          )}
          <div className="more-link-wrapper">
            <Link href="/events" className="more-link" id="more-events-btn">
              &gt;&gt; もっとワクワクを探す
            </Link>
          </div>
        </section>

        {/* コミュニティ */}
        <section id="communities">
          <h2 className="section-title">🤝 富山のコミュニティ</h2>
          <div className="community-list stagger-children">
            {data.communities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
          <div className="more-link-wrapper">
            <Link
              href="/communities"
              className="more-link"
              id="more-communities-btn"
            >
              &gt;&gt; もっとコミュニティを探す
            </Link>
          </div>
        </section>

        <Footer />
      </div>

      <BottomNav />
    </>
  );
}
