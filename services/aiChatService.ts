import { Groq } from "groq-sdk";
import { RateLimiter } from "limiter";

export class AIChatService {
  private groq: Groq;
  private limiter: RateLimiter;
  private messageQueue: Array<{
    resolve: (value: string) => void;
    message: string;
  }> = [];
  private isProcessing = false;

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

    if (!apiKey) {
      throw new Error("GROQ API key is not defined in environment variables");
    }

    this.groq = new Groq({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    // Allow 1 request per 2 seconds
    this.limiter = new RateLimiter({
      tokensPerInterval: 1,
      interval: 2000,
    });

    // Start processing queue
    this.processQueue();
  }

  async sendMessage(message: string): Promise<string> {
    return new Promise((resolve) => {
      this.messageQueue.push({ resolve, message });
      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }

  private async processQueue() {
    if (this.messageQueue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const { resolve, message } = this.messageQueue[0];

    try {
      await this.limiter.removeTokens(1);
      const response = await this.getGroqChatCompletion(message);
      resolve(
        response.choices[0]?.message?.content ||
          "Sorry, I couldn't generate a response."
      );
    } catch (error) {
      console.error("Error in AI chat:", error);
      resolve("Sorry, I encountered an error. Please try again later.");
    }

    this.messageQueue.shift();
    this.processQueue();
  }

  private async getGroqChatCompletion(message: string) {
    return this.groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant that provides clear, concise, and accurate responses.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 2048,
    });
  }
}
