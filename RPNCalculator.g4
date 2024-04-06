// Developed by: Bruno Sonvezzo, Elvis Claudino, Felipe Pires, Gabriel Fasolim
grammar RPNCalculator;

// Parser

file : equations EOF;  // Entry point of the grammar, expects a series of equations followed by the end of file

equations : equation+;  // Represents one or more equations

equation : LPAREN expression RPAREN;  // An equation is wrapped in parentheses and contains an expression

expression : equation  // An expression can be an equation
        | expression expression math  // Or it can be two expressions followed by a mathematical operation
        | expression MEM  // Or it can be an expression followed by a memory operation
        | NUMBER RES  // Or it can be a number followed by a result operation
        | NUMBER  // Or it can be just a number
        | MEM;  // Or it can be a memory operation

math : DIV  // Defines the division operator
        | POW  // Defines the power operator
        | PLUS  // Defines the addition operator
        | MULT  // Defines the multiplication operator
        | MINUS;  // Defines the subtraction operator


// Lexer

DIV : '/';  // Recognizes the division symbol
POW : '^';  // Recognizes the power symbol
PLUS : '+';  // Recognizes the plus symbol
MULT : '*';  // Recognizes the multiplication symbol
MINUS : '-';  // Recognizes the minus symbol
LPAREN : '(';  // Recognizes the left parenthesis symbol
RPAREN : ')';  // Recognizes the right parenthesis symbol
RES : 'RES';  // Recognizes the "RES" keyword
MEM : 'MEM';  // Recognizes the "MEM" keyword
WS: [ \t\n\r\f]+ -> skip ;  // Defines whitespace to be ignored
NUMBER : '0' .. '9'+ ('.' ('0'..'9')*)?;  // Recognizes a number, which can include a decimal part
