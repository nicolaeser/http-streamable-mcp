import { defineResource } from "../_shared/define-resource.js";

const resource = defineResource({
  uri: "template://overview",
  name: "template_overview",
  title: "Template Overview",
  description: "Explains the extension points provided by this MCP template.",
  mimeType: "text/markdown",
  annotations: {
    audience: ["assistant", "user"],
    priority: 0.7,
  },
  async read() {
    return {
      contents: [
        {
          uri: "template://overview",
          mimeType: "text/markdown",
          text: [
            "# Streamable HTTP MCP Template",
            "",
            "This server discovers tools, resources, and prompts recursively.",
            "",
            "- Add tools under `src/tools` for actions.",
            "- Add resources under `src/resources` for context.",
            "- Add prompts under `src/prompts` for reusable instructions.",
          ].join("\n"),
        },
      ],
    };
  },
});

export default resource;
