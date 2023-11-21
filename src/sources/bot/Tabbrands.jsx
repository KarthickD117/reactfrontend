import React from "react";

import "../bot/botcss/Options.css";
const Tabbrands = (props) => {
  const Tabbrands = [
    {
      text: "IKALL",
      handler: props.actionProvider.ikall,
      id: 1,
    },
    { text: "LENOVO", handler: props.actionProvider.lenovotab, id: 2 },
    { text: "AMAZON", handler: props.actionProvider.amazontab, id: 3 },
    {
      text: "SAMSUNG",
      handler: props.actionProvider.samsungtab,
      id: 4,
    },
  ];

  const buttonsMarkup = Tabbrands.map((Tabbrands) => (
    <button
      key={Tabbrands.id}
      onClick={Tabbrands.handler}
      className="option-button"
    >
      {Tabbrands.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Tabbrands;