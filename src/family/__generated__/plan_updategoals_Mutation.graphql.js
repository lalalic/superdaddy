/**
 * @flow
 * @relayHash 344793a79db6fe0dee69a1094601c01e
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type plan_updategoals_MutationVariables = {|
  child?: ?any;
  goals?: ?$ReadOnlyArray<?string>;
|};
export type plan_updategoals_MutationResponse = {|
  +plan_update_goals: ?{|
    +goals: ?$ReadOnlyArray<?string>;
    +pendingKnowledges: ?$ReadOnlyArray<?{|
      +id: string;
      +category: ?$ReadOnlyArray<?string>;
      +title: string;
    |}>;
  |};
|};
*/


/*
mutation plan_updategoals_Mutation(
  $child: ObjectID
  $goals: [String]
) {
  plan_update_goals(_id: $child, goals: $goals) {
    goals
    pendingKnowledges {
      id
      category
      title
    }
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
        "name": "goals",
        "type": "[String]",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "plan_updategoals_Mutation",
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
            "name": "goals",
            "variableName": "goals",
            "type": "[String]"
          }
        ],
        "concreteType": "Plan",
        "name": "plan_update_goals",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "goals",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Knowledge",
            "name": "pendingKnowledges",
            "plural": true,
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
                "name": "category",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "title",
                "storageKey": null
              }
            ],
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
  "name": "plan_updategoals_Mutation",
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
        "name": "goals",
        "type": "[String]",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "plan_updategoals_Mutation",
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
            "name": "goals",
            "variableName": "goals",
            "type": "[String]"
          }
        ],
        "concreteType": "Plan",
        "name": "plan_update_goals",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "goals",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Knowledge",
            "name": "pendingKnowledges",
            "plural": true,
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
                "name": "category",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "title",
                "storageKey": null
              }
            ],
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
    ]
  },
  "text": "mutation plan_updategoals_Mutation(\n  $child: ObjectID\n  $goals: [String]\n) {\n  plan_update_goals(_id: $child, goals: $goals) {\n    goals\n    pendingKnowledges {\n      id\n      category\n      title\n    }\n    id\n  }\n}\n"
};

module.exports = batch;
