import React, {Component} from "react";
import {Card, ButtonGroup, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import MyToast from "../MyToast";

export default class ReadDeleteUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            securitiesPapers: [],
            counter: 0,
            messageText: ""
        }
    }

    componentDidMount() {
        this.findAllSecuritiesPapers();
    }

    findAllSecuritiesPapers = () => {
        fetch('http://localhost:8080/securitiesPapers')
            .then(response => response.json())
            .then(data => {
                this.setState({securitiesPapers: data});
            })
            .then(async () => {
                this.setState({
                    securitiesPapers: this.assembleSecuritiesPapers(),
                    isLoading: false
                })
            }).catch(err => {
            this.sendMessageError("Error with upload data");
        });
    };

    assembleSecuritiesPapers = () => {
        let securitiesPapers = this.state.securitiesPapers.map((securitiesPaper) => {
            return (
                {
                    amount: ++this.state.counter,
                    idN: securitiesPaper.idN,
                    id: securitiesPaper.id,
                    secid: securitiesPaper.secid,
                    shortname: securitiesPaper.shortname,
                    regnumber: securitiesPaper.regnumber,
                    name: securitiesPaper.name,
                    isin: securitiesPaper.isin,
                    is_traded: securitiesPaper.is_traded,
                    emitent_id: securitiesPaper.emitent_id,
                    emitent_title: securitiesPaper.emitent_title,
                    emitent_inn: securitiesPaper.emitent_inn,
                    emitent_okpo: securitiesPaper.emitent_okpo,
                    gosreg: securitiesPaper.gosreg,
                    type: securitiesPaper.type,
                    groupD: securitiesPaper.groupD,
                    primary_boardid: securitiesPaper.primary_boardid,
                    marketprice_boardid: securitiesPaper.marketprice_boardid,
                    action: <ButtonGroup>
                        <Link to={"editSecurity/"+securitiesPaper.idN} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                        <Button size="sm" variant="outline-danger" onClick={this.deleteSecuritiesPaper.bind(this, securitiesPaper.idN)}><FontAwesomeIcon icon={faTrash} /></Button>
                    </ButtonGroup>
                }
            )
        });

        return securitiesPapers;

    };

    deleteSecuritiesPaper = (securitiesPaperId) => {
        axios.delete('http://localhost:8080/deleteSecuritiesPaper/'+securitiesPaperId)
            .then(response => {
                if(response.data != null) {
                    this.sendMessageError("Discipline Deleted Successfully.");
                    this.setState({counter:0});
                    this.findAllSecuritiesPapers();
                } else {
                    this.sendMessageError("Discipline not deleted Successfully.");
                }
            }).catch(err => {
            this.sendMessageError("Error with deleted");
        });
    };

    sendMessageError = (stringText) => {
        this.setState({"show":true});
        this.setState({messageText: stringText});
        setTimeout(() => this.setState({"show":false}), 3000);
    };

    render() {

        const Page = {
            marginTop: "70px",
            marginBottom: "60px"
        };

        return (
            <div style={Page}>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.messageText} type = {"danger"}/>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>ID</th>
                        <th>secid</th>
                        <th>shortname</th>
                        <th>regnumber</th>
                        <th>name</th>
                        <th>isin</th>
                        <th>is_traded</th>
                        <th>emitent_id</th>
                        <th>emitent_title</th>
                        <th>emitent_inn</th>
                        <th>emitent_okpo</th>
                        <th>gosreg</th>
                        <th>type</th>
                        <th>group</th>
                        <th>primary_boardid</th>
                        <th>marketprice_boardid</th>
                        <th>action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.securitiesPapers.map(item => (
                        <tr key={item.amount}>
                            <td>{item.amount}</td>
                            <td>{item.id}</td>
                            <td>{item.secid}</td>
                            <td>{item.shortname}</td>
                            <td>{item.regnumber}</td>
                            <td>{item.name}</td>
                            <td>{item.isin}</td>
                            <td>{item.is_traded}</td>
                            <td>{item.emitent_id}</td>
                            <td>{item.emitent_title}</td>
                            <td>{item.emitent_inn}</td>
                            <td>{item.emitent_okpo}</td>
                            <td>{item.gosreg}</td>
                            <td>{item.type}</td>
                            <td>{item.groupD}</td>
                            <td>{item.primary_boardid}</td>
                            <td>{item.marketprice_boardid}</td>
                            <td>{item.action}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}