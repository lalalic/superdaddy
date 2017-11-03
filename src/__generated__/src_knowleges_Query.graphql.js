/**
 * @flow
 * @relayHash bcf2e23cc8645d04e5acb5b06373f324
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type src_knowleges_QueryResponse = {| |};
*/


/*
query src_knowleges_Query(
  $title: String
  $categories: [String]
  $tags: [String]
  $mine: Boolean
  $favorite: Boolean
  $tasked: Boolean
  $tasking: Boolean
  $count: Int
  $cursor: JSON
) {
  ...list
}

fragment list on Query {
  knowledges(title: $title, categories: $categories, tags: $tags, mine: $mine, favorite: $favorite, tasked: $tasked, tasking: $tasking, first: $count, after: $cursor) {
    edges {
      node {
        __typename
        id
        title
        ...listItem
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}

fragment listItem on Knowledge {
  id
  title
  summary
  photos
  zans
  createdAt
  updatedAt
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "title",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "categories",
        "type": "[String]",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "tags",
        "type": "[String]",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "mine",
        "type": "Boolean",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "favorite",
        "type": "Boolean",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "tasked",
        "type": "Boolean",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "tasking",
        "type": "Boolean",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "count",
        "type": "Int",
        "defaultValue": null
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
    "name": "src_knowleges_Query",
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "list",
        "args": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "src_knowleges_Query",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "title",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "categories",
        "type": "[String]",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "tags",
        "type": "[String]",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "mine",
        "type": "Boolean",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "favorite",
        "type": "Boolean",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "tasked",
        "type": "Boolean",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "tasking",
        "type": "Boolean",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "count",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "cursor",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "src_knowleges_Query",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "after",
            "variableName": "cursor",
            "type": "JSON"
          },
          {
            "kind": "Variable",
            "name": "categories",
            "variableName": "categories",
            "type": "[String]"
          },
          {
            "kind": "Variable",
            "name": "favorite",
            "variableName": "favorite",
            "type": "Boolean"
          },
          {
            "kind": "Variable",
            "name": "first",
            "variableName": "count",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "mine",
            "variableName": "mine",
            "type": "Boolean"
          },
          {
            "kind": "Variable",
            "name": "tags",
            "variableName": "tags",
            "type": "[String]"
          },
          {
            "kind": "Variable",
            "name": "tasked",
            "variableName": "tasked",
            "type": "Boolean"
          },
          {
            "kind": "Variable",
            "name": "tasking",
            "variableName": "tasking",
            "type": "Boolean"
          },
          {
            "kind": "Variable",
            "name": "title",
            "variableName": "title",
            "type": "String"
          }
        ],
        "concreteType": "KnowledgeConnection",
        "name": "knowledges",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "KnowledgeEdge",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Knowledge",
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
                    "name": "title",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "summary",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "photos",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "zans",
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
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "updatedAt",
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
                "name": "hasNextPage",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "endCursor",
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
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "after",
            "variableName": "cursor",
            "type": "JSON"
          },
          {
            "kind": "Variable",
            "name": "categories",
            "variableName": "categories",
            "type": "[String]"
          },
          {
            "kind": "Variable",
            "name": "favorite",
            "variableName": "favorite",
            "type": "Boolean"
          },
          {
            "kind": "Variable",
            "name": "first",
            "variableName": "count",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "mine",
            "variableName": "mine",
            "type": "Boolean"
          },
          {
            "kind": "Variable",
            "name": "tags",
            "variableName": "tags",
            "type": "[String]"
          },
          {
            "kind": "Variable",
            "name": "tasked",
            "variableName": "tasked",
            "type": "Boolean"
          },
          {
            "kind": "Variable",
            "name": "tasking",
            "variableName": "tasking",
            "type": "Boolean"
          },
          {
            "kind": "Variable",
            "name": "title",
            "variableName": "title",
            "type": "String"
          }
        ],
        "handle": "connection",
        "name": "knowledges",
        "key": "list_knowledges",
        "filters": [
          "title",
          "categories",
          "tags",
          "mine",
          "favorite",
          "tasked",
          "tasking"
        ]
      }
    ]
  },
  "text": "query src_knowleges_Query(\n  $title: String\n  $categories: [String]\n  $tags: [String]\n  $mine: Boolean\n  $favorite: Boolean\n  $tasked: Boolean\n  $tasking: Boolean\n  $count: Int\n  $cursor: JSON\n) {\n  ...list\n}\n\nfragment list on Query {\n  knowledges(title: $title, categories: $categories, tags: $tags, mine: $mine, favorite: $favorite, tasked: $tasked, tasking: $tasking, first: $count, after: $cursor) {\n    edges {\n      node {\n        __typename\n        id\n        title\n        ...listItem\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment listItem on Knowledge {\n  id\n  title\n  summary\n  photos\n  zans\n  createdAt\n  updatedAt\n}\n"
};

module.exports = batch;
