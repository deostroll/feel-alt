expression = textual_expression;

textual_expression = literal;

literal = simple_literal / "null" { return null };

simple_literal = numeric_literal / string_literal / boolean_literal;

numeric_literal = "-"? (digits ("." digits)? / "." digits) { return { type: 'number', value: parseFloat(text()) }};

digits = digit+;

digit = [0-9];

string_literal = '"' chars:(_allowed_chars_ / seq:string_escape_sequence { return seq })* '"' { return { type: 'string' , value: chars.join('') } };

_allowed_chars_ = !('"' / vertical_space) . { return text() }

vertical_space = [\u000A-\u000D];

string_escape_sequence = "\\" (
  "'" 
  / "\"" 
  / "\\" 
  / "n" { return "\n" } 
  / "r" { return "\r" }
  / "t" { return "\t" }
  / "u" a:hex_digit b:hex_digit c:hex_digit d:hex_digit { return String.fromCodePoint( "0x" + a + b + c + d ) }
  );

hex_digit = [0-9a-fA-F];

 boolean_literal = "true" { return { type: 'boolean', value: true }}
  / "false" { return { type: 'boolean', value: false }};