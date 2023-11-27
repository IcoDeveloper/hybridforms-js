module.exports = {
    env: {
        browser: false,
        es6: true,
        node: true,
        mocha: true
    },
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            extends: ['standard-with-typescript', 'prettier'],
            parserOptions: {
                project: './tsconfig.spec.json'
            },
            rules: {
                '@typescript-eslint/strict-boolean-expressions': 'off',
                eqeqeq: ['error', 'always']
            }
        }
    ]
}
