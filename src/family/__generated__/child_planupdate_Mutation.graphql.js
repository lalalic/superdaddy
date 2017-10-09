/**
 * @flow
 * @relayHash c9f5d39020aa70321b5ce44e1cb2fb2e
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type child_planupdate_MutationVariables = {|
  id?: ?any;
  plan?: ?any;
|};
export type child_planupdate_MutationResponse = {|
  +plan_update: ?{|
    +id: string;
    +icon: ?string;
    +todo: ?string;
  |};
|};
*/


/*
mutation child_planupdate_Mutation(
  $id: ObjectID
  $plan: JSON
) {
  plan_update(_id: $id, plan: $plan) {
    id
    icon
    todo
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
    "name": "child_planupdate_Mutation",
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "icon",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "todo",
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
  "name": "child_planupdate_Mutation",
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
    "name": "child_planupdate_Mutation",
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "icon",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "todo",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation child_planupdate_Mutation(\n  $id: ObjectID\n  $plan: JSON\n) {\n  plan_update(_id: $id, plan: $plan) {\n    id\n    icon\n    todo\n  }\n}\n"
};

module.exports = batch;
