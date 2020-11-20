import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class UserSucessfulRegistration extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            vertical: 'top',
            horizontal: 'center'
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
            this.props.close();
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogContent>
                        <DialogContentText>
                            Registration Sucessful&nbsp;&nbsp;
                        <CloseIcon style={{color:"red",marginBottom:"-0.2em"}}autoFocus onClick={this.handleClose} color="primary"/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

export default UserSucessfulRegistration;

