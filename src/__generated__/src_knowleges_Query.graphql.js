/**
 * @flow
 * @relayHash 9a644ecfa26ba58046ca2f0c11ebab2a
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type src_knowleges_QueryResponse = {| |};
*/


/*
query src_knowleges_Query(
  $first: Int
  $after: JSON
) {
  ...list_knowledges
}

fragment list_knowledges on Query {
  knowledges(first: $first, after: $after) {
    edges {
      node {
        __typename
        ...listItem
        id
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
        "name": "first",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "after",
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
        "name": "list_knowledges",
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
        "name": "first",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "after",
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
            "variableName": "after",
            "type": "JSON"
          },
          {
            "kind": "Variable",
            "name": "first",
            "variableName": "first",
            "type": "Int"
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
            "variableName": "after",
            "type": "JSON"
          },
          {
            "kind": "Variable",
            "name": "first",
            "variableName": "first",
            "type": "Int"
          }
        ],
        "handle": "connection",
        "name": "knowledges",
        "key": "list_knowledges",
        "filters": null
      }
    ]
  },
  "text": "query src_knowleges_Query(\n  $first: Int\n  $after: JSON\n) {\n  ...list_knowledges\n}\n\nfragment list_knowledges on Query {\n  knowledges(first: $first, after: $after) {\n    edges {\n      node {\n        __typename\n        ...listItem\n        id\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment listItem on Knowledge {\n  id\n  title\n  summary\n  photos\n  zans\n  createdAt\n  updatedAt\n}\n"
};

module.exports = batch;
