/**
 * @flow
 * @relayHash 8657a6a348ac76e56dc30b82027c40a1
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type child_create_MutationVariables = {|
  name: string;
  photo?: ?string;
  birthday?: ?any;
  gender?: ?"girl" | "boy";
|};
export type child_create_MutationResponse = {|
  +child_create: ?{|
    +id: string;
    +createdAt: ?any;
  |};
|};
*/


/*
mutation child_create_Mutation(
  $name: String!
  $photo: String
  $birthday: Date
  $gender: Gender
) {
  child_create(name: $name, photo: $photo, birthday: $birthday, gender: $gender) {
    id
    createdAt
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "name",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "photo",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "birthday",
        "type": "Date",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "gender",
        "type": "Gender",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "child_create_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "birthday",
            "variableName": "birthday",
            "type": "Date"
          },
          {
            "kind": "Variable",
            "name": "gender",
            "variableName": "gender",
            "type": "Gender"
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "photo",
            "variableName": "photo",
            "type": "String"
          }
        ],
        "concreteType": "Child",
        "name": "child_create",
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
            "name": "createdAt",
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
  "name": "child_create_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "name",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "photo",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "birthday",
        "type": "Date",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "gender",
        "type": "Gender",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "child_create_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "birthday",
            "variableName": "birthday",
            "type": "Date"
          },
          {
            "kind": "Variable",
            "name": "gender",
            "variableName": "gender",
            "type": "Gender"
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "photo",
            "variableName": "photo",
            "type": "String"
          }
        ],
        "concreteType": "Child",
        "name": "child_create",
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
            "name": "createdAt",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation child_create_Mutation(\n  $name: String!\n  $photo: String\n  $birthday: Date\n  $gender: Gender\n) {\n  child_create(name: $name, photo: $photo, birthday: $birthday, gender: $gender) {\n    id\n    createdAt\n  }\n}\n"
};

module.exports = batch;
