import React from "react";

import "../bot/botcss/Options.css";
const Options = (props) => {
  const options = [
    {
      text: "TV",
      handler: props.actionProvider.handleTV,
      id: 1,
    },
    { text: "Mobile", handler: props.actionProvider.handleMobile, id: 2 },
    { text: "Laptop", handler: props.actionProvider.handleLaptop, id: 3 },
    {
      text: "Casting Device",
      handler: props.actionProvider.handlecd,
      id: 4,
    },
    { text: "XBOX", handler: props.actionProvider.handleXbox, id: 5 },
    { text: "Tab", handler: props.actionProvider.handleTab, id: 6 },
    { text: "Ipad", handler: props.actionProvider.handleIpad, id: 7 },
    { text: "VR", handler: props.actionProvider.handleVR, id: 8 },
    {
      text: "Streaming Device",
      handler: props.actionProvider.handlesd,
      id: 8,
    },
   
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
