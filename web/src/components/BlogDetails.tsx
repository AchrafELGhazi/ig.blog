'use client'

import { XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Blog {
  id: number
  title: string
  content: string
  author: string
  createdAt: string | null
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  id: number
}

export default function BlogDetails({ isOpen, onClose, id }: ModalProps) {
  const [data, setData] = useState<Blog | null>(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`http://localhost:8000/blogs/${id}`)
          if (!response.ok) {
            throw new Error('Failed to fetch blog data')
          }
          const blogData = await response.json()
          setData(blogData)
          setIsPending(false)
        } catch (err) {
          setError('An error occurred while fetching the blog data.')
          setIsPending(false)
        }
      }
      fetchBlog()
    }
  }, [isOpen, id])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="relative bg-white bg-opacity-20 p-8 rounded-2xl max-w-md w-full shadow-lg 
                   backdrop-filter backdrop-blur-lg border border-opacity-20 border-white
                   transition-all duration-300 ease-in-out transform "
      >
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
          onClick={onClose}
          aria-label="Close modal"
        >
          <XIcon className="h-6 w-6" />
        </button>
        {isPending && <div className="text-center text-white">Loading...</div>}
        {error && <div className="text-center text-red-400">{error}</div>}
        {data && (
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4 hover:text-indigo-300 transition-colors duration-200">
              {data.title}
            </h2>
            <h4 className="text-xl font-semibold mb-4 hover:text-indigo-200 transition-colors duration-200">
              {data.author}
            </h4>
            <p className="text-gray-200 mb-4 hover:text-white transition-colors duration-200">
              {data.content}
            </p>
            <p className="text-gray-300 text-sm hover:text-indigo-200 transition-colors duration-200">
              {data.createdAt}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

