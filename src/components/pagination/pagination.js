import React from "react";
import {NavLink} from "react-router-dom";
import "./pagination.sass";

const Pagination = ({ pages, onChangePage }) =>
{
    return (
        <ul className="pagination">
            { 
               new Array(pages).fill(0)
                               .map((element, index) =>
                               {
                                   return (<li className="pagination-item"
                                               key={"pagination" + index}>
                                               <NavLink exact to={`/pages/page-${index}`}>{index + 1}</NavLink></li>)
                               }) 
            }
        </ul>
    );
}

export default Pagination;