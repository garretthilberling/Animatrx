import { parameter } from './types';

class KitsuApi {
  baseUrl: string = "https://kitsu.io/api/edge/";
  getHeaders: object = {
    method: "GET",
    headers: {
      "Accept": "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json"
    },
  };
  
  searchAnime(
    params: parameter[],
    setOutput: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) {
    let url = this.baseUrl + "anime?";
    for(let i = 0; i < params.length; i++) {
        url+=`filter%5B${params[i].filter}%5D=${params[i].by.replaceAll(" ", "%20")}`
    }
    fetch(url, this.getHeaders)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setOutput(data.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
}

export default new KitsuApi();
