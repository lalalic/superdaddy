/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type list = {|
  +knowledges: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string;
        +title: string;
      |};
    |}>;
    +pageInfo: ?{|
      +hasNextPage: ?boolean;
      +endCursor: ?any;
    |};
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "title",
      "type": "String"
    },
    {
      "kind": "RootArgument",
      "name": "categories",
      "type": "[String]"
    },
    {
      "kind": "RootArgument",
      "name": "tags",
      "type": "[String]"
    },
    {
      "kind": "RootArgument",
      "name": "mine",
      "type": "Boolean"
    },
    {
      "kind": "RootArgument",
      "name": "favorite",
      "type": "Boolean"
    },
    {
      "kind": "RootArgument",
      "name": "tasked",
      "type": "Boolean"
    },
    {
      "kind": "RootArgument",
      "name": "tasking",
      "type": "Boolean"
    },
    {
      "kind": "RootArgument",
      "name": "count",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "cursor",
      "type": "JSON"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "knowledges"
        ]
      }
    ]
  },
  "name": "list",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "knowledges",
      "args": [
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
      "name": "__list_knowledges_connection",
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
                  "kind": "FragmentSpread",
                  "name": "listItem",
                  "args": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "args": null,
                  "name": "__typename",
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
    }
  ],
  "type": "Query"
};

module.exports = fragment;
