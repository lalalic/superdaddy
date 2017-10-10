/**
 * @flow
 * @relayHash c9db2f6bfc893147bda8ac581d5b441c
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type src_timeManage_QueryResponse = {|
  +me: {|
    +child: ?{|
      +plan: ?{| |};
    |};
  |};
|};
*/


/*
query src_timeManage_Query(
  $child: ObjectID
) {
  me {
    child(_id: $child) {
      plan {
        ...core
        id
      }
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
      fields
      id
    }
    content
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
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "src_timeManage_Query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "me",
        "plural": false,
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
            "concreteType": "Child",
            "name": "child",
            "plural": false,
            "selections": [
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
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "src_timeManage_Query",
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
    "name": "src_timeManage_Query",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "User",
        "name": "me",
        "plural": false,
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
            "concreteType": "Child",
            "name": "child",
            "plural": false,
            "selections": [
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
                            "name": "fields",
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
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "hidden",
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
  "text": "query src_timeManage_Query(\n  $child: ObjectID\n) {\n  me {\n    child(_id: $child) {\n      plan {\n        ...core\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      fields\n      id\n    }\n    content\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n"
};

module.exports = batch;
