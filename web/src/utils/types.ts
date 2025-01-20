
export interface User {
  _id: string;
  username: string;
  email: string;
  bio?: string;
  preferences?: string[];
  img?: string;
  blogs: string[];
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
  views: number;
  tags: string[];
  author: User;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}