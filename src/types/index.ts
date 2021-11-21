export type User = {
  id: string;
  name: string;
};

export type Chat = {
  id: string;
  name: string;
  msg: string;
  userId: string;
  date: Date;
};

export type Room = {
  id: string;
  title: string;
  owner: string;
  date: Date;
};
