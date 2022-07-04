import React from "react";
import youtube from "./api/youtube";
import VideoList from "./components/VideoList";
import VideDetail from "./components/VideoDetail";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setselectedVideo] = useState(null);

  useEffect(() => {
    onTermSubmit("Car");
  }, []);

  const onTermSubmit = async (term) => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
      },
    });

    setVideos(response.data.items);
    setselectedVideo(response.data.items[0]);
  };

  const onVideoSelect = (video) => {
    setselectedVideo(video);
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
