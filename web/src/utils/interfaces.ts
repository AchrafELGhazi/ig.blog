// Define the Author interface
interface Author {
  username: string;
  _id: string;
}

// Define the blogsDataTypes interface and reference Author
export interface blogsDataTypes {
  title: string;
  _id: string;
  summary: string;
  cover: string;
  createdAt: string;
  content: string;
  author: Author;  // Use the Author interface here
}
