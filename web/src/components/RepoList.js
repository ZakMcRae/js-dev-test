import React from 'react';

function RepoList({ repoApiData, sortBy }) {
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
          {/* renders repositorys based on value of sortBy in state */}
          {sortBy === 'all'
            ? // when sort by is 'all' ignore the filter
              repoApiData.map((repo, index) => {
                return (
                  <tr key={index}>
                    <td>{repo.name}</td>
                    <td>{repo.description}</td>
                    <td>{repo.language}</td>
                    <td>{repo.forks_count}</td>
                  </tr>
                );
              })
            : // when sort by is anything other than all, filter based on that sortBy value
              repoApiData
                .filter((repo) => repo.language === sortBy)
                .map((repo, index) => {
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
