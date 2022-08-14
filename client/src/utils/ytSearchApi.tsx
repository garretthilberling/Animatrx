import axios from "axios";
class YtApi {
  baseUrl: string = "https://www.googleapis.com/youtube/v3/rest";

  key = process.env.REACT_APP_YT_API_KEY;
  getHeaders(baseUrl: string) {
    const response = {
      baseUrl: baseUrl,
      params: {
        part: "snippet",
        maxResults: 5,
        key: this.key,
      },
      withCredentials: true,
    };
    return response;
  }

  ytReq(params: string) {
    axios.create(this.getHeaders(this.baseUrl)).get("/search", {
        params: {
          q: params,
        },
      }).then(response => console.log(response))

    //   Promise.all([init, response])
    //   .then(data => console.log(data));

    // console.log(response);
  }
}

export default new YtApi();
