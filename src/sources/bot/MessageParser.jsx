import React from "react";

class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    console.log(message);
    const lowercase = message.toLowerCase();

    if (lowercase.includes("hello")) {
      this.actionProvider.greet();
    }

    if (lowercase.includes("TV") || lowercase.includes("tv")) {
      this.actionProvider.handleTV();
    }

    if (lowercase.includes("Mobile") || lowercase.includes("mobile")) {
      this.actionProvider.handleMobile();
    }
    if (lowercase.includes("Laptop") || lowercase.includes("laptop")) {
      this.actionProvider.handleLaptop();
    }
    if (lowercase.includes("Xbox") || lowercase.includes("xbox")) {
      this.actionProvider.handleXbox();
    }
    if (lowercase.includes("Tab") || lowercase.includes("tab")) {
      this.actionProvider.handleTab();
    }
    if (lowercase.includes("Ipad") || lowercase.includes("ipad")) {
      this.actionProvider.handleIpad();
    }
    if (lowercase.includes("Vr") || lowercase.includes("vr")) {
      this.actionProvider.VR();
    } 
  }
}

export default MessageParser;
