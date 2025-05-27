import { fetchCall } from "./mockApi";

export function signup(body) {
  //   return fetchCall("/signup", "token", "POST", JSON.stringify(body));
  return new Promise((resolve, reject) => {
    resolve({ body });
  });
}
export function signin(body) {
  //   return fetchCall("/signin", "token", "POST", JSON.stringify(body));
  return new Promise((resolve, reject) => {
    resolve({ token: "fake token" });
  });
}
export function getUserData(token) {
  //   return fetchCall("/users/me", token);
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        name: "fake user",
        email: "fake@example.com",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1024px-Image_created_with_a_mobile_phone.png",
        _id: "fake-id",
        token: token,
      },
    });
  });
}
