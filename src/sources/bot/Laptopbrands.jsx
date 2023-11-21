import React from "react";
import "../bot/botcss/TVbrands.css";

const Laptopbrands = (props) => {
  const Laptopbrands = [
   
    { text: "APPLE", handler: props.actionProvider.appleLaptop, id: 1 },
  ];

  const buttonsMarkup = Laptopbrands.map((Laptopbrands) => (
    <button
      key={Laptopbrands.id}
      onClick={Laptopbrands.handler}
      className="option-button"
    >
      {Laptopbrands.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Laptopbrands;
