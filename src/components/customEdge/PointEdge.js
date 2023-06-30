import React from "react";

const PointedEdge = ({ id, sourceX, sourceY, targetX, targetY, style }) => {
  // Calculate the angle between source and target
  const angle = Math.atan2(targetY - sourceY, targetX - sourceX);

  // Calculate the coordinates for the tip of the arrow
  const arrowTipX = targetX;
  const arrowTipY = targetY;

  // Calculate the coordinates for the two sides of the arrow
  const arrowSide1X = arrowTipX - Math.cos(angle - Math.PI / 6) * 10;
  const arrowSide1Y = arrowTipY - Math.sin(angle - Math.PI / 6) * 10;
  const arrowSide2X = arrowTipX - Math.cos(angle + Math.PI / 6) * 10;
  const arrowSide2Y = arrowTipY - Math.sin(angle + Math.PI / 6) * 10;

  return (
    <g>
      {/* Draw the line */}
      <line x1={sourceX} y1={sourceY} x2={targetX} y2={targetY} style={style} />

      {/* Draw the arrowhead */}
      <path
        d={`M${arrowSide1X},${arrowSide1Y} L${arrowTipX},${arrowTipY} L${arrowSide2X},${arrowSide2Y}`}
        fill={style.stroke}
      />
    </g>
  );
};
export default PointedEdge;
