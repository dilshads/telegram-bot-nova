# Contributing

* Casing: CONSTANT_NAMING, ClassNaming, functionNaming, variableNaming

I've replaced JSLint with ESLint. To global install for all your JavaScript/Node applications, run this in Command Prompt/Terminal:

`npm install -g eslint`

These are the ESLint rules found in the `.eslintrc.json` file. Some may change in the future.

```json
{
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-console": [
            "off"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
}
```

Make sure your editor is set for 4 spaces and not tabs. Notepad++ is set to tab with a spacing of 4 but not actual spaces.

Sorry if the guidelines aren't the best. I'm currently the only user working on this project.