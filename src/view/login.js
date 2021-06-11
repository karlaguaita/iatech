import React from 'react';
import {
    Redirect
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import theme from '../styles/colors';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import AlertModal from '../common/alertModal'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            alert: false,
            dashboard: false
        }
    }

    login(){
        if(this.state.name == '')
        {
            this.setState({alert: true})
        }
        else
        {
            localStorage.setItem('name', this.state.name)
            this.setState({dashboard:true})
        }
    }

    render() {
        if (this.state.dashboard)
        {
            return(<Redirect to="/dashboard"/>)
        }
        else
        {
            return (
                <React.Fragment>
                    <MuiThemeProvider theme={theme}>
                        <Container maxWidth='lg' disableGutters={true}>
                            <Typography component="div"  style={{ display: 'flex', height: '100vh', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <AlertModal
                                    isVisible={this.state.alert}
                                    title='Error'
                                    message="Debes colocar un nombre"
                                    onClose={() => this.setState({alert: false})}/>
                                <Box component="span" m={1} style={{borderStyle: 'solid', borderRadius: 30, borderWidth: '1px', borderColor: 'black', width: '400px', height: '250px'}}>
                                    <Typography variant="h4"  color='primary' gutterBottom style={{width: '100%', textAlign: 'center', fontFamily: 'Droid Sans', color: 'fc657e', marginTop: '10px'}}>
                                        The Movie Database
                                    </Typography>
                                    <Typography variant="h6" gutterBottom style={{width: '100%', textAlign: 'center'}}>
                                        Introduce tu  nombre  para continuar
                                    </Typography>
                                    <FormControl style={{width: '100%', display: 'flex', alignItems: 'center'}} justify="center">
                                        <InputLabel htmlFor="input-with-icon-adornment" color="secondary" style={{marginLeft: '10%'}}>Nombre</InputLabel>
                                        <Input
                                            id="input-with-icon-adornment"
                                            style={{width: '80%'}} 
                                            autoFocus={true}
                                            required={true}
                                            color="secondary"
                                            placeholder="Karla Guaita"
                                            onChange={(e) => this.setState({name: e.target.value})}
                                            value={this.state.name}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <Box textAlign='center' style={{marginTop:"20px"}}>
                                        <Button variant="contained" color="secondary" onClick={() => this.login()}>
                                            Acceder
                                        </Button>
                                    </Box>
                                </Box>
                            </Typography>
                        </Container>
                    </MuiThemeProvider>
                </React.Fragment>
            )
        }
        
    }
}

export default Login