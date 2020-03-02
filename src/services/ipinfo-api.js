export default class IpInfoApi
{
    _token = "686525d85c7fe0";

    async getResource()
    {
        const response = await fetch(`http://ipinfo.io?token=${this._token}`);
        if(!response.ok)
        {
            throw new Error("Some problems");
        }
        return await response.json();
    }

    async getUserCountry()
    {
        const response = await this.getResource();
        return response.country;
    }
}