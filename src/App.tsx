import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";

type ImageField = {
  label: string;
  image: string;
};

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [currentLabel, setCurrentLabel] = useState<string | null>(null);
  const [choosenImage, setChoosenImage] = useState<string | null>(null);
  const [images, setImages] = useState<ImageField[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageURL = URL.createObjectURL(file);
      setChoosenImage(imageURL);
    }
  };

  const handleLabelFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentLabel(event.target.value);
  };

  const appendImages = (label: string, image: string) => {
    const newEntry: ImageField = {
      label: label,
      image: image,
    };
    setImages((arr) => [...arr, newEntry]);
  };

  const handleSubmitNewImage = (label: string, image: string) => {
    appendImages(label, image);
    setFormOpen(false);
    setCurrentLabel(null);
    setChoosenImage(null);
  };

  return (
    <>
      <div className="w-full h-screen p-12 flex flex-col bg-gray-400">
        <h1 className="text-center text-3xl font-bold text-white">
          Inspection Form
        </h1>
        <div className="w-4xl mt-2 shadow-xl self-center flex flex-col rounded-md p-5 bg-white">
          {images.length == 0 ? (
            <div className="flex flex-col items-center justify-center h-96 bg-gray-200 rounded-md">
              <FaImage size={56} color="#4a5565" />
              <p className="font-light text-gray-600">No images added</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center bg-gray-200 rounded-md gap-2 p-1">
              {
                images.map((img) => (
                  <div className="bg-white rounded-t-lg rounded-b-md shadow-md">
                    <div className="flex flex-col w-32 h-32">
                      <img
                        src={img.image}
                        alt="Preview"
                        className="w-full h-full object-contain rounded-t-lg"
                      />
                    </div>
                    <p className="font-medium text-center">
                      {img.label}
                    </p>
                  </div>
                )
              )}
            </div>
          )}
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
                onChange={handleLabelFormChange}
              ></input>
              {!choosenImage && (
                <div className="flex flex-col xl:h-56 lg:h-44 md:h-42 h-30 mt-2 bg-gray-200 rounded-lg justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="fileInput"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="fileInput"
                    className="flex flex-col px-4 py-2 font-light text-sm text-gray-600 rounded-lg cursor-pointer transition items-center"
                  >
                    <FaFileUpload size={32} color="#4a5565" />
                    Choose a Image to Upload
                  </label>
                </div>
              )}
              {choosenImage && (
                <div className="flex flex-col xl:h-56 lg:h-44 md:h-42 h-30 mt-2 rounded-lg items-center">
                  <img
                    src={choosenImage}
                    alt="Preview"
                    className="max-w-auto h-50 max-xl:h-40 max-lg:h-36 max-md:h-32 max-sm:h-24 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
              <div className="flex flex-row max-md:flex-col gap-2 justify-end mt-2">
                {choosenImage && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="fileInput"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput">
                      <div className="px-2 py-1 rounded-lg bg-black text-white font-medium hover:cursor-pointer shadow-xl">
                        Change Image
                      </div>
                    </label>
                  </div>
                )}
                <div
                  onClick={() => setFormOpen(false)}
                  className="px-2 py-1 rounded-lg bg-red-600 text-white font-medium hover:cursor-pointer shadow-xl"
                >
                  Cancel
                </div>
                {choosenImage != null &&
                currentLabel != "" &&
                currentLabel != null ? (
                  <div
                    onClick={() =>
                      handleSubmitNewImage(currentLabel, choosenImage)
                    }
                    className="px-2 py-1 rounded-lg bg-green-500 text-white font-medium hover:cursor-pointer shadow-xl"
                  >
                    Confirm
                  </div>
                ) : (
                  <div className="px-2 py-1 rounded-lg bg-green-500 text-white hover:cursor-default font-medium shadow-xl opacity-25">
                    Confirm
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
