import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import FileReader from "node:fs";

export async function POST(request) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const data = await request.formData();

    // console.log(data);

    const userData = JSON.parse(data.get("userData"));
    // const image = data.get("image");
    const mimeType = data.get("mimeType");

    const image = {
      inlineData: {
        data: Buffer.from(await data.get("image").arrayBuffer()).toString(
          "base64"
        ),
        mimeType: mimeType,
      },
    };

    const prompt = `You are an expert in nutritionist where you need to see the food items from the image and calculate the total calories, also provide the details of every food items with calories intake
as well as the percentage breakdown of carbohydrates, fats, fiber, sugars, and other nutrients. Based on the total calories of the food and the user’s data, determine the duration of physical activities (running, pushups, situps, swimming) that the user needs to perform to burn those calories.
    with the following user data: 
    height: ${userData.tb} cm
    weight: ${userData.bb} kg
    age: ${userData.umur} years
    gender: ${userData.jk}

using this JSON schema:
{
  "food_items": [
    {
      "name": "Cucumber",
      "calories": "16",
      "serving_size": "100g",
      "carbohydrates": "3.63g",
      "fats": "0.11g",
      "protein": "0.65g",
      "fiber": "0.5g",
      "sugars": "1.67g"
    },
    ----------------
  ],
  "total_calories": "260-300",
  "nutrient_breakdown": {
    "carbohydrates": "22-28%",
    "fats": "10-15%",
    "protein": "8-12%",
    "fiber": "5-7%",
    "sugars": "5-8%"
  },
  "physical_activities": [
    {
      "activity": "Running",
      "duration": "25-30 minutes"
    },
    {
      "activity": "Push-ups",
      "repetitions": "3 sets of 15-20 repetitions"
    },
    {
      "activity": "Sit-ups",
      "repetitions": "3 sets of 20-25 repetitions"
    },
    {
      "activity": "Swimming",
      "duration": "20-25 minutes"
    }
  ]
}
    Output:`;
    const result = await model.generateContent([image, prompt]);

    // Output the generated text to the console
    const hasil = result.response.text();
    // const hasiljson = extractJSON(hasil);
    console.log(hasil);
    // console.log("user data: ", userData);
    // console.log("prompt", prompt);

    return NextResponse.json({ hasil: hasil });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      error: "Gagal memproses gambar",
      massages: error,
    });
  }
}

function extractJSON(text) {
  const jsonPattern = /{[\s\S]*?}/;
  const match = text.match(jsonPattern);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return null;
    }
  } else {
    console.error("No JSON found in text.");
    return null;
  }
}
