import Link from "next/link";
import { useState } from "react";
import TagBadge from "./TagBadge";

export default function EventCardRow({ event }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/event/${event.id}`}
      className="event-card-row"
      id={`event-row-${event.id}`}
    >
      {imgError ? (
        <div className="event-card-row__image img-placeholder">📷</div>
      ) : (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="event-card-row__image"
          onError={() => setImgError(true)}
        />
      )}
      <div className="event-card-row__info">
        <p className="event-card-row__title">{event.title}</p>
        <p className="event-card-row__meta">
          📅 {event.date} {event.time}
        </p>
        <p className="event-card-row__meta">📍 {event.location}</p>
        <div className="event-card-row__tags">
          {event.tags.map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
