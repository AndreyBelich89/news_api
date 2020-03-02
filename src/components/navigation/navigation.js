import React from "react";
import NavigationItem from "../navigation-item";
import "./navigation.sass";

const Navigation = ({navigationList, values, click}) =>
{
    return (
        <ul className="navigation">
            { navigationList.map((element, index) =>
                {
                    return <NavigationItem click={click} value={values[index]} label={element}/>
                })}
        </ul>
    );
}

export default Navigation;