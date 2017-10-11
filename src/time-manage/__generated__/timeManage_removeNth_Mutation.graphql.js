/**
 * @flow
 * @relayHash ba6dccd97e44df8d510c56f84e6a1e3c
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type timeManage_removeNth_MutationVariables = {|
  child?: ?any;
  i?: ?number;
|};
export type timeManage_removeNth_MutationResponse = {|
  +plan_todos_removeNth: ?{| |};
|};
*/


/*
mutation timeManage_removeNth_Mutation(
  $child: ObjectID
  $i: Int
) {
  plan_todos_removeNth(_id: $child, i: $i) {
    ...core
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
        "name": "i",
        "type": "Int",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "timeManage_removeNth_Mutation",
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
            "name": "i",
            "variableName": "i",
            "type": "Int"
          }
        ],
        "concreteType": "Plan",
        "name": "plan_todos_removeNth",
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
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "timeManage_removeNth_Mutation",
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
        "name": "i",
        "type": "Int",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "timeManage_removeNth_Mutation",
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
            "name": "i",
            "variableName": "i",
            "type": "Int"
          }
        ],
        "concreteType": "Plan",
        "name": "plan_todos_removeNth",
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
      }
    ]
  },
  "text": "mutation timeManage_removeNth_Mutation(\n  $child: ObjectID\n  $i: Int\n) {\n  plan_todos_removeNth(_id: $child, i: $i) {\n    ...core\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n"
};

module.exports = batch;
