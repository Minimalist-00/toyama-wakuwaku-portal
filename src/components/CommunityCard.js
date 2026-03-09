import Link from "next/link";
import { useState } from "react";

export default function CommunityCard({ community }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/event/${community.id}`}
      className="community-card"
      id={`community-${community.id}`}
    >
      {imgError ? (
        <div className="community-card__image img-placeholder">🏠</div>
      ) : (
        <img
          src={community.imageUrl}
          alt={community.title}
          className="community-card__image"
          onError={() => setImgError(true)}
        />
      )}
      <div className="community-card__info">
        <h3 className="community-card__title">{community.title}</h3>
        <p className="community-card__description">{community.description}</p>
        <div className="community-card__meta">
          <span>📍 {community.location}</span>
          <span>👥 {community.memberCount}人</span>
        </div>
      </div>
    </Link>
  );
}
