import React, { Component } from "react";
import Record from "./Record";
import * as RecordsAPI from "../utils/RecordsAPI";
import RecordForm from "./RecordForm";
import AmountBox from "./AmountBox";

class Records extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: []
    };
  }

  componentDidMount() {
    RecordsAPI.getAll()
      .then(response =>
        this.setState({
          records: response.data,
          isLoaded: true
        })
      )
      .catch(error =>
        this.setState({
          isLoaded: true,
          error
        })
      );
  }
  addRecord(record) {
    //得到传入的值
    //console.log(record);
    this.setState({
      error: null,
      isLoaded: true,
      records: [...this.state.records, record]
    });
  }
  updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item, index) => {
      if (index !== recordIndex) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...data
      };
    });
    this.setState({
      records: newRecords
    });
  }
  deleteRecord(record) {
    // console.log(record,"1");
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter(
      (item, index) => index !== recordIndex
    );
    this.setState({
      records: newRecords
    });
  }

  credits() {
    //1- 查找过滤出所有的正数
    //2- 将所有的正数相加

    let credits = this.state.records.filter(record => {
      return record.amount >= 0;
    });

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0);
    }, 0);
  }

  debits() {
    let credits = this.state.records.filter(record => {
      return record.amount < 0;
    });

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0);
    }, 0);
  }

  balance() {
    return this.credits() + this.debits();
  }

  render() {
    const { error, isLoaded, records } = this.state;
    let recordsComponents; //添加此行

    if (error) {
      recordsComponents = (
        <div>
          Error:
          {error.message}
        </div>
      );
    } else if (!isLoaded) {
      recordsComponents = <div>Loading...</div>;
    } else {
      recordsComponents = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <Record
                key={record.id}
                record={record}
                handleEditRecord={this.updateRecord.bind(this)}
                handleDeleteRecord={this.deleteRecord.bind(this)}
              />
            ))}
            {/* <Record  /> */}
          </tbody>
        </table>
      );
    }
    return (
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credit" type="success" amount={this.credits()} />
          <AmountBox text="Debit" type="danger" amount={this.debits()} />
          <AmountBox text="Balance" type="info" amount={this.balance()} />
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {recordsComponents}
      </div>
    );
  }
}
export default Records;
