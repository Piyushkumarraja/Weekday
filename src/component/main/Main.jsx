import React, { useEffect, useState } from "react";
import "./_main.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Card from "../card/Card";
import InfiniteScroll from "react-infinite-scroll-component";

const totalCount = 10;
export default function Main() {
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(-1);

  const fetchData = async () => {
    try {
      const body = JSON.stringify({
        limit: 10,
        offset: (page + 1) * totalCount,
      });
      setPage(page + 1);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // const result = await response.text();
      const result = await response.json();
      setCardData((prevData) => [...prevData, ...result?.jdList]);
      setTotalData(result?.totalCount);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main-cont">
      {
        <InfiniteScroll
          dataLength={cardData.length}
          next={fetchData}
          hasMore={cardData.length !== totalData.length}
          loader={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
                width: "100vw",
              }}
            >
              <CircularProgress />
            </Box>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="job-cont">
            {cardData.map((item) => {
              return <Card data={item} />;
            })}
          </div>
        </InfiniteScroll>
      }
    </div>
  );
}
