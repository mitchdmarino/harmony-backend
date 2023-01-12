## RESTful Routing Charts
----------------------------------------------------------------
### User

| Action | URL | HTTP Verb | Description | Notes |
|--------|-----|-----------|-------------|-------|
|Create|/user|POST|creates a new user||
|Show|/user/:id|GET|shows details of a specific user||
|Index|/user|GET|shows list of all users|admin only acess|
|Update|/user|PUT|edit details of one user||
|Destroy|/user/:id|DELETE|delete a specific user||

---------------------------------------------------------------------
### Couple 
| Action | URL | HTTP Verb | Description | Notes |
|--------|-----|-----------|-------------|-------|
|Create|/couple|POST|creates a new couple|when user first signs up, they'll have the option to trigger this route |
|Show|/couple/:id|GET|shows details of a specific couple| will need to populate extra fields|
|Index|/couple|GET|shows list of all couples|admin only acess|
|Update|/couple|PUT|edit details of one couple, ||
|Destroy|/user/:id|DELETE|delete a specific couple||

---------------------------------------------------------------------
### Photos (questions + goals follow similar protocol)
 | Action | URL | HTTP Verb | Description | Notes |
|--------|-----|-----------|-------------|-------|
|Create|/photo|POST|creates a new photo entry and assigns it to the couple that created it|use middleware to access coupleID|
|Show|/photo|GET|show all photos of a coupleID|use middleware to access coupleID|
|Show|/photo/:id|GET|show a specific photo||
|Destroy|/photo/:id|DELETE|Delete a specific photo||
---------------------------------------------------------------------

### NOTES
Need edit routes for Goals, questions, and conflict (to update goal completion, question answers, and conflict resolution)