import React, { useEffect, useState } from "react";
import { getArticlesApi } from "../api/external";
import Loader from "../components/Loader/Loader";
function Home() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    (async function getArticles() {
      const response = await getArticlesApi();
      if (response.status === 200) {
        setArticles(response.data.articles.slice(0, 20));
      } else {
        console.log("no");
      }
    })();
    // cleanup function
    setArticles([]);
  }, []);

  const handleArticles = (url) => {
    window.open(url,"_blank");
  }

  if(articles.length === 0){
    return <Loader text={"Homepage"}/>
  }

  return (
    <div className="container">
      <h3 className="text-center">Latest New Articles</h3>
      <div className="mt-5 d-flex justify-content-center flex-wrap" style={{gap:"20px"}}>
        {articles &&
          articles.map((e) => (
            <div className="card shadow" style={{ width: "20%",cursor:"pointer" }} key={e.url} onClick={() => handleArticles(e.url)}>
              <img
                src={e.urlToImage}
                className="card-img-top w-100 h-100"
                alt="No Image"
              />
              <div className="card-body">
                <p className="card-text">{e.title.slice(0,50)}</p>
              </div>
            </div>
          ))}
      </div>
      {/* <div className={styles.grid}>
        <div className={styles.cards}>
          <img src="https://d3an9kf42ylj3p.cloudfront.net/uploads/2024/01/2024-Jan-Data-Literacy-Trends-SS-600x448-1.png" alt="No Image" className={styles.img_card}/>
          <p className={styles.title}>This is new title of the year...</p>
        </div>
      </div> */}
    </div>
  );
}

export default Home;
