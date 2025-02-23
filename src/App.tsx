import { useState } from "react";
import "./App.css";
import { FaImage } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";

function App() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <div className="w-full p-12 flex flex-col">
        <h1 className="font-mono text-center text-3xl font-light">
          Inspection Form
        </h1>
        <div className="w-xl mt-2 shadow-xl border-1 border-solid border-gray-600 self-center flex flex-col rounded-md p-5">
          <div className="flex flex-col items-center justify-center h-96 bg-gray-200 rounded-md">
            <FaImage size={56} color="#4a5565" />
            <p className="font-light text-gray-600">No images added</p>
          </div>
          <div className="flex flex-row gap-2 justify-end mt-2">
            <button
              onClick={() => setFormOpen(true)}
              className="px-2 py-1 rounded-lg bg-blue-400 font-medium hover:cursor-pointer shadow-xl"
            >
              Add Image
            </button>
            <button className="px-2 py-1 rounded-lg bg-black text-white font-medium hover:cursor-pointer shadow-xl">
              Submit
            </button>
          </div>
        </div>
      </div>
      {formOpen && (
        <div className="fixed top-0 right-0 left-0 w-full h-full backdrop-blur-3xl backdrop-opacity-75">
          <div className="absolute top-1/6 md:left-1/3 left-1/4  bg-white opacity-100 rounded-2xl md:w-1/3 w-64 h-[310px] md:h-80 xl:h-[370px] shadow-2xl flex flex-col py-3 px-6">
            <h1 className="text-center text-xl font-medium mb-2">Add Image</h1>
            <form>
              <input
                type="text"
                className="w-full bg-gray-200  rounded-lg p-2 text-sm font-light"
                placeholder="Enter image label here..."
              ></input>
              <div className="flex flex-col xl:h-56 lg:h-44 md:h-42 h-30 mt-2 bg-gray-200 rounded-lg justify-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="flex flex-col px-4 py-2 font-light text-sm text-gray-600 rounded-lg cursor-pointer transition items-center"
                >
                  <FaFileUpload size={32} color="#4a5565" />
                  Choose a Image to Upload
                </label>
              </div>
              <div className="flex flex-row max-md:flex-col gap-2 justify-end mt-2">
                <button
                  onClick={() => setFormOpen(false)}
                  className="px-2 py-1 rounded-lg bg-red-600 text-white font-medium hover:cursor-pointer shadow-xl"
                >
                  Cancel
                </button>
                <button className="px-2 py-1 rounded-lg bg-green-500 text-white font-medium hover:cursor-pointer shadow-xl">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
