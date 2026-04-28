import { z } from "zod";
import { defineTool } from "../../_shared/define-tool.js";
import { errorResult, textResult } from "../../_shared/tool-result.js";

const tool = defineTool({
  name: "fetch_url",
  description: "Fetches text content from an HTTP or HTTPS URL.",
  rateLimit: {
    tool: { max: 30 },
    client: { max: 10 },
  },
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },

  inputSchema: {
    url: z.string().url().describe("HTTP or HTTPS URL to fetch"),
    maxChars: z
      .number()
      .int()
      .min(1)
      .max(10_000)
      .default(2_000)
      .describe("Maximum response characters to return"),
  },

  async execute({ url, maxChars }, context) {
    let response: Response;
    try {
      response = await fetch(url, {
        headers: { "User-Agent": "http-streamable-mcp/1.0" },
        signal: AbortSignal.any([
          context.abortSignal,
          AbortSignal.timeout(10_000),
        ]),
      });
    } catch (err) {
      return errorResult(
        `Network error: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    if (!response.ok) {
      return errorResult(
        `HTTP error ${response.status}: ${response.statusText}`,
      );
    }

    const body = await response.text();
    const truncated = body.length > maxChars;
    const output = truncated ? body.slice(0, maxChars) : body;

    return textResult(
      truncated
        ? `${output}\n\n[Truncated: ${body.length} total characters, returned ${maxChars}]`
        : output,
    );
  },
});

export default tool;
