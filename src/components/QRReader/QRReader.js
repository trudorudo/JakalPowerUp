import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
 
class QrScanner extends Component {
  state = {
    // result: 'No result'
  }
 
  handleScan = data => {
    if (data) {
      this.setState({
        // result: data
       
      })
      
     
      window.location.assign(data)
    }

  }

  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          facingMode={"rear"}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '30%', margin: "0 auto"  }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}
 

export default QrScanner;