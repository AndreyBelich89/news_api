import React from "react";
import { BrowserRouter,Switch, Route } from "react-router-dom";
import NewsApi from "../../services/news-api";
import IpInfoApi from "../../services/ipinfo-api";
import Article from "../article";
import ArticlesPage from "../../pages/articles-page";
import Pagination from "../pagination";
import Navigation from "../navigation";
import "./app.sass";

class App extends React.Component
{
    _newsApi = new NewsApi();
    _ipInfoApi = new IpInfoApi();
    MAX_ARTICLES_PER_PAGE = 5
    state = {
        articles: [],
        pagesCount: 0,
        country: "ua",
        navigationList: ["бизнес", "развлечения", "о главном", "здоровье", "наука", "спорт", "технологии"],
        navigationValues: ["business", "entertainment", "general", "health", "science", "sports", "technology"]
    }

    componentDidMount()
    {
        console.log("Component did mount");
        this._ipInfoApi.getUserCountry()
                       .then((response) => this.setState({country: response}))
                       .catch((error) => console.log("ipinfo error " + error));

        this._newsApi.getTopHeadlines({})
            .then((response) =>
            {
                const rest = (response.length % this.MAX_ARTICLES_PER_PAGE) ? 1 : 0;
                const pages = Math.floor(response.length / this.MAX_ARTICLES_PER_PAGE) + rest;
                this.setState(
                    {
                        articles: response,
                        pagesCount: pages
                    }
                )
            })
            .catch((error) => console.log("news api error " + error));     
    }

    createPage(ind, start, end, path)
    {
        return(
            <Route key={"route" + ind} exact path={path}>
                <ArticlesPage key={"articlePage" + ind}>
                { 
                    this.state.articles.slice(start, end).map((element, index) =>
                    {
                        console.log(`start = ${start}, end = ${end}`)
                        return <Article key={index + "article"}
                                        {...element} />
                    })
                }           
                </ArticlesPage>
            </Route>)
    }

    createRoutes = () =>
    {
        const { pagesCount} = this.state;
        const pageCounts = new Array(pagesCount).fill(0);
        let start = 0;
        let end = this.MAX_ARTICLES_PER_PAGE;
        return pageCounts.map((el, ind) =>
        {
            if(ind)
            {
                start = end
                end += this.MAX_ARTICLES_PER_PAGE; 
            }
            else
            {
                return [
                        this.createPage(ind, start, end, `/pages/page-${ind}`),
                        this.createPage(ind, start, end, `/`),
                ];
            }
            return(
                this.createPage(ind, start, end, `/pages/page-${ind}`)
            );

        })
    }

    downloadArticles = (categoryValue) =>
    {
        console.log("fetch new data");
        this._newsApi.getTopHeadlines({"category": categoryValue, "country": this.state.country})
                     .then((response) =>
                     {
                        const rest = (response.length % this.MAX_ARTICLES_PER_PAGE) ? 1 : 0;
                        const pages = Math.floor(response.length / this.MAX_ARTICLES_PER_PAGE) + rest;
                        this.setState(
                            {
                                articles: response,
                                pagesCount: pages
                            }
                        )
                     })
                     .catch((error) => console.log("error download category", error));
    }

    render()
    {
        console.log("In render", this.state.articles);
        const { pagesCount, navigationList, navigationValues} = this.state;
        return(
            <BrowserRouter>
                <div className="wrapper">
                    <h2>Страна пользователя {this.state.country}</h2>
                    <section>
                        <Navigation click={this.downloadArticles} values={navigationValues} navigationList={navigationList}/>
                        <div className="main-content">
                            <div>
                                <Switch>                        
                                    { this.createRoutes() }
                                </Switch>
                                <div className="pagination-wrapper">
                                    <Pagination pages={pagesCount}/>   
                                </div>
                            </div>
                        </div>                       
                    </section>        
                </div>
                
            </BrowserRouter>
        );
    }
}

export default App;