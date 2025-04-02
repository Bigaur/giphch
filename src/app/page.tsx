// src/app/page.tsx
"use client"; // Enable client-side rendering for this page

// Import React's useState hook for managing state
import { useState } from "react";


export default function Home() {
  
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [gifUrl, setGifUrl] = useState<string>("");


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); 
  };

const handleSearch = async () => {
  
  const response = await fetch(`/api/giphy?search=${searchTerm}`);
  const data = await response.json();

  
  setGifUrl(data.gifUrl);
};

  return (
    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      
      <h1 className="text-3xl font-bold mb-6">Giphch</h1>

      
      <div className="w-full max-w-md flex gap-2">
        
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter a word..."
          className="flex-1 p-2 border rounded-md"
        />
        {/* Search button: blue background, white text, padding, rounded, hover effect */}
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      
      
{gifUrl && (
  <div className="mt-6 w-full max-w-md bg-white p-4 rounded-md shadow-md">
    
    <a href={gifUrl} target="_blank" rel="noopener noreferrer">
     
      <img src={gifUrl} alt="GIF result" className="w-full h-auto" />
    </a>
  </div>
)}
    </div>
  );
}