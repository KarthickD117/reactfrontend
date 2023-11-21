import React from "react";

import "../bot/botcss/TVbrands.css";

const Cdbrands = (props) => {
  const Cdbrands = [
    {
      text: "GOOGLE CHROMECAST",
      handler: props.actionProvider.castingdevice,
      id: 1,
    },
   
  ];

  const buttonsMarkup = Cdbrands.map((Cdbrands) => (
    <button
      key={Cdbrands.id}
      onClick={Cdbrands.handler}
      className="option-button"
    >
      {Cdbrands.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Cdbrands;
