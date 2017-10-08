/**
 * @flow
 * @relayHash 6ded0aef0160def10ee802e067114a48
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type child_update_MutationVariables = {|
  id: any;
  name?: ?string;
  birthday?: ?any;
  gender?: ?"girl" | "boy";
|};
export type child_update_MutationResponse = {|
  +child_update: ?any;
|};
*/


/*
mutation child_update_Mutation(
  $id: ObjectID!
  $name: String
  $birthday: Date
  $gender: Gender
) {
  child_update(_id: $id, name: $name, birthday: $birthday, gender: $gender)
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "name",
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
    "name": "child_update_Mutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "id",
            "type": "ObjectID!"
          },
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
            "type": "String"
          }
        ],
        "name": "child_update",
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "child_update_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "name",
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
    "name": "child_update_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "_id",
            "variableName": "id",
            "type": "ObjectID!"
          },
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
            "type": "String"
          }
        ],
        "name": "child_update",
        "storageKey": null
      }
    ]
  },
  "text": "mutation child_update_Mutation(\n  $id: ObjectID!\n  $name: String\n  $birthday: Date\n  $gender: Gender\n) {\n  child_update(_id: $id, name: $name, birthday: $birthday, gender: $gender)\n}\n"
};

module.exports = batch;
