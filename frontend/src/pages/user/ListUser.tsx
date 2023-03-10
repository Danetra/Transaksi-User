/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react';
import {ContentHeader} from '@components';
import {getData} from '@app/services/user';

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

  return (
    <div>
      <ContentHeader title="Product" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">List User</h3>
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
                    <th>Username</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {responseData.map((data) => {
                    return (
                      <tr>
                        <td>{data.name}</td>
                        <td>{data.username}</td>
                        <td>{data.created_at}</td>
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
