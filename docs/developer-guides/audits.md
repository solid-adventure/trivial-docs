<script setup>
import { useData } from 'vitepress'
const { isDark } = useData()
</script>

# Audits 

Trivial-API leverages the [Audited gem](https://github.com/collectiveidea/audited) to log and monitor alterations across models. These alterations are logged into a dedicated `audits` table.

## Audits Overview

### Actions Tracked
Any `Create`, `Delete`, or `Update` actions performed on objects from the models tracked are documented within the audits table.

### Models Tracked
Changes made to objects with the following models are monitored:
- **App**
- **Credential Sets**
- **Manifest**
- **Manifest Draft**
- **Organization**
- **Org Role**
- **Permission**
- **Tags**
- **User**

### Models Not Tracked
Changes made to objects within an activity entry model are not monitored.

### Note on `user_id`:

The `user_id` column in each audit entry provides information about the user responsible for a change. This column is populated when a user signs in and is typically filled in for all audit entries. However, there's a specific scenario where the `user_id` is left blank – when a user accepts an invitation. This behavior is expected as accepting an invitation doesn't require a user to sign in or undergo authentication.

**To identify the `user_id` of an accepted invitation:**

1. Look for audit entries with `auditable_type` column set to `OrgRole` and `action` column set to `create`. These entries indicate the acceptance of an invitation.
2. Once you've located the entry related to invitation acceptance, access the `audited_changes` column. Within this column, you'll find the `user_id` of the individual who accepted the invitation.


## Interacting with Audits via Console

The Audited gem allows users to retrieve relevant information in regards to model changes. Here are two commands available to use.

::: tip
To access the console, type the following: `bundle exec rails c`
:::

::: code-group
``` [Command]
user = User.find(1)
user.audits.last
user.audits.count
```

``` [Response]
=> #<User id: 1, provider: "email", uid: "admin@email.com", name: "admin", email: "admin@email.com", created_at: "2023-12-18 20:54:50.043892000 +0000", updated_at: "2024-01-22 19...
=>                                                                                     
#<Audited::Audit:0x00000001132744f8                                                    
 id: 184,                                                                              
 auditable_id: 1,                                                                      
 auditable_type: "User",                                                               
 associated_id: nil,                                                                   
 associated_type: nil,                                                                 
 user_id: 1,                                                                           
 user_type: "User",                                                                    
 username: nil,                                                                        
 action: "update",                                                                     
 audited_changes: {"tokens"=>"[FILTERED]"},                                            
 version: 16,                                                                          
 comment: nil,
 remote_address: "127.0.0.1",
 request_uuid: "c331612d-25c7-4c4b-b783-cf84e4715146",
 created_at: Mon, 22 Jan 2024 19:54:23.916760000 UTC +00:00>
 => 16
```
:::