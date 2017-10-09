/**
 * @flow
 * @relayHash 45cfa38427751956d354504798aacbac
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type src_child_QueryResponse = {|
  +me: {|
    +child: ?{| |};
  |};
|};
*/


/*
query src_child_Query(
  $id: ObjectID
) {
  me {
    child(_id: $id) {
      ...child
      id
    }
    id
  }
}

fragment child on Child {
  id
  name
  photo
  birthday
  gender
  totalScore: score
  plan {
    score
    goal
    todo
    icon
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
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "src_child_Query",
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
                "variableName": "id",
                "type": "ObjectID"
              }
            ],
            "concreteType": "Child",
            "name": "child",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "child",
                "args": null
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
  "name": "src_child_Query",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "src_child_Query",
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
                "variableName": "id",
                "type": "ObjectID"
              }
            ],
            "concreteType": "Child",
            "name": "child",
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
                "name": "name",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "photo",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "birthday",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "gender",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "totalScore",
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
                    "name": "score",
                    "storageKey": null
                  },
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
                    "name": "todo",
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
                    "name": "id",
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
  "text": "query src_child_Query(\n  $id: ObjectID\n) {\n  me {\n    child(_id: $id) {\n      ...child\n      id\n    }\n    id\n  }\n}\n\nfragment child on Child {\n  id\n  name\n  photo\n  birthday\n  gender\n  totalScore: score\n  plan {\n    score\n    goal\n    todo\n    icon\n    id\n  }\n}\n"
};

module.exports = batch;