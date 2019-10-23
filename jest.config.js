module.exports = {
    // This configuration is used to defeat the problem:
    //  Jest-haste-map: @providesModule naming collision:
    //   Duplicate module name: @eigenspace/web-package-starter
    //   Paths: /Users/dsitdikov/Projects/web-package-starter/package.json
    //  Collides with /Users/dsitdikov/Projects/web-package-starter/dist/package.json
    //  This warning is caused by a @providesModule declaration with the same name across two different files.
    modulePathIgnorePatterns: [
        '<rootDir>/dist/'
    ],
    globals: {
        'ts-jest': { tsConfig: 'tsconfig.spec.json' }
    },
    testMatch: [
        '<rootDir>/src/**/*.spec.(ts|tsx)'
    ],
    moduleFileExtensions: [
        'web.ts',
        'ts',
        'tsx',
        'web.js',
        'js',
        'json',
        'node'
    ],
    transform: {
        '^(?!.*\\.(js|ts|tsx|css|json)$)': '<rootDir>/config/jest/transform/file.transform.js',
        '^.+\\.tsx?$': '<rootDir>/config/jest/transform/typescript.transform.js'
    }
};