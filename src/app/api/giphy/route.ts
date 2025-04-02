// src/app/api/giphy/route.ts
// Import Next.js response utilities
import { NextResponse } from "next/server";

// Define the GET handler for this API route
export async function GET(request: Request) {
  // Get the search term from the URL query (e.g., ?search=cat)
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  
  const apiKey = "pdWEnauPX8WLpjU55sYusSa8thFfhr48";

  // Construct the Giphy API URL to fetch the first GIF
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=1`;

  try {
    // Fetch the GIF from Giphy
    const response = await fetch(url);
    const data = await response.json();

    // Extract the first GIF's URL (or empty string if none found)
    const gifUrl = data.data[0]?.images.original.url || "";

    // Return the GIF URL as JSON
    return NextResponse.json({ gifUrl });
  } catch (error) {
    // Handle errors by returning a 500 status with an error message
    return NextResponse.json({ error: "Failed to fetch GIF" }, { status: 500 });
  }
}