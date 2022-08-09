class KitsuApi {
  baseUrl: string = "https://kitsu.io/api/edge/";
  getHeaders: object = {
    method: "GET",
    headers: {
      "Accept": "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json"
    },
  };

  getAnimeByGenre(
    genre: string,
    setOutput: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) {
    let url: string = this.baseUrl + `anime?filter%5Bcategories%5D=${genre}`;
    fetch(url, this.getHeaders)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setOutput(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  getAnimeByTitle(
    title: string,
    setOutput: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) {
    let queryTitle = title.replaceAll(" ", "%20");
    let url = this.baseUrl + `anime?filter%5Btext%5D=${queryTitle}`;
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
