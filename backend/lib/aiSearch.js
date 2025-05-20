const { Mistral } = require("@mistralai/mistralai")
require('dotenv').config()

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey: apiKey });

async function getRelevantKeywords(query){

    const systemPrompt = `
    You are an expert AI assistant specialized in e-commerce search query analysis and keyword extraction.
    Your task is to identify 5 highly relevant keywords or keyphrases from a given user search query.
    These keywords should be distinct, directly related to products that can be purchased, and useful for refining a search or finding related products in an e-commerce context.

    You MUST respond with a JSON object.
    This JSON object MUST contain a single key named "keywords".
    The value of the "keywords" key MUST be a JSON array.
    This array MUST contain exactly 5 strings, where each string is a relevant keyword related to purchasable products.

    Do NOT include any other text, explanations, or markdown formatting outside of this JSON object.
    Your response must be ONLY the JSON object.

    Examples:
    - For the query "sleep", consider keywords like "bed", "mattress", "pillow", "bedsheet", "blanket".
    - For the query "dinner", consider keywords like "dining table", "dinnerware", "cutlery", "tablecloth", "serving dishes".
    `.trim();

    const userPrompt = `
    You are a product search assistant. Based on the following query:
    "${query}"
    Please return a comma-separated list of up to 5 relevant keywords or phrases that could help find matching products in an e-commerce setting.
    `.trim();


    try {
        const chatResponse = await client.chat.complete({
            model: "ministral-8b-2410",
            messages: [
                {
                    role: 'user',
                    content: userPrompt
                },
                {
                    role: 'system',
                    content: systemPrompt
                }
            ],
            maxTokens: 200,
            responseFormat: { type: 'json_object' },
        })

        if (chatResponse.choices && chatResponse.choices.length > 0) {
            const rawJson = chatResponse.choices[0].message.content

            // eg. of rawJson is "{\"keywords\":[\"running\",\"shoes\",\"men\",\"sports\",\"footwear\"]}"
            if (typeof rawJson === 'string') {
                const parsedResult = JSON.parse(rawJson)
                return parsedResult.keywords || []
            }
            else {
                console.error('Unexpected content type:', rawJson)
                return []
            }
        }
    }

    catch (error) {
        console.error("Mistral API Error:", error);
        throw new Error("Failed to get search keywords from Mistral.");
    }
}

module.exports = getRelevantKeywords