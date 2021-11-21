import React, { useReducer, useContext, useCallback, Dispatch } from "react";
import { db } from "../firebase";
import { User, Room } from "../types";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : null;

type State = {
  isLogin: boolean;
  user: User | null;
  room: string;
  chats: Room[];
  users: User[];
};

const initState = {
  isLogin: !!user,
  user: user,
  room: localStorage.getItem("room") ?? "",
  chats: [],
  users: [],
};

type ActionType =
  | { type: "LOGIN"; payload: User }
  | { type: "UPDATE_NAME"; payload: string }
  | { type: "SET_ROOM"; payload: string }
  | { type: "SET_ROOMS"; payload: Room[] }
  | { type: "SET_USERS"; payload: User[] }
  | { type: "RESET" };

const store = React.createContext<{
  state: State;
  dispatch: Dispatch<ActionType>;
}>({ state: initState, dispatch: () => {} });

const { Provider } = store;

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: true, user: action.payload };
    case "UPDATE_NAME":
      return { ...state, user: { ...state.user, name: action.payload } };
    case "SET_ROOM":
      return { ...state, room: action.payload };
    case "SET_ROOMS":
      return { ...state, chats: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "RESET":
      return {
        isLogin: false,
        user: null,
        room: "",
        chats: [],
        users: [],
      } as any;
    default:
      return state;
  }
};

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const useData = () => {
  const { state, dispatch } = useContext(store);

  React.useEffect(() => {
    let unsubscribe = db
      .collection("chats")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        let chats: Room[] = [];
        snapshot.forEach((doc) => {
          const room = doc.data();
          chats.push({
            ...room,
            id: doc.id,
            date: room.date.toDate(),
          } as Room);
        });
        dispatch({ type: "SET_ROOMS", payload: chats });
      });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  React.useEffect(() => {
    let unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      let chats: User[] = [];
      snapshot.forEach((doc) => {
        chats.push({ id: doc.id, ...doc.data() } as User);
      });
      dispatch({ type: "SET_USERS", payload: chats });
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const setLogin = useCallback(
    (payload) => {
      localStorage.setItem("user", JSON.stringify(payload));
      dispatch({ type: "LOGIN", payload });
    },
    [dispatch]
  );

  const updateName = useCallback(
    (payload) => {
      const user = { ...state.user, name: payload };
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "UPDATE_NAME", payload });
    },
    [dispatch, state]
  );

  const setRoom = useCallback(
    (payload) => {
      localStorage.setItem("room", payload);
      dispatch({ type: "SET_ROOM", payload });
    },
    [dispatch]
  );

  const setLogout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("room");
    dispatch({ type: "RESET" });
  }, [dispatch]);

  return {
    state,
    setLogin,
    updateName,
    setRoom,
    setLogout,
  };
};

export { DataProvider, useData };
