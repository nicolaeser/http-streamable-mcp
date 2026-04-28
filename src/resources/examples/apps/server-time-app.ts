import { defineResource } from "../../_shared/define-resource.js";

export const SERVER_TIME_APP_URI = "ui://examples/server-time.html";
export const MCP_APP_MIME_TYPE = "text/html;profile=mcp-app";

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Server Time</title>
    <style>
      :root {
        color-scheme: light dark;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      body {
        margin: 0;
        padding: 24px;
        background: Canvas;
        color: CanvasText;
      }

      main {
        display: grid;
        gap: 12px;
      }

      h1 {
        margin: 0;
        font-size: 20px;
        line-height: 1.2;
      }

      p {
        margin: 0;
        color: color-mix(in srgb, CanvasText 72%, Canvas);
      }

      output {
        display: inline-block;
        margin-top: 8px;
        padding: 10px 12px;
        border: 1px solid color-mix(in srgb, CanvasText 18%, Canvas);
        border-radius: 6px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Server Time</h1>
      <p>This MCP App is rendered from a <code>ui://</code> resource linked to a tool.</p>
      <output id="time">Waiting for tool result</output>
    </main>
    <script type="module">
      const output = document.getElementById("time");

      window.addEventListener("message", (event) => {
        const data = event.data;
        const text = data?.result?.content?.find?.((item) => item.type === "text")?.text;
        if (typeof text === "string") {
          output.textContent = text;
        }
      });
    </script>
  </body>
</html>`;

const resource = defineResource({
  uri: SERVER_TIME_APP_URI,
  name: "server_time_app",
  title: "Server Time App",
  description: "HTML UI resource for the server_time_app example tool.",
  mimeType: MCP_APP_MIME_TYPE,
  _meta: {
    ui: {
      prefersBorder: true,
      csp: {
        connectDomains: [],
        resourceDomains: [],
      },
    },
  },
  async read() {
    return {
      contents: [
        {
          uri: SERVER_TIME_APP_URI,
          mimeType: MCP_APP_MIME_TYPE,
          text: html,
          _meta: {
            ui: {
              prefersBorder: true,
              csp: {
                connectDomains: [],
                resourceDomains: [],
              },
            },
          },
        },
      ],
    };
  },
});

export default resource;
