```mermaid
sequenceDiagram
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    server->>browser: [{"content":"rest","date":"2023-01-08T18:11:40.606Z"},...}]
    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/notes
    server->>browser: [{...{"content":"new note","date":"2023-01-09T06:55:24.800Z"}]
```