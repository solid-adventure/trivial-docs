# How Trivial Works

Trivial sits between your sales platforms and your accounting system, and automates the process of entering sales data into your accounting system.



<div align = "center">
  <img height = "400" width = "800" src = "../assets/sales-etl.png" />
</div>

There are 3 steps:

## 1. Import
You can either manually upload a file, or connect your sales platforms to Trivial. Trivial will then import your sales data. During the import, you can specify which fields Trivial should store, typically a focused subset of all available fields for easy debugging.

If you import a CSV from the same source regularly, it's easy to create a template that will automatically map the fields for you.


## 2. Verify
After importing, you can verify that the data is correct. Trivial will show you the imported data, and you can make any necessary adjustments. This is especially useful if you're importing a new file format, or if you're importing data from a new source.

This step is very helpful to search through transactions for special edges like refunds, discounts, and uncommon tax treatments.

## 3. Export
Once you're satisfied with the data, you can export it to your accounting system. Trivial will connect to your accounting system and push the data in. You can also schedule exports to happen automatically as sales come in, or aggregated daily, weekly, or monthly.
