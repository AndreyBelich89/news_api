export default class NewsApi
{
    _apiKey = "230975e7e2874c88ad5f8c64e5c87be5";
    _url = "http://newsapi.org/v2/";
    _availableParams = [
        {
            name: "endpoints",
            values: ["top-headlines", "everything"]
        },
        {
            name: "country",
            values: ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn",
             "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie",
             "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl",
             "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si",
             "sk", "th", "tr", "tw", "ua", "us", "ve", "za"]
        },
        {
            name: "category",
            values: ["business", "entertainment", "general", "health", "science", "sports", "technology"]
        },
        {
            name: "pageSize",
            value: 100
        }
    ];

    createQuery(params={})
    {
        const endpoints = this._availableParams[0].values.includes(params.endpoints) ? 
                                                  params.endpoints : this._availableParams[0].values[0];
        let query = `${this._url}${endpoints}?apiKey=${this._apiKey}`;
        query += this._availableParams[1].values.includes(params.country) ?
                                                  `&country=${params.country}` : `&country=ua`;
        query += this._availableParams[2].values.includes(params.category) ?
                                                  `&category=${params.category}` : ``;
        query += params.pageSize <= this._availableParams[3].values ?
                                                  `&pageSize=${params.pageSize}`: `&pageSize=${this._availableParams[3].value}`;
        return query;
    }

    async getResource(params={})
    {
        const url = this.createQuery(params);
        console.log("show me url:", url);
        console.log("SHOW ME params: ", params);
        const response = await fetch(url);
        if(response.status !== 200)
        {
            console.log("Some problems");
            throw new Error("Status not equal 200");
        }
        return await response.json();
    }

    async getTopHeadlines(params)
    {
        const data = await this.getResource(params);
        console.log(data.articles.length);
        console.log(data.articles[0]);
        const articles = data.articles.map(({author, title, description, url, urlToImage}) =>
        {
            return {
                author,
                title,
                description,
                url,
                urlToImage
            }
        });
        return articles;
    }
}