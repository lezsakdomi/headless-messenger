# Contribution guidelines

## General
- `index.js` loads all classes starting with UpperCase in this directory.
- Use camelCase where appropriate if you want your PR to be accepted...

## DOM classes
If you want to define a JS class which covers a Messenger DOM element, do the
following:

- Extend `FacebookMessengerPageElement` either directly or if you want to 
    provide an alternate parent then by extending the original parent
- Provide the basic HTML properties as class properties:
    - `parentClass` (required): Which class is allowed as DOM parent
    - `htmlNode` (required): The node name, ex. `"div"`
    - `htmlClasses`: An array of CSS classes (`[]` by default)
    - `htmlId`: Element ID, use `undefined` to disable
    - `additionalSelectors`: A string of advanced CSS selectors
    - `selector`: The CSS selector for an element to check for. Should include
        check for the parent element. Generated from all of above by default.  
        See the getter for `FacebookMessengerPageElement.selector`.
- Override the `async check(namespace: String): Boolean` method for after-match
    checking.
    - If you fetch your children do that with passing the namespace along. (
        `const children = await this.getChildren(namespace)`) This helps in
        debugging the parser.
    - Feel free to throw `ChildMatchError` errors.
    - Avoid fetching children if possible
        - TODO: Search for _`children.length === 0`_
- The parent node class dependencies shouldn't be `require`d at export time.
    Only child dependencies.  
    In other cases, use `require('./Class')` inline.
