import React, { Component } from "react"
import "./app.css"
import {  StyleSheet, View } from "react-native"
import Header from "./Header"
import Menu from "./Menu"
import Footer from "./Footer"
import MapContainer from "./MapContainer"
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Axios from 'axios'

class App extends Component {
   // main app constructor
   constructor(props) {
    super(props);
        this.state = {
            togglestate: true,
            showingPlaces:[],
            query: '',
            data: [],
            locations: [{
                    id: 1,
                    name: "Goiânia",
                    title: "Goiânia capital do estado de Goiás",
                    position:{lat: -16.679983, lng: -49.256457},
                    description:
                          {Country:	"Brasil",
                          Governorate:	"Ronaldo Caiado",
                          Population:	"1,302,000",
                          Elevation:	"749 m over sea level",
                          TimeZone:	"UTC",
                          Longitude:	-49.256457,
                          Latitude:	-16.679983,
                          Airport:	"Aeroporto de Goiânia - Santa Genoveva/GO",}
                       },{
                    id: 2,
                    name: "São Paulo",
                    title: "São Paulo capital do estado de SP - São Paulo, Brazil’s vibrant financial center, is among the world's most populous cities",
                    position:{lat: -23.5475, lng: -46.63611},
                    description:
                        {Country:	"Brasil",
                            Governorate:	"João Doria",
                            Population:	"12.18 million (2018)",
                            Elevation:	"pedra da Mina, na serra da Mantiqueira (2.797 m).",
                            TimeZone:	"UTC-3",
                            Longitude:	-23.5505,
                            Latitude:	-46.6333,
                            Airport:	"Aeroportos:Congonhas-São Paulo Airport, Sao Paulo International Airport, Viracopos International Airport",}
                },{
                    id: 3,
                    name: "Uberlândia",
                    title: "Uberlândia is a municipality in the state of Minas Gerais",
                    position:{lat: -18.91861, lng: -48.27722},
                    description:
                        {Country:	"Brasil",
                            Governorate:	"Prefeito: Odelmo Leão ",
                            Population:	"683,247 (2018)",
                            Elevation:	"863,18 m",
                            TimeZone:	"UTC-3",
                            Longitude:	-18.9128,
                            Latitude:	-48.2755,
                            Airport:	"Aeroporto de Uberlândia (UDI)",}
                },{
                    id: 4,
                    name: "Brasília",
                    title: "Brasília, capital do brasil - Brasília, inaugurated as Brazil’s capital in 1960, is a planned city distinguished by its white, modern architecture, chiefly designed by Oscar Niemeyer.",
                    position:{lat: -15.77972, lng: -47.92972},
                    description:
                        {Country:	"Brasil",
                            Governorate:	"Presidente: Jair Messias Bolsonaro ",
                            Population:	"683,247 (2018)",
                            Elevation:	"1,060 m",
                            TimeZone:	"UTC-3",
                            Longitude:	-15.8267,
                            Latitude:	-47.9218,
                            Airport:	"International Airport of Brasilia",}
                },{
                    id: 5,
                    name: "Giza",
                    title: "Giza where pyramids located in Egypt",
                    position:{lat:30.00808, lng:31.21093 },
                    description:
                          {Country:	"Egypt",
                          Governorate:	"Al Jizah",
                          Population:	"2,443,203",
                          Elevation:	"	30 m over sea level",
                          TimeZone:	"EEST",
                          Longitude:	31.210930,
                          Latitude:	30.008080,
                          Airport:	"Cairo International Airport"}
                        },{
                    id: 6,
                    name: "Alexandria",
                    title: "Alexandria is the Mediterranean Sea shore of Egypt",
                    position:{lat: 31.21564, lng: 29.95527},
                    description:
                          {Country:	"Egypt",
                          Governorate:	"	Alexandria",
                          Population:	"3,811,516",
                          Elevation:	"0 m over sea level",
                          TimeZone:	"EEST",
                          Longitude:	29.955270,
                          Latitude:	31.215640,
                          Airport:	"Borg El Arab Airport",}
                        },{
                    id: 7,
                    name: "Hurghada",
                    title: "Hurghada is the Red Sea shore of Egypt",
                    position:{lat: 27.25738, lng: 33.81291},
                    description:
                          {Country:	"Egypt",
                          Governorate:	"Red Sea",
                          Population:	"95,622",
                          Elevation:	"11 m over sea level",
                          TimeZone:	"EEST",
                          Longitude:	33.812910,
                          Latitude:	27.257380,
                          Airport:	"Hurghada International Airport",}
                        },{
                    id: 8,
                    name: "Aswan",
                    title: "Aswan is a famous palace to visit in Egypt",
                    position:{lat:24.09082, lng:32.89942  },
                    description:
                          {Country:	"Egypt",
                          Governorate:	"Aswan",
                          Population:	"241,261",
                          Elevation:	"99 m over sea level",
                          TimeZone:	"EEST",
                          Longitude:	32.899420,
                          Latitude:	24.090820,
                          Airport:	"Aswan International Airport",}
                        },{
                    id:9,
                    name: "Al Fayyūm",
                    title: "Al Fayum is a city found in Muhafazat al Fayyum, Egypt",
                    position: {lat:29.30995, lng:30.8418},
                    description: {
                          Country:	"Egypt",
                          Governorate: "Al Fayyūm" ,
                          Population: "306,393",
                          Elevation: "29 m over sea level",
                          TimeZone:	"EEST",
                          Longitude: 30.8418,
                          Latitude: 29.30995,
                          Airport: "Cairo International Airport",}
                       },{
                  id:10,
                  name: "Al Minya",
                  title: "Al Minya is a city found in Al Minya, Egypt",
                  position: {lat:28.109880, lng:30.750300},
                  description: {
                          Country:	"Egypt",
                          Governorate:"Al Minya" ,
                          Population: "227,150",
                          Elevation: "	49 m over sea level",
                          TimeZone:	"EEST",
                          Longitude: 30.750300,
                          Latitude: 28.109880,
                          Airport: "El Minya Airport (EMY)", }
                        },{
                  id:11,
                  name: "Asyut",
                  title: "Asyut is a city found in Asyut, Egypt",
                  position: {lat: 27.180960, lng:31.183680},
                  description: {
                          Country:	"Egypt",
                          Governorate: "Asyut",
                          Population: "420,585",
                          Elevation: "	56 m over sea level",
                          TimeZone:	"EEST",
                          Longitude: 31.183680,
                          Latitude: 27.180960,
                          Airport: "Assiut Airport (ATZ)", }
                        },{
                  id:12,
                  name: "Suez",
                  title: "Suez is a city found in Al Suways, Egypt",
                  position: {lat: 29.973710,lng:32.526270 },
                  description: {
                          Country:	"Egypt",
                          Governorate: "	Al Suways",
                          Population: "488,125",
                          Elevation: "11 m over sea level",
                          TimeZone:	"EEST",
                          Longitude: 32.526270,
                          Latitude: 29.973710,
                          Airport: "Port Said Airport (PSD)",}
                        },{
                  id:13,
                  name: "	Luxor",
                  title: "Luxor is a city found in Luxor, Egypt",
                  position: {lat:25.698930 ,lng:32.642100 },
                  description: {
                          Country:	"Egypt",
                          Governorate: "	Luxor",
                          Population: "422,407",
                          Elevation: "89 m over sea level",
                          TimeZone:	"EEST",
                          Longitude: 32.642100,
                          Latitude: 25.698930,
                          Airport: "Luxor Airport (LXR)", }
                      },{
                  id:14,
                  name: "Marsa Matruh",
                  title: "Marsa Matruh is a city found in Muhafazat Matruh, Egypt",
                  position: {lat:31.352900 ,lng:27.237250 },
                  description: {
                          Country:	"Egypt",
                          Governorate: "Muhafazat Matruh",
                          Population: "62,042",
                          Elevation: "7 m over sea level",
                          TimeZone:	"EEST",
                          Longitude:27.237250 ,
                          Latitude: 31.352900,
                          Airport: "Marsa Matruh Airport (MUH)",}
                        },{
                  id:15,
                  name: "Al Mansurah",
                  title: "Al Mansurah is a city found in Muhafazat ad Daqahliyah, Egypt",
                  position: {lat: 31.036370,lng:31.380690 },
                  description: {
                          Country:	"Egypt",
                          Governorate: "Muhafazat ad Daqahliyah",
                          Population: "	420,195",
                          Elevation: "15 m over sea level",
                          TimeZone:	"EEST",
                          Longitude:31.380690 ,
                          Latitude: 31.036370,
                          Airport: "Cairo International Airport", }
                }
    ],
    }
    this.togglestate = this.togglestate.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.clearQuery = this.clearQuery.bind(this);

  }

// mount function
componentDidMount=()=>{
    this.getFsquareData();

}

//update the storage
componentWillUpdate(nextProps, nextState) {
  localStorage.setItem('data', JSON.stringify(nextState.data))

}
togglestate=(event)=> {
    this.setState((prevState) => ({
      togglestate: !prevState.togglestate
    }));
  }


