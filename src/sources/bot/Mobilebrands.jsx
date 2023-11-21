import React from "react";

import "../bot/botcss/TVbrands.css";

const Mobilebrands = (props) => {
  const Mobilebrands = [
    {
      text: "SAMSUNG",
      handler: props.actionProvider.handleSamsungMobile,
      id: 1,
    },
    { text: "ONEPLUS", handler: props.actionProvider.handleoneplus, id: 2 },
    { text: "APPLE", handler: props.actionProvider.handleapplem, id: 3 },
  ];

  const buttonsMarkup = Mobilebrands.map((Mobilebrands) => (
    <button
      key={Mobilebrands.id}
      onClick={Mobilebrands.handler}
      className="option-button"
    >
      {Mobilebrands.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Mobilebrands;
