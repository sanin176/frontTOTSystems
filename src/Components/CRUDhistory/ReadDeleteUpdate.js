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
            historiesPapers: [],
            counter: 0,
            messageText: ""
        }
    }

    componentDidMount() {
        this.findAllHistoriesPapers();
    }

    findAllHistoriesPapers = () => {
        fetch('http://localhost:8080/historiesPapers')
            .then(response => response.json())
            .then(data => {
                this.setState({historiesPapers: data});
            })
            .then(async () => {
                this.setState({
                    historiesPapers: this.assembleHistoriesPapers(),
                    isLoading: false
                })
            }).catch(err => {
            this.sendMessageError("Error with upload data");
        });
    };

    assembleHistoriesPapers = () => {
        let historiesPapers = this.state.historiesPapers.map((historiesPaper) => {
            return (
                {
                    amount: ++this.state.counter,
                    idN: historiesPaper.idN,
                    boardid: historiesPaper.boardid,
                    tradedate: historiesPaper.tradedate,
                    shortname: historiesPaper.shortname,
                    secid: historiesPaper.secid,
                    numtrades: historiesPaper.numtrades,
                    value: historiesPaper.value,
                    open: historiesPaper.open,
                    low: historiesPaper.low,
                    high: historiesPaper.high,
                    legalcloseprice: historiesPaper.legalcloseprice,
                    waprice: historiesPaper.waprice,
                    close: historiesPaper.close,
                    volume: historiesPaper.volume,
                    marketprice2: historiesPaper.marketprice2,
                    marketprice3: historiesPaper.marketprice3,
                    admittedquote: historiesPaper.admittedquote,
                    mp2VALTRD: historiesPaper.mp2VALTRD,
                    marketprice3TRADESVALUE: historiesPaper.marketprice3TRADESVALUE,
                    admittedvalue: historiesPaper.admittedvalue,
                    waval: historiesPaper.waval,
                    action: <ButtonGroup>
                        <Link to={"editSecurity/"+historiesPaper.idN} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                        <Button size="sm" variant="outline-danger" onClick={this.deleteHistoriesPaper.bind(this, historiesPaper.idN)}><FontAwesomeIcon icon={faTrash} /></Button>
                    </ButtonGroup>
                }
            )
        });

        return historiesPapers;

    };

    deleteHistoriesPaper = (historiesPaperId) => {
        axios.delete('http://localhost:8080/deleteHistoryPaper/'+historiesPaperId)
            .then(response => {
                if(response.data != null) {
                    this.sendMessageError("Discipline Deleted Successfully.");
                    this.setState({counter:0});
                    this.findAllHistoriesPapers();
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
                        <th>boardid</th>
                        <th>tradedate</th>
                        <th>shortname</th>
                        <th>secid</th>
                        <th>numtrades</th>
                        <th>value</th>
                        <th>open</th>
                        <th>low</th>
                        <th>high</th>
                        <th>legalcloseprice</th>
                        <th>waprice</th>
                        <th>close</th>
                        <th>volume</th>
                        <th>marketprice2</th>
                        <th>marketprice3</th>
                        <th>admittedquote</th>
                        <th>mp2VALTRD</th>
                        <th>marketprice3TRADESVALUE</th>
                        <th>admittedvalue</th>
                        <th>waval</th>
                        <th>action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.historiesPapers.map(item => (
                        <tr key={item.amount}>
                            <td>{item.amount}</td>
                            <td>{item.boardid}</td>
                            <td>{item.tradedate}</td>
                            <td>{item.shortname}</td>
                            <td>{item.secid}</td>
                            <td>{item.numtrades}</td>
                            <td>{item.value}</td>
                            <td>{item.open}</td>
                            <td>{item.low}</td>
                            <td>{item.high}</td>
                            <td>{item.legalcloseprice}</td>
                            <td>{item.waprice}</td>
                            <td>{item.close}</td>
                            <td>{item.volume}</td>
                            <td>{item.marketprice2}</td>
                            <td>{item.marketprice3}</td>
                            <td>{item.admittedquote}</td>
                            <td>{item.mp2VALTRD}</td>
                            <td>{item.marketprice3TRADESVALUE}</td>
                            <td>{item.admittedvalue}</td>
                            <td>{item.waval}</td>
                            <td>{item.action}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
