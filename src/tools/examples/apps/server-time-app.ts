import { z } from "zod";
import { SERVER_TIME_APP_URI } from "../../../resources/examples/apps/server-time-app.js";
import { defineTool } from "../../_shared/define-tool.js";
import { textResult } from "../../_shared/tool-result.js";

const tool = defineTool({
  name: "server_time_app",
  description: "Returns the current server time and opens an MCP App UI.",
  annotations: {
    title: "Server Time App",
    readOnlyHint: true,
    idempotentHint: false,
    openWorldHint: false,
  },
  _meta: {
    ui: {
      resourceUri: SERVER_TIME_APP_URI,
      visibility: ["model", "app"],
    },
  },
  rateLimit: false,
  inputSchema: {
    format: z
      .enum(["iso", "locale"])
      .default("iso")
      .describe("Timestamp format to return"),
  },
  async execute({ format }) {
    const now = new Date();
    return textResult(
      format === "locale" ? now.toLocaleString() : now.toISOString(),
    );
  },
});

export default tool;
