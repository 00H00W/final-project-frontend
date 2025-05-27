import { resolve } from "mathjs";
import { data } from "react-router-dom";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtw.jumpingcrab.com"
    : "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const database = {
  users: [
    {
      name: "fake user",
      email: "fake@example.com",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1024px-Image_created_with_a_mobile_phone.png",
      _id: 1,
    },
  ],
  items: [
    {
      _id: 0,
      username: "James",
      score: 3,
      liked: false,
    },
    {
      username: "Mary",
      score: 45,
      _id: 1,
      liked: false,
    },
    {
      username: "Michael",
      score: 67,
      _id: 2,
      liked: true,
    },
    {
      username: "Patricia",
      score: 78,
      _id: 3,
      liked: false,
    },
    {
      username: "John",
      score: 56,
      _id: 4,
      liked: false,
    },
    {
      username: "Jennifer",
      score: 23,
      _id: 5,
      liked: false,
    },
    {
      username: "Robert",
      score: 1,
      _id: 6,
      liked: false,
    },
    {
      _id: 7,
      username: "Linda",
      score: 89,
      liked: true,
    },
    {
      username: "David",
      score: 45,
      _id: 8,
      liked: false,
    },
    {
      username: "Elizabeth",
      score: 67,
      _id: 9,
      liked: false,
    },
    {
      username: "William",
      score: 78,
      _id: 10,
      liked: false,
    },
    {
      username: "Barbara",
      score: 56,
      _id: 11,
      liked: true,
    },
    {
      username: "Richard",
      score: 23,
      _id: 12,
      liked: false,
    },
    {
      username: "Susan",
      score: 1,
      _id: 13,
      liked: false,
    },
    {
      _id: 14,
      username: "Joseph",
      score: 89,
      liked: true,
    },
    {
      username: "Jessica",
      score: 45,
      _id: 15,
      liked: false,
    },
    {
      username: "Thomas",
      score: 67,
      _id: 16,
      liked: false,
    },
    {
      username: "Karen",
      score: 78,
      _id: 17,
      liked: true,
    },
    {
      username: "Christopher",
      score: 56,
      _id: 18,
      liked: false,
    },
    {
      username: "Sarah",
      score: 23,
      _id: 19,
      liked: false,
    },
    {
      username: "Charles",
      score: 1,
      _id: 20,
      liked: true,
    },
    {
      score: 45,
      rounds: 5,
      username: "fake user",
      _id: 21,
      liked: false,
    },
  ],
};

export function fetchCall(endpoint, token, method = "GET", body) {
  return fetch(baseUrl + endpoint, {
    method: method,
    headers: { ...headers, authorization: `Bearer ${token}` },
    body: body,
  }).then((res) => {
    if (res.ok) return res.json();
    else Promise.reject(`Error: ${res.status}`);
  });
}

// this would be handled by the backend database
function sortItems() {
  database.items = database.items.sort((a, b) => {
    return b.score - a.score;
  });
  database.items.forEach((item, index) => {
    item.index = index;
  });
}

export function getItemsRange(start, end, filterLiked = false) {
  return new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
    sortItems();
    const items = filterLiked
      ? database.items.filter((i) => i.liked)
      : database.items;

    start = Math.max(start, 0);

    return {
      items: items.slice(start, end),
      loadLower: start > 0,
      loadUpper: end < items.length,
    };
  });
}

export function postItem(body, token) {
  return new Promise((resolve) => setTimeout(resolve, 500))
    .then(() => {
      database.items.push(body);
      sortItems();
    })
    .catch(console.error);
}

// switch to a user id system when backend is implemented
export function getUserRank(username) {
  return new Promise((resolve) => setTimeout(resolve, 500))
    .then(() => {
      sortItems();
      return database.items.find((i) => i.username === username);
    })
    .then((item) => {
      if (item) return item.index;
      else return Promise.reject("User not found");
    })
    .catch(console.error);
}

export function LikeItem(id) {
  return new Promise((resolve) => setTimeout(resolve, 100))
    .then(() => database.items.find((i) => i._id === id))
    .then((entry) => {
      entry.liked = true;
      return entry;
    })
    .catch(console.error);
}

export function UnlikeItem(id) {
  return new Promise((resolve) => setTimeout(resolve, 100))
    .then(() => database.items.find((i) => i._id === id))
    .then((entry) => {
      entry.liked = false;
      return entry;
    })
    .catch(console.error);
}
