import { parameter } from "./types";

class KitsuApi {
  baseUrl: string = "https://kitsu.io/api/edge/";
  getHeaders: object = {
    method: "GET",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
  };

  getAllAnime(
    setOutput: React.Dispatch<React.SetStateAction<object[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    offset: number
  ) {
    console.log(offset);
    let url =
      this.baseUrl + `/anime?page%5Blimit%5D=20&page%5Boffset%5D=${offset}`;
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

  searchAnime(
    params: parameter[],
    setOutput: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    offset: number
  ) {
    let url = this.baseUrl + "anime?";
    for (let i = 0; i < params.length; i++) {
      let next = "";
      if (i !== params.length - 1) next = "?";
      url += `filter%5B${params[i].filter}%5D=${params[i].by.replaceAll(
        " ",
        "%20"
      )}${next}`;
    }
    url += `&page%5Blimit%5D=20&page%5Boffset%5D=${offset}`;
    console.log(url);

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

  getSingleAnime(
    id: string,
    setOutput: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) {
    let url = this.baseUrl + `anime/${id}`;
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

  getMultipleAnimeById(
    id: string,
    idArr: string[],
    setOutput: React.Dispatch<React.SetStateAction<string[]>>,
    used: string[],
    setUsed: React.Dispatch<React.SetStateAction<string[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) {
    let url = this.baseUrl + `anime/${id}`;
    fetch(url, this.getHeaders)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(used);
        if(!used.includes(data.data.id)) {
          setUsed(prev => [...prev, data.data.id]);
          setOutput((prev) => [...prev, data.data]);
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        if (idArr.indexOf(id) === idArr.length - 1) setLoading(false);
      });
  }
}

export default new KitsuApi();
