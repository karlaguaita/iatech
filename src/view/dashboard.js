import React from 'react';
import {
    Redirect
} from "react-router-dom";
import config from '../config';
import theme from '../styles/colors';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';

const columns = [
    { id: 'Movie', label: 'Movie', minWidth: 120 },
    { id: 'Fecha', label: 'Fecha', minWidth: 50, align: 'right', },
    { id: 'Promedio', label: 'Promedio', minWidth: 50, align: 'right', },
    { id: 'Votos', label: 'Votos', minWidth: 50, align: 'right', },
    { id: 'Generos', label: 'Generos', minWidth: 100, align: 'right', },
  ];

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            movies: [],
            counts: 100,
            page: 0,
            movieSearch: '',
            genres: []
        }
    }

    componentDidMount(){
        this.setState({userName: localStorage.getItem('name')})
        this.getToken()
    }

    getToken(){

        const requestMetadata = {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "aplication/json",
            }
        };

        fetch(config.url+'authentication/token/new?api_key='+config.apiKey, requestMetadata)
            .then(res => res.json())
            .then(
                (result)=>{
                    console.log(result.request_token)
                    this.setState({
                        token: result.request_token
                    })
                    this.getGenres(result.request_token)
                    
                    
                }
            )
    }

    getGenres(token){
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+token,
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "aplication/json",
            }
        };

        fetch(config.url+'genre/movie/list?api_key='+config.apiKey, requestMetadata)
            .then(res => res.json())
            .then(
                (result)=>{
                    console.log(result.genres)
                    this.setState({
                        genres: result.genres
                    })
                    this.getMovies(token, 1)

                }
            )
    }

    getMovies(token, page){
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+token,
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "aplication/json",
            }
        };

        fetch(config.url+'movie/popular?api_key='+config.apiKey+'&page='+page, requestMetadata)
            .then(res => res.json())
            .then(
                (result)=>{
                    console.log(result)
                    this.setState({counts: result.total_results})
                    let aux = []
                    for (let index = 0; index < result.results.length; index++) {
                        aux.push({
                            'Movie': result.results[index].title,
                            'Fecha': result.results[index].release_date,
                            'Promedio': result.results[index].vote_average,
                            'Votos': result.results[index].vote_count,
                            'Generos': this.searchGenre(result.results[index].genre_ids)
                        })
                        
                    }
                    this.setState({movies: aux})

                }
            )
    }

    searchGenre(id){
        console.log(id)
        let value
        let resp = ''
        for (let index = 0; index < id.length; index++) {
            value = this.state.genres.filter(function(el) {
                //console.log(el){}
                return el.id === id[index]
            });
            //console.log(value)
            resp += value[0].name+', '
        }
        console.log(resp)
        return resp
    }

    onChangePage(e){
        this.setState({
            page: e
        })
        if (this.state.movieSearch == '')
        {
            this.getMovies(this.state.token, e+1)
        }
        else
        {
            this.search(this.state.movieSearch, e+1)
        }
    }

    search(e, page){
        this.setState({
            movieSearch: e
        })
        if (e == '')
        {
            this.getMovies(this.state.token, 1)
            return
        }
        
        console.log(e)
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+this.state.token,
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "aplication/json",
            }
        };

        fetch(config.url+'search/movie?api_key='+config.apiKey+'&page='+page+'&query='+e, requestMetadata)
            .then(res => res.json())
            .then(
                (result)=>{
                    console.log(result)
                    this.setState({
                        counts: result.total_results,
                        page: page - 1
                    })
                    let aux = []
                    for (let index = 0; index < result.results.length; index++) {
                        aux.push({
                            'Movie': result.results[index].title,
                            'Fecha': result.results[index].release_date,
                            'Promedio': result.results[index].vote_average,
                            'Votos': result.results[index].vote_count,
                            'Popularidad': result.results[index].popularity
                        })
                        
                    }
                    this.setState({movies: aux})

                }
            )
    }

    render() {
        return (
            <React.Fragment>
                <MuiThemeProvider theme={theme} style={{display: 'flex'}}>
                    <AppBar position="static" color="secondary">
                        <Toolbar>
                            <Typography variant="h6" style={{flexGrow: 1}}>
                                Movies
                            </Typography>
                            <Button color="inherit">{this.state.userName}</Button>
                        </Toolbar>
                    </AppBar>
                    <div style={{display: 'flex', height: '100px', width: '100%', alignItems: 'flex-end'}}>
                        <div style={{flex: 1}}>
                            <form style={{height: '70px', marginLeft: '20px'}} noValidate autoComplete="off" onChange={(e)=>this.search(e.target.value, 1)}>
                                <TextField id="outlined-basic" label="Buscar pelicula" variant="outlined" />
                            </form>
                        </div>
                        <div style={{flex: .5}}>

                        </div>
                        <div style={{flex: 1.5}}>

                        </div>
                    </div>
                    <div style={{display: 'flex', height: '100%', width: '100%'}}>
                        <Paper style={{width: '100%', marginLeft: '20px', marginRight: '20px'}}>
                            <TableContainer style={{maxHeight: 500}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                            >
                                            {column.label}
                                            </TableCell>
                                        ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.movies.map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[20]}
                                component="div"
                                count={this.state.counts}
                                rowsPerPage={20}
                                page={this.state.page}
                                onChangePage ={(e, newPage)=> this.onChangePage(newPage)}
                            />
                        </Paper>
                    </div>
                </MuiThemeProvider>
            </React.Fragment>
        )
    }
}

export default Dashboard