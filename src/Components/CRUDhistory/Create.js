import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons'

import {Card, Form, Button, Col} from "react-bootstrap";
import MyToast from "../MyToast";
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.historyChange = this.historyChange.bind(this);
        this.submitHistory = this.submitHistory.bind(this);
    }

    initialState = {
        id: '',
        boardid: '',
        tradedate: '',
        shortname: '',
        secid: '',
        numtrades: '',
        value: '',
        open: '',
        low: '',
        high: '',
        legalcloseprice: '',
        waprice: '',
        close: '',
        volume: '',
        marketprice2: '',
        marketprice3: '',
        admittedquote: '',
        mp2VALTRD: '',
        marketprice3TRADESVALUE: '',
        admittedvalue: '',
        waval: ''
    };

    componentDidMount() {
        const historyId = +this.props.match.params.id;
        if (historyId) {
            this.findHistoryById(historyId);
        }
    }

    // componentWillUpdate() {
    //     //this.setState({"show":false});
    //     console.log("actions >>>")
    //}

    findHistoryById = (historyId) => {
        console.log(historyId);
        axios.get('http://localhost:8080/historyPaper/' + historyId)
            .then(response => {
                console.log("Response: " + response.data + "!");
                if (response.data != null) {
                    this.setState({
                        id: response.data.idN,
                        boardid: response.data.boardid,
                        tradedate: response.data.tradedate,
                        shortname: response.data.shortname,
                        secid: response.data.secid,
                        numtrades: response.data.numtrades,
                        value: response.data.value,
                        open: response.data.open,
                        low: response.data.low,
                        high: response.data.high,
                        legalcloseprice: response.data.legalcloseprice,
                        waprice: response.data.waprice,
                        close: response.data.close,
                        volume: response.data.volume,
                        marketprice2: response.data.marketprice2,
                        marketprice3: response.data.marketprice3,
                        admittedquote: response.data.admittedquote,
                        mp2VALTRD: response.data.mp2VALTRD,
                        marketprice3TRADESVALUE: response.data.marketprice3TRADESVALUE,
                        admittedvalue: response.data.admittedvalue,
                        waval: response.data.waval
                    });
                }
            }).catch((error) => {
            this.sendMessageError("error with get data from the server");
        });
    };

    resetHistory = () => {
        this.setState(() => this.initialState);
    };

    submitHistory = event => {
        event.preventDefault();


        const pageHistory = {
            boardid: this.state.boardid,
            tradedate: Date.parse(this.state.tradedate),
            shortname: this.state.shortname,
            secid: this.state.secid,
            numtrades: Number(this.state.numtrades),
            value: Number(this.state.value),
            open: Number(this.state.open),
            low: Number(this.state.low),
            high: Number(this.state.high),
            legalcloseprice: Number(this.state.legalcloseprice),
            waprice: Number(this.state.waprice),
            close: Number(this.state.close),
            volume: Number(this.state.volume),
            marketprice2: Number(this.state.marketprice2),
            marketprice3: Number(this.state.marketprice3),
            admittedquote: Number(this.state.admittedquote),
            mp2VALTRD: Number(this.state.mp2VALTRD),
            marketprice3TRADESVALUE: Number(this.state.marketprice3TRADESVALUE),
            admittedvalue: Number(this.state.admittedvalue),
            waval: Number(this.state.waval)
        };

        console.log(pageHistory);

        axios.post("http://localhost:8080/createHistoryPapers", pageHistory)
            .then(response => {
                if (response.data != null) {
                    this.setState({typeMessage: "success"});
                    this.setState({"show": true, "method": "post"});
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.sendMessageError("error with get data from the server");
                }
            }).catch(
            err => {
                this.sendMessageError("error with get data from the server");}
        );
        this.setState(this.initialState);
    };

    updateHistory = event => {
        event.preventDefault();

        const pageHistory = {
            idN: this.state.id,
            boardid: this.state.boardid,
            tradedate: Date.parse(this.state.tradedate),
            shortname: this.state.shortname,
            secid: this.state.secid,
            numtrades: Number(this.state.numtrades),
            value: Number(this.state.value),
            open: Number(this.state.open),
            low: Number(this.state.low),
            high: Number(this.state.high),
            legalcloseprice: Number(this.state.legalcloseprice),
            waprice: Number(this.state.waprice),
            close: Number(this.state.close),
            volume: Number(this.state.volume),
            marketprice2: Number(this.state.marketprice2),
            marketprice3: Number(this.state.marketprice3),
            admittedquote: Number(this.state.admittedquote),
            mp2VALTRD: Number(this.state.mp2VALTRD),
            marketprice3TRADESVALUE: Number(this.state.marketprice3TRADESVALUE),
            admittedvalue: Number(this.state.admittedvalue),
            waval: Number(this.state.waval)
        };


        axios.put("http://localhost:8080/putHistoryPaper", pageHistory)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, "method": "put"});
                    this.setState({typeMessage: "success"});
                    setTimeout(() => this.historyList(), 3000);
                } else {
                    this.sendMessageError("error with get data from the server");
                }
            }).catch(err => {this.sendMessageError("error with get data from the server");});
        this.setState(this.initialState);
    };

    sendMessageError = (text) => {
        this.setState({typeMessage: "dangerous"});
        this.setState({stringMessage: text});
        this.setState({"messageSend": "error"});
        this.setState({"show": true, "method": "puts"});
        setTimeout(() => this.setState({"show": false}), 3000);
    };

    historyChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    historyList = () => {
        return this.props.history.push("/readDeleteUpdateHistory");
    };

    render() {
        const Page = {
            marginTop: "70px",
            marginBottom: "60px",
            width: "70%"
        };

        return (
            <div className="mx-auto" style={Page}>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show}
                             message={this.state.method === "put" ? "Page History Update Successfully." : (this.state.messageSend === "error" ? this.state.stringMessage : "Page History Saved Successfully.")}
                             type={this.state.typeMessage}/>
                </div>

                <Card className={"border border-dark bg-light text-dark"}>
                    <Card.Header><FontAwesomeIcon
                        icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update Page History" : "Add Page History"}
                    </Card.Header>
                    <Form onReset={this.resetHistory}
                          onSubmit={this.state.id ? this.updateHistory : this.submitHistory}>
                        <Card.Body>

                            <Form.Row>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Boardid</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="boardid"
                                                  value={this.state.boardid}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter iboardidd"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Tradedate</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="tradedate"
                                                  value={this.state.tradedate}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter tradedate"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Shortname</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="shortname"
                                                  value={this.state.shortname}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter shortname"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Secid</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="secid"
                                                  value={this.state.secid}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter secid"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Numtrades</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="numtrades"
                                                  value={this.state.numtrades}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter numtrades"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Value</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="value"
                                                  value={this.state.value}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter value"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Open</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="open"
                                                  value={this.state.open}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter open"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Low</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="low"
                                                  value={this.state.low}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter low"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>High</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="high"
                                                  value={this.state.high}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter high"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Legalcloseprice</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="legalcloseprice"
                                                  value={this.state.legalcloseprice}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter legalcloseprice"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Waprice</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="waprice"
                                                  value={this.state.waprice}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter waprice"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Close</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="close"
                                                  value={this.state.close}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter close"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Volume</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="volume"
                                                  value={this.state.volume}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter volume"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Marketprice2</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="marketprice2"
                                                  value={this.state.marketprice2}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter marketprice2"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Marketprice3</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="marketprice3"
                                                  value={this.state.marketprice3}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter marketprice3"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Admittedquote</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="admittedquote"
                                                  value={this.state.admittedquote}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter admittedquote"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Mp2VALTRD</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="mp2VALTRD"
                                                  value={this.state.mp2VALTRD}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter mp2VALTRD"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Marketprice3TRADESVALUE</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="marketprice3TRADESVALUE"
                                                  value={this.state.marketprice3TRADESVALUE}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter marketprice3TRADESVALUE"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Admittedvalue</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="admittedvalue"
                                                  value={this.state.admittedvalue}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter admittedvalue"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Waval</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="waval"
                                                  value={this.state.waval}
                                                  onChange={this.historyChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter waval"/>
                                </Form.Group>
                            </Form.Row>

                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.historyList.bind()}>
                                <FontAwesomeIcon icon={faList}/> History List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}