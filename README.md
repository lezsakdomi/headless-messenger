# Contribution guidelines

1. Be nice and respectful
2. Be useful
3. Send as much PRs as you can

## About the code

- There is the `./app.js` which handles the main workflows
- All kind of classes can be found in `./classes`
    - You better start with `FacebookMessengerPageElement` which is the base for
        all DOM element
        - Currently the `MessageListContainer` is the most important root node
    - There is a nice `./classes/index.js`. Don't use that.
- This project uses [`config`](https://npmjs.com/package/config).

## Development workflow

- Use IntelliJ IDEA if you are a student (it's free for you then :) )
- Fill the `localization.*` config values with translations in case your
    Messenger language. TODO: Use a proper method for different languages
    - You can do this in `config/local.yml`.
    - A generator is planned
- If you want to debug the DOM matching, this is the recommended command:  
    ```bash
    DEBUG='headless-messenger,headless-messenger:*' node app.js \
      --NODE_CONFIG='{"chromium":{"headless":false,"devtools":true}}' \
      2>debug.log
    ```
    
### Debugging

- Most of debug output is behind the `headless-messenger` namespace
- Recommended environment:  
    ```bash
    export DEBUG='headless-messenger,headless-messenger:*,-headless-messenger:tree:parsing:*'
    ```
- The parser sets some attributes in the headless messenger's DOM. Reveal using this in `./config/local.yml`:
    ```yaml
    chromium:
      headless: false
      devtools: true
    ```
- Also watch for chrome console output, though available under `headless-messenger:page:console` debug namespace
- You can set config variables `debug.parent`, `debug.child` to enable certain `debugger;` statements and optimize debug output

#### Workflow

1. Run in terminal and achieve a REPL and a non-headless browser
2. Redirect standard error to `./debug.log` (`2>debug.log`)
3. Issue `global.writeMessagesToTerminal().then(() => console.log("Yay, success!"), console.error)`
4. If you get your messages and/or the text _Yay, success!_ in reply, you are all good; bail out here
5. In the browser console check which trace seemed the most real  
    Let's say it's `[headless-messenger:tree:error:trace:0:trace:1:trace:1:trace:0] ChildMatchError: Unknown child of a 
    SomeOuterClass, <div some="outer" class="ish"></div>, <div some="inner" classish></div>`
6. Search for the trace namespace in the debug log (_headless-messenger:tree:error:trace:0:trace:1:trace:1:trace:0_ in our example)
7. Read the error details. Always helps.
8. Extract the associated namespace and now search for that  
    It should look like `2019-08-28T16:56:32.411Z headless-messenger:tree:error:trace:0:trace:1:trace:1:trace:0 Occurred in namespace 'f3b2:MessageListDataContainer/#0.MessageListMessagesGroup/#0.MessageListMessagesContainer/#0.MessageListMessagesGroupMessageOuterContainer/#0.MessageListMessagesGroupMessageReplyInfoOuterContainer'.`
9. Now search for the new, more internal namespace. (_f3b2:MessageListDataContainer/#0.MessageListMessagesGroup/#0.MessageListMessagesContainer/#0.MessageListMessagesGroupMessageOuterContainer/#0.MessageListMessagesGroupMessageReplyInfoOuterContainer_)
10. You should see detailed traces about why each class was rejected for each child

## Code style

- Rely on ASI
- Use trailing commas when array/object is multiline
- Use ES6 features
- Leave trailing newline
    - If someone didn't obey this rule, don't create a PR to correct it
    - Don't remove trailing newline by accident if you are just modifying a file
- Use UNIX endlines
