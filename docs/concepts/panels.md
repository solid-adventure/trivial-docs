# Panels

Panels are Vue components that render inside a dashboard container. During render, they automically fetch data from the Trivial app of their same name.


### Creating Panels
1. Copy /source/components/PanelTemplate.vue into a new file in `/source/components/panels/`. We'll call our new panel `SpacedGrid.vue`

::: tip
TODO: Create PanelTemplate.vue
:::

2. In the `handleResponse` method, update the list of attributes the panel should ingest from the response body. Here we're expecting `names` and `rows` attributes:
:
```javascript
let r = response.body
this.names = r.names
this.rows = r.rows
```

The full method might look like:

```javascript
handleResponse(response) {
  if (response.statusCode >= 400) {
    this.errors = response.body
  } else {
    try {
      let r = response.body
      this.names = r.names
      this.rows = r.rows
    } catch (error) {
      this.errors = error
    }
  }
}
```

3. Import the new file into `/source/components/Dashboard.vue` and add it to the list of components:

```javascript
import SpacedGrid from './SpacedGrid.vue'

components: {
  //  Panels
  LineChart,
  SpacedGrid, // <------ Our new panel
  StackedBarChart,
  TableView,
}


```

4. In `/source/components/panels/AppPanel.js`, add your panel to the registry with a display name. This will allow your panel to be selected from the UI when building a dashboard.
```javascript
{display_name: "Spaced Grid", name: "SpacedGrid"},
```

::: info
You can specify custom behavior for your panel here by defining methods prefixed with your panel name, e.g., SpacedGridAfterAdd, SpacedGridDefaultOptions, or SpacedGridAfterCreatePath
:::

At this point, you should be able to add your new Panel to the dashboard and edit the template code in the SpacedGrid.vue to suit your needs.

Next, we'll create an action for our panel to make it easier to send the correct format.

6. Copy `/source/lib/actions/Panel/Template`, with the contents, as SpacedGrid.

7. Update the class names in Action.js and Descriptor.js to match your new panel type.

8. In `/source/lib/actions/Panel/Schemas.js`, add an entry describing the fields your panel expects, e.g.,

```javascript
module.exports.SpacedGrid = schema({fields: {
  rows: {type: arrayOf(Array), required: true, example: `[[1,2,3], ['a', 'b', 'c']]`},
  columnNames: {type: arrayOf(String), required: true, example: `['Col1', 'Col2', 'Col3']`}
  }})
````

