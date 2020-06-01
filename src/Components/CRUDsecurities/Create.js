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
        this.securitiesChange = this.securitiesChange.bind(this);
        this.submitSecurities = this.submitSecurities.bind(this);
    }

    initialState = {
        id: '',
        idS: '',
        secid: '',
        shortname: '',
        regnumber: '',
        name: '',
        isin: '',
        is_traded: '',
        emitent_id: '',
        emitent_title: '',
        emitent_inn: '',
        emitent_okpo: '',
        gosreg: '',
        type: '',
        groupD: '',
        primary_boardid: '',
        marketprice_boardid: '',
        messageSend: '',
        proverka: '',
        typeMessage: '',
        stringMessage: ''
    };

    componentDidMount() {
        const securitiesId = +this.props.match.params.id;
        if (securitiesId) {
            this.findSecuritiesById(securitiesId);
        }
    }

    // componentWillUpdate() {
    //     //this.setState({"show":false});
    //     console.log("actions >>>")
    //}

    findSecuritiesById = (securitiesId) => {
        console.log(securitiesId);
        axios.get('http://localhost:8080/securitiesPaper/' + securitiesId)
            .then(response => {
                console.log("Response: " + response.data + "!");
                if (response.data != null) {
                    this.setState({
                        id: response.data.idN,
                        idS: response.data.id,
                        secid: response.data.secid,
                        shortname: response.data.shortname,
                        regnumber: response.data.regnumber,
                        name: response.data.name,
                        isin: response.data.isin,
                        is_traded: response.data.is_traded,
                        emitent_id: response.data.emitent_id,
                        emitent_title: response.data.emitent_title,
                        emitent_inn: response.data.emitent_inn,
                        emitent_okpo: response.data.emitent_okpo,
                        gosreg: response.data.gosreg,
                        type: response.data.type,
                        groupD: response.data.groupD,
                        primary_boardid: response.data.primary_boardid,
                        marketprice_boardid: response.data.marketprice_boardid
                    });
                }
            }).catch((error) => {
            this.sendMessageError("error with get data from the server");
        });
    };

    resetSecurities = () => {
        this.setState(() => this.initialState);
    };

    submitSecurities = event => {
        event.preventDefault();

        const nameReg = /^[а-яА-ЯёЁ0-9 ]+$/;

        if (this.state.name.match(nameReg) !== null) {

            const pageSecurity = {
                id: Number(this.state.idS),
                secid: this.state.secid,
                shortname: this.state.shortname,
                regnumber: this.state.regnumber,
                name: this.state.name,
                isin: this.state.isin,
                is_traded: Number(this.state.is_traded),
                emitent_id: Number(this.state.emitent_id),
                emitent_title: this.state.emitent_title,
                emitent_inn: this.state.emitent_inn,
                emitent_okpo: this.state.emitent_okpo,
                gosreg: this.state.gosreg,
                type: this.state.type,
                groupD: this.state.groupD,
                primary_boardid: this.state.primary_boardid,
                marketprice_boardid: this.state.marketprice_boardid
            };

            console.log(pageSecurity);

            axios.post("http://localhost:8080/createSecuritiesPapers", pageSecurity)
                .then(response => {
                    if (response.data != null) {
                        this.setState({typeMessage: "success"});
                        this.setState({"show": true, "method": "post"});
                        setTimeout(() => this.setState({"show": false}), 3000);
                    } else {
                        this.setState({"show": false});
                    }
                }).catch(
                err => {
                    this.sendMessageError("error with get data from the server");
                }
            );
            this.setState(this.initialState);
        } else {
            this.sendMessageError("error input name");
        }
    };

    updateSecurities = event => {
        event.preventDefault();

        const pageSecurity = {
            idN: this.state.id,
            id: Number(this.state.idS),
            secid: this.state.secid,
            shortname: this.state.shortname,
            regnumber: this.state.regnumber,
            name: this.state.name,
            isin: this.state.isin,
            is_traded: Number(this.state.is_traded),
            emitent_id: Number(this.state.emitent_id),
            emitent_title: this.state.emitent_title,
            emitent_inn: this.state.emitent_inn,
            emitent_okpo: this.state.emitent_okpo,
            gosreg: this.state.gosreg,
            type: this.state.type,
            groupD: this.state.groupD,
            primary_boardid: this.state.primary_boardid,
            marketprice_boardid: this.state.marketprice_boardid
        };


        axios.put("http://localhost:8080/putSecuritiesPaper", pageSecurity)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, "method": "put"});
                    this.setState({typeMessage: "success"});
                    setTimeout(() => this.securitiesList(), 3000);
                } else {
                    this.sendMessageError("error with data");
                }
            }).catch(
            err => {
                this.sendMessageError("error with get data from the server");
            }
        );
        this.setState(this.initialState);
    };

    sendMessageError = (text) => {
        this.setState({typeMessage: "dangerous"});
        this.setState({stringMessage: text});
        this.setState({"messageSend": "error"});
        this.setState({"show": true, "method": "puts"});
        setTimeout(() => this.setState({"show": false}), 3000);
    };

    securitiesChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    securitiesList = () => {
        return this.props.history.push("/readDeleteUpdateSecurities");
    };

    render() {
        const Page = {
            marginTop: "70px",
            marginBottom: "60px",
            width: "70%"
        };

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show}
                             message={this.state.method === "put" ? "Page Security Update Successfully." : (this.state.messageSend === "error" ? this.state.stringMessage : "Page Security Saved Successfully.")}
                             type={this.state.typeMessage}/>
                </div>

                <Card className={"border border-dark bg-light text-dark mx-auto"} style={Page}>
                    <Card.Header><FontAwesomeIcon
                        icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update Page Security" : "Add Page Security"}
                    </Card.Header>
                    <Form onReset={this.resetSecurities}
                          onSubmit={this.state.id ? this.updateSecurities : this.submitSecurities}>
                        <Card.Body>

                            <Form.Row>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="idS"
                                                  value={this.state.idS}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter id"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Secid</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="secid"
                                                  value={this.state.secid}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter secid"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Shortname</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="shortname"
                                                  value={this.state.shortname}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter shortname"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Regnumber</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="regnumber"
                                                  value={this.state.regnumber}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter regnumber"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="name"
                                                  value={this.state.name}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter name"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Isin</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="isin"
                                                  value={this.state.isin}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter isin"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Is_traded</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="is_traded"
                                                  value={this.state.is_traded}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter is_traded"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Emitent_id</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="emitent_id"
                                                  value={this.state.emitent_id}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter emitent_id"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Emitent_title</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="emitent_title"
                                                  value={this.state.emitent_title}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter emitent_title"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Emitent_inn</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="emitent_inn"
                                                  value={this.state.emitent_inn}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter emitent_inn"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Emitent_okpo</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="emitent_okpo"
                                                  value={this.state.emitent_okpo}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter emitent_okpo"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Gosreg</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="gosreg"
                                                  value={this.state.gosreg}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter gosreg"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="type"
                                                  value={this.state.type}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter type"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>GroupD</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="groupD"
                                                  value={this.state.groupD}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter groupD"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Primary_boardid</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="primary_boardid"
                                                  value={this.state.primary_boardid}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter primary_boardid"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                    <Form.Label>Marketprice_boardid</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="marketprice_boardid"
                                                  value={this.state.marketprice_boardid}
                                                  onChange={this.securitiesChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter marketprice_boardid"/>
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
                            <Button size="sm" variant="info" type="button" onClick={this.securitiesList.bind()}>
                                <FontAwesomeIcon icon={faList}/> Securities List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}