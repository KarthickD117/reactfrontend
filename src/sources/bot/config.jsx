// in config.js
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options";
import TVbrands from "./TVbrands";
import Mobilebrands from "./Mobilebrands";
import Laptopbrands from "./Laptopbrands";
import Cdbrands from "./Cdbrands";
import Xbox from "./Xbox";
import Tabbrands from "./Tabbrands";
import Ipad from "./Ipad";
import VR from "./VR";
import Sdbrands from "./Sdbrands";
import Table from "./Table";
import { getSessionStorage } from "../utils/sessionStorage";

const config = {
  initialMessages: [
    createChatBotMessage(`Hi ${getSessionStorage('firstname')}, How can I help you!`, {
      widget: "options",
    }),
  ],
  customStyles: {
    botMessageBox: {},
    chatButton: {},
  },

  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "handleTV",
      widgetFunc: (props) => <TVbrands {...props} />,
    },
    {
      widgetName: "handleLaptop",
      widgetFunc: (props) => <Laptopbrands {...props} />,
    },
    {
      widgetName: "handleMobile",
      widgetFunc: (props) => <Mobilebrands {...props} />,
    },
    {
      widgetName: "handlecd",
      widgetFunc: (props) => <Cdbrands {...props} />,
    },
    {
      widgetName: "handleXbox",
      widgetFunc: (props) => <Xbox {...props} />,
    },
    {
      widgetName: "handleTab",
      widgetFunc: (props) => <Tabbrands {...props} />,
    },
    {
      widgetName: "handleIpad",
      widgetFunc: (props) => <Ipad {...props} />,
    },
    {
      widgetName: "handleVR",
      widgetFunc: (props) => <VR {...props} />,
    },
    {
      widgetName: "handlesd",
      widgetFunc: (props) => <Sdbrands {...props} />,
    },
    //mobile brands
    {
      widgetName: "SamsungMobile",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "OneplusMobile",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "AppleMobile",
      widgetFunc: (props) => <Table {...props} />,
    },
    //tv brands
    {
      widgetName: "samsungTv",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "LgTv",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "SonyTv",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "HisenseTv",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "VizioTv",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "TclTv",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "ToshibaTv",
      widgetFunc: (props) => <Table {...props} />,
    },
    //laptop brand

    {
      widgetName: "AppleLaptop",
      widgetFunc: (props) => <Table {...props} />,
    },
    //casting device
    {
      widgetName: "GoogleCastingdevice",
      widgetFunc: (props) => <Table {...props} />,
    },
    //xbox
    {
      widgetName: "XboxonesXbox",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "XboxseriessXbox",
      widgetFunc: (props) => <Table {...props} />,
    },
    //tab brands
    {
      widgetName: "IkallTab",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "LenovoTab",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "AmazonTab",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "SamsungTab",
      widgetFunc: (props) => <Table {...props} />,
    },
    //ipad
    {
      widgetName: "AppleIpad",
      widgetFunc: (props) => <Table {...props} />,
    },
    //vr brands
    {
      widgetName: "MetaQuestVr",
      widgetFunc: (props) => <Table {...props} />,
    },
    //streaming brands
    {
      widgetName: "MiStream",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "AmazonStream",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "AppleStream",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "RokuStream",
      widgetFunc: (props) => <Table {...props} />,
    },
    {
      widgetName: "TivoStream",
      widgetFunc: (props) => <Table {...props} />,
    },
  ],
};

export default config;
