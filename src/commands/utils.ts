export function getArgs(args: string[]): string[] {
  const argumnts = args.filter(x => !x.startsWith("-") && !x.startsWith("--"));
  argumnts.splice(0, 2);
  return argumnts;
}
export function getOptions(args: string[]): string[] {
  return args.filter(x => x.startsWith("-") && x.startsWith("--"));
}
export function containsOptions(args: string[]): boolean {
  return args.find(x => x.startsWith("-") || x.startsWith("--")) ? true : false;
}
