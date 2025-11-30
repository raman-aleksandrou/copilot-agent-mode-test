import React, { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/users/`;
  }
  return `${window.location.protocol}//${window.location.hostname}:8000/api/users/`;
};


function Users() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching Users from:', url);
    fetch(url)
      .then(res => res.json())
      .then(json => {
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        console.log('Users data:', json);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  // Get all unique keys for table headers
  const allKeys = Array.from(
    data.reduce((keys, item) => {
      Object.keys(item).forEach(k => keys.add(k));
      return keys;
    }, new Set())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="display-6">Users</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">Add User</button>
      </div>
      <div className="card shadow mb-3">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  {allKeys.map(key => <th key={key}>{key}</th>)}
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={item.id || idx}>
                    {allKeys.map(key => <td key={key}>{item[key]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 0 && <div className="text-center text-muted">No users found.</div>}
          </div>
        </div>
      </div>
      {/* Modal placeholder */}
      <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">Add User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Bootstrap form placeholder */}
              <form>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">User Name</label>
                  <input type="text" className="form-control" id="userName" />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