  //fetch foursquare api function
getFsquareData = (query)=>{
        this.setState({
            data: []
    })
      //
          const endPoint="https://api.foursquare.com/v2/venues/explore?"
          const params= {
              client_id: 'U1XAOJAI5ORXPXF3REIC4GCEV2EPWEPISPDE1QTSXELDDO2Y', //'UCBUBFADHBK55015FZAGFQQVQRIVKVZ21HYB3YZF2EYUZ40M',
              client_secret: '20DSJ5WH1541JLEJ0SVBIXXIXOQZSGQXQUYWLMUXG4XPUZYO', //'1DSFNBLOZ2ZSLAFWB00HBZ014PIERWNBRLL3L2UC1XTH2BZN',
              ll: '-33.69111,-72.89583',
              query: query,
              near: `${query},BR`,
              v: '20200226',
              limit: 10,
              section: 'food'
    }
    // using axios to get the api data
      Axios.get(endPoint+ new URLSearchParams(params)).then(response=>{
        this.setState({data: response.data.response.groups[0].items})

        })
        .catch((error) =>{
          // Code for handling errors
          console.log("this is not cool, api not responding", error)

          });

      }


  // add an update state function
updateQuery = (query)=>{
  this.setState({query: query})
}


// add areset function
clearQuery = ()=>{
  this.setState({query: '' })
}


render() {
    // filter function
  const {data}= this.state
      if(this.state.query){
        const match = new RegExp(escapeRegExp(this.state.query), 'i')
        this.state.showingPlaces = this.state.locations.filter((place)=> match.test(place.name))
      }else{
          this.state.showingPlaces = this.state.locations
    }
          this.state.showingPlaces.sort(sortBy('name'))

    return (
      <View style={styles.app}>

        <View style={styles.header}>

        <h1
            style={{color: "#fff", marginBottom: 0 }}
            tabIndex="0"
            className={this.state.togglestate ? 'head' : 'animated jello'}
            alt="app name"
            onMouseEnter={this.togglestate}
            onMouseLeave={this.togglestate}
        >Brasil</h1>

        <Header />
        </View>
            <View style={styles.main}
                  className="main"
                  >
                  <View style={styles.menu}>
                          <Menu
                              tabIndex="1"
                              className="menu-bar"
                              locations={this.state.locations}
                              addAimation={this.state.togglestate}
                              query={this.state.query}
                              updateQuery={this.updateQuery}
                              clearQuery={this.clearQuery}
                              showingPlaces={this.state.showingPlaces}
                              filterQuery={this.filterQuery}
                              getFsquareData={this.getFsquareData}
                              data={data}
                              changeQuery={this.changeQuery}
                              title="city list"
                            />
                  </View>
                  <View style={styles.mapcontainer}>
                          <MapContainer

                          className="map"
                          locations={this.state.locations}
                          query={this.state.query}
                          updateQuery={this.updateQuery}
                          clearQuery={this.clearQuery}
                          showingPlaces={this.state.showingPlaces}
                          data={data}
                          />
            </View>
            </View>
                  <View style={styles.footer}>
                          <Footer
                                className="footer"
                                  />
                   </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1
  },

  header: {
    height: "17%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#1c262f",
   },

  main: {
    flex: 1,
    flexDirection: "row"
 },

  menu : {
    flex: 4,
    backgroundColor: "#2e3d49",
    overflow: "scroll",
  },

  mapcontainer: {
    flex: 6,
    backgroundColor: "#ddf0f0" ,
    boxShadow: "-4px -4px 29px 0px rgba(0,0,0,0.75)"
  },

  footer: {
    height: "10%",
    backgroundColor: "#1c262f",
    alignItems: "center",
  },

});
// add proptype
App.propTypes = {
  togglestate: PropTypes.bool,
  showingPlaces: PropTypes.array,
  query: PropTypes.string,
  data: PropTypes.array,
  locations:PropTypes.array,
  updateQuery : PropTypes.func,
  clearQuery: PropTypes.func,
  getFsquareData: PropTypes.func,

};
export default App;
