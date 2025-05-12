import "./Leaderboard.css";
import LeaderCard from "./LeaderCard/LeaderCard";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import { getItems, postItem, GetItemsSorted } from "../../utils/mockApi";

// TODO
// only fetch the specified number of database entries (lower bound -> upper bound)

const pageLimit = 7;

function Leaderboard() {
  const [scoreData, setScoreData] = useState([]);
  const [lowerBound, setLowerBound] = useState(0);
  const [upperBound, setUpperBound] = useState(pageLimit);

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
          {lowerBound > 0 ? (
            <Button
              className="leaderboard__load-button"
              onClick={() => {
                setLowerBound(lowerBound - pageLimit);
              }}
            >
              Load More
            </Button>
          ) : (
            <></>
          )}

          {Array.from(
            new Array(upperBound - lowerBound),
            (x, i) => i + lowerBound
          ).map((item, i) => {
            if (item < scoreData.length && item >= 0)
              return (
                <LeaderCard
                  key={scoreData[item]?._id}
                  user={{ ...scoreData[item], rank: item + 1 }}
                />
              );
          })}
          {upperBound < scoreData.length ? (
            <Button
              className="leaderboard__load-button"
              onClick={() => {
                setUpperBound(upperBound + pageLimit);
              }}
            >
              Load More
            </Button>
          ) : (
            <></>
          )}
        </ol>
      </div>
    </section>
  );
}

export default Leaderboard;
