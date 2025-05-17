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
      _id: "1",
    },
  ],
  items: [
    {
      _id: 0,
      username: "James",
      score: 3,
    },
    {
      username: "Mary",
      score: 45,
      _id: 1,
    },
    {
      username: "Michael",
      score: 67,
      _id: 2,
    },
    {
      username: "Patricia",
      score: 78,
      _id: 3,
    },
    {
      username: "John",
      score: 56,
      _id: 4,
    },
    {
      username: "Jennifer",
      score: 23,
      _id: 5,
    },
    {
      username: "Robert",
      score: 1,
      _id: 6,
    },
    {
      _id: 7,
      username: "Linda",
      score: 89,
    },
    {
      username: "David",
      score: 45,
      _id: 8,
    },
    {
      username: "Elizabeth",
      score: 67,
      _id: 9,
    },
    {
      username: "William",
      score: 78,
      _id: 10,
    },
    {
      username: "Barbara",
      score: 56,
      _id: 11,
    },
    {
      username: "Richard",
      score: 23,
      _id: 12,
    },
    {
      username: "Susan",
      score: 1,
      _id: 13,
    },
    {
      _id: 14,
      username: "Joseph",
      score: 89,
    },
    {
      username: "Jessica",
      score: 45,
      _id: 15,
    },
    {
      username: "Thomas",
      score: 67,
      _id: 16,
    },
    {
      username: "Karen",
      score: 78,
      _id: 17,
    },
    {
      username: "Christopher",
      score: 56,
      _id: 18,
    },
    {
      username: "Sarah",
      score: 23,
      _id: 19,
    },
    {
      username: "Charles",
      score: 1,
      _id: 20,
    },
    {
      score: 45,
      rounds: 5,
      username: "fake user",
      _id: 21,
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

export function getItems() {
  return fetchCall("/items");
}
export function getItemsRange(start, end) {
  return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    const sorted = database.items.sort((a, b) => {
      return b.score - a.score;
    });
    sorted.forEach((item, index) => {
      item.index = index;
    });
    start = Math.max(start, 0);
    console.log(start);

    return {
      items: sorted.slice(start, end),
      loadLower: start > 0,
      loadUpper: end < database.items.length,
    };
  });
}
export function postItem(body, token) {
  return fetchCall("/items", token, "POST", JSON.stringify(body));
}
export function GetItemsSorted() {
  return fetchCall("/items?_sort=score,username&_order=desc,asc");
}

export function getGameCount() {
  return new Promise((resolve, reject) => {
    resolve(database.items.length);
  });
}
// switch to a user id system when backend is implemented
export function getUserRank(username) {
  return new Promise((resolve) => setTimeout(resolve, 1000))
    .then(() => {
      const sorted = database.items.sort((a, b) => {
        return b.score - a.score;
      });
      let rank = -1;
      sorted.forEach((element, index) => {
        if (element.username === username) rank = index;
      });
      if (rank >= 0) return rank;
      else return Promise.reject("User not found");
    })
    .catch(console.error);
}
// getGameFromUser(users)
