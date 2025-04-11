import "./Leaderboard.css";
import LeaderCard from "./LeaderCard/LeaderCard";

const testData = [
  { rank: 1, username: "test user 1", score: 5000 },
  { rank: 2, username: "test user 2", score: 4000 },
  { rank: 3, username: "test user 3", score: 3999 },
];

function Leaderboard() {
  return (
    <section className="leaderboard">
      <div className="leaderboard__header">
        <select name="name" id="id">
          <option value="A">Global</option>
          <option value="C">Local</option>
          <option value="B">Friends</option>
        </select>
        <button>Center</button>
      </div>
      <ol className="leaderboard__card-list">
        {testData.map((item, i) => {
          return (
            <LeaderCard
              key={i /* replace this with a user's unique id ?*/}
              user={item}
            />
          );
        })}
      </ol>
    </section>
  );
}

export default Leaderboard;
