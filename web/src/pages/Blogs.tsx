import Navbar from "../components/Navbar";

const Blogs = () => {
  return (
    <div >
      <Navbar />
      <div className="m-20 text-center mx-60">
        {" "}
        <h1>Our Blogs</h1>
        <p>
          Welcome to our Blogs section! Here you can explore a variety of
          articles covering different topics, including technology, lifestyle,
          health, and more. Our goal is to provide you with valuable insights
          and engaging content that enriches your knowledge.
        </p>
        <p>
          Each blog post is crafted with care, ensuring that you receive
          high-quality information that is both relevant and enjoyable to read.
          Whether you are looking for tips, tutorials, or thought-provoking
          discussions, you will find it all here.
        </p>
        <p>
          Browse through our latest posts below, and feel free to leave your
          comments and feedback. We love hearing from our readers!
        </p>
      </div>
    </div>
  );
};

export default Blogs;
