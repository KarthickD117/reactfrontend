import React from "react";

import "../bot/botcss/Options.css";
const Xbox = (props) => {
  const Xbox = [
    {
      text: "XBOX ONE S",
      handler: props.actionProvider.xboxones,
      id: 1,
    },
    {
      text: "XBOX SERIES S",
      handler: props.actionProvider.xboxseriess,
      id: 2,
    },
  ];

  const buttonsMarkup = Xbox.map((Xbox) => (
    <button key={Xbox.id} onClick={Xbox.handler} className="option-button">
      {Xbox.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Xbox;
