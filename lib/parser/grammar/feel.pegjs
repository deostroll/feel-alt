start = expression;

expression = textual_expression;

textual_expression = name 
  / literal
  / function_invocation
  / path_expression;


literal = simple_literal / "null" { return null };

simple_literal = numeric_literal / string_literal / boolean_literal; //excluding date-time-literal here...

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

function_invocation = fn:_function_invocation_expression_ params:parameters { return { type:'invocation', fn, params } };

_function_invocation_expression_ = 
  "(" _function_invocation_expression_ ")"
  /
  name
  /
  path_expression;

name = head:name_start tail:(name_part / sym:additional_name_symbols & { return test$additional_name_symbols(sym) })* & { return test$name(head, tail) } 
    { return exit$name(head, tail) }

name_start = 
  name_start_char (name_part_char)*

name_part = 
  name_part_char+;

name_start_char = 
  "?"
  /
  [A-Z]
  /
  "_"
  /
  [a-z]
  /
  [\u00C0-\u00D6]
  /
  [\u00D8-\u00F6]
  /
  [\u00F8-\u02FF]
  /
  [\u0370-\u037D]
  /
  [\u037F-\u1FFF] 
  /
  [\u200C-\u200D]
  /
  [\u2070-\u218F]
  /
  [\u2C00-\u2FEF]
  /
  [\u3001-\uD7FF]
  /
  [\uF900-\uFDCF]
  /
  [\uFDF0-\uFFFD]
  / 
  [\u10000-\uEFFFF]
  ;

name_part_char = 
  name_start_char
  /
  digit
  /
  "\u00B7"
  /
  [\u0300-\u036F]
  /
  [\u203F-\u2040]
  ;

additional_name_symbols = DOT / SLASH 
  / DASH / APOSTROPHE / PLUS
  / ASTERISK;

parameters = "(" (named_parameters / positional_parameters) ")";

named_parameters =
  (parameter_name ":" expression)+;

parameter_name = name;

positional_parameters = expression ("," expression)*;

path_expression = !{ enter$path_expression() } head:(a:name { return scopePathExpressionVariable(a) }) DOT tail:(_defaulted_name_ / _child_path_exp_) { return exit$path_expression(head, tail); };

_path_expression_ = 
  "(" _path_expression_ ")"
  /
  name;

DOT = ".";
SLASH = "/";
DASH = "-";
APOSTROPHE =  "’";
PLUS = "+";
ASTERISK = "*";

_defaulted_name_ = !{ enter$_defaulted_name_() } a:name { return exit$_defaulted_name_(a) };

// this rule is only matched in a path_expression when
// _defaulted_name_ rule match is failed.

// _child_path_exp_ = !{ /* pop out of MODE_DEFAULT */ popMode();  /* push mode to child_path_expression */ pushMode(NameResolver.MODE_CHILD_PATH_EXP); } k:path_expression  { /* pop out of child_path_expression  */ popMode(); return k };

_child_path_exp_ = !{ enter$_child_path_exp_() } k:path_expression  { return exit$_child_path_exp_(k); };
