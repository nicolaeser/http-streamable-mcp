# http-streamable-mcp

A production-ready template for **Model Context Protocol (MCP)** servers. Build and deploy MCP capabilities over Streamable HTTP with built-in security, sessions, and a rich set of examples.

Ein produktionsreifes Template für **Model Context Protocol (MCP)** Server. Erstellen und deployen Sie MCP-Funktionen über Streamable HTTP mit integrierter Sicherheit, Sessions und vielen Beispielen.

---

## Quick Start / Schnellstart

```bash
npm install
npm run dev
```

The MCP endpoint is at `http://localhost:3000/mcp`.

Der MCP-Endpunkt befindet sich unter `http://localhost:3000/mcp`.

---

## Core Concepts / Kernkonzepte

### 🛠 Tools
**EN:** Tools are functions that the LLM can execute (e.g., searching a database or calculating values). This template uses Zod for strict input validation.  
**DE:** Tools sind Funktionen, die das LLM ausführen kann (z. B. Datenbankabfragen oder Berechnungen). Dieses Template nutzt Zod für eine strikte Validierung der Eingaben.

### 📄 Resources & Templates
**EN:** Resources provide static or dynamic data (like documents or UI files) to the model. Templates allow for dynamic URIs like `notes/{id}`.  
**DE:** Ressourcen stellen dem Modell statische oder dynamische Daten (wie Dokumente oder UI-Dateien) zur Verfügung. Templates ermöglichen dynamische URIs wie `notes/{id}`.

### 💡 Prompts
**EN:** Pre-defined instructions or templates that help users interact with the model more effectively.  
**DE:** Vordefinierte Anweisungen oder Vorlagen, die Nutzern helfen, effektiver mit dem Modell zu interagieren.

### 🔄 Tasks
**EN:** Long-running operations that return a handle immediately, allowing the client to poll for results or cancel later.  
**DE:** Langlaufende Operationen, die sofort ein Handle zurückgeben, sodass der Client später Ergebnisse abrufen oder die Aufgabe abbrechen kann.

### 🧪 Sampling & Elicitation
**EN:** **Sampling** lets the server ask the LLM to generate text. **Elicitation** lets the server ask the user for specific structured input.  
**DE:** **Sampling** erlaubt es dem Server, das LLM um Textgenerierung zu bitten. **Elicitation** ermöglicht es dem Server, den Nutzer nach spezifischen, strukturierten Eingaben zu fragen.

---

## Project Layout / Projektstruktur

- `src/tools/`: Custom functions for the LLM / Eigene Funktionen für das LLM.
- `src/resources/`: Data and MCP App UIs / Daten und MCP App Benutzeroberflächen.
- `src/prompts/`: Reusable instruction sets / Wiederverwendbare Anweisungen.
- `src/http/`: Express server & Auth logic / Express Server & Authentifizierung.

---

## Security / Sicherheit

**EN:** Supports **Bearer Token** authentication (API Key) and an explicit no-auth mode for local development. Use `AUTH_MODE=bearer` for production.  
**DE:** Unterstützt **Bearer Token** Authentifizierung (API Key) und einen expliziten No-Auth-Modus für lokale Entwicklung. Nutzen Sie `AUTH_MODE=bearer` für die Produktion.

---

## Deployment / Bereitstellung

**Docker:**
```bash
docker compose up -d
```
See `docker-compose.yml` for environment configuration.
Siehe `docker-compose.yml` für die Konfiguration der Umgebungsvariablen.

### Redis DB Layout

When `REDIS_URL` is configured, the server uses separate Redis logical databases:

- DB 0: MCP sessions.
- DB 1: Rate limiting.
- DB 2: MCP tasks.
- DB 3: Tool cache data, such as table IDs.

---

## Why this Template? / Warum dieses Template?

- **Streamable HTTP:** Modern transport for persistent sessions.
- **Bilingual Support:** Ready for international teams.
- **Rich Examples:** Includes calculators, fetchers, and complex task flows.
- **Production Ready:** Built-in rate limiting, logging, and Docker support.
