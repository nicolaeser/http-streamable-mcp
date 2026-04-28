import { z } from "zod";
import { defineTool } from "../../_shared/define-tool.js";
import { errorResult, textResult } from "../../_shared/tool-result.js";

const tool = defineTool({
  name: "calculator",
  description: "Runs one arithmetic operation on two numbers.",
  rateLimit: false,
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },

  inputSchema: {
    a: z.number().describe("First operand"),
    b: z.number().describe("Second operand"),
    operation: z
      .enum(["add", "subtract", "multiply", "divide"])
      .describe("Arithmetic operation"),
  },

  async execute({ a, b, operation }) {
    if (operation === "divide" && b === 0) {
      return errorResult("Error: division by zero is undefined.");
    }

    const operations = {
      add: a + b,
      subtract: a - b,
      multiply: a * b,
      divide: a / b,
    };

    const symbols = {
      add: "+",
      subtract: "-",
      multiply: "×",
      divide: "÷",
    };

    return textResult(
      `${a} ${symbols[operation]} ${b} = ${operations[operation]}`,
    );
  },
});

export default tool;
