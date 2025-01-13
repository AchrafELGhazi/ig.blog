export const modules = {
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

export const fonts = [
  'Arial',
  'Times New Roman',
  'Roboto',
  'Ubuntu Mono',
  'Raleway',
  'Poppins',
];

export const formats = [
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


