// src/app/page.tsx
"use client"; // Enable client-side rendering for this page

// Import React's useState hook for managing state
import { useState } from "react";

// Define the Home component as the default export
export default function Home() {
  // State to store the search term (string) and GIF URL (string)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [gifUrl, setGifUrl] = useState<string>("");

  // Handle input change when the user types
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update searchTerm with the input value
  };

// Inside the Home function in src/app/page.tsx
// Handle search button click
const handleSearch = async () => {
  // Make a request to the internal API route with the search term
  const response = await fetch(`/api/giphy?search=${searchTerm}`);
  const data = await response.json();

  // Update gifUrl with the fetched GIF URL
  setGifUrl(data.gifUrl);
};

  return (
    // Main container: full height, light gray background, centered content
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* App title: large, bold, with margin below */}
      <h1 className="text-3xl font-bold mb-6">Giphch</h1>

      {/* Search bar and button container: max width, flex layout, gap between elements */}
      <div className="w-full max-w-md flex gap-2">
        {/* Input field: takes available space, padding, border, rounded */}
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

      {/* GIF Card: shows only if gifUrl exists, max width, white background, padding, shadow */}
      {gifUrl && (
        <div className="mt-6 w-full max-w-md bg-white p-4 rounded-md shadow-md">
          {/* GIF image: full width, auto height for responsiveness */}
          <img src={gifUrl} alt="GIF result" className="w-full h-auto" />
        </div>
      )}
    </div>
  );
}