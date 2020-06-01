import React, {Component} from "react";
import MyToast from "../MyToast";
import {Form, Col, Row} from "react-bootstrap";
import '../../Style/selectList.css'

export default class ReadBothSecuritiesHistories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bothSecuritiesHistoriesPapers: [],
            dopMaxBothSecuritiesHistoriesPapers: [],
            setEmitentTitles: '',
            setTradedates: [],
            counter: 0,
            messageText: "",
            messageType: "",
            valueDirectionSort: "0",
            valueFieldSort: "0",
            optionsHandleSetEmitentTitles: "0",
            sizeEmitentTitles: 0,
            sizeTradedates: 0,
            optionsHandleSetTradedates: "0"
        };

        this.handleListUpDown = this.handleListUpDown.bind(this);
        this.handleListFields = this.handleListFields.bind(this);
        this.handleSetEmitentTitles = this.handleSetEmitentTitles.bind(this);
    }

    componentDidMount() {
        this.findAllBothSecuritiesHistoriesPapers();
    }

    findAllBothSecuritiesHistoriesPapers = () => {
        fetch('http://localhost:8080/historysSecuritiesPapers')
            .then(response => response.json())
            .then(data => {
                this.setState({bothSecuritiesHistoriesPapers: data});
            })
            .then(async () => {
                this.setState({
                    bothSecuritiesHistoriesPapers: this.assembleBothSecuritiesHistoriesPapers(),
                    isLoading: false
                });
                this.setEmitentTitleFunction();
                this.setTradedateFunction();
            });
    };

    setEmitentTitleFunction = () => {

        this.setState({
            setEmitentTitles: this.state.bothSecuritiesHistoriesPapers.map(a => a.emitent_title)
        });

        this.setState({
            setEmitentTitles: this.state.setEmitentTitles.filter((b, c) =>
                this.state.setEmitentTitles.indexOf(b) === c)
        });

        this.setState({
            setEmitentTitles: this.state.setEmitentTitles.map((setEmitentTitle, index) => {
                return (
                    <option key={index} value={setEmitentTitle}>{setEmitentTitle}</option>)
            })
        });

    };

    setTradedateFunction = () => {

        this.setState({
            setTradedates: this.state.bothSecuritiesHistoriesPapers.map(a => a.tradedate)
        });

        this.setState({
            setTradedates: this.state.setTradedates.filter((b, c) =>
                this.state.setTradedates.indexOf(b) === c)
        });

        this.setState({
            setTradedates: this.state.setTradedates.map((setEmitentTitle, index) => {
                return (
                    <option key={index} value={setEmitentTitle}>{setEmitentTitle}</option>)
            })
        });

    };

    assembleBothSecuritiesHistoriesPapers = () => {
        let bothSecuritiesHistoriesPapers = [];
        for (let bothSHPaper of this.state.bothSecuritiesHistoriesPapers) {

            for (let bothSHPaperInside of bothSHPaper.dopTableDataRowsHistoryPages) {
                bothSecuritiesHistoriesPapers.push(
                    {
                        amount: ++this.state.counter,
                        idN: bothSHPaper.idN,
                        secid: bothSHPaper.secid,
                        regnumber: bothSHPaper.regnumber,
                        name: bothSHPaper.name,
                        emitent_title: bothSHPaper.emitent_title,
                        tradedate: bothSHPaperInside.tradedate,
                        numtrades: bothSHPaperInside.numtrades,
                        open: bothSHPaperInside.open,
                        close: bothSHPaperInside.close
                    }
                )
            }
        }

        this.setState({
            dopMaxBothSecuritiesHistoriesPapers: bothSecuritiesHistoriesPapers
        });

        return bothSecuritiesHistoriesPapers;
    };

    handleListUpDown = e => {
        if (this.state.valueFieldSort !== "0") {

            this.state.bothSecuritiesHistoriesPapers = this.state.dopMaxBothSecuritiesHistoriesPapers;

            this.setState({valueDirectionSort: e.target.value});

            e.target.blur();


            if (e.target.value === "sortUp" && this.state.valueFieldSort === "emitent_title")
                this.state.bothSecuritiesHistoriesPapers.sort((a, b) =>
                    a.emitent_title.toUpperCase() > b.emitent_title.toUpperCase() ? 1 : -1);

            else if (e.target.value === "sortDown" && this.state.valueFieldSort === "emitent_title")
                this.state.bothSecuritiesHistoriesPapers.sort((a, b) =>
                    a.emitent_title.toUpperCase() < b.emitent_title.toUpperCase() ? 1 : -1);

            else if (e.target.value === "sortUp" && this.state.valueFieldSort === "tradedate")
                this.state.bothSecuritiesHistoriesPapers.sort((a, b) =>
                    a.tradedate.toUpperCase() > b.tradedate.toUpperCase() ? 1 : -1);

            else if (e.target.value === "sortDown" && this.state.valueFieldSort === "tradedate")
                this.state.bothSecuritiesHistoriesPapers.sort((a, b) =>
                    a.tradedate.toUpperCase() < b.tradedate.toUpperCase() ? 1 : -1);

            this.sendMyToast("Сортировка выполнена успешна", "success");
        } else {
            this.sendMyToast("Сначала выберите поле", "danger");
        }
    };

    handleListFields = e => {
        this.setState({valueFieldSort: e.target.value});
        this.setState({valueDirectionSort: "0"});
        e.target.blur();
    };

    handleSetEmitentTitles = e => {
        this.setState({optionsHandleSetEmitentTitles: e.target.value});

        this.state.bothSecuritiesHistoriesPapers = [...this.state.dopMaxBothSecuritiesHistoriesPapers];

        if (e.target.value !== "reset0")
            this.setState({
                bothSecuritiesHistoriesPapers: this.state.bothSecuritiesHistoriesPapers.filter(a => a.emitent_title === e.target.value)
            });

        e.target.blur();
    };

    handleSetTradedates = e => {
        this.setState({optionsHandleSetTradedates: e.target.value});

        this.state.bothSecuritiesHistoriesPapers = [...this.state.dopMaxBothSecuritiesHistoriesPapers];

        if (e.target.value !== "reset0")
            this.setState({
                bothSecuritiesHistoriesPapers: this.state.bothSecuritiesHistoriesPapers.filter(a => a.tradedate === e.target.value)
            });

        e.target.blur();
    };

    sendMyToast = (mText, mType) => {
        this.setState({messageText: mText});
        this.setState({messageType: mType});
        this.setState({"show": true});
        setTimeout(() => this.setState({"show": false}), 3000);
    };

    render() {
        const Page = {
            marginTop: "70px",
            marginBottom: "60px"
        };

        const selectList = {
            fontSize: "20px"
        };

        return (
            <div style={Page}>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={this.state.messageText} type={this.state.messageType}/>
                </div>

                <Form.Row>
                    <Form.Group as={Row}>
                        <hr/>
                        <div className="widthListNumber1">
                            <Form.Label>Выбор направления</Form.Label>
                            <select className="form-control"
                                    onChange={this.handleListUpDown}
                                    value={this.state.valueDirectionSort}
                            >
                                <option value="0" disabled>Направление</option>
                                <option value="sortUp">По возрастанию</option>
                                <option value="sortDown">По Убыванию</option>
                            </select>
                        </div>
                        {/*<hr/>*/}
                        <div className="widthListNumber2">
                            <Form.Label>Выбор поля</Form.Label>
                            <select className="form-control"
                                    onChange={this.handleListFields}
                                    value={this.state.valueFieldSort}
                            >
                                <option value="0" disabled>Поле</option>
                                <option value="emitent_title">emitent_title</option>
                                <option value="tradedate">tradedate</option>
                            </select>
                        </div>
                        <hr/>
                    </Form.Group>
                </Form.Row>

                <hr/>

                <Form.Row>
                    <Form.Group as={Row} controlId="">
                        <div className="styleScroll">
                            <Form.Label>Фильтрация</Form.Label>
                            <select className="form-control"
                                    size={this.state.sizeEmitentTitles}
                                    onFocus={() => {
                                        this.setState({
                                            sizeEmitentTitles: this.state.setEmitentTitles.length > 10 ?
                                                10 : this.state.setEmitentTitles.length + 2
                                        })
                                    }}
                                    onBlur={() => {
                                        this.setState({sizeEmitentTitles: 0})
                                    }}
                                    onChange={this.handleSetEmitentTitles}
                                    value={this.state.optionsHandleSetEmitentTitles}
                            >
                                <option value={"0"} disabled>Выберите поле для фильтрации</option>
                                <option value={"reset0"}>Reset</option>
                                {
                                    this.state.setEmitentTitles
                                }
                            </select>
                        </div>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Row} controlId="">
                        <div className="styleScroll">
                            <Form.Label>Фильтрация</Form.Label>
                            <select className="form-control"
                                    size={this.state.sizeTradedates}
                                    onFocus={() => {
                                        this.setState({
                                            sizeTradedates: this.state.setTradedates.length > 10 ?
                                                10 : this.state.setTradedates.length + 2
                                        })

                                    }}
                                    onBlur={() => {
                                        this.setState({sizeTradedates: 0})
                                    }}
                                    onChange={this.handleSetTradedates}
                                    value={this.state.optionsHandleSetTradedates}
                            >
                                <option value={"0"} disabled>Выберите поле для фильтрации</option>
                                <option value={"reset0"}>Reset</option>
                                {
                                    this.state.setTradedates
                                }
                            </select>
                        </div>
                    </Form.Group>
                </Form.Row>

                <table className="table">
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>secid</th>
                        <th>regnumber</th>
                        <th>name</th>
                        <th>emitent_title</th>
                        <th>tradedate</th>
                        <th>numtrades</th>
                        <th>open</th>
                        <th>close</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.bothSecuritiesHistoriesPapers.map(item => (
                        <tr key={item.amount}>
                            <td>{item.amount}</td>
                            <td>{item.secid}</td>
                            <td>{item.regnumber}</td>
                            <td>{item.name}</td>
                            <td>{item.emitent_title}</td>
                            <td>{item.tradedate}</td>
                            <td>{item.numtrades}</td>
                            <td>{item.open}</td>
                            <td>{item.close}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}