import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { uploadImagesApi } from "./api/api";
import { toast, ToastContainer } from "react-toastify";

type ImageField = {
  label: string;
  image: File;
  preview: string;
};

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [currentLabel, setCurrentLabel] = useState<string | null>(null);
  const [choosenImage, setChoosenImage] = useState<string | null>(null);
  const [choosenFile, setChoosenFile] = useState<File | null>(null);
  const [images, setImages] = useState<ImageField[]>([]);
  const [editId, setEditID] = useState<number | null>(null);
  const [tempLabel, setTempLabel] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageURL = URL.createObjectURL(file);
      setChoosenImage(imageURL);
      setChoosenFile(file);
    }
  };

  const handleLabelFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentLabel(event.target.value);
  };

  const appendImage = (label: string, image: File, preview: string) => {
    const newEntry: ImageField = {
      label: label,
      image: image,
      preview: preview,
    };
    setImages((arr) => [...arr, newEntry]);
  };

  const deleteImage = (index: number) => {
    setImages((arr) => arr.filter((_, i) => i !== index));
  };

  const handleSubmitNewImage = () => {
    if (choosenImage && choosenFile && currentLabel) {
      appendImage(currentLabel, choosenFile, choosenImage);
      setFormOpen(false);
      setCurrentLabel(null);
      setChoosenImage(null);
      setChoosenFile(null);
    }
  };

  const handleEditLabel = (id: number, label: string) => {
    setEditID(id);
    setTempLabel(label);
  };

  const handleSaveEdit = (id: number) => {
    setImages((arr) =>
      arr.map((img, index) =>
        index === id ? { ...img, label: tempLabel } : img
      )
    );
    setEditID(null);
  };

  const handleUploadImages = async() => {
    if (images.length != 0) {
      try{
        await uploadImagesApi(images);
        toast.success("Successfully uploaded!", {position: "bottom-center"})
        setImages([]);
      }catch (err){
        toast.error("Error encountered!", {position: "bottom-center"})
      }
    }else{
      toast.warn("No images added yet!", {position: "bottom-center"})
    }
  }

  return (
    <>
      <div className="w-screen h-screen p-12 flex flex-col bg-gray-400">
      <ToastContainer autoClose={2000} />
        <h1 className="text-center text-3xl font-semibold text-white">
          Inspection Form
        </h1>
        <div className="w-4xl max-sm:w-[310px] max-lg:w-xl mt-2 shadow-xl self-center flex flex-col rounded-md p-5 bg-white">
          {images.length == 0 ? (
            <div className="flex flex-col items-center justify-center h-96 bg-gray-200 rounded-md">
              <FaImage size={56} color="#4a5565" />
              <p className="font-light text-gray-600">No images added</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center bg-gray-200 rounded-md gap-2 p-1">
              {images.map((img, index) => (
                <div>
                  <div className="flex flex-col w-44 h-44 max-sm:w-28 max-lg:w-36">
                    <img
                      src={img.preview}
                      alt="Preview"
                      className="w-full h-full object-contain rounded-t-lg"
                    />
                  </div>
                  <div className="flex flex-row font-medium bg-white shadow-md px-1 items-center rounded-sm">
                    {editId === index ? (
                      <input
                        type="text"
                        value={tempLabel}
                        autoFocus
                        className="w-36 max-sm:w-20 max-lg:w-28"
                        onChange={(e) => setTempLabel(e.target.value)}
                        onBlur={() => handleSaveEdit(index)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(index)}
                      />
                    ) : (
                      <p className="cursor-text inline-block" onClick={() => handleEditLabel(index, img.label)}>
                        {img.label}
                      </p>
                    )}
                    <FaRegTrashAlt
                      color="#4a5565"
                      className="hover:cursor-pointer ml-auto"
                      onClick={() => deleteImage(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-row gap-2 justify-end mt-2">
            <button
              onClick={() => setFormOpen(true)}
              className="px-2 py-1 rounded-lg bg-blue-400 font-medium hover:cursor-pointer shadow-xl"
            >
              Add Image
            </button>
            <button onClick={() => handleUploadImages()} className="px-2 py-1 rounded-lg bg-black text-white font-medium hover:cursor-pointer shadow-xl">
              Submit
            </button>
          </div>
        </div>
      </div>
      {formOpen && (
        <div className="fixed top-0 right-0 left-0 w-full h-full backdrop-blur-3xl backdrop-opacity-75">
          <div className="absolute top-1/6 mx-auto right-0 left-0 bg-white opacity-100 rounded-2xl max-sm:w-[305px] max-sm:h-[350px] md:w-[420px] max-lg:w-[480px] xl:w-[640px] h-[310px] md:h-80 xl:h-[370px] shadow-2xl flex flex-col py-3 px-6">
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
                      handleSubmitNewImage()
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
