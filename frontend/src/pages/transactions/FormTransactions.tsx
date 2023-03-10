/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react';
import {ContentHeader} from '@components';
import {useNavigate} from 'react-router-dom';
import {getData} from '@app/services/product';
import {postTransactions} from '@app/services/transactions';
import {toast} from 'react-toastify';

const FormTransactions = () => {
  const [productId, setProductId] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const navigate = useNavigate();

  const [responseData, setResponseData] = React.useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const form = {
    product_id: parseInt(productId, 10),
    quantity: parseInt(quantity, 10)
  };

  const fetchData = () => {
    getData()
      .then((response) => {
        setResponseData(response.data.data);
        console.log(response, 'product');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postData = (e) => {
    e.preventDefault();
    console.log(form, 'form');
    postTransactions(form)
      .then((response) => {
        toast.success('Transaction is succeed!');
        navigate('/transactions');
        // console.log(response, 'test');
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(form, 'test');
  };

  return (
    <div>
      <ContentHeader title="Product" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Form Product</h3>
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
            <form onSubmit={postData} method="post">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <select
                    className="form-control"
                    name="product_id"
                    onChange={(e) => setProductId(e.target.value)}
                  >
                    <option>Select Product</option>
                    {responseData.map((data, i) => {
                      return (
                        <option key={i} value={data.id}>
                          {data.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Quantity</label>
                  <input
                    name="price"
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-control"
                    id="price"
                    placeholder="Enter Quantity of Transactions"
                  />
                </div>
                <button type="submit" className="btn btn-primary mb-1">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormTransactions;
