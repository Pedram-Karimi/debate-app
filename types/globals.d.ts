export interface User {
  id: string;
  email: string;
  username: string;
  image: string;
  createdAt: Date;
  emailVerified: boolean;
  handle: string;
}
export interface DebateBox {
  title: string;
  description: string;
  creatorId: string;
  id: string;
  createdAt: string;
  media: string;
  statement: string;
  currCat: string;
}

export interface Message {
  id: string;
  mssg: string;
  writerId: string;
  replyId: string;
  createdAt: Date;
}
