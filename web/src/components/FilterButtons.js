import React from 'react';

function FilterButtons({ setSortBy, repoApiData }) {
  // get all languages and keep only uique values
  const repoLanguages = repoApiData.map((repo) => repo.language);
  const uniqueLanguages = new Set(repoLanguages);

  return (
    <div className="filter-buttons">
      <p>Filter by</p>
      <button onClick={() => setSortBy('all')}>All</button>
      {/* map out unique languages to their own button */}
      {/* onClick will set the state for which language to sort by */}
      {[...uniqueLanguages].map((language, index) => {
        return (
          <button key={index} onClick={() => setSortBy(language)}>
            {language}
          </button>
        );
      })}
    </div>
  );
}

export default FilterButtons;
