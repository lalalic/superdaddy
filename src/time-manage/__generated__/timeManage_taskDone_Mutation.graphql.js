/**
 * @flow
 * @relayHash 4c15870070f25d1dd1007638e41c5174
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type timeManage_taskDone_MutationVariables = {|
  child?: ?any;
  task?: ?string;
  knowledge?: ?any;
  day?: ?number;
|};
export type timeManage_taskDone_MutationResponse = {|
  +plan_task_done: ?{|
    +score: ?number;
    +plan: ?{| |};
  |};
|};
*/


/*
mutation timeManage_taskDone_Mutation(
  $child: ObjectID
  $task: String
  $knowledge: ObjectID
  $day: Int
) {
  plan_task_done(_id: $child, content: $task, knowledge: $knowledge, day: $day) {
    score
    plan {
      ...core
      id
    }
    id
  }
}

fragment core on Plan {
  goal
  score
  week
  ...scorePad
  ...taskPad
  ...taskPadEditor
}

fragment scorePad on Plan {
  todo
  goal
  score
}

fragment taskPad on Plan {
  todos {
    knowledge {
      id
      fields
    }
    content
    hidden
    day0
    day1
    day2
    day3
    day4
    day5
    day6
  }
}

fragment taskPadEditor on Plan {
  todos {
    content
    hidden
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
        "name": "task",
        "type": "String",
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
        "name": "day",
        "type": "Int",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "timeManage_taskDone_Mutation",
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
            "name": "content",
            "variableName": "task",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "day",
            "variableName": "day",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "knowledge",
            "variableName": "knowledge",
            "type": "ObjectID"
          }
        ],
        "concreteType": "Child",
        "name": "plan_task_done",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "score",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Plan",
            "name": "plan",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "core",
                "args": null
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
  "name": "timeManage_taskDone_Mutation",
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
        "name": "task",
        "type": "String",
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
        "name": "day",
        "type": "Int",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "timeManage_taskDone_Mutation",
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
            "name": "content",
            "variableName": "task",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "day",
            "variableName": "day",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "knowledge",
            "variableName": "knowledge",
            "type": "ObjectID"
          }
        ],
        "concreteType": "Child",
        "name": "plan_task_done",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "score",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Plan",
            "name": "plan",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "goal",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "score",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "week",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "todo",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Todo",
                "name": "todos",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Knowledge",
                    "name": "knowledge",
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
                        "name": "fields",
                        "storageKey": null
                      }
                    ],
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
                    "name": "hidden",
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
  "text": "mutation timeManage_taskDone_Mutation(\n  $child: ObjectID\n  $task: String\n  $knowledge: ObjectID\n  $day: Int\n) {\n  plan_task_done(_id: $child, content: $task, knowledge: $knowledge, day: $day) {\n    score\n    plan {\n      ...core\n      id\n    }\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n"
};

module.exports = batch;
