import { z } from "zod";
import { defineTool } from "../../_shared/define-tool.js";
import { errorResult, textResult } from "../../_shared/tool-result.js";

const tool = defineTool({
  name: "sampling_summary",
  description: "Asks the MCP client model to summarize text.",
  annotations: {
    title: "Sampling Summary",
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  rateLimit: false,
  inputSchema: {
    text: z.string().min(1).describe("Text to summarize"),
  },
  async execute({ text }, context) {
    try {
      const result = await context.sample({
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Summarize this text in one concise paragraph:\n\n${text}`,
            },
          },
        ],
        maxTokens: 300,
      });

      return textResult(JSON.stringify(result, null, 2));
    } catch (err) {
      return errorResult(err instanceof Error ? err.message : String(err));
    }
  },
});

export default tool;
