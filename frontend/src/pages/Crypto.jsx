import React, { useEffect, useState } from "react";
import { getCrypto } from "../api/external";
import Loader from "../components/Loader/Loader";

function Crypto() {
  const [data,setData] = useState([]);
  useEffect(()=>{
    // IIFE => imidiately invoke function expression
    (async function cryptoApi(){
      const response = await getCrypto();
      if(response.status === 200){
        setData(response.data);
      }
      else{
        console.log("error in api");
      }
    })();

    // cleanup 
    setData([]);
  },[])

  if(data.length == 0){
    return <Loader text={"Crypto Page"}/>
  }
  return (
    <div>
      <h4 className="text-center mt-3 mb-2">Crypto Currencies Analysis </h4>
      <table className="table table-dark table-hover p-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Coin</th>
            <th scope="col">Symbol</th>
            <th scope="col">Price</th>
            <th scope="col">24h</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e)=>(
            <tr key={e.image}>
              <th scope="row">{e.market_cap_rank}</th>
              <td><img src={e.image} alt="no" width="20" /> {e.name}</td>
              <td>{e.symbol}</td>
              <td>${e.current_price}</td>
              <td className={e.price_change_percentage_24h < 0 ? "text-danger":"text-success"}>
                {e.price_change_percentage_24h}%
              </td>
            </tr>

          ))}

        </tbody>
      </table>
    </div>
  );
}

export default Crypto;
