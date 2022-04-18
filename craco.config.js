/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const CracoAlias = require('craco-alias');

module.exports = {
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				// baseUrl SHOULD be specified
				// plugin does not take it from tsconfig
				baseUrl: './src',
				tsConfigPath: './tsconfig.paths.json',
			},
		},
	],
};
