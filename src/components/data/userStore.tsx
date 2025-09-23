import { Users } from "../../types/types";

export const users: Users[] = [
  { email: "mahi@gmail.com", password: "mahi123" },
  { email: "uma@gmail.com", password: "uma123" },
  { email: "bhavi@gmail.com", password: "bhavi123" },
  { email: "charvi@gmail.com", password: "charvi123" },
];
export const addUser = (user: Users) => {
  users.push(user);
  console.log("Updated users:", users);
};
