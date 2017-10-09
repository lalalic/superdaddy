/**
 * @flow
 * @relayHash 813480b535c0f283f9bde76545af9800
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type timeManage_status_MutationVariables = {|
  child?: ?any;
  plan?: ?any;
|};
export type timeManage_status_MutationResponse = {|
  +plan_update: ?{|
    +id: string;
  |};
|};
*/


/*
mutation timeManage_status_Mutation(
  $child: ObjectID
  $plan: JSON
) {
  plan_update(_id: $child, plan: $plan) {
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "child",
        "type": "ObjectID",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "plan",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "timeManage_status_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "child",
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "plan",
            "variableName": "plan",
            "type": "JSON"
          }
        ],
        "concreteType": "Plan",
        "name": "plan_update",
        "plural": false,
        "selections": [
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
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "timeManage_status_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "child",
        "type": "ObjectID",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "plan",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "timeManage_status_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "child",
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "plan",
            "variableName": "plan",
            "type": "JSON"
          }
        ],
        "concreteType": "Plan",
        "name": "plan_update",
        "plural": false,
        "selections": [
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
    ]
  },
  "text": "mutation timeManage_status_Mutation(\n  $child: ObjectID\n  $plan: JSON\n) {\n  plan_update(_id: $child, plan: $plan) {\n    id\n  }\n}\n"
};

module.exports = batch;
