import React, { useState, useEffect } from 'react';
import './App.css';
import RepoList from './components/RepoList';

export function App() {
  // keep track of api repo data
  const [repoApiData, setRepoApiData] = useState([]);

  // fetch api repo data on intial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await fetch('http://localhost:4000/repos', {
          mode: 'cors',
        });

        // check if fetch was successful or not
        if (apiResponse.status !== 200) {
          alert(
            'Something went wrong getting the Repository info from API, please try again'
          );
        } else {
          // put the fetched data into repoApiData in state
          setRepoApiData(await apiResponse.json());
        }
      } catch (error) {
        alert(
          'Unable to get Repository info from API, please reload page to try again'
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {repoApiData === [] ? null : <RepoList repoApiData={repoApiData} />}
    </div>
  );
}
