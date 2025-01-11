import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewBlogs = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [Image, setImage] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);
  // const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }], // Add font family options
      [{ size: ['small', false, 'large', 'huge'] }], // Add different sizes
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }], // Add color pickers
      [{ script: 'sub' }, { script: 'super' }],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const fonts = [
    'Arial',
    'Times New Roman',
    'Roboto',
    'Ubuntu Mono',
    'Raleway',
    'Poppins'
  ];

  const formats = [
    'header',
    'fonts',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'align',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'blockquote',
    'code-block',
  ];

  const handleSubmit = () => {};

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-36 flex items-center justify-center p-4'>
      <div className='w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6 md:p-12 transition-all duration-300 ease-in-out transform hover:scale-[1.01]'>
        <h1 className='text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8'>
          Create a New Blog
        </h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Blog Title
              </label>
              <input
                type='text'
                id='title'
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out'
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder='Enter blog title'
              />
            </div>
            <div>
              <label
                htmlFor='summary'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Blog Summary
              </label>
              <input
                type='text'
                id='summary'
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out'
                value={summary}
                onChange={e => setSummary(e.target.value)}
                placeholder='Enter blog summary'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='body'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Blog Content
            </label>
            <ReactQuill
              value={content}
              modules={modules}
              placeholder='Start writing...'
              theme='snow'
              formats={formats}
            />
          </div>

          <div>
            <label
              htmlFor='image'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Attach Image
            </label>
            <input
              type='file'
              id='image'
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ease-in-out file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              accept='.png,.jpg,.jpeg,image/*'
              onChange={e => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <div className='flex justify-end'>
            <button
              type='submit'
              className={`w-full md:w-auto py-3 px-6 rounded-lg transition-all duration-150 ease-in-out ${
                isPending
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              disabled={isPending}
            >
              {isPending ? 'Adding blog...' : 'Add Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBlogs;
