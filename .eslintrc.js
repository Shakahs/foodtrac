module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "jest"
    ],
    "env": {
        "browser": true,
        "node": true,
        "jest/globals": true
    },
    "rules": {
        "no-underscore-dangle": [2, { "allowAfterThis": true, allow: ["_*"] }],
        "class-methods-use-this": 0,
        "no-static-element-interactions": 0,
        "no-plusplus": 0,
        "react/require-default-props": 0,
    }
};