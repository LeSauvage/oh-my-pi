import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

const GIT_PUSH = /\bgit\s+push\b/;
const FORCE_OPTION = /(?:^|\s)(?:--force(?:-with-lease)?|-f)(?:=\S+)?(?:\s|$)/;

export default function forcePushGuard(pi: ExtensionAPI): void {
  pi.on("tool_call", (event) => {
    if (event.toolName !== "bash") return;

    const command = String(event.input.command ?? "");
    if (!GIT_PUSH.test(command) || !FORCE_OPTION.test(command)) return;

    return {
      block: true,
      reason: "Force pushes are blocked by the project safety hook.",
    };
  });
}
