import { toPascalCase } from "../utils";

export const directive = (name: string, isClassBased: boolean) =>
  // prettier-ignore
  isClassBased ? `import { Directive } from 'lit/directive.js';

export class ${toPascalCase(name) + "Directive"} extends Directive {
  render() {
    return "Hello!";
  }
}
` : `const ${name + "Directive"} = () => "Hello!"`;
