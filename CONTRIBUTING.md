# Contributing Guidelines

## Posting an Issue

Any improvements or suggestions are welcome. When posting about a code problem be sure, if possible, to give a small code sample to help explain the problem.

Be sure to search if the issue already exists first before posting.

To avoid making a huge tree of dependencies. This module will only be using Node's built-in core modules.

---

## Contributing a Poll

It's recommended to post an issue first about it before contributing a poll.

### Coding Rules

* Method and variable declaration has to be in alphabetical order. Only time this is excluded for variables is if it shortens and avoids writing unnecessary code.

### Coding Style

The following coding style must be used: [Standard](https://standardjs.com)

Ignoring errors is allowed only if necessary. Say if ignoring the rule will prevent typing more code than needed.

### Deprecated Code Use

Not allowed.

### JSDoc Rules

* Use lowercase for primitive types (e.g. boolean, null, number, string, symbol, undefined) and use pascalcase for non-primitive (e.g. Error). The casing should not cause any issues with JSDoc but apparently it does when documenting callback functions. Example: `@param {function(Error):void} callback - If no error occurs, null is provided instead.` Visual Basic Code will provide "arg0: any" with "error", however "arg0: Error" with "Error".

* Object arguments have to be in this format.

```javascript
/**
 * Example
 * @param {object} settings
 * @param {number} settings.prop1
 * @param {string} settings.prop2
 */
someMethod(settings) {
  // Some code...
}
```