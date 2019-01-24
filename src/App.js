import React, { Component } from 'react';
import './App.css';

import Form from "./components/Form";
import Recipes from "./components/Recipes";

const API_KEY = "bc9e815c4a262286447098327ef72b95";

class App extends Component {
  state ={
    recipes:[]
  }
  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}`);

    const data = await api_call.json();
    this.setState({ recipes: data.recipes});
    console.log(this.state.recipes)
  }
  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({ recipes: recipes});
  }
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes)
  }
  render() {
    let recipes
    if (this.state.recipes) {
       recipes = <Recipes recipes={this.state.recipes}/>
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        {recipes}
      </div>
    );
  }
}

export default App;
