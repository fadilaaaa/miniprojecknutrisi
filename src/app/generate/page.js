"use client";
import React, { useState } from "react";
import Modal from "./modal";
import { getUserData } from "./user";

export default function Generate() {
  const [image, setImage] = useState(null);
  const [base64, setbase64] = useState("");
  const [generatedData, setGeneratedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      setLoading(true);

      const dataform = new FormData();
      dataform.append("image", file);
      dataform.append("mimeType", file.type);
      const userData = getUserData();
      if (userData) {
        dataform.append("userData", JSON.stringify(userData));
      }

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          body: dataform,
        });
        const data = await response.json();
        console.log(data);

        setGeneratedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setGeneratedData({ error: "Gagal memproses gambar" });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <div className="mx-auto flex flex-col items-center bg-white p-8 rounded-lg shadow-2xl transform transition duration-500 ">
        <h1 className="text-4xl text-blue-600 font-bold mb-6 animate-bounce">
          Upload Foto
        </h1>

        <div className="pb-6">
          <div className="relative inline-block">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file:absolute file:hover:scale-105 file:right-2 file:bg-blue-500 file:text-white file:border-0 file:py-2 file:px-4 file:rounded-full file:shadow-xl file:shadow-blue-500/30 text-gray-600"
            />
          </div>
        </div>

        {image && (
          <div className="mt-6 w-[15%]">
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-auto object-cover rounded-md mb-6 shadow-lg transform transition duration-500 hover:scale-105"
            />
          </div>
        )}

        {loading ? (
          <p className="text-gray-500 animate-pulse">Memproses...</p>
        ) : generatedData ? (
          <>
            <h2 autoFocus className="text-2xl text-blue-400 font-medium my-4">
              Hasil Analisis:
            </h2>
            <div className="w-full text-left">
              {generatedData.error ? (
                <p className="text-red-500">{generatedData.error}</p>
              ) : (
                <div className="text-lg">{generatedData.hasil}</div>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <Modal showModalInit={true} />
    </div>
  );
}
