# Search

Trivial's search syntax is used across models to filter and sort data. Here's how you can use it with Register Items.

<!-- Targetting JSON column types -->

### Creating a search

To search Register Items, you can use the `register_id` &amp; `search` query parameters. The `search` parameter accepts a JSON array of objects with keys "c", "o", and "p". These stand for Column, Operator, and Predicate, respectively.


```javascript

// Build the search array
  let search = [
    {
      "c": "customer_id", // The column to search
      "o": "=", // The comparison operator, e.g., >, <, =, !=, IS NULL, IS NOT NULL, etc
      "p": `${customer_id}`,  // The text to search for
    }
  ]
// Convert the search JSON to a string
let searchParam = JSON.stringify(search);

// A register ID is not required, but is generally a helpful scope
let register_id = 1;

// Append the search parameter to the URL
let url = `http://localhost:3000/register_items?register_id=${register_id}&${searchParam}`;

```

### Searching Date Columns

Searching by a date column works the same way, but we often want to provide a range by stacking filters.

```javascript
  // Build the search array. Filters are stackable, these filters will return results from 6/1/2024

let search = [
  {
    "c": "originated_at",
    "o": ">", // Return results after this datetime
    "p": "2024-06-01T00:04:00.000Z" // First moment of 6/1/2024, Eastern Standard Time (4 hours behind UTC)
  },
  {
    "c": "originated_at",
    "o": "<", // And before this
    "p": "2024-06-02T00:03:59.000Z" // Last moment of 6/1/24, Eastern Standard Time
  }
];
```

### Operators
The full list of operators is as follows:

```text
>
<
=
!=
>=
<=
IS NULL
IS NOT NULL
IS TRUE
IS FALSE
```

TODO: Is this the actual list?


### Getting a list of searchable columns

TODO: How to get a list of searchable columns

