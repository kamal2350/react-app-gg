import React, { useEffect, useState,useRef } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Modal, Table, message,Button } from 'antd'
import axios from 'axios';
import { EyeOutlined } from '@ant-design/icons';
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import '../styles/invoice.css';
import logo from '../assets/logo.svg';
import { HostName } from '../utils/config';
const BillsPage = () => {
  const componentRef = useRef();
  const[billsData,setBillsData]=useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const[selectedBill,setSelectedBill]=useState(null);

  // get all bills Data
  const getAllBills=async()=>{
    try {
        const res = await axios.get(`${HostName}/api/bills`);
         setBillsData(res.data);
        
    } catch (error) {
        message.error("Not able to find Bills");
    }
  }

  // columns

  const columns=[
    {title:"OrderId",dataIndex:"_id"},
    {title:"Customer Name", dataIndex:"customerName"},
    {title:"Customer Mobile Number",dataIndex:"_id",render:(id,bill)=>(
     <> {bill?.customerNumber ? <p>{bill.customerNumber}</p>:< p style={{color:"red"}}>Not Provided</p>}</>
    )},
    {title:"Total",dataIndex:"_id",render:(id,item)=>(
      <>₹ {item.totalAmount}</>
    )},
    {title:"View Bill Invoice",dataIndex:"_id",render:(id,bill)=>(
        <EyeOutlined style={{cursor:"pointer" ,marginLeft:"auto"}} 
          onClick={() => {
            setSelectedBill(bill);
            setPopupModal(true);
          }}
        />
    )}

  ]

   //print function
   const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  useEffect(()=>{
    getAllBills();
  },[]);
  return (
    <div>
      <DefaultLayout>
      
      <div className="d-flex justify-content-between" >
        <h1>Invoice list</h1>
      </div>
      <Table pagination={{defaultPageSize:10,showSizeChanger:true,pageSizeOptions:['5','10']}}columns={columns} dataSource={billsData}/>
    
      { popupModal && (
        <Modal
          width={400}
          pagination={false}
          title="Invoice Details"
          open={popupModal}
          onCancel={() => {
            setPopupModal(false);
          }}
          footer={false}
        >
          {/* ============ invoice modal start ==============  */}
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="logo"/>
              
              <div className="info">
                <h2>Green Grocers</h2>
                <p> Contact : 123456 | Bilaspur Himachal</p>
              </div>
              {/*End Info*/}
            </center>
            {/*End InvoiceTop*/}
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No : <b>{selectedBill.customerNumber?selectedBill.customerNumber:"Not Provided"}</b>
                  <br />
                  Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            {/*End Invoice Mid*/}
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours">
                        <h2>Qty</h2>
                      </td>
                      <td className="Rate">
                        <h2>Price</h2>
                      </td>
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">₹{item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              ₹{item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className="tabletitle">
                      <td />
                      <td />
                      {(selectedBill.discount> 0) &&<><td className="Rate">
                        <h2>Discount</h2>
                      </td>
                      <td className="payment">
                        <h2>₹{selectedBill.discount}</h2>
                      </td></>}
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Grand Total</h2>
                      </td>
                      <td className="payment">
                        <h2>
                          <b>₹{selectedBill.totalAmount}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*End Table*/}
              <div id="legalcopy">
                <p className="legal">
                  <strong >Thank you for your order!</strong>
                  {/* 10% GST application
                  on total amount.Please note that this is non refundable amount
                  for any assistance please write email
                  <b> help@mydomain.com</b> */}
                </p>
              </div>
            </div>
            {/*End InvoiceBot*/}
          </div>
          {/*End Invoice*/}
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
          {/* ============ invoice modal ends ==============  */}
        </Modal>
      )
      }
      

      </DefaultLayout>
    </div>
  )
}

export default BillsPage
