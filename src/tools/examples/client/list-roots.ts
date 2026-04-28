import { z } from "zod";
import { defineTool } from "../../_shared/define-tool.js";
import { errorResult, textResult } from "../../_shared/tool-result.js";

const tool = defineTool({
  name: "list_roots",
  title: "List Roots",
  description: "Asks the MCP client for its configured workspace roots.",
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  rateLimit: false,
  inputSchema: {
    includeRaw: z
      .boolean()
      .default(false)
      .describe("Return the raw roots/list response"),
  },
  async execute({ includeRaw }, context) {
    try {
      const result = await context.listRoots();
      return textResult(
        includeRaw
          ? JSON.stringify(result, null, 2)
          : JSON.stringify(result, null, 2),
      );
    } catch (err) {
      return errorResult(err instanceof Error ? err.message : String(err));
    }
  },
});

export default tool;
