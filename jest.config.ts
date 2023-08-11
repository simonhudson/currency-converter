import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
	},
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/test/jestsetup.ts'],
};

export default jestConfig;
