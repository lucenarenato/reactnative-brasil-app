import React from "react";
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react";


export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    markerLoc: [],

}
// add function to show infowindow
onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,

});
 // close infowindow when map clicked
onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
    })
  }
};

// main component render function
render() {
  let {showingPlaces}=this.props

      return (
      <div
      title="egypt cities map"
      tabIndex="-1"
      >

          <Map
              tabIndex="2"
              google={this.props.google}
              title="search city location"
              onClick={this.onMapClicked}
              initialCenter={{lat:-16.110501, lng:-50.111624}} // lat:30.06263, lng:31.24967
              zoom={7}
          >

         {showingPlaces.map((place)=>(
                  <Marker
                  tabIndex="0"
                  key={place.id}
                  className="marker"
                  name={place.name}
                  position={place.position}
                  title={place.title}
                  animation= {this.props.google.maps.Animation.DROP}
                  onClick={this.onMarkerClick}
                  description=
                                {
                            "Country: " + place.description.Country+", Governorate: "+
                          place.description.Governorate +", Population: "+
                          place.description.Population +", Elevation: "+
                          place.description.Elevation +", TimeZone: "+
                          place.description.TimeZone +", Longitude: "+
                          place.description.Longitude +", Latitude: "+
                          place.description.Latitude +", Airport: "+
                          place.description.Airport
                          }
                        />
                ))}

                    <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                                <div>
                                  <h2>{this.state.selectedPlace.name}</h2>
                                  <p  style={{fontSize: '1em', lineHeight: 1.35, padding:5 ,maxWidth:"200px",
                                  wordWrap:"break-word"}}>
                                  {this.state.selectedPlace.description
                                  }
                                  </p>
                                </div>

                      </InfoWindow>

          </Map>

      </div>
    );

  }
}
// add proptypes
MapContainer.propTypes= {
  showingInfoWindow: PropTypes.bool,
  activeMarker: PropTypes.object,
  selectedPlace: PropTypes.object,
  markerLoc: PropTypes.array,
}

// supply needed keys for google maps
export default GoogleApiWrapper({
  apiKey: "AIzaSyA6r-0uKAveD9h5h16UOg_et35IXO2XW2A"
})(MapContainer);
