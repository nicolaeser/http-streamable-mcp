import { z } from "zod";
import { defineTool } from "../../_shared/define-tool.js";
import { textResult } from "../../_shared/tool-result.js";

const tool = defineTool({
  name: "hello_world",
  description: "Returns a short greeting in the requested language.",
  rateLimit: false,
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },

  inputSchema: {
    name: z.string().min(1).describe("Name to include in the greeting"),
    language: z
      .enum(["en", "es", "fr", "de"])
      .default("en")
      .describe("Greeting language"),
  },

  async execute({ name, language }) {
    const greetings = {
      en: `Hello, ${name}!`,
      es: `¡Hola, ${name}!`,
      fr: `Bonjour, ${name}!`,
      de: `Hallo, ${name}!`,
    };

    return textResult(greetings[language]);
  },
});

export default tool;
