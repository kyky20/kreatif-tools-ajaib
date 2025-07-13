import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  text?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || !prompt) {
    return res.status(400).json({ error: "Missing prompt or API key" });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!result) {
    return res.status(500).json({ error: "No content returned from Gemini" });
  }

  res.status(200).json({ text: result });
}
