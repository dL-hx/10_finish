## day 10 完结 ,增加统计金额

### 本节目标:增加统计金额

![0901](http://ww1.sinaimg.cn/large/006pJUwqly1fwq7y6neybj31150goq3g.jpg)



- 1.画页面

- `src\components\AmountBox.js`:

- ```js
  import React from "react";
  /* 
  内插变量
  */
  const AmountBox = ({ text ,type}) => {
    return (
      <div className="col">
        <div className="card">
          {/* <div className="card-header bg-success text-white" > */}
          <div className={`card-header bg-${type} text-white`}>
            {text}
          </div>
          <div className="card-body">78</div>
        </div>
      </div>
    );
  };
  
  export default AmountBox;
  
  ```

- `src\components\Records.js`

```js
import React, { Component } from "react";
...
import RecordForm from "./RecordForm";
import AmountBox from "./AmountBox";

class Records extends Component {
  constructor() {...}

  componentDidMount() {...}
  addRecord(record) {...}
  updateRecord(record,data){...}
  deleteRecord(record){...}
  render() {...}
    return (
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credit" type="success"/>
          <AmountBox text="Debit" type="danger"/>
          <AmountBox text="Balance" type="info"/>
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {recordsComponents}
      </div>
    );
  }
}
export default Records;

```

这里画出了页面

![0901](http://ww1.sinaimg.cn/large/006pJUwqly1fwq7y6neybj31150goq3g.jpg)

- 2.添加函数
- credits()
- debits()
- balance()

`src\components\Records.js`:

```js
import React, { Component } from "react";
import Record from "./Record";
import * as RecordsAPI from "../utils/RecordsAPI";
import RecordForm from "./RecordForm";
import AmountBox from "./AmountBox";

class Records extends Component {
  constructor() {...}

  componentDidMount() {...}
  addRecord(record) {...}
  updateRecord(record,data){...}
  deleteRecord(record){...}

  credits(){
    //1- 查找过滤出所有的正数
    //2- 将所有的正数相加

    let credits = this.state.records.filter((record)=>{
      return record.amount >= 0;
    });

    return credits.reduce((prev,curr)=>{
      return prev + Number.parseInt(curr.amount,0)
    },0)
  }


  debits(){
    let credits = this.state.records.filter((record)=>{
      return record.amount < 0;
    });

    return credits.reduce((prev,curr)=>{
      return prev + Number.parseInt(curr.amount,0)
    },0)
  }

  balance(){
    return this.credits() + this.debits();
  }

  render() {...}
    return (
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credit" type="success" amount = {this.credits()}/>
          <AmountBox text="Debit" type="danger" amount = {this.debits()}/>
          <AmountBox text="Balance" type="info" amount = {this.balance()}/>
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {recordsComponents}
      </div>
    );
  }
}
export default Records;

```



改造`src\components\AmountBox.js`

```js
import React from "react";
/* 
内插变量
*/
const AmountBox = ({ text ,type ,amount}) => {
  return (
    <div className="col">
      <div className="card">
        {/* <div className="card-header bg-success text-white" > */}
        <div className={`card-header bg-${type} text-white`}>
          {text}
        </div>
        <div className="card-body">
        {/* 78 */}
        {amount}
        </div>
      </div>
    </div>
  );
};

export default AmountBox;

```

### 最终效果

![0902](http://ww1.sinaimg.cn/large/006pJUwqly1fwq8ga19hqg30zc0fpjz5.gif)



[![Edit 10-finish](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/lenvo222/10_finish/tree/master/)

