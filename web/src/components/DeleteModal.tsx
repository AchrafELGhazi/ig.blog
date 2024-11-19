interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg max-w-sm w-full'>
        <h3 className='text-xl font-semibold'>Are you sure?</h3>
        <p className='mt-2 text-gray-600'>This action cannot be undone.</p>
        <div className='flex justify-between mt-4'>
          <button
            className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='bg-red-600 text-white px-4 py-2 rounded-md'
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
