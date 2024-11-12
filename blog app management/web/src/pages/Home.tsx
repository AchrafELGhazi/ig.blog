import BlogList from '../components/BlogLIst';
import Navbar from '../components/Navbar';
import useFetch from '../hooks/useFetch';

function Home() {
  // const handleClick = (name: string, e: MouseEvent) => {
  //   console.log(`Hello ${name}`, e);};

  //   const [sentence, setSentence] = useState(
  //     'EL MEHDI GREATEST SOFTWARE DEVELOPER ENGINEER'
  //   );
  //   const [age, setAge] = useState(25);

  // const handleClick = () => {
  //   setSentence('Achraf GREATEST SOFTWARE DEVELOPER ENGINEER');
  //   setAge(30);
  // };

  //useState use THIS WAS MOVED TO USEFETCH() HOOK
  // const [blogs, setBlogs] = useState(null);
  // const [isPending, setIsPending] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   console.log('useEffect Hook is called');
  //   console.log(blogs);

  // });// we do this if we only want to call what is inside useEffect at the first render

  // const [name, setName] = useState('mario');

  // useEffect(() => {
  //   console.log('hello');
  // console.log(name);
  // }, [name]); //this only gets called on the first render and when the state of name gets changed

  //useEffect use THIS WAS MOVED TO USEFETCH() HOOK
  // useEffect(() => {
  //   fetch('http://localhost:8000/blogs')
  //     .then(res => {
  //       console.log(res);
  //       if (!res.ok) {
  //         setIsPending(false);
  //         throw new Error('Failed to fetch blogs');
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       setBlogs(data);
  //       setIsPending(false);
  //       setError(null);
  //     })
  //     .catch(err => {
  //       setError(err.message);
  //     });
  // }, []);

  // const handleDelete = (id: number) => {
  //   const newBlogs = blogs.filter(blog => blog.id !== id);
  //   setBlogs(newBlogs);
  // }; //example of delete button

  const {
    data: blogs,
    isPending,
    error,
  } = useFetch('http://localhost:8000/blogs');

  return (
    <div className='bg-gray-200 min-h-screen'>
      <Navbar />
      {/* <div className='container  text-center -mb-10 mt-11 mx-auto px-4 py-16'>
        <h1 className='text-4xl md:text-5xl font-normal text-center text-gray-800 tracking-widest relative inline-block'>
          BLOGS
          <span className='absolute -bottom-2 left-0 w-full h-0.5 bg-gray-800 transform -skew-x-12'></span>
        </h1>
      </div> */}
      <div className='text-center mt-14'>
        {/* <button
          onClick={e => {
            handleClick('john', e);
          }}
          className='bg-blue-600 hover:bg-blue-400 text-white font-medium py-3 px-5 rounded '
        >
          CLICK ME !
        </button> */}
        {/* <button
          onClick={() => {
            handleClick();
          }}
          className='bg-blue-600 hover:bg-blue-400 text-white font-medium py-3 px-5 rounded '
        >
          CLICK ME !
        </button>

        <div className='text-3xl mx-20 font-bold mt-20 text-center'>{sentence}, and he is {age} years old</div> */}
        {error && <div>{error}</div>}
        {isPending && <div>loading...</div>}
        {blogs && <BlogList blogs={blogs} />}
        {/* <BlogList blogs={blogs.filter((blog)=> blog.author ==='Michael Thompson')} /> filter method example */}
      </div>
    </div>
  );
}

export default Home;
