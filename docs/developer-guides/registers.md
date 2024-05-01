# Registers

Registers are a way to store and manage data in a structured way. They are like tables in a database, tailored for use in finance operations. Registers are used to store data that is gathered from multiple sources, and can be used as the basis for reports, dashboards, and exporting transformed data to other platforms.

Registers can be configured to transform data, prevent duplicates, enforce data validation rules, and provide a user-friendly interface for validating, adding, editing, and deleting data.

Finally, registers can be scheduled to export data to external systems, such as accounting software, on a regular basis. As such, registers and register items (the rows in a register) are the atomic unit of data management in Trivial.



### Creating a Register

You can create a register with a POST call to the `/registers` endpoint. The body of the request should contain the name of the register, and the columns that the register should have.

Registers have `amount`, `description`, and `units` columns by default, so we only need to specify additional columns we plan to attach to the items. The meta columns we create are indexes in the database, and can be used to save data we'll want to split into groups later for reporting. Examples might include originating store, location, product category, etc. Meta columns are designed to leverage highly perfomant database queries, in order to support large datasets.

```json
{
  "name": "Income Account",
  "owner_type": "Organization", // "User" can also be used
  "owner_id": 1, // The Organization or User ID
  "units": "USD",
  "meta": {
    "meta0": "channel"
  }
}

```


### Adding Items to a Register
You can add items to a register with a POST call to the `/register_items/?register_id=:register_id` endpoint. The body of the request should contain the data for the item you want to add to the register.

The meta columns can be sent directly by their name:

```json
{
  "amount": 100.0, // The amount of the transaction, e.g, $100.00 USD
  "units": "USD", // Must match the currency of the register
  "description": "Order #1234, Line Item #1", // Human-readable description
  "channel": "Shopify" // "channel" is this register's alias for meta0
}

```

### Preventing duplicates
For accurate bookkeeping, it's important to adopt a strategy for preventing duplicate entries. Without a well-reasoned uniqueness key, re-running an importer would result in duplicate entries.

On the other hand, with a well-reasoned uniqueness key, you can re-run an importer and it will only add missing items to the register, knowing that the importer will not create duplicates.

```json
// If this key is already in the register, the item will not be added
{
  "amount": 100.0,
  "unique_key": "Shopify-Item-5678",
  "units": "USD",
  "description": "Order #1234, Line Item #1",
}

```

::: tip
It may be tempting to defeat the uniquess key by generating a random large number, or using a timestamp. <strong>Don't do it.</strong> The uniqueness key should be a value that is meaningful to the business, and that can be used to identify the transaction in the source system.

It's there for your protection.
:::

### Setting the transaction date
Register Items have `created_at` and `updated_at` columns that are managed automatically. These are helpful for auditing, but because the import time may be different that the transaction time, we typically want to send the transaction date specifically.

To do that, we can send an `originated_at` value, formatted as an ISO 8601 string.

```json
{
  "amount": 100.0,
  "originated_at": "2024-04-18T00:00:00+0700", // UTC or local time + offset
  "units": "USD",
  "description": "Order #1234",
  "channel": "Shopify"
}

```

<!--
### Editing Data in a Register

### Deleting Data from a Register

### Sorting Data in a Register -->

<!-- ### Searching Data in a Register
Registers are searchable using stackable filters. Filters are applied to the register items, and can be used to find specific items based on the values in the columns.


```json
TODO This is a separate topic, and should have a simple example and then link to the main search page

{}

```
 -->
<!-- ### Paginating Data in a Register -->

### Exporting from Registers

::: warning

This feature is not yet implemented.
:::

Registers can be configured to export to external systems, such as accounting software, on a regular basis. This is done by creating an Exporter, which can be run manually or scheduled to run at a specified interval.

The Exporter will take data from a register, transform it as needed, and send it to the external system. The data can be transformed using a Trivial app to customized and format the data for the destination.


```json
{
  "name": "Export to Quickbooks", // Human readable name
  "register_id": 1, // The ID of the register to export
  "schedule": "0 0 * * *", // Run at midnight every day
  "app_id": 1, // The ID of the transformation app to use
  "integration_id": 1, // The ID of the external system to export to
  "enabled": true,
}

```

