export type KotlinTokenType =
    | 'keyword'
    | 'annotation'
    | 'string'
    | 'comment'
    | 'type'
    | 'number'
    | 'plain';

export interface KotlinToken {
    text: string;
    type: KotlinTokenType;
}

const KEYWORDS = new Set([
    'as', 'break', 'class', 'continue', 'do', 'else', 'false', 'for', 'fun',
    'if', 'in', 'interface', 'is', 'null', 'object', 'package', 'return',
    'super', 'this', 'throw', 'true', 'try', 'typealias', 'val', 'var',
    'when', 'while', 'by', 'catch', 'constructor', 'finally', 'get', 'import',
    'init', 'set', 'where', 'abstract', 'actual', 'annotation', 'companion',
    'const', 'crossinline', 'data', 'enum', 'expect', 'external', 'final',
    'infix', 'inline', 'inner', 'internal', 'it', 'lateinit', 'noinline',
    'open', 'operator', 'out', 'override', 'private', 'protected', 'public',
    'reified', 'sealed', 'suspend', 'tailrec', 'vararg',
]);

// Alternation order matters: longer/more-specific patterns must come first.
const TOKEN_RE =
    /\/\/[^\n]*|\/\*[\s\S]*?\*\/|"""[\s\S]*?"""|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|@[A-Za-z_]\w*|\d[\d_]*(?:\.\d[\d_]*)?[LFf]?|[A-Za-z_]\w*|[\s\S]/g;

export function tokenizeKotlin(code: string): KotlinToken[] {
    const tokens: KotlinToken[] = [];
    TOKEN_RE.lastIndex = 0;

    let m: RegExpExecArray | null;
    while ((m = TOKEN_RE.exec(code)) !== null) {
        const text = m[0];
        let type: KotlinTokenType = 'plain';

        if (text.startsWith('//') || text.startsWith('/*')) {
            type = 'comment';
        } else if (text.startsWith('"') || text.startsWith("'")) {
            type = 'string';
        } else if (text.startsWith('@')) {
            type = 'annotation';
        } else if (/^\d/.test(text)) {
            type = 'number';
        } else if (/^[A-Za-z_]\w*$/.test(text)) {
            if (KEYWORDS.has(text)) type = 'keyword';
            else if (/^[A-Z]/.test(text)) type = 'type';
        }

        tokens.push({ text, type });
    }

    return tokens;
}
