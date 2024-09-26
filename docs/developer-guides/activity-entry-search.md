# ActivityEntry Search

Trivial `ActivityEntries` provide a log of activity related to builds and events that are executed by a specific `App` within the software. Often, it's helpful to filter this activity log when searching for specific information, so Trivial provides a tool for you to create filters based on the data it finds in the logs.

## Search Filters

### Filters

The `Filters` dropdown allows you to select the field of the entry you would like to match against. These fields are pulled from a combination of data internal to the `payload` of the entry as well as some fields on the entry itself, for example `status` and `register_item_id`.

:::code-group
``` [Example Entry Data] json
entry = {
  id: 1,
  app_id: "1a2b3c",
  register_item_id: 1,
  payload: {
    event_name: "example_event",
    key: "example_event_1_2024",
    example_event: {
      id: 123,
      customer_id: 321,
      created_at: 1-1-2024,
    }
  },
  status: "200"
}
```
``` [Example Filters List] json
["register_item_id", "event_name", "key", "example_event", "status"]
```
:::

When searching on data internal to the entry's `payload` you will be additionally provided with secondary keys that are nested within the `payload` object. This allows you to filter on those values as well.


:::code-group
``` [Example Entry Data] json
entry = {
  id: 1,
  app_id: "1a2b3c",
  register_item_id: 1,
  payload: {
    event_name: "example_event",
    key: "example_event_1_2024",
    example_event: {
      id: 123,
      customer_id: 321,
      created_at: 1-1-2024,
    }
  },
  status: "200"
}
```
``` [Example Secondary Filters List] json
{ example_event: ["id", "customer_id", "created_at"] }
```
:::

:::tip
For new contracts, or contracts with a new type of event, the primary and secondary filter lists may be empty.

This is because the API does not automatically extract key data from the `payload` portion of new entries.

To manually refresh the filter lists and see any new keys you should make the following call either via `curl` or the browser console:
```
POST /activity_entries/keys?col=payload
```
:::

### Matches

The "Matches" dropdown allows you to choose a comparison operator for the selected field. These operators determine how the selected field's value will be compared to the value you provide in the "Value" textbox. Here are the available operators:

- `=`: Equal to
- `!=` and `<>`: Not equal to
- `<`: Less than
- `>`: Greater than
- `<=`: Less than or equal to
- `>=`: Greater than or equal to
- `IS NULL`: The field is empty or not present
- `IS NOT NULL`: The field is populated with a non-null value
- `IS TRUE`: The field's value is truthy (useful for booleans)
- `IS FALSE`: The field's value is falsey (useful for booleans)

Select an operator based on the type of comparison you want to make for the field you chose.

### Values

The "Value" textbox allows you to specify the exact value you want the selected field to match against.

:::info
For some match operators this box will be removed because the match test isn't against a specific value (i.e. `IS NULL`, `IS NOT NULL`, `IS TRUE`, or `IS FALSE`).
:::

In most cases, one can provide values depending on the field type and the selected matching operator, values might include:

- A number (e.g., `123` for `example.id`)
- A string (e.g., `"example_event_1_2024"` for `key`)
- A date (e.g., `"2024-01-01"` for `created_at`)

Make sure to enter the value in the correct format. For nested fields, provide the value for the key that appears in the secondary filter list.

## Using the Search

After setting your filter, match, and value, click "Add Filter" to validate and add the filter to the active filters list. You can continue adding as many filters as needed to narrow your search. The resulting query will be applied to the activity log, displaying only the entries that meet **all** active filter criteria.

By using combinations of filters, matches, and values, you can efficiently locate specific activity logs based on a wide variety of metadata fields in the `ActivityEntry` table.
