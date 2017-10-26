/**
 * @flow
 * @relayHash 12d27c9fb786badee2c2d5a28e256d59
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type account_setPhoto_MutationVariables = {|
  id: any;
  photo?: ?string;
  name?: ?string;
  birthday?: ?any;
  gender?: ?"girl" | "boy";
|};
export type account_setPhoto_MutationResponse = {|
  +child_update: ?any;
|};
*/


/*
mutation account_setPhoto_Mutation(
  $id: ObjectID!
  $photo: String
  $name: String
  $birthday: Date
  $gender: Gender
) {
  child_update(_id: $id, photo: $photo, name: $name, birthday: $birthday, gender: $gender)
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
        "name": "photo",
        "type": "String",
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
    "name": "account_setPhoto_Mutation",
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
          },
          {
            "kind": "Variable",
            "name": "photo",
            "variableName": "photo",
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
  "name": "account_setPhoto_Mutation",
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
        "name": "photo",
        "type": "String",
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
    "name": "account_setPhoto_Mutation",
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
          },
          {
            "kind": "Variable",
            "name": "photo",
            "variableName": "photo",
            "type": "String"
          }
        ],
        "name": "child_update",
        "storageKey": null
      }
    ]
  },
  "text": "mutation account_setPhoto_Mutation(\n  $id: ObjectID!\n  $photo: String\n  $name: String\n  $birthday: Date\n  $gender: Gender\n) {\n  child_update(_id: $id, photo: $photo, name: $name, birthday: $birthday, gender: $gender)\n}\n"
};

module.exports = batch;
