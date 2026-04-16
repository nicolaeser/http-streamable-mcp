import { defineResourceTemplate } from "../_shared/define-resource-template.js";

const notes: Record<string, string> = {
  deployment:
    "Deployment note: configure API_KEY and MCP_ALLOWED_ORIGINS before publishing the server.",
  overview:
    "Overview note: tools perform actions, resources provide context, and prompts provide reusable instructions.",
  security:
    "Security note: keep DISABLE_AUTH=false outside local development and review open-world tools before deployment.",
};

const template = defineResourceTemplate({
  uriTemplate: "template://notes/{name}",
  name: "project_note",
  title: "Project Note",
  description: "Reads a named project note.",
  mimeType: "text/plain",
  async complete(argumentName, value) {
    if (argumentName !== "name") return [];

    return Object.keys(notes).filter((name) =>
      name.toLowerCase().startsWith(value.toLowerCase()),
    );
  },
  async read(uri, variables) {
    const name = variables.name;
    const text = notes[name] ?? `No note exists for "${name}".`;

    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text,
        },
      ],
    };
  },
});

export default template;
