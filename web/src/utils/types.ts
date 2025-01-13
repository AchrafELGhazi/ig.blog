
export interface User {
  _id: string;
  username: string;
}

export interface Reply {
  _id: string;
  user: User;
  content: string;
  createdAt: Date;
}

export interface Comment {
  _id: string;
  user: User;
  content: string;
  replies: Reply[];
  createdAt: Date;
}

export interface Blog {
  _id: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  author: User;
  likes: User[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}