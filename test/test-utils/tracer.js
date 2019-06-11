function repeat(text, count) {
  return text.repeat(count);
}

function pad(string, length) {
  return string + repeat(" ", length - string.length);
}

class Tracer {

  constructor(input) {
      this.indentLevel = 0;
      this.result = {};
      this.result.input = input;
      this.result.obj = [];
  }

  log(event) {
      event.indentLevel = this.indentLevel;
      let displayString = event.location.start.line + ':' + event.location.start.column
          + '-' + event.location.end.line + ':' + event.location.end.column
          + " "
        + pad(event.type, 10) + " "
          + repeat("  ", this.indentLevel) + event.rule;
      console.log(displayString);
      this.result.obj.push(event);
  }

  trace(event) {
      switch (event.type) {
          case "rule.enter":
              this.log(event);
              this.indentLevel++;
              break;
          case "rule.match":
              this.indentLevel--;
              this.log(event);
              break;
          case "rule.fail":
              this.indentLevel--;
              this.log(event);
              break;
          default:
              throw new Error(`Invalid event type: $event.type`)
      }
  }

  getResult() {
      return this.result;
  }
}

const NoopTracer = {
    trace: function(){}
};

module.exports = {
  Tracer,
  NoopTracer
}