/**
 * @flow
 * @relayHash bb132c1fd4dd10919238af217c664126
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type publish_update_MutationVariables = {|
  id?: ?any;
  template?: ?string;
  from?: ?any;
  to?: ?any;
  child?: ?any;
  copies?: ?number;
  name?: ?string;
|};
export type publish_update_MutationResponse = {|
  +publish_update: ?any;
|};
*/


/*
mutation publish_update_Mutation(
  $id: ObjectID
  $template: String
  $from: Date
  $to: Date
  $child: ObjectID
  $copies: Int = 1
  $name: String
) {
  publish_update(_id: $id, template: $template, from: $from, to: $to, child: $child, copies: $copies, name: $name)
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
        "name": "template",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "from",
        "type": "Date",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "to",
        "type": "Date",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "child",
        "type": "ObjectID",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "copies",
        "type": "Int",
        "defaultValue": 1
      },
      {
        "kind": "LocalArgument",
        "name": "name",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "publish_update_Mutation",
    "selections": [
      {
        "kind": "ScalarField",
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
            "name": "child",
            "variableName": "child",
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "copies",
            "variableName": "copies",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "from",
            "variableName": "from",
            "type": "Date"
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "template",
            "variableName": "template",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "to",
            "variableName": "to",
            "type": "Date"
          }
        ],
        "name": "publish_update",
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "publish_update_Mutation",
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
        "name": "template",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "from",
        "type": "Date",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "to",
        "type": "Date",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "child",
        "type": "ObjectID",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "copies",
        "type": "Int",
        "defaultValue": 1
      },
      {
        "kind": "LocalArgument",
        "name": "name",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "publish_update_Mutation",
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
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "child",
            "variableName": "child",
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "copies",
            "variableName": "copies",
            "type": "Int"
          },
          {
            "kind": "Variable",
            "name": "from",
            "variableName": "from",
            "type": "Date"
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "template",
            "variableName": "template",
            "type": "String"
          },
          {
            "kind": "Variable",
            "name": "to",
            "variableName": "to",
            "type": "Date"
          }
        ],
        "name": "publish_update",
        "storageKey": null
      }
    ]
  },
  "text": "mutation publish_update_Mutation(\n  $id: ObjectID\n  $template: String\n  $from: Date\n  $to: Date\n  $child: ObjectID\n  $copies: Int = 1\n  $name: String\n) {\n  publish_update(_id: $id, template: $template, from: $from, to: $to, child: $child, copies: $copies, name: $name)\n}\n"
};

module.exports = batch;
