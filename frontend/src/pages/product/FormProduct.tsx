/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react';
import {ContentHeader} from '@components';
import {postData} from '@app/services/product';
import {useNavigate} from 'react-router-dom';

const FormProduct = () => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [stock, setStock] = React.useState('');
  const [description, setDescription] = React.useState('');
  const navigate = useNavigate();

  const form = {
    name,
    price,
    stock,
    description
  };

  const fetchData = (e) => {
    e.preventDefault();
    postData(form)
      .then((response) => {
        navigate('/product');
        // console.log(response, 'test');
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(form, 'test');
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
            <form onSubmit={fetchData} method="post">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name of Product"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    name="price"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                    id="price"
                    placeholder="Enter Price of Product"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    name="stock"
                    onChange={(e) => setStock(e.target.value)}
                    type="text"
                    className="form-control"
                    id="stock"
                    placeholder="Enter Stock of Product"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    id="description"
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

export default FormProduct;
