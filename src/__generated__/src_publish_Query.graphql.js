/**
 * @flow
 * @relayHash 71e7562cf86a382a9744a8b51cf8b8ed
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type src_publish_QueryResponse = {|
  +me: {|
    +child: ?{|
      +publish: ?{| |};
    |};
  |};
|};
*/


/*
query src_publish_Query(
  $child: ObjectID
  $id: ObjectID
) {
  me {
    child(_id: $child) {
      publish(_id: $id) {
        ...publish_info
        id
      }
      id
    }
    id
  }
}

fragment publish_info on Publish {
  template
  copies
  name
  from
  to
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
        "name": "id",
        "type": "ObjectID",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "src_publish_Query",
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
                "args": [
                  {
                    "kind": "Variable",
                    "name": "_id",
                    "variableName": "id",
                    "type": "ObjectID"
                  }
                ],
                "concreteType": "Publish",
                "name": "publish",
                "plural": false,
                "selections": [
                  {
                    "kind": "FragmentSpread",
                    "name": "publish_info",
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
  "name": "src_publish_Query",
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
        "name": "id",
        "type": "ObjectID",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "src_publish_Query",
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
                "args": [
                  {
                    "kind": "Variable",
                    "name": "_id",
                    "variableName": "id",
                    "type": "ObjectID"
                  }
                ],
                "concreteType": "Publish",
                "name": "publish",
                "plural": false,
                "selections": [
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
                    "name": "copies",
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
  "text": "query src_publish_Query(\n  $child: ObjectID\n  $id: ObjectID\n) {\n  me {\n    child(_id: $child) {\n      publish(_id: $id) {\n        ...publish_info\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment publish_info on Publish {\n  template\n  copies\n  name\n  from\n  to\n}\n"
};

module.exports = batch;
