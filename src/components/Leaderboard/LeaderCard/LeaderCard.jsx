import "./LeaderCard.css";
import bookmarkOpen from "../../../assets/bookmark-open.svg";
import bookmarkClosed from "../../../assets/bookmark-closed.svg";
import React from "react";

function LeaderCard({ user, saveItem }) {
  const [entry, setEntry] = React.useState(user);

  const handleClick = () => {
    saveItem(entry).then((data) => {
      setEntry({ ...data });
    });
  };

  return (
    <li onClick={handleClick} className="leadercard">
      <p className="leadercard__text"># {entry.index + 1}</p>
      <img
        className="leadercard__save-icon"
        src={entry.liked ? bookmarkClosed : bookmarkOpen}
        alt="save icon empty"
      />
      <p className="leadercard__text">{entry.username}</p>
      <p className="leadercard__text">{entry.score}pts</p>
    </li>
  );
}

export default LeaderCard;
