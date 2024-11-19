interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  
}
const ConfirmModal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-[90%] max-w-md'>
        <h3 className='text-lg font-semibold mb-4'>Are you sure?</h3>
        <p className='text-sm text-gray-600 mb-6'>This action cannot be undone.</p>
        <div className='flex justify-end gap-4'>
          <button
            className='px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;