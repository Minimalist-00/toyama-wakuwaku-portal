import BottomNav from "@/components/BottomNav";
import EventCardRow from "@/components/EventCardRow";
import data from "@/data/data.json";
import Head from "next/head";

export default function MyPage() {
  const { appliedEvents, pastEvents } = data.mypage;

  const appliedEventList = data.events.filter((e) =>
    appliedEvents.includes(e.id),
  );
  const pastEventList = data.events.filter((e) => pastEvents.includes(e.id));

  return (
    <>
      <Head>
        <title>マイページ - TOYAMA WAKUWAKU PORTAL</title>
        <meta
          name="description"
          content="申し込み済みのイベントや過去に参加したイベントを確認できます。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="mypage">
        {/* ヘッダー */}
        <div className="mypage-header" id="mypage-header">
          <h1 className="mypage-header__title">👤 マイページ</h1>
        </div>

        <div style={{ padding: "10px", margin: "15px", backgroundColor: "#fff3cd", color: "#856404", borderRadius: "5px", textAlign: "center", fontSize: "0.9rem", border: "1px solid #ffeeba" }}>
          ※このアプリは現在プロトタイプ（試作版）です。
        </div>

        {/* 申し込み済みのイベント */}
        <section className="mypage__section" id="applied-events">
          <h2 className="section-title">✅ 申し込み済みのイベント</h2>
          {appliedEventList.length > 0 ? (
            <div className="event-list stagger-children">
              {appliedEventList.map((event) => (
                <EventCardRow key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="empty-message">
              まだ申し込んでいるイベントがありません
            </p>
          )}
        </section>

        {/* 過去に参加したイベント */}
        <section className="mypage__section" id="past-events">
          <h2 className="section-title">📖 参加したイベント</h2>
          {pastEventList.length > 0 ? (
            <div className="event-list stagger-children">
              {pastEventList.map((event) => (
                <EventCardRow key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="empty-message">まだ参加したイベントがありません</p>
          )}
        </section>
      </div>

      <BottomNav />
    </>
  );
}
