/**
 * @flow
 * @relayHash 64855ffda35a3c20150540f136257dae
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type scorePad_setTodoGoal_MutationVariables = {|
  id?: ?any;
  plan?: ?any;
|};
export type scorePad_setTodoGoal_MutationResponse = {|
  +plan_update: ?{|
    +id: string;
  |};
|};
*/


/*
mutation scorePad_setTodoGoal_Mutation(
  $id: ObjectID
  $plan: JSON
) {
  plan_update(_id: $id, plan: $plan) {
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
        "name": "plan",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "scorePad_setTodoGoal_Mutation",
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
  "name": "scorePad_setTodoGoal_Mutation",
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
        "name": "plan",
        "type": "JSON",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "scorePad_setTodoGoal_Mutation",
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
  "text": "mutation scorePad_setTodoGoal_Mutation(\n  $id: ObjectID\n  $plan: JSON\n) {\n  plan_update(_id: $id, plan: $plan) {\n    id\n  }\n}\n"
};

module.exports = batch;
