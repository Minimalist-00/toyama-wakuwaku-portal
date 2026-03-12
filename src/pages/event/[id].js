import TagBadge from "@/components/TagBadge";
import data from "@/data/data.json";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EventDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [imgError, setImgError] = useState(false);

  // events と communities の両方から検索
  const item =
    data.events.find((e) => e.id === id) ||
    data.communities.find((c) => c.id === id);

  if (!item) {
    return (
      <>
        <Head>
          <title>イベントが見つかりません - TOYAMA WAKUWAKU PORTAL</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="detail-header">
          <button className="detail-header__back" onClick={() => router.back()}>
            ←
          </button>
          <span className="detail-header__title">Not Found</span>
        </div>
        <p className="empty-message">お探しのページは見つかりませんでした。</p>
      </>
    );
  }

  const isCommunity = item.type === "community";
  const hasApplicationUrl = !!item.applicationUrl;

  return (
    <>
      <Head>
        <title>{item.title} - TOYAMA WAKUWAKU PORTAL</title>
        <meta name="description" content={item.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="event-detail">
        {/* ヘッダー */}
        <div className="detail-header" id="detail-header">
          <button className="detail-header__back" onClick={() => router.back()}>
            ←
          </button>
          <span className="detail-header__title">{item.title}</span>
        </div>

        {/* メインビジュアル */}
        {imgError ? (
          <div
            className="event-detail__hero img-placeholder"
            style={{ height: "220px", fontSize: "48px" }}
          >
            📷
          </div>
        ) : (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="event-detail__hero"
            onError={() => setImgError(true)}
          />
        )}

        <div className="event-detail__body animate-fadeInUp">
          {/* イベント名 */}
          <h1 className="event-detail__title">{item.title}</h1>

          {/* 基本情報 */}
          {!isCommunity && (
            <>
              <div className="event-detail__info-row">
                <span className="event-detail__info-icon">📅</span>
                <span>
                  {item.date} {item.time}
                </span>
              </div>
              <div className="event-detail__info-row">
                <span className="event-detail__info-icon">📍</span>
                <span>{item.location}</span>
              </div>
            </>
          )}
          {isCommunity && (
            <>
              <div className="event-detail__info-row">
                <span className="event-detail__info-icon">📍</span>
                <span>{item.location}</span>
              </div>
              <div className="event-detail__info-row">
                <span className="event-detail__info-icon">👥</span>
                <span>{item.memberCount}人</span>
              </div>
            </>
          )}

          {/* タグ */}
          {item.tags && (
            <div className="event-detail__tags">
              {item.tags.map((tag) => (
                <TagBadge key={tag} label={tag} />
              ))}
            </div>
          )}

          {/* 概要 */}
          <h2 className="event-detail__section-title">イベントについて</h2>
          <p className="event-detail__description">{item.description}</p>

          {/* 詳細コンテンツ */}
          {item.contentHtml && (
            <div 
              className="event-detail__rich-content"
              dangerouslySetInnerHTML={{ __html: item.contentHtml }}
            />
          )}



          {/* 元のサイトへのリンク */}
          {item.applicationUrl && (
            <div className="event-detail__original-link-wrapper" style={{ marginBottom: "24px" }}>
              <a 
                href={item.applicationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="event-detail__original-link"
                style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "4px",
                  color: "var(--primary-dark)",
                  fontWeight: "700",
                  textDecoration: "underline",
                  fontSize: "15px"
                }}
              >
                🔗 掲載元のサイトを見る
              </a>
            </div>
          )}

          {/* 連絡先 */}
          {item.contact && (
            <>
              <h2 className="event-detail__section-title">お問い合わせ</h2>
              <p
                className="text-sm"
                style={{ color: "var(--text-sub)", marginBottom: "12px" }}
              >
                イベントに関するご質問や申し込みについて
              </p>
              <div className="event-detail__contact">
                {item.contact.email && (
                  <a
                    href={`mailto:${item.contact.email}`}
                    className="event-detail__contact-item"
                    id="contact-email"
                  >
                    <span className="event-detail__contact-icon">✉️</span>
                    <span>{item.contact.email}</span>
                  </a>
                )}
                {item.contact.instagram && (
                  <a
                    href={`https://www.instagram.com/${item.contact.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-detail__contact-item"
                    id="contact-instagram"
                  >
                    <span className="event-detail__contact-icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </span>
                    <span>{item.contact.instagram}</span>
                  </a>
                )}
                {item.contact.line && (
                  <a
                    href={`https://line.me/R/ti/p/${item.contact.line}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-detail__contact-item"
                    id="contact-line"
                  >
                    <span className="event-detail__contact-icon">💬</span>
                    <span>{item.contact.line}</span>
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {hasApplicationUrl ? (
        <div className="event-detail__sticky-footer">
          <a
            href={item.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="event-detail__apply-btn event-detail__apply-btn--sticky"
            id="apply-btn"
          >
            申し込む
          </a>
        </div>
      ) : (
        <div className="event-detail__sticky-footer">
          <div className="event-detail__apply-btn event-detail__apply-btn--disabled event-detail__apply-btn--sticky">
            申し込み受付は終了しました
          </div>
        </div>
      )}
    </>
  );
}
