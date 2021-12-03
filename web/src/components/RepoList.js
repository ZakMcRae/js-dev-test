import React from 'react';

function RepoList({ repoApiData }) {
  return (
    <div className="repository-list">
      <h1>Repository List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Language</th>
            <th>Forks Count</th>
          </tr>
        </thead>
        <tbody>
          {repoApiData.map((repo, index) => {
            return (
              <tr key={index}>
                <td>{repo.name}</td>
                <td>{repo.description}</td>
                <td>{repo.language}</td>
                <td>{repo.forks_count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RepoList;
