import React from "react";

import "../bot/botcss/TVbrands.css";

const TVbrands = (props) => {
  const TVbrands = [
    {
      text: "SAMSUNG",
      handler: props.actionProvider.samsungTv,
      id: 1,
    },
    { text: "LG", handler: props.actionProvider.lgtv, id: 2 },
    { text: "SONY", handler: props.actionProvider.sonytv, id: 3 },
    { text: "HISENSE", handler: props.actionProvider.hisensetv, id: 4 },
    { text: "VIZIO", handler: props.actionProvider.viziotv, id: 5 },
    { text: "TCL", handler: props.actionProvider.tcltv, id: 6 },
    { text: "TOSHIBA", handler: props.actionProvider.toshibatv, id: 7 },
  ];

  const buttonsMarkup = TVbrands.map((TVbrands) => (
    <button
      key={TVbrands.id}
      onClick={TVbrands.handler}
      className="option-button"
    >
      {TVbrands.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default TVbrands;
