/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type taskPadEditor = {|
  +todos: ?$ReadOnlyArray<?{|
    +content: ?string;
    +hidden: ?boolean;
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "taskPadEditor",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Todo",
      "name": "todos",
      "plural": true,
      "selections": [
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
          "name": "hidden",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Plan"
};

module.exports = fragment;
