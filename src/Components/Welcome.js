import React, {Component} from "react";

import {Jumbotron} from "react-bootstrap";

export default class Welcome extends Component {
    render() {
        const marginBottom = {
            marginBottom: "60px"
        };

        const Page = {
            marginTop: "70px",
            marginBottom: "60px",
            width: "70%"
        };

        return (
            <div className="mx-auto" style={Page}>
                <Jumbotron className="bg-dark text-white" style={marginBottom}>
                    <h1>Welcome to the TOT Systems</h1>
                    <blockquote className="blockquote mb-0">
                        <p>
                            Good friends, good books, and a sleeply conscience: this is the ideal life.
                        </p>
                        <footer className="blockquote-footer">
                            Mark Twain
                        </footer>
                    </blockquote>
                </Jumbotron>
            </div>
        )
    }
}