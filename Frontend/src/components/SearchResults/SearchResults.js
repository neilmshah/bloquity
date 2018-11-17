import React, { Component, Fragment } from "react";
import "../../App.css";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Pagination from "../Pagination/Pagination";
import paginate from "../../utils/paginate";
const token = localStorage.getItem("token");
const today = new Date().toISOString().slice(0, 10);
const path = require("path");

//Define a Login Component
class SearchResults extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    console.log(this.props.location.state);
    const {
      where,
      startdate,
      enddate,
      guests,
      fname,
      lname
    } = this.props.location.state;
    //maintain the state required for this component
    this.state = {
      where: where,
      startdate: startdate,
      enddate: enddate,
      guests: guests,
      lyp: "#",
      properties: [],
      fname: fname,
      lname: lname,
      profileicon:
        "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png",
      pageSize: 10,
      currentPage: 1,
      pricefilter: null,
      fromfilter: null,
      tofilter: null,
      roomFilter: null
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handlePriceFilter = this.handlePriceFilter.bind(this);
    this.handleRoomFilter = this.handleRoomFilter.bind(this);
    this.handleToFilter = this.handleToFilter.bind(this);
    this.handleFromFilter = this.handleFromFilter.bind(this);

    //Bind the handlers to this class
  }

  componentDidMount() {
    if (token) {
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
            profilepic: imagePreview,
            profileicon: imagePreview
          });
        });
    }

    this.props.onGetRender(
      this.state.where,
      this.state.startdate,
      this.state.enddate,
      this.state.guests
    );
  }

  handleLogout = () => {
    localStorage.removeItem("token");
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handlePriceFilter = e => {
    this.setState({
      pricefilter: e.target.value
    });
  };
  handleFromFilter = e => {
    this.setState({
      fromfilter: e.target.value
    });
  };
  handleToFilter = e => {
    this.setState({
      tofilter: e.target.value
    });
  };
  handleRoomFilter = e => {
    this.setState({
      roomfilter: e.target.value
    });
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    let navLogin = null;

    const { pageSize, currentPage } = this.state;

    var propnew = this.props.properties;

    propnew.map(r => {
      console.log("DATE: ", new Date(r.startdate));
    });

    if (this.state.pricefilter != null && this.state.pricefilter != "")
      propnew = propnew.filter(r => r.nbr <= this.state.pricefilter);
    if (this.state.roomfilter != null && this.state.roomfilter != "")
      propnew = propnew.filter(r => r.rooms == this.state.roomfilter);
    if (this.state.fromfilter != null) {
      propnew = propnew.filter(r => {
        return new Date(r.startdate) <= new Date(this.state.fromfilter);
      });
    }
    if (this.state.tofilter) {
      propnew = propnew.filter(r => {
        return new Date(r.enddate) >= new Date(this.state.tofilter);
      });
    }
    const properties = paginate(propnew, currentPage, pageSize);
    console.log("PROPERTIES", properties);
    document.body.style.backgroundColor = "white";

    // if (this.state.fromfilter != null && this.state.fromfilter != "")
    //   propnew = propnew.filter(r => r.rooms == this.state.roomfilter);

    let details = properties
      //.filter(r => r.rooms == 1)
      .map(r => {
        return (
          <tr>
            <div class="srtabledata card">
              {" "}
              <h3>
                <Link
                  to={{
                    pathname: "/property",
                    state: {
                      propnum_pk: r._id,
                      email: r.email,
                      where: this.state.where,
                      startdate: this.state.startdate,
                      enddate: this.state.enddate,
                      guests: this.state.guests,
                      fname: this.state.fname,
                      lname: this.state.lname,
                      country: r.country,
                      proptype: r.proptype,
                      streetaddr: r.streetaddr,
                      unit: r.unit,
                      city: r.city,
                      state: r.state,
                      zip: r.zip,
                      headline: r.headline,
                      propdesc: r.propdesc,
                      rooms: r.rooms,
                      bathrooms: r.bathrooms,
                      accomodates: r.accomodates,
                      startdate: r.startdate,
                      enddate: r.enddate,
                      nbr: r.nbr,
                      minstay: r.minstay,
                      cf: r.cf,
                      owner_fname: r.owner_fname,
                      owner_lname: r.owner_lname
                    }
                  }}
                >
                  <td> {r.headline}</td>
                </Link>
              </h3>
              <td> {r.rooms} Rooms</td>
              <br />
              <td>
                {" "}
                {r.proptype} | {r.bathrooms} Bathrooms | Sleeps {r.accomodates}
              </td>
              <br />
              <br /> <td>${r.nbr} per night</td>
              {console.log(r.photos[0])}
            </div>
            {/* <img class="proppp" src={path.join(__dirname, "..", r.photos[0])} /> */}
          </tr>
        );
      });
    if (token) {
      navLogin = (
        <div>
          <div class="header-bce bluefont">
            <div id="hal-home" class="navbar-brand bluefont-home">
              <a href="/home" class="bluefont-home">
                HomeAway
                <span class="sup">&reg;</span>
              </a>
            </div>
          </div>
          <div class="wrappernav-pro bluefont">
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
            <a href="#" class="tb bluefont inline">
              Trip Boards
            </a>
            <div class="btn-group inline dropdownnav">
              <div
                class="btn-home inline bluefont"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src={this.state.profileicon} class="smallimg" />
                {"   "}
                {this.state.fname} {String(this.state.lname).charAt(0) + "."}{" "}
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
                  <a class="dropdown-item" href="/profile">
                    <p class="bluefont">
                      <span class="glyphicon glyphicon-user dropdownicons" />
                      {"   "}
                      My Profile
                    </p>
                  </a>
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
            <a href="/inbox" class="bluefont">
              <span
                class="glyphicon-glyphicon-envelope envelope inline bluefont"
                aria-hidden="true"
              >
                <i class="fa fa-envelope bluefont " aria-hidden="true">
                  {"  "}
                </i>
              </span>
            </a>

            <div class="btn-group userdd bluefont inline dropdownnav">
              <div
                class="btn-home inline bluefont"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Help{" "}
                <span class="glyphicon glyphicon-triangle-bottom smallicon" />
              </div>
              <ul class="dropdown-menu dropdown-menu-right bluefont">
                <li>
                  {" "}
                  <a class="dropdown-item " href="#">
                    <p class="bluefont">
                      {"   "}
                      Visit help center
                    </p>
                  </a>
                </li>
                <li role="separator" class="divider dropdownicons" />

                <li class="dropdown-header travelersfont">
                  <b>Travelers</b>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      How it works
                    </p>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {"   "}
                      Security Center
                    </p>
                  </a>
                </li>
                <li role="separator" class="divider dropdownicons" />

                <li class="dropdown-header travelersfont">
                  <b>Home Owners</b>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      How it works
                    </p>
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href={
                      sessionStorage.getItem("typeofaccount") == "owner"
                        ? "/lyp"
                        : "#"
                    }
                  >
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      List your property
                    </p>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      Community
                    </p>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      Discovery Hub
                    </p>
                  </a>
                </li>
                <li role="separator" class="divider dropdownicons" />
                <li class="dropdown-header travelersfont">
                  <b>Property managers</b>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      List your properties
                    </p>
                  </a>
                </li>
              </ul>
            </div>
            <a
              href={
                sessionStorage.getItem("typeofaccount") == "owner"
                  ? "/lyp"
                  : "#"
              }
              class="buttonlyp default bluefont inline"
            >
              List your property
            </a>
            <div class="homeawayimg-pro inline">
              <img src="http://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
            </div>
          </div>
        </div>
      );
    } else redirectVar = <Redirect to="/login" />;

    return (
      <div>
        {redirectVar}
        {navLogin}
        <br />
        <br />
        <label class="filterlabel">Price</label>
        <input
          type="number"
          id="myInput"
          onChange={this.handlePriceFilter}
          placeholder="less than..."
          class="filters"
          min="0"
          step="1"
        />
        <label class="filterlabel">From</label>
        <input
          type="date"
          id="myInput"
          onChange={this.handleFromFilter}
          class="filters"
        />
        <label class="filterlabel">To</label>
        <input
          type="date"
          id="myInput"
          onChange={this.handleToFilter}
          class="filters"
        />
        <label class="filterlabel">Rooms</label>
        <input
          type="number"
          id="myInput"
          onChange={this.handleRoomFilter}
          class="filters"
          min="0"
          step="1"
        />
        <br />
        <br />
        <table class="table" id="myTable">
          <thead>
            <tr>
              <th> {propnew.length} results</th>
            </tr>
          </thead>
          <tbody>
            {/*Display the Table row based on data recieved*/}
            {details}
          </tbody>
        </table>
        <Pagination
          itemsCount={propnew.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
//export Login Component
//export default SearchResults;
const mapStateToProps = state => {
  console.log("Statetoprops: ", state.login.properties);
  return {
    properties: state.login.properties
  };
};

const mapDispatchStateToProps = dispatch => {
  return {
    onGetRender: (where, startdate, enddate, guests) => {
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get("http://localhost:3001/home/search", {
          params: {
            where: where,
            startdate: startdate,
            enddate: enddate,
            guests: guests
          }
        })
        .then(response => {
          dispatch({
            type: "SEARCH",
            payload: response.data,
            statusCode: response.status
          });
          //update the state with the response data
          console.log("Data  : ", response);
        });
    }
  };
};

//export Home Component
export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(SearchResults);
