import React from "react";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet = () => {
    const message = this.createChatBotMessage("Hello friend.");
    this.addMessageToState(message);
  };

  handleTV = () => {
    const message = this.createChatBotMessage("Here are the availabe brands", {
      widget: "handleTV",
    });

    this.addMessageToState(message);
  };

  handleMobile = () => {
    const message = this.createChatBotMessage("Here are the availabe brands", {
      widget: "handleMobile",
    });

    this.addMessageToState(message);
  };

  handleLaptop = () => {
    const message = this.createChatBotMessage("Here are the availabe brands", {
      widget: "handleLaptop",
    });

    this.addMessageToState(message);
  };

  handlecd = () => {
    const message = this.createChatBotMessage("Here are the availabe brands", {
      widget: "handlecd",
    });

    this.addMessageToState(message);
  };

  handleXbox = () => {
    const message = this.createChatBotMessage("Here are the availabe brands", {
      widget: "handleXbox",
    });

    this.addMessageToState(message);
  };
  handleTab = () => {
    const message = this.createChatBotMessage("Here are the availabe brands", {
      widget: "handleTab",
    });

    this.addMessageToState(message);
  };

  handleIpad = () => {
    const message = this.createChatBotMessage("Here are the availabe brands", {
      widget: "handleIpad",
    });

    this.addMessageToState(message);
  };

  handleVR = () => {
    const message = this.createChatBotMessage("Here are the availabe brands", {
      widget: "handleVR",
    });

    this.addMessageToState(message);
  };

  handlesd = () => {
    const message = this.createChatBotMessage("Here are the availabe brands", {
      widget: "handlesd",
    });

    this.addMessageToState(message);
  };
  //mobile brands--------------------------------------------------------------------------------------------------
  handleSamsungMobile = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "SamsungMobile",
    });

    this.addMessageToState(message);
  };

  handleoneplus = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "OneplusMobile",
    });

    this.addMessageToState(message);
  };

  handleapplem = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "AppleMobile",
    });

    this.addMessageToState(message);
  };
  //tv brands--------------------------------------------------------------------------------------------------------
  samsungTv = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "samsungTv",
    });

    this.addMessageToState(message);
  };
  sonytv = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "SonyTv",
    });

    this.addMessageToState(message);
  };
  lgtv = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "LgTv",
    });

    this.addMessageToState(message);
  };
  hisensetv = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "HisenseTv",
    });

    this.addMessageToState(message);
  };
  tcltv = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "TclTv",
    });

    this.addMessageToState(message);
  };
  viziotv = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "VizioTv",
    });

    this.addMessageToState(message);
  };
  toshibatv = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "ToshibaTv",
    });

    this.addMessageToState(message);
  };
  //laptop brand-----------------------------------------------------------------------------------------------------
  appleLaptop = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "AppleLaptop",
    });

    this.addMessageToState(message);
  };
  //casting device------------------------------------------------------------------------------------------------
  castingdevice = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "GoogleCastingdevice",
    });

    this.addMessageToState(message);
  };
  //xbox-----------------------------------------------------------------------------------------------------------
  xboxones = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "XboxonesXbox",
    });

    this.addMessageToState(message);
  };
  xboxseriess = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "XboxseriessXbox",
    });

    this.addMessageToState(message);
  };
  //tab brands-----------------------------------------------------------------------------------------------------
  ikall = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "IkallTab",
    });

    this.addMessageToState(message);
  };
  amazontab = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "AmazonTab",
    });

    this.addMessageToState(message);
  };
  samsungtab = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "SamsungTab",
    });

    this.addMessageToState(message);
  };
  lenovotab = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "LenovoTab",
    });

    this.addMessageToState(message);
  };
  //ipad--------------------------------------------------------------------------------------------------------
  appleipad = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "AppleIpad",
    });

    this.addMessageToState(message);
  };
  //vr--------------------------------------------------------------------------------------------------------------
  handlevr = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "MetaQuestVr",
    });

    this.addMessageToState(message);
  };
  //streaming devices----------------------------------------------------------------------------------------------
  mistream = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "MiStream",
    });

    this.addMessageToState(message);
  };
  applestream = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "AppleStream",
    });

    this.addMessageToState(message);
  };
  rokustream = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "RokuStream",
    });

    this.addMessageToState(message);
  };
  tivostream = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "TivoStream",
    });

    this.addMessageToState(message);
  };
  amazonstream = () => {
    const message = this.createChatBotMessage("Here are the availabe devices", {
      widget: "AmazonStream",
    });

    this.addMessageToState(message);
  };
  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
