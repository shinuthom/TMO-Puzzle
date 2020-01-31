### Task 4

Technical requirement: the server `stocks-api` should be used as a proxy
to make calls. Calls should be cached in memory to avoid querying for the
same data. If a query is not in cache we should call-through to the API.

- Server caching is achieved by using catbox-memory

- Used axios for calling external API

- All the server constants are moved to separate file

- Functions for calling external API moved to separate file for readability and maintainability

- (Updated all test cases as part of Task 1)

- (All constants are moved to separate file as part of Task 1)
