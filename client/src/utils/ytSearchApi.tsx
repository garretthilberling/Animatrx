import axios from "axios";
import { ytSearch } from "./types";
class YtApi {
  baseUrl: string = "https://www.googleapis.com/youtube/v3/";

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

  ytCreateConnection() {
    axios.create(this.getHeaders(this.baseUrl))
  }

  ytReq(params: string) {
    const search: ytSearch = {
        baseUrl: this.baseUrl,
        params: {
          part: "snippet",
          maxResults: 5,
          key: this.key,
        },
        withCredentials: true,
      }
      
     axios.create(search).get("/search", {
        params: {
          q: params,
        },
      }).then((response) => {
        if(response.data.ok) {
            response.data.json();
        }
        throw response.data;
      })
      .then(data => {
        // setOutput(data);
        console.log(data);
      })

    // console.log(response);
  }
}

export default new YtApi();
