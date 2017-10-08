/**
 * @flow
 * @relayHash 34f2ecd3a37730b483866b48bcfe5bd5
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
  +knowledge_update: ?any;
|};
*/


/*
mutation info_update_Mutation(
  $id: ObjectID
  $info: JSON
) {
  knowledge_update(_id: $id, knowledge: $info)
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
        "kind": "ScalarField",
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
        "name": "knowledge_update",
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
        "kind": "ScalarField",
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
        "name": "knowledge_update",
        "storageKey": null
      }
    ]
  },
  "text": "mutation info_update_Mutation(\n  $id: ObjectID\n  $info: JSON\n) {\n  knowledge_update(_id: $id, knowledge: $info)\n}\n"
};

module.exports = batch;
