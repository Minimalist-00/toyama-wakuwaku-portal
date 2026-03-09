import BottomNav from "@/components/BottomNav";
import EventCardVertical from "@/components/EventCardVertical";
import Footer from "@/components/Footer";
import data from "@/data/data.json";
import Head from "next/head";
import Link from "next/link";

export default function EventsPage() {
  const today = new Date().toISOString().split("T")[0];

  const allEvents = [...data.events].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  return (
    <>
      <Head>
        <title>イベント一覧 - TOYAMA WAKUWAKU PORTAL</title>
        <meta
          name="description"
          content="富山で開催されるイベントの一覧ページ"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page-main">
        {/* ヘッダー */}
        <div className="detail-header" id="events-header">
          <Link href="/" className="detail-header__back">
            ←
          </Link>
          <span className="detail-header__title">イベント一覧</span>
        </div>

        {/* イベント一覧 */}
        <section id="all-events">
          <h1 className="section-title">📅 すべてのイベント</h1>
          <div className="event-grid stagger-children">
            {allEvents.map((event) => (
              <EventCardVertical key={event.id} event={event} />
            ))}
          </div>
        </section>

        <Footer />
      </div>

      <BottomNav />
    </>
  );
}
