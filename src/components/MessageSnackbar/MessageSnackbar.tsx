import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearMessage } from '@/store/slices/messageSlice';

const MessageSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { message, messageType } = useAppSelector((state) => state.message);
  const open = !!message;

  const handleClose = () => {
    dispatch(clearMessage());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MessageSnackbar;
