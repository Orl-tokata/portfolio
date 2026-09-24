export type TokenType = "keyword" | "string" | "annotation" | "type" | "comment" | "number" | "function" | "plain";

export interface Token {
  text: string;
  type: TokenType;
}

const KEYWORDS = new Set([
  // Java
  "public", "private", "protected", "class", "interface", "record", "new", "return", "final", "static",
  "void", "import", "package", "extends", "implements", "throws", "this",
  // TypeScript
  "export", "default", "function", "const", "let", "await", "async", "from", "type", "if", "else",
  // SQL
  "CREATE", "TABLE", "PRIMARY", "KEY", "NOT", "NULL", "DEFAULT", "INDEX", "ON", "VARCHAR", "TEXT",
  "TIMESTAMPTZ", "BIGINT", "GENERATED", "ALWAYS", "AS", "IDENTITY", "NOW",
]);

const PATTERN =
  /(\/\/.*$|--.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(@[A-Za-z]+)|(\b\d+\b)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)/gm;

/** Tiny, dependency-free highlighter tuned for the hero code samples. */
export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;
  for (const match of line.matchAll(PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) tokens.push({ text: line.slice(cursor, index), type: "plain" });
    const [text, comment, str, annotation, num, fn, ident] = match;
    let type: TokenType = "plain";
    if (comment) type = "comment";
    else if (str) type = "string";
    else if (annotation) type = "annotation";
    else if (num) type = "number";
    else if (fn) type = KEYWORDS.has(fn) ? "keyword" : "function";
    else if (ident) type = KEYWORDS.has(ident) ? "keyword" : /^[A-Z]/.test(ident) ? "type" : "plain";
    tokens.push({ text, type });
    cursor = index + text.length;
  }
  if (cursor < line.length) tokens.push({ text: line.slice(cursor), type: "plain" });
  return tokens;
}
