import React, {useEffect} from 'react';
import {ContentHeader} from '@components';
import {deleteData, getData} from '@app/services/product';

const ListProduct = () => {
  const [responseData, setResponseData] = React.useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getData()
      .then((response) => {
        setResponseData(response.data.data);
        console.log(response, 'test');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (id) => {
    deleteData(id)
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <ContentHeader title="Product" />
      <section className="content">
        <div className="container-fluid">
          <a href="/product/add">
            <button type="button" className="btn btn-primary mb-1">
              Add Product
            </button>
          </a>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">List Product</h3>
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
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stocks</th>
                    <th>Description</th>
                    <th>Created</th>
                    <th colSpan={2}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {responseData.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>{data.stock}</td>
                        <td>{data.description}</td>
                        <td>{data.created_at}</td>
                        <td>
                          <a href={`/product/edit/${data.id}`}>
                            <button
                              type="button"
                              className="btn btn-success mb-1 mr-1"
                            >
                              Edit
                            </button>
                          </a>
                          <button
                            type="button"
                            className="btn btn-danger mb-1 mr-1"
                            onClick={() => deleteProduct(data.id)}
                          >
                            Delete
                          </button>
                        </td>
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

export default ListProduct;
