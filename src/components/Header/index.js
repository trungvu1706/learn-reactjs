import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/Code';
import Register from 'features/Auth/Register';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// Nav-link styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  link: {
    color: '#fff',
    textDecoration: 'none',
  },
}));

//  Dialog styles

function Header() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.menuButton} />

          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Shops
            </Link>
          </Typography>

          <NavLink to="/todos" className={classes.link}>
            <Button color="inherit">Todos</Button>
          </NavLink>

          <NavLink to="/albums" className={classes.link}>
            <Button color="inherit">Albums</Button>
          </NavLink>

          <Button color="inherit" onClick={handleClickOpen}>
            Register
          </Button>

          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title">
            <DialogContent>
              <DialogContentText>
                <Register />
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
