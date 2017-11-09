/**
 * @flow
 * @relayHash edeb39dea7b5732733daab71150d992c
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type publish_create_MutationVariables = {|
  template?: ?string;
  from?: ?any;
  to?: ?any;
  child?: ?any;
  copies?: ?number;
  name?: ?string;
|};
export type publish_create_MutationResponse = {|
  +publish_create: ?{|
    +id: string;
    +name: ?string;
    +template: ?string;
    +from: ?any;
    +to: ?any;
    +copies: ?number;
    +status: ?number;
  |};
|};
*/


/*
mutation publish_create_Mutation(
  $template: String
  $from: Date
  $to: Date
  $child: ObjectID
  $copies: Int = 1
  $name: String
) {
  publish_create(template: $template, from: $from, to: $to, child: $child, copies: $copies, name: $name) {
    id
    name
    template
    from
    to
    copies
    status
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
    "name": "publish_create_Mutation",
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
            "name": "name",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "template",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "from",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "to",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "copies",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "status",
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
  "name": "publish_create_Mutation",
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
    "name": "publish_create_Mutation",
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
            "name": "name",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "template",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "from",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "to",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "copies",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "status",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation publish_create_Mutation(\n  $template: String\n  $from: Date\n  $to: Date\n  $child: ObjectID\n  $copies: Int = 1\n  $name: String\n) {\n  publish_create(template: $template, from: $from, to: $to, child: $child, copies: $copies, name: $name) {\n    id\n    name\n    template\n    from\n    to\n    copies\n    status\n  }\n}\n"
};

module.exports = batch;
