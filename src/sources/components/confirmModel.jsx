import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { axiosEvent } from '../utils/axiosEvent';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    height: '30%',
    p: 4,
  };
  
export const Models = ({open, show, handleClose, events, updateData}) => {
    const handleEvent = () => {
        updateData()
        handleClose()
    }
    const URL = events === 'request' ? 'devicereport/borrowdevice/'
        : 'devicereport/returndevice/'
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axiosEvent.post(URL,
            show
          ).then(response => {
            console.log('response is ', response)
          });
        } catch (error) {
          console.log(error);
        }
        handleEvent()
      };
    return (
    <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style }>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Action
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
               Do you want to {events} asset number {show.assetNo}
            </Typography>
        <Button
          sx={{ top: 30, width: "100px" }}
          variant="contained"
          color="primary"
          onClick={ handleSubmit}
        >
          SUBMIT
        </Button>
        <Button
          sx={{ left: 130, top: 30, width: "100px" }}
          variant="contained"
          color="primary"
          onClick={handleEvent}
        >
          NO
        </Button>
          </Box>
        </Modal>
        );
  }
  