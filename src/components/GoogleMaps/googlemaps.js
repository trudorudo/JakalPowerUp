import React, { Component } from 'react';
import Footer from "../Sticky Footer/stickyfooter";
import Header from "../Header/header";
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
import Axios from 'axios';
import smallLogo from '../../images/smallLogo.png';
import bigLogo from '../../images/bigLogo.png';


class Maps extends Component {
  state = {
    places: [],
    placesCopy: [],
    radius: 9000,
    searchTerm: '',
    activeMarker: null
  }

  componentDidMount() {
    if (!localStorage.getItem('name')) {
      return this.props.history.push('/');
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          userLocation: { lat: latitude, lng: longitude },
        }, () => {
          Axios.post('/get-places', {
            lat: latitude, lng: longitude, radius: this.state.radius
          }).then(res => {
            this.setState({ places: res.data, placesCopy: res.data })
          }).catch(err => console.log('err occuredd', err))
        });
      });
  }

  handleRadiusChange = e => this.setState({ [e.target.name]: e.target.value }, () => {
    const { userLocation: { lat, lng }, radius } = this.state;
    Axios.post('/get-places', {
      lat, lng, radius
    }).then(res => this.setState({
      places: res.data, placesCopy: res.data
    })).catch(err => console.log('err occuredd', err))
  });

  handleSearchChange = e => {
    const { placesCopy } = this.state;
    const searchTerm = e.target.value;
    this.setState({
      searchTerm, places: placesCopy.filter(p => {
        return p.vicinity.toLowerCase().includes(searchTerm.toLowerCase()) || p.plus_code.compound_code.toLowerCase().includes(searchTerm.toLowerCase()) || p.zip.toLowerCase().includes(searchTerm.toLowerCase())
      })
    })
  }

  handleMouseEnter = marker => {
    const { places } = this.state;
    const foundMarker = places.find(p => p.id === marker.id);
    foundMarker.activeMarker = true;
    this.setState({places});
  }

  handleMouseLeave = marker => {
    const { places } = this.state;
    const foundMarker = places.find(p => p.id === marker.id);
    foundMarker.activeMarker = false;
    this.setState({places});
  }  

  render() {
    const { userLocation, places, radius, searchTerm } = this.state;
    return (
      <div className="map-container" style={{ textAlign: "center" }}>
        <Header />
        Radius: <select name="radius" value={radius} onChange={this.handleRadiusChange} >
          <option value={400}>0.25mi</option>
          <option value={800}>0.5mi</option>
          <option value={1200}>0.75mi</option>
          <option value={1600}>1.0mi</option>
        </select>
        <div className="whole-map" >
          <div className="map-side"> 
            <div className="search-box">
              <input value={searchTerm} onChange={this.handleSearchChange} placeholder="Search Results" />
            </div>
            {places.map((p, i) => (
              <div key={p.id} onMouseEnter={() => this.handleMouseEnter(p)} onMouseLeave={() => this.handleMouseLeave(p)} className="map-side__details">
                <div>
                  <p style={{ color: "red" }}>{`PowerUp Station ${i + 1}`}</p>
                  <p>{p.vicinity}</p>
                  {/* Zip Code: <p>{p.zip}</p> */}
                  <p>Rating: {p.rating}</p>
                </div>
                <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${p.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`} width="175" height="75" />
              </div>
            ))}
          </div>
          <div id="map-area">
            {userLocation && <Map google={this.props.google} initialCenter={userLocation} zoom={13} >
              {places.map((p, i) => (
                <Marker
                  key={i}
                  title={p.vicinity}
                  name={p.vicinity}
                  position={p.geometry.location}
                  icon={p.activeMarker ? bigLogo : smallLogo}
                />
              ))}
            </Map>}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(Maps);