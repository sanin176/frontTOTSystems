import React, {Component} from "react";
import axios from 'axios';
import MyToast from "../MyToast";

export default class UplodafileHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            messageText: '',
            messageType: ''
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault(); // Stop form submit
        this.fileUpload(this.state.file).then((response) => {
            // console.log(response.data);
        }).catch(err => {
            this.sendMessageError("Error before upload file", "danger");
        })
    }

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    fileUpload(file) {
        const url = 'http://localhost:8080/uploadHistory';
        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return axios.post(url, formData, config).then(response => {
            if (response.data != null) {
                this.sendMessageError("File upload success", "success");
            }
        }).catch(err => {
            this.sendMessageError("File does not upload success", "danger");
        })
    }

    sendMessageError = (stringText, stringType) => {
        this.setState({messageText: stringText});
        this.setState({"show": true, "method": "put"});
        this.setState({messageType: stringType});
        setTimeout(() => this.setState({"show": false}), 3000);
    };

    render() {

        const Page = {
            marginTop: "70px",
            marginBottom: "60px"
        };

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={this.state.messageText} type={this.state.messageType}/>
                </div>
                <div className="ml-5" style={Page}>
                    <form onSubmit={this.onFormSubmit}>
                        <h1>File Upload History</h1>
                        <input type="file" onChange={this.onChange}/>
                        <button type="submit">Upload</button>
                    </form>
                </div>
            </div>
        )
    }
}