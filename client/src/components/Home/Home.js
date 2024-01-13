import React, {useState, useEffect }from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import Posts from '../Posts/Posts';
import Form from '../Form/Form'
import Pagination from '../Pagination';
import { useDispatch } from "react-redux";
import { getPosts, getPostsSearch } from '../../actions/posts';
import  useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);

    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') ||  1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {   
        dispatch(getPosts());
    }, [currentId, dispatch]);

    const handleKeyPress = (event) => {
        if(event.keyCode === 13) {
           searchPost();
        }
    }

    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostsSearch({ search, tags: tags.join(',')}));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        
        }else{
            navigate('');

        }

    }
    
    const handleAdd = (tag) => setTags([ ...tags, tag])
  
    
    const handleDelete = (tagtoDelete) => setTags(tags.filter((tag) => tag !== tagtoDelete))



return (

    <Grow in>
    <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
             <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
            <TextField 
            name="search" 
            variant='outlined' 
            label="Search Posts" 
            fullWidth
            onKeyDown={handleKeyPress}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <ChipInput 
            style={{ margin: '10px 0' }}
            value={tags}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onKeyDown={handleKeyPress}
            label="Type and press enter to add tags"
            variant='outlined'
            />
            <Button onClick={searchPost} className={classes.searchButton} color="primary" variant='contained'>Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
            {(!searchQuery && !tags.length) && (
                  <Paper elevation={6} className={classes.pagination}>
                  <Pagination page={page}/>
                 </Paper>
            )}
            </Grid>

        </Grid>
    </Container>
</Grow>
)}

export default Home