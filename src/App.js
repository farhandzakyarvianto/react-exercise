import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Todos from "./components/Todos";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
import "./App.css";
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";

class App extends Component {
    state = {
        todos: [],
    };

    componentDidMount = () => {
        axios
            .get(`http://jsonplaceholder.typicode.com/todos?_limit=10`)
            .then((res) => this.setState({ todos: res.data }));
    };

    //toggleComplete
    markComplete = (id) => {
        this.setState({
            todos: this.state.todos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            }),
        });
    };

    //delete
    delTodo = (id) => {
        // this.setState({
        //     todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        // });
        axios
            .delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
            .then((res) =>
                this.setState({
                    todos: [
                        ...this.state.todos.filter((todo) => todo.id !== id),
                    ],
                })
            );
        this.setState({
            todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        });
    };

    addTodo = (title) => {
        // const newTodo = {
        //     id: uuidv4(),
        //     title,
        //     completed: false,
        // };
        // this.setState({
        //     todos: [...this.state.todos, newTodo],
        // });
        axios
            .post(`http://jsonplaceholder.typicode.com/todos`, {
                title,
                completed: false,
            })
            .then((res) =>
                this.setState({
                    todos: [...this.state.todos, res.data],
                })
            );
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header />
                        <Route
                            path="/"
                            exact
                            render={(props) => (
                                <React.Fragment>
                                    <AddTodo addTodo={this.addTodo} />
                                    <Todos
                                        todos={this.state.todos}
                                        markComplete={this.markComplete}
                                        delTodo={this.delTodo}
                                    />
                                </React.Fragment>
                            )}
                        />
                        <Route path="/about" component={About} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
