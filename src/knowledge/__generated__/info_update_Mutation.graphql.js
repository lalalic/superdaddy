/**
 * @flow
 * @relayHash bc606804edcf6f423ce8c5954a736226
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type info_update_MutationVariables = {|
  id?: ?any;
  info?: ?any;
|};
export type info_update_MutationResponse = {|
  +knowledge_update: ?{| |};
|};
*/


/*
mutation info_update_Mutation(
  $id: ObjectID
  $info: JSON
) {
  knowledge_update(_id: $id, knowledge: $info) {
    ...content_knowledge
    id
  }
}

fragment content_knowledge on Knowledge {
  id
  title
  content
  summary
  createdAt
  category
  keywords
  figure
  author {
    name
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "info",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "info_update_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "id",
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "knowledge",
            "variableName": "info",
            "type": "JSON"
          }
        ],
        "concreteType": "Knowledge",
        "name": "knowledge_update",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "content_knowledge",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "info_update_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "info",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "info_update_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "id",
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "knowledge",
            "variableName": "info",
            "type": "JSON"
          }
        ],
        "concreteType": "Knowledge",
        "name": "knowledge_update",
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
            "name": "summary",
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
            "name": "category",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "keywords",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "figure",
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
                "name": "name",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation info_update_Mutation(\n  $id: ObjectID\n  $info: JSON\n) {\n  knowledge_update(_id: $id, knowledge: $info) {\n    ...content_knowledge\n    id\n  }\n}\n\nfragment content_knowledge on Knowledge {\n  id\n  title\n  content\n  summary\n  createdAt\n  category\n  keywords\n  figure\n  author {\n    name\n    id\n  }\n}\n"
};

module.exports = batch;
