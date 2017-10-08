/**
 * @flow
 * @relayHash 810b88abaf192bd3ce0a55a30bb7cea2
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type publish_publish_MutationVariables = {|
  template?: ?string;
  startAt?: ?any;
  endAt?: ?any;
  child?: ?any;
  copies?: ?number;
  bookName?: ?string;
|};
export type publish_publish_MutationResponse = {|
  +publish_create: ?{|
    +id: string;
    +createdAt: ?any;
  |};
|};
*/


/*
mutation publish_publish_Mutation(
  $template: String
  $startAt: Date
  $endAt: Date
  $child: ObjectID
  $copies: Int = 1
  $bookName: String
) {
  publish_create(template: $template, from: $startAt, to: $endAt, child: $child, copies: $copies, name: $bookName) {
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
        "name": "template",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "startAt",
        "type": "Date",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "endAt",
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
        "name": "bookName",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "publish_publish_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
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
            "variableName": "startAt",
            "type": "Date"
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "bookName",
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
            "variableName": "endAt",
            "type": "Date"
          }
        ],
        "concreteType": "Publish",
        "name": "publish_create",
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
  "name": "publish_publish_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "template",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "startAt",
        "type": "Date",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "endAt",
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
        "name": "bookName",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "publish_publish_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
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
            "variableName": "startAt",
            "type": "Date"
          },
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "bookName",
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
            "variableName": "endAt",
            "type": "Date"
          }
        ],
        "concreteType": "Publish",
        "name": "publish_create",
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
  "text": "mutation publish_publish_Mutation(\n  $template: String\n  $startAt: Date\n  $endAt: Date\n  $child: ObjectID\n  $copies: Int = 1\n  $bookName: String\n) {\n  publish_create(template: $template, from: $startAt, to: $endAt, child: $child, copies: $copies, name: $bookName) {\n    id\n    createdAt\n  }\n}\n"
};

module.exports = batch;
