import { z } from "zod";
import { defineTool } from "../../_shared/define-tool.js";
import { errorResult, textResult } from "../../_shared/tool-result.js";

const tool = defineTool({
  name: "elicitation_contact",
  description: "Asks the MCP client to collect structured contact details.",
  annotations: {
    title: "Elicitation Contact",
    readOnlyHint: true,
    idempotentHint: false,
    openWorldHint: false,
  },
  rateLimit: false,
  inputSchema: {
    reason: z.string().min(1).describe("Reason for collecting contact details"),
  },
  async execute({ reason }, context) {
    try {
      const result = await context.elicit({
        mode: "form",
        message: `Please provide contact details for: ${reason}`,
        requestedSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              title: "Name",
            },
            email: {
              type: "string",
              title: "Email",
              format: "email",
            },
          },
          required: ["name", "email"],
        },
      });

      return textResult(JSON.stringify(result, null, 2));
    } catch (err) {
      return errorResult(err instanceof Error ? err.message : String(err));
    }
  },
});

export default tool;
