/**
 * @flow
 * @relayHash 30155364633b2f871d5270a32082db13
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type child_remove_MutationVariables = {|
  id: any;
|};
export type child_remove_MutationResponse = {|
  +child_remove: ?boolean;
|};
*/


/*
mutation child_remove_Mutation(
  $id: ObjectID!
) {
  child_remove(_id: $id)
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
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "child_remove_Mutation",
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
          }
        ],
        "name": "child_remove",
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "child_remove_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "child_remove_Mutation",
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
          }
        ],
        "name": "child_remove",
        "storageKey": null
      }
    ]
  },
  "text": "mutation child_remove_Mutation(\n  $id: ObjectID!\n) {\n  child_remove(_id: $id)\n}\n"
};

module.exports = batch;
