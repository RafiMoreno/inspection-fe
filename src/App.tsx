import './App.css'
import { FaImage } from "react-icons/fa6";

function App() {

  return (
    <>
      <div className='w-full p-12 flex flex-col'>
        <h1 className='font-mono text-center text-3xl font-bold'>Inspection Form</h1>
        <div className='w-xl mt-2 shadow-xl border-1 border-solid border-gray-600 self-center flex flex-col rounded-md p-5'>
            <div className='flex flex-col items-center justify-center h-96 bg-gray-200 rounded-md'>
              <FaImage size={56} color='#4a5565'/>
              <p className='font-medium text-gray-600'>No images added</p>
            </div>
            <div className='flex flex-row gap-2 justify-end mt-2'>
              <button className='px-2 py-1 rounded-lg bg-blue-400 font-medium hover:cursor-pointer'>
                Add Image
              </button>
              <button className='px-2 py-1 rounded-lg bg-black text-white font-medium hover:cursor-pointer'>
                Submit
              </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
