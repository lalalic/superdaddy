/**
 * @flow
 * @relayHash d8014394f6874c60a7c8294b3ee457e0
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type create_knowledge_MutationVariables = {|
  knowledge?: ?any;
|};
export type create_knowledge_MutationResponse = {|
  +knowledge_create: ?{|
    +id: string;
    +createdAt: ?any;
  |};
|};
*/


/*
mutation create_knowledge_Mutation(
  $knowledge: JSON
) {
  knowledge_create(knowledge: $knowledge) {
    id
    createdAt
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "knowledge",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "create_knowledge_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "knowledge",
            "variableName": "knowledge",
            "type": "JSON"
          }
        ],
        "concreteType": "Knowledge",
        "name": "knowledge_create",
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
            "name": "createdAt",
            "storageKey": null
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
  "name": "create_knowledge_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "knowledge",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "create_knowledge_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "knowledge",
            "variableName": "knowledge",
            "type": "JSON"
          }
        ],
        "concreteType": "Knowledge",
        "name": "knowledge_create",
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
            "name": "createdAt",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation create_knowledge_Mutation(\n  $knowledge: JSON\n) {\n  knowledge_create(knowledge: $knowledge) {\n    id\n    createdAt\n  }\n}\n"
};

module.exports = batch;
