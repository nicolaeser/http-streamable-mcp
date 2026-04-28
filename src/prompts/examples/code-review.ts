import { z } from "zod";
import { definePrompt } from "../_shared/define-prompt.js";
import { textPrompt } from "../_shared/prompt-result.js";

const prompt = definePrompt({
  name: "code_review",
  title: "Code Review",
  description: "Creates a focused code review prompt.",
  arguments: [
    {
      name: "code",
      description: "Code or diff to review",
      required: true,
    },
    {
      name: "focus",
      description: "Optional review focus",
      required: false,
    },
  ],
  inputSchema: {
    code: z.string().min(1),
    focus: z.string().optional(),
  },
  async complete(argumentName, value) {
    if (argumentName !== "focus") return [];

    return [
      "correctness",
      "security",
      "performance",
      "maintainability",
      "tests",
    ].filter((focus) => focus.startsWith(value.toLowerCase()));
  },
  async get({ code, focus }) {
    const focusText = focus
      ? `Focus especially on ${focus}.`
      : "Focus on correctness, maintainability, security, and missing tests.";

    return textPrompt(
      [
        "Review the following code.",
        "",
        focusText,
        "",
        "Return concrete findings first, ordered by severity.",
        "",
        "```",
        code,
        "```",
      ].join("\n"),
      "Structured code review prompt",
    );
  },
});

export default prompt;
