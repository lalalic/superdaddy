/**
 * @flow
 * @relayHash 4bc7c3a186a5539994587cd622299226
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type info_task_MutationVariables = {|
  id?: ?any;
  knowledge?: ?any;
  content?: ?string;
|};
export type info_task_MutationResponse = {|
  +plan_task: ?{|
    +todos: ?$ReadOnlyArray<?{|
      +knowledge: ?any;
      +content: ?string;
      +day0: ?any;
      +day1: ?any;
      +day2: ?any;
      +day3: ?any;
      +day4: ?any;
      +day5: ?any;
      +day6: ?any;
    |}>;
  |};
|};
*/


/*
mutation info_task_Mutation(
  $id: ObjectID
  $knowledge: ObjectID
  $content: String
) {
  plan_task(_id: $id, knowledge: $knowledge, content: $content) {
    todos {
      knowledge
      content
      day0
      day1
      day2
      day3
      day4
      day5
      day6
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
        "name": "id",
        "type": "ObjectID",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "knowledge",
        "type": "ObjectID",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "content",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "info_task_Mutation",
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
            "name": "content",
            "variableName": "content",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "knowledge",
            "variableName": "knowledge",
            "type": "ObjectID"
          }
        ],
        "concreteType": "Plan",
        "name": "plan_task",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Todo",
            "name": "todos",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "knowledge",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "content",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day0",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day1",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day2",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day3",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day4",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day5",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day6",
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
  "name": "info_task_Mutation",
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
        "name": "knowledge",
        "type": "ObjectID",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "content",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "info_task_Mutation",
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
            "name": "content",
            "variableName": "content",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "knowledge",
            "variableName": "knowledge",
            "type": "ObjectID"
          }
        ],
        "concreteType": "Plan",
        "name": "plan_task",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Todo",
            "name": "todos",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "knowledge",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "content",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day0",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day1",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day2",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day3",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day4",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day5",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "day6",
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
  "text": "mutation info_task_Mutation(\n  $id: ObjectID\n  $knowledge: ObjectID\n  $content: String\n) {\n  plan_task(_id: $id, knowledge: $knowledge, content: $content) {\n    todos {\n      knowledge\n      content\n      day0\n      day1\n      day2\n      day3\n      day4\n      day5\n      day6\n    }\n    id\n  }\n}\n"
};

module.exports = batch;
