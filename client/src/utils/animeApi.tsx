import { parameter, faveWlData } from "./types";

class KitsuApi {
  baseUrl: string = "https://kitsu.io/api/edge/";
  getHeaders: object = {
    method: "GET",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
  };

  async getAllAnime(
    setOutput: React.Dispatch<React.SetStateAction<object[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    offset: number
  ) {
    console.log(offset);
    let url =
      this.baseUrl + `/anime?page%5Blimit%5D=20&page%5Boffset%5D=${offset}`;
    await fetch(url, this.getHeaders)
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

  async searchAnime(
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

    await fetch(url, this.getHeaders)
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

  async getSingleAnime(
    id: string,
    setOutput: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) {
    let url = this.baseUrl + `anime/${id}`;
    await fetch(url, this.getHeaders)
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

  async getMultipleAnimeById(
    id: string,
    dateAdded: number,
    dataArr: any[],
    setOutput: React.Dispatch<React.SetStateAction<faveWlData[]>>,
    used: string[],
    setUsed: React.Dispatch<React.SetStateAction<string[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) {
    let url = this.baseUrl + `anime/${id}`;
    await fetch(url, this.getHeaders)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        if (!used.includes(data.data.id)) {
          setUsed((prev) => [...prev, data.data.id]);
          if (dataArr.findIndex((i) => i.id === id) === dataArr.length - 1) {
            // sort so most recently added appear first
            setOutput((prev) => [...prev].sort((a,b) => {
              return Number(b.dateAdded) - Number(a.dateAdded)
            }));
            setLoading(false);
          } else {
            setOutput((prev) => [...prev, { data: data.data, dateAdded: dateAdded }]);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }
}

export default new KitsuApi();
