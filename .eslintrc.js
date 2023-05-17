module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended'
	],
	rules: {
		'vue/multi-word-component-names': 'off',
		// indent: ['error', 4, { SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }],
		indent: ['error', 'tab'],
		'space-before-function-paren': ['error', 'never'],
		'comma-dangle': ['error', 'never'],
		semi: ['error', 'always'],
		'no-trailing-spaces': 'error'
	}
};
