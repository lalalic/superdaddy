/**
 * @flow
 * @relayHash 3af1f37be81c130d09b1995615b924f9
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type create_tokens_MutationVariables = {|
  count?: ?number;
|};
export type create_tokens_MutationResponse = {|
  +file_tokens: ?$ReadOnlyArray<?{|
    +token: string;
  |}>;
|};
*/


/*
mutation create_tokens_Mutation(
  $count: Int
) {
  file_tokens(count: $count) {
    token
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "count",
        "type": "Int",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "create_tokens_Mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count",
            "type": "Int"
          }
        ],
        "concreteType": "FileToken",
        "name": "file_tokens",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
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
  "name": "create_tokens_Mutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "count",
        "type": "Int",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "create_tokens_Mutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count",
            "type": "Int"
          }
        ],
        "concreteType": "FileToken",
        "name": "file_tokens",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation create_tokens_Mutation(\n  $count: Int\n) {\n  file_tokens(count: $count) {\n    token\n  }\n}\n"
};

module.exports = batch;
