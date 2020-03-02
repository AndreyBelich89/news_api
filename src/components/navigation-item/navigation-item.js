import React from "react";
import {NavLink} from "react-router-dom";
import "./navigation-item.sass";

class NavigationItem extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: props.value
        }
    }

    render()
    {
        const { label, click } = this.props;
        return (
            <li onClick={() => click(this.state.value)}><NavLink exact to="/pages/page-0">{label}</NavLink></li>
        );
    }
}


export default NavigationItem;