// import React, {useEffect} from 'react';
// import { Pagination, PaginationItem } from '@material-ui/lab';
// import {Link, useNavigate} from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPosts } from '../actions/posts';
// import useStyles from './styles';

// const Paginate = ({ page }) => {
//     const classes = useStyles();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const { numberOfPages } = useSelector((state) =>  state.posts);


//  useEffect(() => {
//     if(page) return dispatch(getPosts(page));
//  }, [page])



    
//     return (
//         <Pagination 
//         classes={{ul: classes.ul}}
//         count={numberOfPages}
//         page={Number(page) || 1}
//         variant="outlined"
//         color="primary"
//         renderItem={(item) => (
//             <PaginationItem
//             {...item}
//             component={Link}
//             to={`/posts?page=${item.page}`}
//           />
//         )}
//         />
//     )

// }


// export default Paginate

import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts';
import useStyles from './styles';

const Paginate = ({ page }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) {
      // Make sure to pass the page parameter to getPosts
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  const handlePageChange = (event, value) => {
    // Use the navigate function to update the URL
    navigate(`/posts?page=${value}`);
  };

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
      onChange={handlePageChange}
    />
  );
};

export default Paginate;
