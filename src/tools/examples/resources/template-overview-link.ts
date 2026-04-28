import { z } from "zod";
import { defineTool } from "../../_shared/define-tool.js";
import { resourceLinkResult } from "../../_shared/tool-result.js";

const tool = defineTool({
  name: "template_overview_link",
  title: "Template Overview Link",
  description: "Returns a link to the template overview resource.",
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  rateLimit: false,
  inputSchema: {
    label: z
      .string()
      .default("Template Overview")
      .describe("Display label for the resource link"),
  },
  async execute({ label }) {
    return resourceLinkResult(
      "template://overview",
      label,
      "Template overview resource",
    );
  },
});

export default tool;
