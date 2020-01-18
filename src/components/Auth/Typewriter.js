import React, { Component } from "react";
import Typing from "react-typing-animation";

export class Typewriter extends Component {
  constructor(props) {
    super(props);
  }
  typeWriter = data => {
    let i = 0;
    let speed = 50;
    if (i < data.length) {
      console.log(data.length);
      i++;
    }
  };

  render() {
    let data = "Hello My name is Ayaan Ansari";
    return (
      <div>
        <Typing >
          <h1>
            <span>Hello I am Ayaan Ansari. </span>
            <Typing.Backspace count={14} />
            <Typing.Speed ms={100} />
            <span className="text-success">A Full Stack Developer</span>
          </h1>
        </Typing>
      </div>
    );
  }
}

export default Typewriter;
