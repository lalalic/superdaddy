/**
 * @flow
 * @relayHash 3daae5de740cabd5d024df39ec0f6816
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type list_remove_MutationVariables = {|
  id?: ?any;
|};
export type list_remove_MutationResponse = {|
  +publish_remove: ?boolean;
|};
*/


/*
mutation list_remove_Mutation(
  $id: ObjectID
) {
  publish_remove(_id: $id)
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
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "list_remove_Mutation",
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
          }
        ],
        "name": "publish_remove",
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "list_remove_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "list_remove_Mutation",
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
          }
        ],
        "name": "publish_remove",
        "storageKey": null
      }
    ]
  },
  "text": "mutation list_remove_Mutation(\n  $id: ObjectID\n) {\n  publish_remove(_id: $id)\n}\n"
};

module.exports = batch;
