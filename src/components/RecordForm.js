import React, { Component } from "react";

import * as RecordsAPI from "../utils/RecordsAPI";

export default class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      title: "",
      amount: ""
    };
  }

  //这个方法用来判断三个框同时有值是否有效
  valid() {
    return this.state.date && this.state.title && this.state.amount;
  }

  //创建handleChange()方法
  handleChange(event) {
    let name, obj;
    name = event.target.name;
    this.setState(((obj = {}), (obj["" + name] = event.target.value), obj));
  }

  handleSubmit(event) {
    event.preventDefault(); //阻止浏览器的get请求,即现在是post方式
    // this.state
    // 相当于{date:this.state.date, title:this.state.title,amount:this.state.amount}
    /* RecordsAPI.create({date:this.state.date, title:this.state.title,amount:Number.parseInt(this.state.amount,0)}).then( 
    response => console.log(response.data)
    ).catch(error => console.log(error.message)
    ) */
    //上面的写法太长了  使用下面的写法

    const data = {
      date: this.state.date,
      title: this.state.title,
      amount: Number.parseInt(this.state.amount, 0)
    };

    RecordsAPI.create(data)
      .then(
        //   response => console.log(response.data)
        response => {
          this.props.handleNewRecord(response.data);
          //点击按钮清空列表
          this.setState({
            date: "",
            title: "",
            amount: ""
          });
        }
      )
      .catch(error => console.log(error.message));
  }
  render() {
    return (
      <form
        className="form-inline mb-3"
        onSubmit={this.handleSubmit.bind(this)}
      >
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange.bind(this)}
            placeholder="Date"
            name="date"
            value={this.state.date}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange.bind(this)}
            placeholder="Title"
            name="title"
            value={this.state.title}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange.bind(this)}
            placeholder="Amount"
            name="amount"
            value={this.state.amount}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!this.valid()}
        >
          Create Record
        </button>
      </form>
    );
  }
}
