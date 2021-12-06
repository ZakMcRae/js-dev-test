import React, { useState, useEffect } from 'react';

// a pop up which displays details of a specific repository
function RepoDetail({ repoToDisplay }) {
  const [commitDetail, setCommitDetail] = useState(null);

  // get commit details from github api when repoToDisplay changes in state
  useEffect(() => {
    // catch Json Examples - not real repos with actual commit details
    if (repoToDisplay.includes('Example')) {
      setCommitDetail({
        author: {
          name: 'silverorange',
        },
      });
    } else {
      const fetchData = async () => {
        const response = await fetch(
          `https://api.github.com/repos/${repoToDisplay}/commits?per_page=1`,
          {
            mode: 'cors',
          }
        );
        const json = await response.json();
        // store fetched data in commitDetail in state
        setCommitDetail(json[0].commit);
      };

      fetchData();
    }
  }, [repoToDisplay]);

  return (
    <div className="repo-detail">
      {commitDetail ? (
        <>
          <p>Repo Name: {repoToDisplay.split('/')[1]}</p>
          <p>Author: {commitDetail.author.name || 'N/A'}</p>
          <p>
            Date:{' '}
            {commitDetail.author.date
              ? new Date(commitDetail.author.date).toLocaleString('en-ca')
              : 'N/A'}
          </p>
          <p>Message: {commitDetail.message || 'N/A'}</p>
        </>
      ) : null}
    </div>
  );
}
export default RepoDetail;
