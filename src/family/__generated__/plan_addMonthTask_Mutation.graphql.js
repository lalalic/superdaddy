/**
 * @flow
 * @relayHash b999c5428d9475ddae1306b0f4616087
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type plan_addMonthTask_MutationVariables = {|
  child?: ?any;
  month?: ?number;
  knowledge?: ?any;
|};
export type plan_addMonthTask_MutationResponse = {|
  +plan_monthtask_add: ?{|
    +months: ?$ReadOnlyArray<?{|
      +goals: ?$ReadOnlyArray<?string>;
      +knowledges: ?$ReadOnlyArray<?{|
        +id: string;
        +title: string;
      |}>;
    |}>;
  |};
|};
*/


/*
mutation plan_addMonthTask_Mutation(
  $child: ObjectID
  $month: Int
  $knowledge: ObjectID
) {
  plan_monthtask_add(_id: $child, knowledge: $knowledge, month: $month) {
    months {
      goals
      knowledges {
        id
        title
      }
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
        "name": "month",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "knowledge",
        "type": "ObjectID",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "plan_addMonthTask_Mutation",
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
            "name": "knowledge",
            "variableName": "knowledge",
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "month",
            "variableName": "month",
            "type": "Int"
          }
        ],
        "concreteType": "Plan",
        "name": "plan_monthtask_add",
        "plural": false,
        "selections": [
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
  "name": "plan_addMonthTask_Mutation",
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
        "name": "month",
        "type": "Int",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "knowledge",
        "type": "ObjectID",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "plan_addMonthTask_Mutation",
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
            "name": "knowledge",
            "variableName": "knowledge",
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "month",
            "variableName": "month",
            "type": "Int"
          }
        ],
        "concreteType": "Plan",
        "name": "plan_monthtask_add",
        "plural": false,
        "selections": [
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
  "text": "mutation plan_addMonthTask_Mutation(\n  $child: ObjectID\n  $month: Int\n  $knowledge: ObjectID\n) {\n  plan_monthtask_add(_id: $child, knowledge: $knowledge, month: $month) {\n    months {\n      goals\n      knowledges {\n        id\n        title\n      }\n    }\n    id\n  }\n}\n"
};

module.exports = batch;
