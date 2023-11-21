import React from "react";

import "../bot/botcss/Options.css";
const Sdbrands = (props) => {
  const Sdbrands = [
    {
      text: "APPLE",
      handler: props.actionProvider.applestream,
      id: 1,
    },
    { text: "AMAZON", handler: props.actionProvider.amazonstream, id: 2 },
    { text: "MI", handler: props.actionProvider.mistream, id: 3 },
    {
      text: "ROKU",
      handler: props.actionProvider.rokustream,
      id: 4,
    },
    { text: "TIVO", handler: props.actionProvider.tivostream, id: 5 },
  ];

  const buttonsMarkup = Sdbrands.map((Sdbrands) => (
    <button
      key={Sdbrands.id}
      onClick={Sdbrands.handler}
      className="option-button"
    >
      {Sdbrands.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Sdbrands;
