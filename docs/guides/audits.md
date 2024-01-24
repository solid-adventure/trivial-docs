<script setup>
import { useData } from 'vitepress'
const { isDark } = useData()
</script>

# Audits 

Trivial-API leverages the Audited GEM to log and monitor alterations across models. Any Create, Delete, or Update actions performed on Objects are documented within the `audits` table.

## Audits Diagram

<div>
  <img v-if="isDark" height = "300px" width = "600" src = "../assets/Audit_Diagram_Dark.svg"/>
  <img v-else height = "300px" width = "600" src = "../assets/Audit_Diagram_Light.svg" />
</div>

### Note on `user_id`:

When a user accepts an invitation to join an organization, the `user_id` field in the recorded entries in the `audit` table appears blank. This is because the Audited GEM relies on the presence of the `current_user` variable to track changes, and accepting an invitation via api call or console doesn't automatically set this variable. As a result, there is no reference for current_user, and the Audited GEM leaves the user_id as null or blank.  `current_user` is not set in any case where a user can make an API call without needing identifying `devise-tokens` or when making alterations directly through the console. It's important to note that this behavior is intentional and aligns with the `audits` design. When reviewing `audit` table records related to accepted invitations, the absence of a `user_id` is expected in these scenarios.


## Interacting with Audits via Console

The Audited GEM allows users to retrieve relevant information in regards to model changes. Here are two commands available to use.

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

## Audited GEM


More info about the audited GEM and available console commands can be found [here](https://www.rubydoc.info/gems/audited).
