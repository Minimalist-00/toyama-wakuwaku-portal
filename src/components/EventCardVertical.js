import Link from "next/link";
import { useState } from "react";
import TagBadge from "./TagBadge";

export default function EventCardVertical({ event }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/event/${event.id}`}
      className="event-card-vertical"
      id={`event-vert-${event.id}`}
    >
      {imgError ? (
        <div className="event-card-vertical__image img-placeholder">📷</div>
      ) : (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="event-card-vertical__image"
          onError={() => setImgError(true)}
        />
      )}
      <div className="event-card-vertical__info">
        <h3 className="event-card-vertical__title">{event.title}</h3>
        <p className="event-card-vertical__meta">
          📅 {event.date} {event.time}
        </p>
        <p className="event-card-vertical__meta">📍 {event.location}</p>
        <div className="event-card-vertical__tags">
          {event.tags.map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
