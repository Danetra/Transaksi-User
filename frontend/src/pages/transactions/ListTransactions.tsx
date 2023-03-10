import React, {useEffect} from 'react';
import {ContentHeader} from '@components';
import {getTransactions} from '@app/services/transactions';

const ListTransactions = () => {
  const [responseData, setResponseData] = React.useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getTransactions()
      .then((response) => {
        setResponseData(response.data.data);
        console.log(response, 'test');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <ContentHeader title="Transactions" />
      <section className="content">
        <div className="container-fluid">
          <a href="/transactions/add">
            <button type="button" className="btn btn-primary mb-1">
              Add Transactions
            </button>
          </a>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">List Transactions</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <table id="example2" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Reference No.</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Stock</th>
                    <th>Quantity</th>
                    <th>Payment Amount</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {responseData.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.reference}</td>
                        <td>{data.product_name}</td>
                        <td>{data.product_price}</td>
                        <td>{data.product_stock}</td>
                        <td>{data.quantity}</td>
                        <td>{data.payment_amount}</td>
                        <td>{data.created}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListTransactions;
