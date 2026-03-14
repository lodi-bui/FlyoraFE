// src/api/OpenAIAssistant.js
// Utility to call OpenAI API for dashboard data analysis

export async function analyzeDashboardData(data, apiKey, userQuestion = "") {
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };
  const messages = [
    {
      role: "system",
      content: "You are a data analyst. Analyze the following product sales data and provide insights, trends, and suggestions for improvement. If the user provides a specific question, answer it based on the data."
    },
    {
      role: "user",
      content: `Here is the dashboard data: ${JSON.stringify(data)}`
    }
  ];
  if (userQuestion && userQuestion.trim() !== "") {
    messages.push({
      role: "user",
      content: userQuestion
    });
  }
  const body = {
    model: "gpt-3.5-turbo",
    messages,
    max_tokens: 400
  };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });
    const result = await response.json();
    return result.choices?.[0]?.message?.content || "No analysis returned.";
  } catch (error) {
    return `Error: ${error.message}`;
  }
}
