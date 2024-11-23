import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const NewBlogs = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("author", author);
    formData.append("createdAt", new Date().toISOString());
    if (file) {
      formData.append("file", file);
    }
  
    setIsPending(true);
    fetch("http://localhost:8500/blogs", {
      method: "POST",
      body: formData,
    }).then(() => {
      console.log("new blog added");
      setIsPending(false);
      navigate("/");
    });
  };
  

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create a New Blog
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Blog Title
              </label>
              <input
                id="title"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog name"
              />
            </div>
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Blog Author
              </label>
              <input
                id="author"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog Content
              </label>
              <textarea
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out"
                rows={4}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter content"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Attach Doc
              </label>
              <input
                type="file"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out"
                accept=".png,.jpg,.jpeg,image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              ></input>
            </div>

            <button
              className={`w-full py-2 px-4 rounded-md transition-all duration-150 ease-in-out ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              disabled={isPending}
            >
              {isPending ? "Adding blog..." : "Add Blog"}
            </button>
          </form>
        </div>
      </div>{" "}
    </div>
  );
};

export default NewBlogs;
