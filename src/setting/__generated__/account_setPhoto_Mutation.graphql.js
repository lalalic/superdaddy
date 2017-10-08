/**
 * @flow
 * @relayHash fcbe444c9e9c80842b5e3f923b331dc5
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type account_setPhoto_MutationVariables = {|
  id: any;
  url: string;
|};
export type account_setPhoto_MutationResponse = {|
  +child_update: ?any;
|};
*/


/*
mutation account_setPhoto_Mutation(
  $id: ObjectID!
  $url: String!
) {
  child_update(_id: $id, photo: $url)
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "url",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "account_setPhoto_Mutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "id",
            "type": "ObjectID!"
          },
          {
            "kind": "Variable",
            "name": "photo",
            "variableName": "url",
            "type": "String"
          }
        ],
        "name": "child_update",
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "account_setPhoto_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "url",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "account_setPhoto_Mutation",
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
            "type": "ObjectID!"
          },
          {
            "kind": "Variable",
            "name": "photo",
            "variableName": "url",
            "type": "String"
          }
        ],
        "name": "child_update",
        "storageKey": null
      }
    ]
  },
  "text": "mutation account_setPhoto_Mutation(\n  $id: ObjectID!\n  $url: String!\n) {\n  child_update(_id: $id, photo: $url)\n}\n"
};

module.exports = batch;
