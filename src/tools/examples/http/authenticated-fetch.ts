import { z } from "zod";
import { defineTool } from "../../_shared/define-tool.js";
import { errorResult, textResult } from "../../_shared/tool-result.js";

const tool = defineTool({
  name: "authenticated_fetch",
  description:
    "Fetches a URL using a Bearer token from the x-api-token request header. " +
    "The header is captured when the MCP session is initialized.",
  rateLimit: {
    tool: { max: 30 },
    client: { max: 10, idHeader: "x-client-id" },
  },
  annotations: { openWorldHint: true },

  inputSchema: {
    url: z.string().url().describe("HTTP or HTTPS URL to fetch"),
    method: z
      .enum(["GET", "POST", "PUT", "PATCH", "DELETE"])
      .default("GET")
      .describe("HTTP method"),
    body: z
      .string()
      .optional()
      .describe(
        "Request body as a JSON string for POST, PUT, or PATCH requests",
      ),
  },

  async execute({ url, method, body }, context) {
    const token = context.headers["x-api-token"];

    if (!token) {
      return errorResult(
        "Missing x-api-token header. Provide it when initializing the MCP session.",
      );
    }

    await context.sendProgress(0, 2, "Sending request");

    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "http-streamable-mcp/1.0",
        },
        body,
        signal: AbortSignal.any([
          context.abortSignal,
          AbortSignal.timeout(15_000),
        ]),
      });
    } catch (err) {
      return errorResult(
        `Network error: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    await context.sendProgress(1, 2, "Reading response");
    const text = await response.text();
    await context.sendProgress(2, 2, "Complete");

    if (!response.ok) {
      return errorResult(
        `HTTP ${response.status} ${response.statusText}\n\n${text}`,
      );
    }

    return textResult(text);
  },
});

export default tool;
