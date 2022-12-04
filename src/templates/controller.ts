import { capitalize } from "../utils";

export const controller = (
  name: string
) => `import { ReactiveController, ReactiveControllerHost } from 'lit';

export class ${capitalize(name) + "Controller"} implements ReactiveController {
	host: ReactiveControllerHost
	constructor(host: ReactiveControllerHost){
		(this.host = host).addController(this);
	}
	hostConnected() {}
  hostDisconnected() {}
  hostUpdate() {}
  hostUpdated() {}
}
`;
