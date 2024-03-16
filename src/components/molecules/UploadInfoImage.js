import { useDropzone } from "react-dropzone";
import Notification from "../atoms/Notification";
import { FaRegTrashCan, FaImage } from "react-icons/fa6";
import { useState } from "react";

export const UploadInfoImage = ({ name, selectedFiles, setSelectedFiles }) => {
  /////// kiểm tra file ảnh////////
  function isImageByExtension(fileName) {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  }

  const onDrop = async (acceptedFiles) => {
    if (selectedFiles.length > 0) {
      // Remove the existing image before adding the new one
      await handleRemoveImage(0);
    }

    const baseArray = [];
    for (const file of acceptedFiles) {
      // filter <20mb
      if (file.size >= 20 * 1024 * 1024) {
        Notification.error("Please choose file < 20mb!");
      } else if (!isImageByExtension(file.name)) {
        Notification.error("File type does not match!");
      } else {
        try {
          baseArray.push(file);
        } catch (error) {
          console.error("Error converting to base64:", error);
        }
      }
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...baseArray]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const handleRemoveImage = (indexToRemove) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(indexToRemove, 1);
      return updatedFiles;
    });
  };

  return (
    <>
      <div {...getRootProps()} className="cursor-pointer w-full h-full">
        <input {...getInputProps()} />
        <div className="flex justify-center items-center text-center text-9xl p-5 rounded bg-slate-200 w-full h-full">
          {selectedFiles.length > 0 ? (
            <img
              src={URL.createObjectURL(selectedFiles[0])}
              className="h-auto w-auto"
            />
          ) : (
            <FaImage />
          )}
        </div>
      </div>
      <p className="text-[#5c677e] font-medium text-sm pb-2 text-center mt-2">{name}</p>
    </>
  );
};
