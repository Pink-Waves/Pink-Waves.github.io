import React, { useState } from "react";

import greenhop from "../image/green-hop.gif";
import pinkhop from "../image/pink-hop.gif";
import bluehop from "../image/blue-hop.gif";
import yellowhop from "../image/yellow-hop.gif";
import brownhop from "../image/brown-hop.gif";

import greenwalk from "../image/green-walk.gif";
import pinkwalk from "../image/pink-walk1.gif";
import bluewalk from "../image/blue-walk.gif";
import yellowwalk from "../image/yellow-walk1.gif";
import brownwalk from "../image/brown-walk.gif";

import "./custom.css";

const Birdogifs = (props) => {
  const [toggle, setToggle] = useState(true);

  var bird_color = "";

  if (localStorage.getItem("bird_color") != null) {
    bird_color = localStorage.getItem("bird_color");
  }

  // lol I tried to mess around with this off the top of my head but I forget what I did on my computer to get it to work

  return (
    <img
      src={toggle ? yellowhop : yellowwalk}
      className="card-header"
      alt="picture of bird"
      onClick={() => setToggle(!toggle)}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Birdogifs;

// this is just for yellow
