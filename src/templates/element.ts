/**
 * lit element template
 *
 * @author John Clark
 */

import { isTwoWords, toPascalCase } from "../utils";

export const element = (
  name: string
) => `import { LitElement, html, css } from 'lit';
import { customElement } from "lit/decorators.js";

@customElement("${name + (isTwoWords(name) ? "" : "-element")}")
export class ${toPascalCase(name) + "Element"} extends LitElement {
	static styles = css\`
		:host {
			text-align: center;
		}
	\`
	render(){
		return html\`
			<div>Hello World</div>
		\`
	}
}
`;
