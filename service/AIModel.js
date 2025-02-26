import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = "AIzaSyCgXfZCFJg9WpMHVQfPbUM_r3c3r-uwhaI";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const AI_PROMPT = `Generate Travel Plan For Location and return in form of array : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me hotel array with Hotels list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary is in form of array with each part has placeName, place Details, place Image Url, Geo Coordinates, ticket Pricing, traveltime each of location for {totalDays} days with each day with best time to visit in JSON format and all in lowercase heading `;
