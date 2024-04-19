# Actions

Actions are code bundles that perform programming tasks, configurable via a rich user interface suitable for a novice programmer. An action is comprised of a descriptor, credential requirements, schemas, and action code.

An action directory follows a structure as follows:

```
/actions
├─ Service
│  ├─ Action
│  │ ├─ Action.js
│  │ ├─ Descriptor.js
├─ Schemas.js
```

For example, a Square/GetOrders action would be:

```
/actions
├─ Square
│  ├─ GetOrders
│  │ ├─ Action.js
│  │ ├─ Descriptor.js
├─ Schemas.js
```

### Action.js
Action.js should inherit from ActionBase and overwrite the `perform` method. This is the code that will execute when the action is included in an app.

### Descriptor.js
Descriptor.js specifies the `service`, `name`, `description`, `icon`, `expectedTypeName`, and other meta data will appear in the rule editor UI.

### Schema.js
Definitions of the fields that will be made available in the UI via the Descriptor's `expectedTypeName`, including the Vue components that should be rendered for each attribute.

### Selecting an Editor for a field
By setting the `editorComponent` and `editorOptions` on a schema attribute, we can present the user with a custom Vue component optimized for the field.


For instance, this schema produces a SQL editor for the `query` attribute:
```javascript
  module.exports.Query = schema({fields: {
    query: {
      type: String,
      required: true,
      example:"`SELECT * FROM TABLE`",
      editorComponent: 'AceEditor',
      editorOptions: {height: '300px', lang: 'sql'}}
    }})
```

If no editorComponent is set, a single-line `CodeCompletingInput` component will be used to provide simple autocompletion and JS previews.

### Creating EditorComponents
EditorComponents can be found in `/components/builderv2/transform-editors`. Clone an existing editor, and add it to `/components/builderv2/transform-editors/index.js` to make it available to your actions.

### Conditional Actions
Actions can include a condition to determine if they should be run. See [Conditional Actions](/developer-guides/conditional-actions) for more information.
