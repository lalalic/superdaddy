/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type core_timeManage = {|
  +goal: ?number;
  +score: ?number;
  +week: ?number;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "core_timeManage",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "goal",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "score",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "week",
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "scorePad",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "taskPad",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "taskPadEditor",
      "args": null
    }
  ],
  "type": "Plan"
};

module.exports = fragment;
