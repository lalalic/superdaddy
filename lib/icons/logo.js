const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
var {SvgIcon} = require('material-ui');

const Logo = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <defs id="svgEditorDefs">
          <linearGradient gradientUnits="objectBoundingBox" id="lgrd2-peachpuff-sienna-h" spreadMethod="pad" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" style="stop-color:peachpuff;  stop-opacity:1;"/>
              <stop offset="100%" style="stop-color:sienna;  stop-opacity:1"/>
          </linearGradient>
          <linearGradient gradientUnits="objectBoundingBox" id="lgrd2-fire" spreadMethod="pad" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1"/>
              <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1"/>
          </linearGradient>
        </defs>
        <rect id="svgEditorBackground" x="0" y="0" width="48" height="48" style="fill: none; stroke: none;"/>
        <circle id="e11_circle" cx="12.679941177368164" cy="12.790197372436523" style="stroke-width: 1px; vector-effect: non-scaling-stroke; fill: none;" r="5.477619902498886" stroke="black"/>
        <circle id="e12_circle" cx="37.45174789428711" cy="9.629402160644531" style="stroke-width: 1px; vector-effect: non-scaling-stroke; fill: none;" r="3.1914183173428388" stroke="fuchsia"/>
        <path stroke="url(&quot;#lgrd2-fire&quot;)" id="e13_arc2" style="fill: none; stroke-width: 1px; vector-effect: non-scaling-stroke;"  d="M 6.65237 21.023 q 17.0536 25.4333 37.709 -11.7611"/>
        <text fill="black" x="15" y="45.3537" id="e15_texte" style="font-family: Georgia; font-size: 10px; stroke: none;" >CDN</text>
      </SvgIcon>
    );
  }

});

module.exports = Logo;
