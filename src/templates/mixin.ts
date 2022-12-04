/**
 * Note: The creator doesn't know about mixins yet, so this may be a wip or some of you can contribute.
 */
export const mixin = `const NameMixin = (superClass: any) => class extends superClass {
	constructor(){
		super();
		console.log("Hello name mixin");
	}
};
`;
