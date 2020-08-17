import React from "react";
import { Route, Switch } from "react-router-dom";
import TodoList from "./component/todoList";
import "./App.css";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/active" render={(props) => <TodoList {...props} filter="active" />} />
        <Route path="/completed" render={(props) => <TodoList {...props} filter="completed" />} />
        <Route path="/" render={(props) => <TodoList {...props} filter="all" />} />
      </Switch>
    </main>
  );
}

export default App;
