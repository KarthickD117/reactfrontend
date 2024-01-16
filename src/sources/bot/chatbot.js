import "../css/bot.css";
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import FormControl from "@mui/material/FormControl";
import { axiosEvent } from "../utils/axiosEvent";
import { devdb } from "../../context";
import ChatTable from "./chatbottable";
import { Grid } from "@mui/material";
import Icon from "@mui/material/Icon";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import logo from './4416622.png'
import { getSessionStorage } from "../utils/sessionStorage";
export default function Chat({openBot, handleChatBot}) {
  const dev = useContext(devdb);
  const chatcontainerref = useRef(null);
  const [dataa,setdataa] = useState([]);
  let ab;
  const [chat, setchat] = useState({ bot0: "hi" });
  const [taab, settaab] = useState();
  const [userchat, setuserchat] = useState("");
  const [at, setat] = useState([])
  const [assetb, setab] = useState([])
  const [open, setopen] = useState(openBot)
 
  const chatfunction = () => {
    let assettype
    let assetbrand
    if(at.length == 0){
      assettype = Object.keys(Object.groupBy(resultArray, ({ assetType }) => assetType))
      setat(assettype)
      assetbrand = Object.keys(Object.groupBy(resultArray, ({ assetBrand }) => assetBrand))
      setab(assetbrand)
    }
    else{
      assetbrand = assetb
      assettype = at
    }
    const ud = userchat.toUpperCase()
    if (assettype.includes(ud)){
      handleChat(ud, ud)
    }
    else if (assetbrand.includes(ud)){
      const grpby = Object.groupBy(resultArray.filter(row => row.assetBrand == ud),({ assetBrand }) => assetBrand)
      if(Object.values(Object.groupBy(Object.values(grpby)[0], ({assetType}) => assetType)).length ==1){
        const dat = Object.values(grpby)[0][0].assetType
        handleChat(ud, ud+'/'+dat)
      }
      else if (dataa.length != 0){
        handleChat(ud, ud+'/'+dataa)
      }
      else{
        chat[`user${(Object.keys(chat).length - 1) / 2}`] = ud;
        chat[`bot${Object.keys(chat).length / 2}`] = 'Please select from the list of option';
      }
    }
    else{
      chat[`user${(Object.keys(chat).length - 1) / 2}`] = ud;
      chat[`bot${Object.keys(chat).length / 2}`] = 'Please select from the list of option';
    }
    
    setuserchat('')
  } 
  console.log(chat)
  const handlechange = (e) => {
    setuserchat(e.target.value);
  };
  const handlekeyevent = (e) => {
    if (e.key === "Enter") {
      chatfunction();
    }
  };

  useEffect(() => {
    chatcontainerref.current?.scrollIntoView();
  }, [Object.values(chat)]);

  const [resultArray, setResultArray] = React.useState([]);

  const fetchData = async () => {
    try {
      const res = await axiosEvent.get("devices/").then((response) => {
        chat["bot0"] = Object.keys(
          Object.groupBy(response.data.data, ({ assetType }) => assetType)
        );
        setchat({ ...chat });
        setResultArray(response.data.data);
        dev.assetdb = response.data.data;
        dev.hasPerm = response.data.perm;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleBtn = (event) => {
    const val = event.target.textContent;
    handleChat(val, event.target.dataset.item)
  };

  const handleChat = (val, combinedData) => {
    chat[`user${(Object.keys(chat).length - 1) / 2}`] = combinedData;
    ab = Object.groupBy(
      resultArray.filter(
        (row) => row.assetType == val || row.assetBrand == val
      ),
      ({ assetBrand }) => assetBrand
    );
    let tab;
    
    if (Object.keys(ab).length == 1) {
      tab = [[combinedData]];
      settaab({ ...ab });
    } else {
      setdataa(val)
      tab = Object.keys(ab).map(row => row+"/"+val);
    }

    chat[`bot${Object.keys(chat).length / 2}`] = tab;
    setchat({ ...chat });
  }

  const initializeChat = () =>{
    if (dev.assetdb == "") {
      fetchData();
    const gpd = Object.groupBy(resultArray, ({ assetType }) => assetType);
    var xdata = Object.keys(gpd);
    console.log('hi',xdata)
    chat["bot0"] = xdata;
    setuserchat("")
    setchat({ ...chat });
    } else {
      chat['bot0'] = 
      (Object.keys(
        Object.groupBy(dev.assetdb, ({ assetType }) => assetType)
      ))
      setchat({...chat})
      setResultArray(dev.assetdb);
      console.log()
    }
    
  }
  useEffect(() => {
    initializeChat()
  }, []);

  if (resultArray.length == 0) {
    return null;
  }
  const CloseFullscreen =() =>{
    setopen(!open)
    Object.keys(chat).map(row => delete chat[row])
    initializeChat()
    handleChatBot()
  }

  return (
    <div>
    {open && <div className="bot">
      <div className="bot-header">
        <Grid container style={{backgroundColor:'#adc2eb', height:'100%'}}>
          <Grid item xs={2} height={'100%'}>
            <Icon sx={{ width:'80%', height:'100%'}}>
           <img className='img-item' src={logo} alt="alt" />
           </Icon></Grid>
          <Grid item xs={8} height={'100%'} sx={{alignContent:'center',paddingTop:'5%'}}>
            Bot
          </Grid>
          <Grid item xs={2} height={'100%'} >
           <IconButton onClick={CloseFullscreen}>
            <CloseFullscreenIcon />
           </IconButton>
          </Grid>
        </Grid>
      </div>
      <div className="bot-container">
        <div>Hi {getSessionStorage('firstname')} How can I help you!</div><div></div>
        {Object.values(chat).map((r, index) => (
          <div className="botchat">
            {Array.isArray(r) ? (
              r.map((row, indexx) =>
                Array.isArray(row) ? (
                  <ChatTable
                    array={resultArray}
                    row={row}
                  />
                ) : (
                  <Button
                    variant="contained"
                    data-item = {row}
                    sx={{
                      color: "white",
                      backgroundColor: "green",
                      margin: "2px 3px",
                      borderRadius:'10px',
                      '&:hover':{
                        backgroundColor:'lightgreen'
                      }
                    }}
                    size="small"
                    onClick={handleBtn}
                  >
                    {row.split('/').slice(0,1)}
                  </Button>
                )
              )
            ) : (
              <span className="valueee">&nbsp;&nbsp;{r.split('/').slice(0,1)}&nbsp;&nbsp;</span>
            )}
          </div>
        ))}
        <div ref={chatcontainerref} />
      </div>
      <div className="bot-footer">
        <OutlinedInput
          sx={{
            height: "100%",
            width: "100%",
            border: "none",
            "& legend": { display: "none" },
            "& fieldset": { top: 0 },
            "& .MuiInputLabel-shrink": {
              opacity: 0,
              transition: "all 0.2s ease-in",
            },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          }}
          autoFocus
          aria-label="Enter your text"
          onKeyDown={handlekeyevent}
          id="outlined-adornment-password"
          name="password"
          value={userchat || ''}
          onChange={handlechange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="send-btn"
                edge="end"
                onClick={chatfunction}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Please enter your message here"
        />
      </div>
    </div>}
    
    </div>
  );
}
