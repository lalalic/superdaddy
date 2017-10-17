/**
 * @flow
 * @relayHash 80a6a5aaa21486e0c25cf5a3a2927ed0
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type src_childComments_QueryResponse = {| |};
*/


/*
query src_childComments_Query(
  $parent: ObjectID!
  $count: Int = 10
  $cursor: JSON
) {
  ...src_childComments
}

fragment src_childComments on Query {
  comments: child_comments(parent: $parent, last: $count, before: $cursor) {
    edges {
      node {
        __typename
        id
        content
        type
        createdAt
        author {
          id
          name
          photo
        }
        isOwner
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      startCursor
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "parent",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "count",
        "type": "Int",
        "defaultValue": 10
      },
      {
        "kind": "LocalArgument",
        "name": "cursor",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "src_childComments_Query",
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "src_childComments",
        "args": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "src_childComments_Query",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "parent",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "count",
        "type": "Int",
        "defaultValue": 10
      },
      {
        "kind": "LocalArgument",
        "name": "cursor",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "src_childComments_Query",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "comments",
        "args": [
          {
            "kind": "Variable",
            "name": "before",
            "variableName": "cursor",
            "type": "JSON"
          },
          {
            "kind": "Variable",
            "name": "last",
            "variableName": "count",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "parent",
            "variableName": "parent",
            "type": "ObjectID"
          }
        ],
        "concreteType": "ChildCommentConnection",
        "name": "child_comments",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "ChildCommentEdge",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ChildComment",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "content",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "type",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "createdAt",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "name": "author",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "photo",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "isOwner",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "hasPreviousPage",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "startCursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "LinkedHandle",
        "alias": "comments",
        "args": [
          {
            "kind": "Variable",
            "name": "before",
            "variableName": "cursor",
            "type": "JSON"
          },
          {
            "kind": "Variable",
            "name": "last",
            "variableName": "count",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "parent",
            "variableName": "parent",
            "type": "ObjectID"
          }
        ],
        "handle": "connection",
        "name": "child_comments",
        "key": "child_comments",
        "filters": [
          "parent"
        ]
      }
    ]
  },
  "text": "query src_childComments_Query(\n  $parent: ObjectID!\n  $count: Int = 10\n  $cursor: JSON\n) {\n  ...src_childComments\n}\n\nfragment src_childComments on Query {\n  comments: child_comments(parent: $parent, last: $count, before: $cursor) {\n    edges {\n      node {\n        __typename\n        id\n        content\n        type\n        createdAt\n        author {\n          id\n          name\n          photo\n        }\n        isOwner\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
};

module.exports = batch;
