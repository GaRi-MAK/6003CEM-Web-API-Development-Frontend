const React = require('react');
const ReactDom = require('react-dom');
const axios = require('axios');

class Breed extends React.Component {
  constructor() {
    super();
    this.state = {
      imgURL: "https://images.dog.ceo/breeds/sheepdog-shetland/n02105855_15882.jpg",
      breed: [""],
      select: ""
    }
  }

  getDogImage = () => {
    const { select } = this.state;
    let url = "https://dog.ceo/api/breed/" + select + "/images/random";
    axios
      .get(url)
      .then(response => {
        this.setState({
          imgURL: response.data.message
        });
        console.log(response.data.message)
      })
      .catch(err => {
        console.log("error fetching image");
      });
  };

  getBreed = () => {
    const { breed } = this.state;
    axios
      .get("https://dog.ceo/api/breeds/list")
      .then(response => {
        this.setState({
          breed: breed.concat(response.data.message)
        })
      })
      .catch(err => {
        console.log("error fetching list");
      });
  }

  getRandomImage = () => {
    const { breed } = this.state;
    const randomDog = Math.floor(Math.random() * breed.length);
    const choice = (randomDog === 0 ? "wolfhound" : breed[randomDog]);

    console.log(randomDog);
    let url = "https://dog.ceo/api/breed/" + choice + "/images/random"
    axios
      .get(url)
      .then(response => {
        this.setState({
          imgURL: response.data.message,
          select: choice
        });
      })
      .catch(err => {
        console.log("error fetching image");
      });
    console.log(url);
  };

  handleSelect = (e) => {
    this.setState({
      select: e.target.value
    })
  }


  componentDidMount() {
    this.getBreed();
  }


  render() {

    const { breed, imgURL, select } = this.state;

    return (
      <div className="postPage">
        <div className="leftSide">
          <div className="post" id="individual">

            <div className="title"><h1>Dogs by Breed</h1></div>
            <div className="bodyt">
              <h2>Choose a dog from the drop down menu and click submit.</h2><br />
              <select value={select} onChange={this.handleSelect}>
                {breed.map(e =>
                  <option value={e}> {e} </option>
                )}
              </select><br />
              <button id="submit" disabled={!select} onClick={this.getDogImage}>submit</button><button onClick={this.getRandomImage}>random</button>
            </div>
            <div className="footer"><h1>Breed: {select}</h1></div></div>
        </div>
        <div className="rightSide"><div className="loginContainer"><img alt="dog" src={imgURL} /></div></div>

      </div>
    )
  }
}

export default Breed