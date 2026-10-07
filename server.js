import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ============================================================
// IMAGE UPLOAD
// ============================================================

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

// ============================================================
// GROQ API
// ============================================================

const GROQ_API_URL =
  "https://api.groq.com/openai/v1/chat/completions";

// ============================================================
// NORMAL FARMEAZY CHATBOT
// ============================================================

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },

      body: JSON.stringify({
        model: "openai/gpt-oss-20b",

        messages: [
          {
            role: "system",

            content: `
You are Farmeazy AI, a friendly agricultural assistant designed mainly
for Indian farmers and consumers.

You help with:
- Farming and cultivation
- Crop care
- Irrigation
- Fertilizers
- Common crop diseases
- Agricultural tools and equipment
- Crop identification
- General farming questions
- Farmeazy website navigation

Give practical, simple and easy-to-understand answers.
Avoid unnecessary technical language.

For serious crop disease or chemical-treatment questions, recommend
verifying the advice with a local agricultural officer or qualified expert
before applying chemicals.

Never invent live crop prices, weather information, or other real-time data.
Those will be provided separately by Farmeazy's data systems.
            `,
          },

          {
            role: "user",
            content: message,
          },
        ],

        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API error:", data);

      return res.status(response.status).json({
        error:
          data.error?.message ||
          "Groq API request failed.",
      });
    }

    const reply =
      data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({
        error: "Groq returned an empty response.",
      });
    }

    res.json({
      reply,
    });

  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error:
        "Unable to get a response from Farmeazy AI.",
    });
  }
});

// ============================================================
// CROP IMAGE ANALYSIS
// ============================================================

app.post(
  "/api/analyze-crop",
  upload.single("image"),
  async (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          error: "Please upload a crop image.",
        });
      }

      console.log(
        "Crop image received:",
        req.file.originalname
      );

      // Convert image to Base64
      const base64Image =
        req.file.buffer.toString("base64");

      const mimeType =
        req.file.mimetype || "image/jpeg";

      // --------------------------------------------------------
      // IMPORTANT
      // --------------------------------------------------------
      // We use Groq's vision-capable model for the image.
      // --------------------------------------------------------

      const response = await fetch(
        GROQ_API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${process.env.GROQ_API_KEY}`,
          },

          body: JSON.stringify({

            model:
              "qwen/qwen3.8-27b",

            messages: [

              {
                role: "system",

                content: `
You are Farmeazy Crop Doctor, an AI agricultural
assistant helping Indian farmers.

Analyze the uploaded crop image carefully.

Your job is to:

1. Identify the crop if possible.
2. Determine whether the plant appears healthy.
3. If there is a visible disease, pest, deficiency,
   or other problem, identify the most likely issue.
4. Explain the visible symptoms in simple language.
5. Give practical recommended next steps.
6. If treatment involves pesticides, fungicides,
   insecticides, or chemicals, DO NOT give unsafe
   or overly specific chemical dosage instructions.
   Recommend consulting a local agricultural officer
   or qualified agricultural expert before chemical use.

IMPORTANT:
- Do not claim certainty when the image is unclear.
- Clearly say when the diagnosis is only a possibility.
- Do not invent information that cannot be seen.
- Keep the response useful for a farmer.
- Use simple language.

Return the answer in exactly this structure:

CROP:
<crop name>

HEALTH:
<Healthy / Possible problem / Unable to determine>

PROBLEM:
<disease, pest, deficiency or "No obvious problem">

SYMPTOMS:
<short explanation>

RECOMMENDED ACTION:
<practical steps>

CONFIDENCE:
<High / Medium / Low>

NOTE:
<short safety note>
                `,
              },

              {
                role: "user",

                content: [
                  {
                    type: "text",

                    text:
                      "Analyze this crop image and provide the requested Farmeazy Crop Doctor report.",
                  },

                  {
                    type: "image_url",

                    image_url: {
                      url:
                        `data:${mimeType};base64,${base64Image}`,
                    },
                  },
                ],
              },

            ],

            temperature: 0.2,

            max_tokens: 700,

          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        console.error(
          "Crop analysis API error:",
          data
        );

        return res.status(response.status).json({
          error:
            data.error?.message ||
            "Crop analysis failed.",
        });
      }

      const analysis =
        data.choices?.[0]?.message?.content;

      if (!analysis) {

        return res.status(500).json({
          error:
            "AI returned an empty crop analysis.",
        });
      }

      console.log(
        "Crop analysis completed."
      );

      res.json({
        analysis,
      });

    } catch (error) {

      console.error(
        "Crop analysis error:",
        error
      );

      res.status(500).json({
        error:
          "Unable to analyze the crop image.",
      });
    }
  }
);

// ============================================================
// START SERVER
// ============================================================

const PORT = 3001;

app.listen(PORT, () => {

  console.log(
    `Farmeazy AI server running on http://localhost:${PORT}`
  );

});