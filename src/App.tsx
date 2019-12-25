import React, { useState } from 'react';
import { makeStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import './App.css';
import { TextField, Paper, Button, FormControl } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import logo from './resources/platter.svg';
import { useHistory} from "react-router-dom";
import { ISystemState } from './state-mgmt/store/system/types';

const ValidationTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);

interface OwnProps {
  doLogin: Function,
  login: ISystemState
}

// Main functional component login page
const App: React.FC<OwnProps> = (props: OwnProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // High level CSS styling for the Login page. Can be refactored to another file
  // We should use CSS Grid https://css-tricks.com/snippets/css/complete-guide-grid/
  const useStyles = () => {
    return makeStyles((theme: Theme) =>
      createStyles({
        container: {
          display: 'grid',
          gridTemplateColumns: '20em auto 25em auto 20em',
          gridTemplateRows: '5em 25em auto auto auto',
          gridGap: theme.spacing(3),
          height: '100vh',
          backgroundImage: 'url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 110px',
          backgroundSize: '100%'
        },
        margin: {
          margin: '0 15px 0 15px',
        },
        paper: {
          color: theme.palette.text.secondary,
          gridTemplateRows: '1% 30% auto 11% 5% 14% 10%',
          gridColumn: '3/span 1',
          gridRow: '2/span 1',
          display: 'grid',
          gridGap: theme.spacing(1)
        },
        divider: {
          margin: theme.spacing(2, 0),
        },
        backgroundContainer: {
          background: '#f0f2f5'
        }
      }),
    )()
  };
  // Test function to handle react-router and redux connection at the same time
  let historyApp = useHistory();
  const handleClick = () => {
    if (username !== "" && password !== "") {
      props.doLogin(username, password);
      historyApp.push('/home');
    }
    // silently do not submit the form as input color validation is enough to inform the user
  };
  const classes = useStyles();
  return (
    <div className={classes.backgroundContainer}>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div style={{ gridRow: '2', justifySelf: 'center', alignSelf: 'center', display: 'grid' }}>
            <img style={{ width: '50px', justifySelf: 'center', alignSelf: 'center' }} src={logo} alt="logo" />
            <Typography variant='h5'>Platter</Typography>
          </div>
          <ValidationTextField
            style={{ gridRow: '3' }}
            className={classes.margin}
            label="Username"
            required
            onChange={(e: any) => setUsername(e.target.value)}
            variant="outlined"
            id="validation-outlined-input"
          />
          <ValidationTextField
            style={{ gridRow: '4' }}
            className={classes.margin}
            label="Password"
            required
            onChange={(e: any) => setPassword(e.target.value)}
            type="password"
            variant="outlined"
            id="validation-outlined-input"
          />
          <Button
            onClick={() => handleClick()}
            style={{ gridRow: '6' }}
            className={classes.margin}
            variant="contained"
            color="primary">
            Login
            </Button>
        </Paper>
      </div>
    </div>
  );
}

export default App;
