/**
 * @flow
 * @relayHash 08663b5384813a72f61ce1c1a4cd4165
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type src_comment_create_MutationVariables = {|
  parent: any;
  content: string;
  type?: ?"photo" | "text";
|};
export type src_comment_create_MutationResponse = {|
  +knowledge_create_comment: ?{|
    +id: string;
    +createdAt: any;
  |};
|};
*/


/*
mutation src_comment_create_Mutation(
  $parent: ObjectID!
  $content: String!
  $type: CommentType
) {
  knowledge_create_comment(parent: $parent, content: $content, type: $type) {
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
        "name": "parent",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "content",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "type",
        "type": "CommentType",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "src_comment_create_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "content",
            "variableName": "content",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "parent",
            "variableName": "parent",
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "type",
            "variableName": "type",
            "type": "CommentType"
          }
        ],
        "concreteType": "KnowledgeComment",
        "name": "knowledge_create_comment",
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
  "name": "src_comment_create_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "parent",
        "type": "ObjectID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "content",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "type",
        "type": "CommentType",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "src_comment_create_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "content",
            "variableName": "content",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "parent",
            "variableName": "parent",
            "type": "ObjectID"
          },
          {
            "kind": "Variable",
            "name": "type",
            "variableName": "type",
            "type": "CommentType"
          }
        ],
        "concreteType": "KnowledgeComment",
        "name": "knowledge_create_comment",
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
  "text": "mutation src_comment_create_Mutation(\n  $parent: ObjectID!\n  $content: String!\n  $type: CommentType\n) {\n  knowledge_create_comment(parent: $parent, content: $content, type: $type) {\n    id\n    createdAt\n  }\n}\n"
};

module.exports = batch;
