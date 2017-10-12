/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type info_knowledge = {|
  +id: string;
  +isMyWork: ?boolean;
  +inTask: ?boolean;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "child",
      "type": "ObjectID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "info_knowledge",
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
      "kind": "FragmentSpread",
      "name": "content_knowledge",
      "args": null
    }
  ],
  "type": "Knowledge"
};

module.exports = fragment;
