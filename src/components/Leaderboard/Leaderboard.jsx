import "./Leaderboard.css";
import LeaderCard from "./LeaderCard/LeaderCard";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import { getItems, postItem, GetItemsSorted } from "../../utils/mockApi";

// const testData = [
//   { rank: 1, username: "test user 1", score: 5000 },
//   { rank: 2, username: "test user 2", score: 4000 },
//   { rank: 3, username: "test user 3", score: 3999 },
// ];

function Leaderboard() {
  const [scoreData, setScoreData] = useState([]);

  useEffect(() => {
    console.log(GetItemsSorted());
    GetItemsSorted().then(setScoreData).catch(console.error);
  }, []);

  return (
    <section className="leaderboard">
      <div className="leaderboard__content">
        <div className="leaderboard__header">
          <select className="leaderboard__dropdown" name="name" id="id">
            <option value="global">Global</option>
            <option value="friends">Friends</option>
            <option value="personal">Personal</option>
            <option value="local">Local</option>
          </select>
        </div>
        <ol className="leaderboard__card-list">
          {scoreData.map((item, i) => {
            return (
              <LeaderCard
                key={i /* replace this with a user's unique id ?*/}
                user={{ ...item, rank: i + 1 }}
              />
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default Leaderboard;
