import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

var axios = require('axios');

export default class InvitationDialog extends React.Component {
  state = {
    open: false,
    status: 'Send',
    email: '',
    errorFullname: '',
    errorEmail: '',
    errorConfirmEmail: ''
  };


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSend = () => {
    var self = this;
    this.setState({ status: 'Sending, please wait.' });
    axios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
      name: 'Fred',
      // usedemail@airwallex.com
      email: 'usedemail@airwallex.com'
    })
    .then(function (response) {
      self.setState({ status: 'All Done.' });
      console.log(response);
    })
    .catch(function (error) {
      self.setState({ status: error.message });
      console.log(error);
    });
  };

  validateFullname = (e) => {
    var fullname = e.target.value;
    if (fullname.length < 3) {
      this.setState({ errorFullname: 'Full name needs to be at least 3 characters long.' });
    } else {
      this.setState({ errorFullname: '' });
    }
  }

  validateEmail = (e) => {
    var email = e.target.value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      this.setState({ errorEmail: 'Email needs to be invalidation email format.' });
    } else {
      this.setState({ email: email});
      this.setState({ errorEmail: '' });
    }
  }

  validateConfirmEmail = (e) => {
    var confirmEmail = e.target.value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(confirmEmail).toLowerCase())) {
      this.setState({ errorConfirmEmail: 'Confirm email needs to be invalidation email format.' });
    } else {
      var email = this.state.email;
      if (confirmEmail !== email) {
        this.setState({ errorConfirmEmail: 'Confirm Email needs to match Email.' });
      } else {
        this.setState({ errorConfirmEmail: '' });
      }
    }
  }

  render() {
    return (
      <div>
        <Button ariant="contained" color="primary" onClick={this.handleClickOpen} >Request a invite</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Request an invite</DialogTitle>
          <DialogContent>
          <FormControl margin="normal" fullWidth error={this.state.errorFullname.length === 0 ? false : true }>
              <InputLabel htmlFor="fullname">Full name</InputLabel>
              <Input
                name="fullname"
                type="text"
                id="fullname"
                autoComplete="current-fullname"
                onBlur={this.validateFullname}
                autoFocus
              />
              <FormHelperText id="fullname-error-text">{this.state.errorFullname}</FormHelperText>
            </FormControl>
            <FormControl margin="normal" fullWidth error={this.state.errorEmail.length === 0 ? false : true }>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" name="email" autoComplete="email" onBlur={this.validateEmail}/>
              <FormHelperText id="email-error-text">{this.state.errorEmail}</FormHelperText>
            </FormControl>
            <FormControl margin="normal" fullWidth error={this.state.errorConfirmEmail.length === 0 ? false : true }>
              <InputLabel htmlFor="confirm-email">Confirm Email</InputLabel>
              <Input id="confirm-email" name="confirm-email" autoComplete="confirm-email" onBlur={this.validateConfirmEmail}/>
              <FormHelperText id="confirm-email-error-text">{this.state.errorConfirmEmail}</FormHelperText>
            </FormControl>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleSend}
            >
              {this.state.status}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
