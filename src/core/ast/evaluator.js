module.exports = function evaluate(ast, scope) {
  let processAst = ast => {
    switch(ast.type) {
      case 'string':
        return Promise.resolve(ast.value);
      
      default:
        return Promise.reject(`Could not process node with type: ${ast.type}`)
    }
  };

  return processAst(ast);
}

