import "./Leaderboard.css";
import LeaderCard from "./LeaderCard/LeaderCard";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import {
  getItems,
  postItem,
  GetItemsSorted,
  getItemsRange,
  getUserRank,
  LikeItem,
  UnlikeItem,
  getLiked,
} from "../../utils/mockApi";
import Preloader from "../Preloader/Preloader";

// TODO
// only fetch the specified number of database entries (lower bound -> upper bound)

const pageLimit = 7;

function Leaderboard({ currentUser }) {
  const [scoreData, setScoreData] = useState([]);
  const [lowerBound, setLowerBound] = useState(0);
  const [upperBound, setUpperBound] = useState(pageLimit);
  const [loadLower, setLoadLower] = useState(false);
  const [loadUpper, setLoadUpper] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("global");
  const [filterLiked, setFilterLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //GetItemsSorted().then(setScoreData).catch(console.error);
    loadItems(0, pageLimit);
  }, []);

  function loadItems(start, end, filterLiked) {
    setScoreData([]);
    setIsLoading(true);
    getItemsRange(start, end, filterLiked).then((data) => {
      setFilterLiked(filterLiked);
      setScoreData(data.items);
      setLoadLower(data.loadLower);
      setLoadUpper(data.loadUpper);
      setUpperBound(end);
      setLowerBound(start);
      setIsLoading(false);
    });
  }

  const handleDropdownChange = (e) => {
    if (e.target.value != dropdownValue) {
      setDropdownValue(e.target.value);
      switch (e.target.value) {
        case "local":
          setFilterLiked(false);
          if (currentUser?.data) {
            getUserRank(currentUser.data.name).then((userRank) => {
              loadItems(
                userRank - Math.round(pageLimit / 2),
                userRank + Math.round(pageLimit / 2),
                false
              );
            });
          } else loadItems(0, pageLimit, false);
          break;

        case "friends":
          setFilterLiked(true);
          loadItems(0, pageLimit, true);
          break;

        default:
          setFilterLiked(false);
          loadItems(0, pageLimit, false);
          break;
      }
    }
  };

  const handleSaveItem = (entry) => {
    if (entry.liked) return UnlikeItem(entry._id);
    else return LikeItem(entry._id);
  };

  function GetDropdownBlurb(value) {
    switch (value) {
      case "global":
        return (
          <p className="leaderboard__text">High scores across all users.</p>
        );
      case "local":
        return (
          <p className="leaderboard__text">
            See where you stand on the global board.
          </p>
        );
      case "friends":
        return (
          <p className="leaderboard__text">
            High scores across your tracked users.
          </p>
        );
      default:
        return <></>;
    }
  }

  return (
    <section className="leaderboard">
      <div className="leaderboard__content">
        <div className="leaderboard__header">
          <select
            value={dropdownValue}
            onChange={handleDropdownChange}
            className="leaderboard__dropdown"
            name="name"
            id="id"
          >
            <option value="global">Global</option>
            <option value="local">Local</option>
            <option value="friends">Friends</option>
          </select>
          {GetDropdownBlurb(dropdownValue)}
        </div>
        <ol className="leaderboard__card-list">
          {loadLower && !isLoading ? (
            <Button
              className="leaderboard__load-button"
              onClick={() => {
                setLowerBound(lowerBound - pageLimit);
                setIsLoading(true);
                getItemsRange(
                  lowerBound - pageLimit,
                  lowerBound,
                  filterLiked
                ).then((data) => {
                  setIsLoading(false);
                  setLoadLower(data.loadLower);
                  setScoreData([...data.items, ...scoreData]);
                });
              }}
            >
              Load More
            </Button>
          ) : (
            <></>
          )}

          {scoreData.map((item, i) => {
            return (
              <LeaderCard
                key={item._id}
                user={{ ...item, rank: item.index + 1 }}
                saveItem={handleSaveItem}
              />
            );
          })}
          {isLoading ? <Preloader></Preloader> : <></>}
          {loadUpper && !isLoading ? (
            <Button
              className="leaderboard__load-button"
              onClick={() => {
                setUpperBound(upperBound + pageLimit);
                setIsLoading(true);
                getItemsRange(
                  upperBound,
                  upperBound + pageLimit,
                  filterLiked
                ).then((data) => {
                  setIsLoading(false);
                  setLoadUpper(data.loadUpper);
                  setScoreData([...scoreData, ...data.items]);
                });
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
