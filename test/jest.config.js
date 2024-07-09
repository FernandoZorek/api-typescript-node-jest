const { resolve } = require('path');
const rootDir = resolve(__dirname, '..');
const rootConfig = require(`${rootDir}/jest.config.js`);

module.exports = {
    ...rootConfig,
    ...{
        rootDir,
        displayName: 'functional-tests',
        setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
        testMatch: ['<rootDir>/test/**/*.test.ts'],
        coverageDirectory: 'coverage/functional',
        reporters: [
            'default',
            [
                'jest-junit',
                {
                    outputDirectory: './report/jest/',
                    outputName: 'functional-report.xml',
                },
            ],
        ],
    },
};
