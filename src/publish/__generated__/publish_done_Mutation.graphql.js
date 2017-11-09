/**
 * @flow
 * @relayHash 7ffe574c1c9bbad3d5b041d8bf22df76
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type publish_done_MutationVariables = {|
  id?: ?any;
|};
export type publish_done_MutationResponse = {|
  +publish_done: ?any;
|};
*/


/*
mutation publish_done_Mutation(
  $id: ObjectID
) {
  publish_done(_id: $id)
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
    "name": "publish_done_Mutation",
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
        "name": "publish_done",
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "publish_done_Mutation",
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
    "name": "publish_done_Mutation",
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
        "name": "publish_done",
        "storageKey": null
      }
    ]
  },
  "text": "mutation publish_done_Mutation(\n  $id: ObjectID\n) {\n  publish_done(_id: $id)\n}\n"
};

module.exports = batch;
