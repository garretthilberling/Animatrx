class KitsuApi {
  baseUrl: string = "https://kitsu.io/api/edge/";
  getHeaders: object = {
    method: "GET",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
  };

  getAnimeByGenre(genre: string) {
    let url: string = this.baseUrl + `anime?filter%5Bcategories%5D=${genre}`;
    fetch(url, this.getHeaders)
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        // setStudentData(data);
        console.log(data);
      });
  }
}

export default new KitsuApi();
