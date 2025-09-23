import { Users } from "../../types/types";

export const users: Users[] = [
  {firstName: "Mahi", lastName: "Gude", email: "mahi@gmail.com", password: "mahi123" },
  {firstName: "Uma", lastName: "Gude", email: "uma@gmail.com", password: "uma123" },
  {firstName: "Bhavi", lastName: "Muppalla", email: "bhavi@gmail.com", password: "bhavi123" },
  {firstName: "Charvi", lastName: "Muppalla", email: "charvi@gmail.com", password: "charvi123" },
];
export const addUser = (user: Users) => {
  users.push(user);
  console.log("Updated users:", users);
};
