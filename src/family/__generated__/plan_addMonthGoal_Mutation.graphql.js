/**
 * @flow
 * @relayHash 09eecadf114b62972ff718f721fe6708
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type plan_addMonthGoal_MutationVariables = {|
  child?: ?any;
  month?: ?number;
  goal?: ?string;
|};
export type plan_addMonthGoal_MutationResponse = {|
  +plan_monthgoal_add: ?{|
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
mutation plan_addMonthGoal_Mutation(
  $child: ObjectID
  $month: Int
  $goal: String
) {
  plan_monthgoal_add(_id: $child, goal: $goal, month: $month) {
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
        "name": "goal",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "plan_addMonthGoal_Mutation",
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
            "name": "goal",
            "variableName": "goal",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "month",
            "variableName": "month",
            "type": "Int"
          }
        ],
        "concreteType": "Plan",
        "name": "plan_monthgoal_add",
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
  "name": "plan_addMonthGoal_Mutation",
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
        "name": "goal",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "plan_addMonthGoal_Mutation",
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
            "name": "goal",
            "variableName": "goal",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "month",
            "variableName": "month",
            "type": "Int"
          }
        ],
        "concreteType": "Plan",
        "name": "plan_monthgoal_add",
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
  "text": "mutation plan_addMonthGoal_Mutation(\n  $child: ObjectID\n  $month: Int\n  $goal: String\n) {\n  plan_monthgoal_add(_id: $child, goal: $goal, month: $month) {\n    months {\n      goals\n      knowledges {\n        id\n        title\n      }\n    }\n    id\n  }\n}\n"
};

module.exports = batch;
