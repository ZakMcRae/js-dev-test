import React, { useState, useEffect } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

// a pop up which displays details of a specific repository
function RepoDetail({ repoToDisplay }) {
  const [commitDetail, setCommitDetail] = useState(null);
  const [readmeDetail, setReadmeDetail] = useState(null);

  // get commit details and readme from github api when repoToDisplay changes in state
  useEffect(() => {
    // catch Json Examples - not real repos with actual commit details or a readme
    if (repoToDisplay.includes('Example')) {
      setCommitDetail({
        author: {
          name: 'silverorange',
        },
      });
      setReadmeDetail(null);
    } else {
      const fetchCommitData = async () => {
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

      const fetchReadmeData = async () => {
        const response = await fetch(
          `https://raw.githubusercontent.com/${repoToDisplay}/master/README.md`,
          {
            mode: 'cors',
          }
        );

        // check if api returns readme or not
        if (response.status !== 200) {
          setReadmeDetail(null);
        } else {
          const readme = await response.text();
          // store fetched data in commitDetail in state
          setReadmeDetail(readme);
        }
      };

      fetchCommitData();
      fetchReadmeData();
    }
  }, [repoToDisplay]);

  return (
    <div className="repo-detail">
      {commitDetail ? (
        <>
          <p>Repo Name: {repoToDisplay.split('/')[1]}</p>
          <p>Commit Author: {commitDetail.author.name || 'N/A'}</p>
          <p>
            Commit Date:{' '}
            {commitDetail.author.date
              ? new Date(commitDetail.author.date).toLocaleString('en-ca')
              : 'N/A'}
          </p>
          <p>Commit Message: {commitDetail.message || 'N/A'}</p>
        </>
      ) : null}
      {readmeDetail ? <ReactMarkdown>{readmeDetail}</ReactMarkdown> : null}
    </div>
  );
}
export default RepoDetail;
