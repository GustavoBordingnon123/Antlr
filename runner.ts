// Developed by: Bruno Sonvezzo, Elvis Claudino, Felipe Pires, Gabriel Fasolim

import { CharStreams, CommonTokenStream } from "antlr4ts";
import { RPNCalculatorParser } from "./generated/RPNCalculatorParser";
import { RPNCalculatorLexer } from "./generated/RPNCalculatorLexer";
import * as fs from "fs";

// function printParseTree(tree: any, depth: number = 0) {
//     const indent = "    ".repeat(depth);
//     if (tree.children) {
//         console.log(`${indent}${tree.constructor.name}: ${tree.text}`);
//         for (const child of tree.children) {
//             printParseTree(child, depth + 1);
//         }
//     } else {
//         console.log(`${indent}${tree.constructor.name}: ${tree.text}`);
//     }
// }

function printParseTreeDetailed(tree: any, depth: number = 0, parentIndent: string = "") {
    const indent = "    ".repeat(depth);
    const currentIndent = parentIndent + indent;
    if (tree.children) {
        console.log(`${currentIndent}${tree.constructor.name}:`);
        for (let i = 0; i < tree.children.length; i++) {
            const isLast = i === tree.children.length - 1;
            const child = tree.children[i];
            const childIndent = isLast ? "└── " : "├── ";
            if (child.children && child.children.length > 0) {
                console.log(`${currentIndent}${childIndent}${child.constructor.name}:`);
                printParseTreeDetailed(child, depth + 1, currentIndent + (isLast ? "    " : "│   "));
            } else {
                console.log(`${currentIndent}${childIndent}${child.constructor.name}: ${child.text}`);
            }
        }
    } else {
        console.log(`${currentIndent}${tree.constructor.name}: ${tree.text}`);
    }
}


// Read the contents of the "EXAMPLE.txt" file
const code = fs.readFileSync("EXAMPLE.txt", "utf8");

// Create an input stream of characters from the code
const inputStream = CharStreams.fromString(code);

// Create a lexer that reads from the input stream
const lexer = new RPNCalculatorLexer(inputStream);

// Create a token stream from the lexer
const tokenStream = new CommonTokenStream(lexer);

// Create a parser that reads from the token stream
const parser = new RPNCalculatorParser(tokenStream);

// Parse the input and generate the parse tree
const tree = parser.file();

// Print the parse tree
printParseTreeDetailed(tree);
