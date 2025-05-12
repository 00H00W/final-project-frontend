import "./LeaderCard.css";

function LeaderCard({ user }) {
  const { rank, username, score } = user;
  return (
    <li className="leadercard">
      <p className="leadercard__text"># {rank}</p>
      <p className="leadercard__text">{username}</p>
      <p className="leadercard__text">{score}pts</p>
    </li>
  );
}

export default LeaderCard;
