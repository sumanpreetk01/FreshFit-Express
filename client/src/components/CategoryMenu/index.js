import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
// import { useDispatch, useSelector } from 'react-redux';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
// import { Button } from "@material-ui/core";
import './categorystyle.css';

const  CategoryMenu=()=> {
    
    const [state, dispatch] = useStoreContext();
    // const classes = useStyles();
    

    const { categories } = state;
    console.log(categories)
    const { loading, data} = useQuery(QUERY_CATEGORIES);
    
    const categoryMenu = ()=>{
        console.log(data)
        if (data) {
    
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: data.categories,
            });
            data.categories.forEach((category) => {
                idbPromise('categories', 'put', category);
            });
            } else if (!loading) {
                idbPromise('categories', 'get').then((categories) => {
                    // dispatch({
                    //     type: UPDATE_CATEGORIES,
                    //     categories: categories,
                    // });
                });
            }
    }
    useEffect(() => {
        categoryMenu();
    }, [data, dispatch]);

    // categoryMenu();

        const handleClick = (id) => {
            dispatch({
                type: UPDATE_CURRENT_CATEGORY,
                currentCategory: id,
            });
        };

        return (
            <div>
                <h3 className= "menu-title">Choose a category</h3>
               
                {categories?.map((item) => (
                  
                    <button className="Category-menu-button"
                     
                    key={item._id}
                    onClick={() => {
                        handleClick(item._id);
                    }}
                    >
                        {item.name}
                    </button>
                ))}
                
            </div>
            // <div>TEST</div>
        )
    }


export default CategoryMenu;