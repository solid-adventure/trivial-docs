---
outline: deep
---

# App Tags Guide
Trivial apps can have *tags* assigned to them to distinguish specific properties and enable robust app filtering. 

Tags are made up of a `context` and a `value` pairing. An example tag would be `{currency: "USD"}`, where `currency` is the tag's context and `"USD"` is the tag's value.

Adding tags to apps lets you filter responses from the Trivial API.

## Assigning Tags to Apps

On the command line, run the following from inside of the `trivial-api` directory to get the Ruby on Rails console started: 
```
bundle exec rails c
```

Now, using the Rails console, store the app instance you'd like to add a tag to in a variable. For example, storing an existing app whose `id` is `55` in a variable named `appInstance` looks like:
```
appInstance = App.find_by id: 55
```
In the console, you can now access the `addTag!` and `removeTag!` methods through your app variable.
The following adds the `{currency: "USD"}` tag to the `appInstance` app:
```
appInstance.addTag!(:currency, 'USD')
```

Tags can also be removed:
```
appInstance.removeTag!(:currency, 'USD')
```
:::tip
A single Trivial app can support multiple tags, but they should be added (or removed) individually and not in batches.
:::

## Filtering Apps with Tags

By including the `tagged_with` query parameter, we can filter the response from `apps/index` to only include apps with certain tags.

Assuming the API is running on port 3000:
```json
const url = new URL('apps/', 'http:localhost:3000/')
const query = {
      tagged_with: JSON.stringify([
        {currency: "USD"},
        {colors: "red"}
      ])
    }
const search = new URLSearchParams(query)
url.search = search.toString()

url.href
// 'http://localhost:3000/apps/?tagged_with=%5B%7B%22currency%22%3A%22USD%22%7D%2C%7B%22colors%22%3A%22red%22%7D%5D'
```

This call will return an array of apps with matching tags like so: 
```json
data: [
  {
    "id": 55,
    "name": "ba6811fb3e073d",
    "descriptive_name": "All apps matching all tags provided",
    "hostname": "ba6811fb3e073d"...
```