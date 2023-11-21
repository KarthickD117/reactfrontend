import React from "react";

import "../bot/botcss/TVbrands.css";

const VR = (props) => {
  const VR = [
    {
      text: "META QUEST 2",
      handler: props.actionProvider.handlevr,
      id: 1,
    },
  ];

  const buttonsMarkup = VR.map((VR) => (
    <button key={VR.id} onClick={VR.handler} className="option-button">
      {VR.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default VR;
