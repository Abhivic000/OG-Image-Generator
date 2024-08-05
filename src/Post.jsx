import React, { useState, useRef } from 'react';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import './App.css';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [bgColor, setBgColor] = useState('#000000');
  const [logo, setLogo] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const imageRef = useRef(null);

  const handleGenerateImage = () => {
    if (imageRef.current) {
      htmlToImage.toBlob(imageRef.current, { width: 1200, height: 630 })
        .then((blob) => {
          saveAs(blob, 'og-image.png');
        })
        .catch((error) => {
          console.error('Failed to generate image', error);
        });
    }
  };

  const handleLogoChange = (event) => {
    setLogo(URL.createObjectURL(event.target.files[0]));
  };

  const handleMainImageChange = (event) => {
    setMainImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Background Color</label>
        <input
          type="color"
          className="w-12 h-12 border-none rounded-full cursor-pointer shadow-sm transition ease-in-out duration-150 hover:opacity-80 focus:outline-none"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Upload Logo</label>
        <input
          type="file"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          onChange={handleLogoChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Upload Main Image</label>
        <input
          type="file"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          onChange={handleMainImageChange}
        />
      </div>

      <div
        ref={imageRef}
        className="rounded-xl"
        style={{ maxWidth: '100%', aspectRatio: '1200/630', height: 'auto' }}
      >
        <div
          className="flex flex-col md:flex-row p-4 rounded-t-xl"
          style={{ backgroundColor: bgColor }}
        >
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
            {logo && <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />}
          </div>
          <div className=" flex-1">
            <h1 className="text-white break-all text-left text-2xl md:text-4xl font-bold mb-2">{title}</h1>
            <p className="text-white text-left text-sm md:text-lg break-all">{content}</p>
          </div>
        </div>

        {mainImage && (
          <div className="w-full h-[calc(100%-80px)] overflow-hidden rounded-b-xl">
            <img
              src={mainImage}
              alt="Main"
              className="w-full h-full object-fill rounded-b-xl"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleGenerateImage}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Image
      </button>
    </div>
  );
};

export default Post;
