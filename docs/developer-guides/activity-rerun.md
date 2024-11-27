# Rerunning Activity

## Overview

After contract logic or pricing has changed, you may want to rerun activity to calculate the new results.

### Requirements
- Admin user privelages
- Kafka

### Effects
**Rerunning activity:**
- Deletes register items created by the contract after the given cutoff date, provided they are not included on an invoice
- Schedules activity entries after cutoff to be rerun
- Determines which contract is now in effect for the event
- Applies the contract logic, creating new register items as appropriate
- Replaces the diagnostics on the activity entry with the new run and attaches the rerun ID

**Rerunning does not:**
- Rerun activity where activity entries older than the auto-deletion (45 days by default)
- Modify or delete register items that have already been invoiced
- Modify or delete registers items before the cutoff date, regardless of their invoice status
- Modify or delete registers items created via the UI
- Preserve changes to register items created by a contract and edited in the UI
- Capture activity that was not associated with a contract in the original processing (e.g., if customer tags did not exist)

### Known risks
- Report caches will be out of date after a rerun. Re-start containers to refresh the cache.
- The sequence of rerun events is guaranteed inside the rerun, as are new events being added to the stream, the two sources are _not_ merged into a single sequence. For this reason, avoiding reruns during working hours will reduce timeline issues, such as a ship-void-ship that occurs while the rerun is in process.

### Usage
The rerun feature is available via an unlinked URL, following the pattern:
`https://<trivial-url>/apps/<public-app-id>/rerun`

For example:
`https://www.staging.trivialapps.io/apps/31256104a409d1/rerun`

On this page, you can select a cutoff date and trigger a rerun. You'll see a randomly generate run ID, which can be used for tracing and will appear on the activity entries after they've been reprocessed.

```shell
Rerun 906866, Rerun started
Rerun 906866, Register items batch deleted. batch_count: 1, total_count: 1
Rerun 906866, Activities batch queued. count=7
```

:::warning
The task shows as completed when register items have been deleted and activity entries have been added to the Kafka stream. The results of when the Kafka stream has finished re-processing is not available.
:::

:::tip
The register item deletion and re-streaming are run inside a transaction. Any failure at this stage rolls back all changes, and the register items and activity entries are left untouched.
:::