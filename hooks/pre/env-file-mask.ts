import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

const ENV_FILE = /(?:^|\/)\.env(?:\.[^/]+)?(?::.*)?$/;
const ENV_ASSIGNMENT = /^([ \t]*(?:\d+:)?[ \t]*(?:#[ \t]*)?(?:export[ \t]+)?[A-Za-z_][A-Za-z0-9_]*[ \t]*=[ \t]*).*$/;
const COMMENT = /^([ \t]*(?:\d+:)?[ \t]*)#.*/;
const READ_HEADER = /^\[[^\r\n]*\]$/;

function maskEnvironmentContent(text: string): string {
  return text
    .split(/(\r?\n)/)
    .map((line) => {
      if (line.length === 0 || line === "\n" || line === "\r\n" || READ_HEADER.test(line)) return line;
      if (ENV_ASSIGNMENT.test(line)) return line.replace(ENV_ASSIGNMENT, "$1[REDACTED]");
      if (COMMENT.test(line)) return line.replace(COMMENT, "$1# [REDACTED]");

      return "[REDACTED]";
    })
    .join("");
}

export default function envFileMask(pi: ExtensionAPI): void {
  pi.on("tool_result", (event) => {
    const path = String(event.input.path ?? "").replaceAll("\\", "/");
    if (event.toolName !== "read" || event.isError || !ENV_FILE.test(path)) return;

    return {
      content: event.content.map((chunk) => {
        if (chunk.type !== "text") return chunk;

        return {
          ...chunk,
          text: maskEnvironmentContent(chunk.text),
        };
      }),
    };
  });
}
