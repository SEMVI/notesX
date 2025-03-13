# Kanban Board

This is a kanban board created with Mermaid.

```mermaid
---
config:
  kanban:
    ticketBaseUrl: https://org.atlassian.net/browse/#TICKET#
  theme: neo-dark
---
kanban
  Todo
    [Create Documentation]
    docs[Create Blog about the new diagram]
  [In progress]
    id6[Create renderer so that it works in all cases. We also add som extra text here for testing purposes. And some more just for the extra flare.]
  id9[Ready for deploy]
    id8[Design grammar]@{ assigned: 'knsv' }
  id10[Ready for test]
    id4[Create parsing tests]@{ ticket: MC-2038, assigned: 'K.Sveidqvist', priority: 'High' }
    id66[last item]@{ priority: 'Very Low', assigned: 'knsv' }
  id11[Done]
    id5[define getData]
    id2[Title of diagram is more than 100 chars when user duplicates diagram with 100 char]@{ ticket: MC-2036, priority: 'Very High'}
    id3[Update DB function]@{ ticket: MC-2037, assigned: knsv, priority: 'High' }
  id12[Can't reproduce]
    id3[Weird flickering in Firefox]
```

## How to View This Chart

This kanban board will render automatically when viewed on GitHub. The chart uses the neo-dark theme and includes ticket links to Atlassian.

## About Mermaid Charts in GitHub

GitHub has native support for Mermaid diagrams in markdown files. Simply place your Mermaid code within a code block with the language specified as "mermaid". 