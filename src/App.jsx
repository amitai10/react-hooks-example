import React, { Component } from "react";
import { Counter } from "./Counter";
import { MultipleStates } from "./MultipleStates";
import { LifecycleDemo } from "./LifecycleDemo";
import { FetchData } from "./FetchData";
import { WrapperFetchDataWithGender } from "./FetchDataWithGender";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter/>
        <MultipleStates />
        <LifecycleDemo />
        <FetchData />
        <WrapperFetchDataWithGender />
      </div>
    );
  }
}

export default App;
