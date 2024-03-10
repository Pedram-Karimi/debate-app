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
  debateTitle: string;
  debateDescription: string;
  creatorId: string;
  debateId: string;
  createdAt: string;
}
