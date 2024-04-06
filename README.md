
# Ci-Calc-Antrl


## References

 - [ANTRL4TS](https://github.com/tunnelvisionlabs/antlr4ts)
 

## Autores

- [Bruno Sonvezzo](https://github.com/Showvezzo)
- [Elvis Claudino](https://www.github.com/elvisclaudino)
- [Felipe Pires](https://github.com/nsx07)
- [Gabriel Fasolim](https://github.com/GabrielFasolim)


## Setup

#### Requirements 
* JAVA Runtime Environments 1.6+
```cmd
$ npm install
$ npm start
```
### Parser
#### 
The parser's primary function is to take the sequence of tokens produced by the lexer and build a syntax tree based on the grammar rules. This syntax tree represents the structure of the input expression. In the context of the RPN calculator, the parser's role is to interpret this syntax tree to correctly evaluate the mathematical expression in Reverse Polish Notation.

```antrl
grammar RPNCalculator;


file : equations EOF;

equations : equation+;

equation : LPAREN expression RPAREN;

expression : equation 
        | expression expression math
        | expression MEM
        | NUMBER RES
        | NUMBER
        | MEM;

math : DIV 
        | POW 
        | PLUS 
        | MULT 
        | MINUS;

```

### Lexer

The lexer's primary function is to take the input text and break it down into individual tokens according to the defined rules. In the context of the RPN calculator, the lexer's role is to tokenize the input expression, identifying numbers, operators, parentheses, and other elements that make up the expression.
```antrl
DIV : '/';
POW : '^';
PLUS : '+';
MULT : '*';
MINUS : '-';
LPAREN : '(';
RPAREN : ')';
RES : 'RES';
MEM : 'MEM';
WS: [ \t\n\r\f]+ -> skip ;
NUMBER : '0' .. '9'+ ('.' ('0'..'9')*)?;
```


#### First Test
```cmd
(2.5 3.5 +)
((3 4 -) (5 6 +) *)
(10 2 /)
(1.5 2.5 +)
(MEM (4.0 2.0 /) *)
(3.0 (4.0 (5.0 2.0 *) -) /)
(RES 2)
(8.0 2.0 ^)
(2.0 (3.0 (4.0 (5.0 2.0 *) -) /) *)
```


![image](https://github.com/GabrielFasolim/ci-calc-antlr/assets/95487111/a5b5198f-c0eb-48b3-be83-05b5a3f00022)

![image](https://github.com/GabrielFasolim/ci-calc-antlr/assets/95487111/aaaba2c6-7da9-4779-930e-5bf9dc1c186c)


#### Second Test


```cmd
(1 8 +)
(2 3 *)
(1 2 ^)
(33 MEM)
((1 1 *) (1 2 +) /)
(1 6 *)
(3.1 (4.0 5.1 -) +)
((1 RES) MEM)
((1 (1 RES) ^) (2 2 *) +)
```

![image](https://github.com/GabrielFasolim/ci-calc-antlr/assets/95487111/8a8b9916-28f9-4428-9b93-9367cee7b214)

![image](https://github.com/GabrielFasolim/ci-calc-antlr/assets/95487111/48cf9178-2704-4c0f-8a9f-2d82de756ecc)


#### Third Test


```cmd
((6.5 8.5 +) (14 15 +) *)
(8 4 /)
(MEM (3.0 4.5 /) *)
(3.0 4.0 +)
(2.0 (9.0 (11.0 3.0 *) -) /)
(RES 6)
(2.0 4.0 ^)
(3.0 (2.0 (9.0 (11.0 3.0 *) -) /) +)

```


![image](https://github.com/GabrielFasolim/ci-calc-antlr/assets/95487111/46dfe507-ea92-40a6-95cd-3216b6cdc83e)


![image](https://github.com/GabrielFasolim/ci-calc-antlr/assets/95487111/2e55e26b-bbb7-4f09-a011-a2182ae918b6)








