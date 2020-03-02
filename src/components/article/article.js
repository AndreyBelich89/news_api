import React from "react";
import "./article.sass";

const Article = ({author, title, description, url, urlToImage}) =>
{
    return (
        <div className="article">
           <h2 className="article-title">{title}</h2>
           <img className="article-image" src={urlToImage || `https://www.google.com.ua/imgres?imgurl=https%3A%2F%2Fwebhostingmedia.net%2Fwp-content%2Fuploads%2F2018%2F01%2Fhttp-error-404-not-found.png&imgrefurl=https%3A%2F%2Fwebhostingmedia.net%2Ferror-404-not-found%2F&tbnid=3FRrEdac0bKxaM&vet=12ahUKEwiVg8LS8tjnAhVEX5oKHdAYDI8QMygGegUIARDhAQ..i&docid=1jEH1CBZOSzJkM&w=620&h=400&q=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8%20not-found&client=opera&ved=2ahUKEwiVg8LS8tjnAhVEX5oKHdAYDI8QMygGegUIARDhAQ`} alt="article"></img>
           <p className="article-description">{description}</p>
           <a className="article-link" href={url} rel="noopener noreferrer" target="_blank">Подробнее</a>
        </div>
    )
}

export default Article;