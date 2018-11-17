import React, { Component } from "react";
//import { Redirect } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import DatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";
import { BrowserRouter, Link, Route } from "react-router-dom";

import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
const token = localStorage.getItem("token");
//create the Navbar Component
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startdate: "",
      where: "",
      guests: "",
      enddate: "",
      fname: this.props.fname,
      lname: this.props.fname,
      lyp: "#",
      results: [],
      profileicon:
        "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png"
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleArriveChange = this.handleArriveChange.bind(this);
    this.handleDepartChange = this.handleDepartChange.bind(this);
    this.handleWhereChange = this.handleWhereChange.bind(this);
    this.handleGuestsChange = this.handleGuestsChange.bind(this);
    this.startSearch = this.startSearch.bind(this);
  }
  componentDidMount() {
    console.log("TOKEN HOME:", localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get("http://localhost:3001/photos/profile", {
          params: {
            email: sessionStorage.getItem("email")
          }
        })
        .then(response => {
          //update the state with the response data
          console.log("Image Res : ", response);
          let imagePreview = "data:image/jpg;base64, " + response.data;
          this.setState({
            profileicon: imagePreview
          });
        });
      this.props.onGetRender();
    }
  }

  startSearch = e => {
    //prevent page from refresh
    e.preventDefault();
  };

  handleArriveChange(date) {
    this.setState({
      startdate: date
    });
  }

  handleWhereChange = e => {
    this.setState({
      where: e.target.value
    });
  };

  handleGuestsChange = e => {
    this.setState({
      guests: e.target.value
    });
  };

  handleDepartChange(date) {
    this.setState({
      enddate: date
    });
  }

  //handle logout to destroy the cookie
  handleLogout = () => {
    localStorage.removeItem("token");
  };

  render() {
    var sdate = new Date(this.state.startdate);
    var year = sdate.getFullYear();
    var month = ("0" + (sdate.getMonth() + 1)).slice(-2);
    var day = ("0" + sdate.getDate()).slice(-2);
    var sd = `${year}-${month}-${day}`;

    var edate = new Date(this.state.enddate);
    var year = edate.getFullYear();
    var month = ("0" + (edate.getMonth() + 1)).slice(-2);
    var day = ("0" + edate.getDate()).slice(-2);
    var ed = `${year}-${month}-${day}`;

    // const newTo = {
    //   pathname: `/home/search?=${this.state.where}/${sd}/${ed}/${
    //     this.state.guests
    //   }`
    // };
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (token) {
      console.log("Able to read cookie");

      navLogin = (
        <div class="wrappernav-home">
          <link
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.3.1/css/flag-icon.min.css"
            rel="stylesheet"
          />
          <a href="#" class="flag-icon-background flag-icon-us flag inline">
            {"   "}
          </a>
        
          <div class="btn-group inline dropdownnav">
            <div
              class="btn-home inline bluefont-home"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src={this.state.profileicon} class="smallimg" />
              {"   "}
              {this.props.fname} {String(this.props.lname).charAt(0) + "."}{" "}
              <span class="glyphicon glyphicon-triangle-bottom smallicon" />
            </div>
            <ul class="dropdown-menu dropdown-menu-right bluefont">
              <li>
                {" "}
                <a class="dropdown-item bluefont" href="/inbox">
                  <p class="bluefont">
                    <span class=" glyphicon glyphicon-envelope dropdownicons bluefont" />
                    {"   "}
                    Inbox
                  </p>
                </a>
              </li>
              <br />
              <li>
                <a class="dropdown-item" href="/dashboard">
                  <p class="bluefont">
                    <span class="glyphicon glyphicon-briefcase dropdownicons" />{" "}
                    {"   "}
                    Dashboard
                  </p>
                </a>
              </li>
              <br />
              <li>
                <Link
                  to={{
                    pathname: "/profile",
                    state: {
                      fname: this.props.fname,
                      lname: this.props.lname,
                      abt: this.props.abt,
                      city_cntry: this.props.city_cntry,
                      company: this.props.company,
                      school: this.props.school,
                      hometown: this.props.hometown,
                      languages: this.props.languages,
                      gender: this.props.gender,
                      phone: this.props.phone,
                      photoname: this.props.photoname
                    }
                  }}
                  class="dropdown-item"
                >
                  <p class="bluefont">
                    <span class="glyphicon glyphicon-user dropdownicons" />
                    {"   "}
                    My Profile
                  </p>
                </Link>
              </li>
              <br />
              <li>
                <a class="dropdown-item" href="#">
                  <p class="bluefont">
                    <span class="glyphicon glyphicon-cog dropdownicons" />
                    {"   "} Account
                  </p>
                </a>
              </li>
              <li role="separator" class="divider dropdownicons" />

              <li>
                <a
                  class="dropdown-item"
                  href="/home"
                  onClick={this.handleLogout}
                >
                  <p class="bluefont">
                    <span class="glyphicon glyphicon-log-out dropdownicons" />{" "}
                    {"   "}
                    Logout
                  </p>
                </a>
              </li>
            </ul>
          </div>
          <a href="/inbox" class="bluefont-home">
            <span
              class="glyphicon-glyphicon-envelope envelope inline bluefont-home"
              aria-hidden="true"
            >
              <i class="fa fa-envelope bluefont-home " aria-hidden="true">
                {"  "}
              </i>
            </span>
          </a>


          <a
            href={
              sessionStorage.getItem("typeofaccount") == "owner" ? "/lyp" : "#"
            }
            class="buttonlyp default bluefont inline"
          >
            List your property
          </a>
          <div class="homeawayimg-home inline">
            <img src="http://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg" />
          </div>
        </div>
      );
    } else {
      //Else display login button
      navLogin = (
        <div class="wrappernav-home-nli">
          <link
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.3.1/css/flag-icon.min.css"
            rel="stylesheet"
          />
          <a href="#" class="flag-icon-background flag-icon-us flag inline">
            {"   "}
          </a>
         
          <div class="btn-group inline dropdownnav">
            <div
              class=" btn-home inline  bluefont-home"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {"   "}
              Login{" "}
              <span class="glyphicon glyphicon-triangle-bottom smallicon" />
            </div>
            <ul class="dropdown-menu dropdown-menu-right bluefont">
              <li>
                {" "}
                <a class="dropdown-item " href="/login">
                  <p class="bluefont">Login</p>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="/SignUp">
                  <p class="bluefont">Sign Up</p>
                </a>
              </li>
            </ul>
          </div>

            
          <button class="buttonlyp default bluefont inline">
            List your property
          </button>
          <div class="homeawayimg-home inline">
            <img src="http://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg" />
          </div>
        </div>
      );
    }
    let redirectVar = null;

    return (
      <div>
        {/* {redirectVar} */}

        <div class="homebg">
          <div class="header-bce-home bluefont-home">
            <div id="hal-home" class="navbar-brand bluefont-home">
              <a href="/home" class="bluefont-home">
                HomeAway
                <span class="sup">&reg;</span>
              </a>
            </div>
            <div class="" />
            <div class="homesearch">
              <h1 class="HeadLine">
                <span class="HeadLine__text">Book beach houses, cabins,</span>
                <span class="HeadLine__text">condos and more, worldwide</span>
              </h1>
              <div class="flex-container">
                <div class="inner-addon left-addon">
                  <i class="glyphicon glyphicon-map-marker" />
                  <input
                    type="search"
                    class="searchfields largesearch"
                    placeholder=" Where do you want to go?"
                    value={this.state.where}
                    onChange={this.handleWhereChange}
                  />
                </div>

                <div class="inner-addon left-addon">
                  <div id="gly">
                    <i class="glyphicon glyphicon-calendar" />{" "}
                  </div>
                  <div>
                    <DatePicker
                      className="searchfields smallsearch datepickercss"
                      placeholderText=" Arrive"
                      selected={this.state.startdate}
                      onChange={this.handleArriveChange}
                      minDate={moment()}
                    />
                  </div>
                </div>

                <div class="inner-addon left-addon">
                  <div id="gly2">
                    <i class="glyphicon glyphicon-calendar" />{" "}
                  </div>
                  <div>
                    <DatePicker
                      className="searchfields smallsearch datepickercss"
                      placeholderText=" Depart"
                      selected={this.state.enddate}
                      onChange={this.handleDepartChange}
                      minDate={this.state.startdate}
                    />
                  </div>
                </div>
                <div class="inner-addon left-addon">
                  <i class="glyphicon glyphicon-user" />{" "}
                  <input
                    type="number"
                    class="searchfields smallsearch"
                    placeholder=" Guests"
                    value={this.state.guests}
                    onChange={this.handleGuestsChange}
                    step="1"
                    min="1"
                  />
                </div>

                <Link
                  to={{
                    pathname: "/searchresults",
                    state: {
                      where: this.state.where,
                      startdate: sd,
                      enddate: ed,
                      guests: this.state.guests,
                      fname: this.props.fname,
                      lname: this.props.lname
                    }
                  }}
                  className="searchfields smallsearch homesearchbutton"
                >
                  <p class="srch">Search</p>
                </Link>
              </div>
              
            </div>
          </div>
        </div>
        {/* ----------------CAROUSEL------------------*/}

        
        {navLogin}
      </div>
    );
  }
}

//export default Home;
const mapStateToProps = state => {
  console.log("Statetoprops: ", state.login);
  return {
    fname: state.login.fname,
    lname: state.login.lname,
    abt: state.login.abt,
    city_cntry: state.login.city_cntry,
    company: state.login.company,
    school: state.login.school,
    hometown: state.login.hometown,
    languages: state.login.languages,
    gender: state.login.gender,
    phone: state.login.phone,
    photos: state.login.photos
  };
};

const mapDispatchStateToProps = dispatch => {
  return {
    onGetRender: cb => {
      console.log("TOKENH ", localStorage.getItem("token"));

      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get("http://localhost:3001/home", {
          params: {
            email: sessionStorage.getItem("email")
          }
        })
        .then(response => {
          dispatch({
            type: "HOME",
            payload: response.data,
            statusCode: response.status
          });
          //update the state with the response data
          console.log("Data  HOME: ", response.data);
        });
    }
  };
};

//export Home Component
export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(Home);
