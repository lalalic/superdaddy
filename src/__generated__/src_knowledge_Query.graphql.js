/**
 * @flow
 * @relayHash 456f3e4ddbd583921a1127d2103aeff9
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type src_knowledge_QueryResponse = {|
  +knowledge: ?{| |};
|};
*/


/*
query src_knowledge_Query(
  $id: ObjectID
  $child: ObjectID
) {
  knowledge(_id: $id) {
    ...info_knowledge
    id
  }
}

fragment info_knowledge on Knowledge {
  sale
  id
  inTask(child: $child)
  hasHomework
  hasPrint
  isMyWork
  title
  summary
  figure
  template
  ...content_knowledge
}

fragment content_knowledge on Knowledge {
  id
  title
  content
  summary
  createdAt
  category
  keywords
  figure
  author {
    name
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
      },
      {
        "kind": "LocalArgument",
        "name": "child",
        "type": "ObjectID",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "src_knowledge_Query",
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
        "concreteType": "Knowledge",
        "name": "knowledge",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "info_knowledge",
            "args": null
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
  "name": "src_knowledge_Query",
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
        "name": "child",
        "type": "ObjectID",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "src_knowledge_Query",
    "operation": "query",
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
            "name": "isMyWork",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "child",
                "variableName": "child",
                "type": "ObjectID"
              }
            ],
            "name": "inTask",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "hasHomework",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "hasPrint",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "sale",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "title",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "summary",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "figure",
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
            "name": "content",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "createdAt",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "category",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "keywords",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "author",
            "plural": false,
            "selections": [
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
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query src_knowledge_Query(\n  $id: ObjectID\n  $child: ObjectID\n) {\n  knowledge(_id: $id) {\n    ...info_knowledge\n    id\n  }\n}\n\nfragment info_knowledge on Knowledge {\n  sale\n  id\n  inTask(child: $child)\n  hasHomework\n  hasPrint\n  isMyWork\n  title\n  summary\n  figure\n  template\n  ...content_knowledge\n}\n\nfragment content_knowledge on Knowledge {\n  id\n  title\n  content\n  summary\n  createdAt\n  category\n  keywords\n  figure\n  author {\n    name\n    id\n  }\n}\n"
};

module.exports = batch;
