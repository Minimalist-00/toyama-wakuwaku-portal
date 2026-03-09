import Link from "next/link";
import { useState } from "react";

export default function EventCardCarousel({ event }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/event/${event.id}`}
      className="carousel-card"
      id={`carousel-${event.id}`}
    >
      {imgError ? (
        <div className="carousel-card__image img-placeholder">📷</div>
      ) : (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="carousel-card__image"
          onError={() => setImgError(true)}
        />
      )}
      <div className="carousel-card__info">
        <p className="carousel-card__title">{event.title}</p>
        <p className="carousel-card__meta">
          📅 {event.date}（{getDayOfWeek(event.date)}） {event.time}
        </p>
        <p className="carousel-card__meta">🏷️ {event.tags.join(" ")}</p>
        <p className="carousel-card__deadline">⏰ 締切 {event.deadline}</p>
      </div>
    </Link>
  );
}

function getDayOfWeek(dateStr) {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const d = new Date(dateStr);
  return days[d.getDay()];
}
