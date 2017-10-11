/**
 * @flow
 * @relayHash 819792484cfe6b641e5a4d1602616917
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type plan_auto_MutationVariables = {|
  child?: ?any;
|};
export type plan_auto_MutationResponse = {|
  +plan_auto: ?{| |};
|};
*/


/*
mutation plan_auto_Mutation(
  $child: ObjectID
) {
  plan_auto(_id: $child) {
    ...plan
    id
  }
}

fragment plan on Plan {
  caps
  goals
  months {
    goals
    knowledges {
      id
      title
    }
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
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "plan_auto_Mutation",
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
          }
        ],
        "concreteType": "Plan",
        "name": "plan_auto",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "plan",
            "args": null
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
  "name": "plan_auto_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "child",
        "type": "ObjectID",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "plan_auto_Mutation",
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
          }
        ],
        "concreteType": "Plan",
        "name": "plan_auto",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "caps",
            "storageKey": null
          },
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
            "concreteType": "MonthPlan",
            "name": "months",
            "plural": true,
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
                "name": "knowledges",
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
                    "name": "title",
                    "storageKey": null
                  }
                ],
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
  "text": "mutation plan_auto_Mutation(\n  $child: ObjectID\n) {\n  plan_auto(_id: $child) {\n    ...plan\n    id\n  }\n}\n\nfragment plan on Plan {\n  caps\n  goals\n  months {\n    goals\n    knowledges {\n      id\n      title\n    }\n  }\n}\n"
};

module.exports = batch;
