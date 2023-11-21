import React from "react";

import "../bot/botcss/TVbrands.css";

const Ipad = (props) => {
  const Ipad = [
    {
      text: "APPLE",
      handler: props.actionProvider.appleipad,
      id: 1,
    },
   
  ];

  const buttonsMarkup = Ipad.map((Ipad) => (
    <button key={Ipad.id} onClick={Ipad.handler} className="option-button">
      {Ipad.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Ipad;
