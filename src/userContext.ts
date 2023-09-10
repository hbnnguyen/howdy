import { createContext } from "react";
import { User } from "./user";

interface UserInterface {
  user: User | null | undefined;
}

const userContext = createContext<UserInterface>({ user: null });
// const userContext = createContext<User | undefined | null>(null);

export default userContext;