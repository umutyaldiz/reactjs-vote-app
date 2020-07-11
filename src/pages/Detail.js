import React, { Component } from 'react'
import DataManager from '../components/DataManager';
import { Link } from 'react-router-dom';

class Detail extends Component {

    state = {
        id: null,
        name: "",
        url: "",
        messageShow: false
    };

    componentDidMount() {
        const currentID = this.props.match.params.itemID;
        if (currentID) {
            let data = JSON.parse(DataManager.get("appStorage")) || [];
            let item = data.filter(x => { return x.id === parseInt(currentID); });
            this.setState({
                id: currentID,
                name: item[0].name,
                url: item[0].url
            })
        }
    }
    handleNameChange = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }
    handleUrlChange = (e) => {
        e.preventDefault();
        this.setState({ url: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let data = JSON.parse(DataManager.get("appStorage")) || [];
        let maxId = 0;

        if (data.length) {
            maxId = data.reduce(
                (max, item) => (item.id > max ? item.id : max),
                data[0].id
            );
        }

        if (this.formValid()) {
            let updateStatu = false;
            data.map((item) => {
                if (item.id === parseInt(this.state.id)) {
                    item.name = this.state.name;
                    item.url = this.state.url;
                    item.time = new Date();
                    updateStatu = true;
                }
                return item;
            });
            if (!updateStatu) {
                data.push({
                    id: maxId + 1,
                    name: this.state.name,
                    url: this.state.url,
                    vote: 0,
                    time: new Date()
                });

                this.setState({ message: "Link Added!" });
            } else {
                this.setState({ message: "Link Updated!" });
            }
            DataManager.set("appStorage", JSON.stringify(data));
            this.message();
            this.formClear();
        }

    }
    formValid() {
        let valid = true;
        if (this.state.name === "" || this.state.url === "") {
            valid = false;
        }
        return valid;
    }
    formClear() {
        this.setState({ name: "", url: "" });
    }

    message() {
        this.setState({ messageShow: true });
    }

    render() {
        return (
            <div className="form-wrapper">
                <Link to={'/'} className="back-link">Return to List</Link>
                <div className="form">
                    <h1>Add New Link</h1>
                    <div className="field">
                        <label>Link Name:</label>
                        <input type="text" onChange={this.handleNameChange} value={this.state.name} />
                    </div>
                    <div className="field">
                        <label>Link URL:</label>
                        <input type="text" onChange={this.handleUrlChange} value={this.state.url} />
                    </div>
                    <div className={"message " + (this.state.messageShow ? "show" : "")}>
                        {this.state.message}
                    </div>
                    <div className="submit">
                        <button onClick={this.handleSubmit}>{this.state.id ? "UPDATE" : "ADD"}</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Detail;