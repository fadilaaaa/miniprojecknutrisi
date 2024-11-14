import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import FileReader from "node:fs";

export async function POST(request) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

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

    const prompt = `You are a nutritionist who needs to analyze food items from images and calculate the total calories. You should also provide details of each food item with its calorie count, as well as the percentage breakdown of carbohydrates, fats, fiber, sugars, and other nutrients. Based on the total calories of the food and the user’s data, determine the duration of physical activities (running, pushups, situps, swimming) that the user needs to perform to burn those calories.
    with the following user data: 
    height: ${userData.height} cm
    weight: ${userData.weight} kg
    age: ${userData.age} years
    gender: ${userData.jk}

    using this JSON schema:
    {"foodItems":[
    {"no":1,"name":"apple","calories":52},
    {"no":2,"name":"banana","calories":89}
    ],
    "totalCalories":141,
    "carbohydrates":34,
    "fats":1,
    "fiber":5,
    "sugars":28,
    "otherNutrients":32,
    "activiyDuration":{
    "running":10,
    "pushups":20,
    "situps":30,
    "swimming":40}
    }
    `;
    const result = await model.generateContent([image, prompt]);

    // Output the generated text to the console
    const hasil = result.response.text();
    const hasiljson = extractJSON(hasil);
    console.log(hasiljson);

    return NextResponse.json(hasiljson);
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
