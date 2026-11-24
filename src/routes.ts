/** "/project/foo" -> "~/sourav.md/project/foo", "/" -> "~/sourav.md" */
export function terminalPath(pathname: string): string {
  return `~/sourav.md${pathname.replace(/\/+$/, "")}`;
}
