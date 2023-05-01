module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"prettier"
		// 'plugin:prettier/recommended'
	],
	rules: {
		"vue/multi-word-component-names": "off"
	}
};
