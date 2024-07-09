
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useContext } from 'react';
import SimpleAlertContext from './Context/SimpleAlertContext';

import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

export default function _SimpleAlert_(props) {

  const con= useContext(SimpleAlertContext)
  const {isAlertopen,setAlertopen} = con

  return (
    <Alert
     action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertopen((prev)=>{
                  return {
                    ...prev,
                  open:false
                  }
                })
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>}
    
     className={`${!isAlertopen.open?"hidden":""} rounded-none text-xl absolute top-16 z-20 w-full` }variant='filled' icon={<CheckIcon fontSize="inherit" />} severity={isAlertopen.sev}>
    {isAlertopen.msg}
    </Alert>
  );
}
