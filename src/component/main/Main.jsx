import React, { useEffect, useState } from "react";
import "./_main.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Card from "../card/Card";
import InfiniteScroll from "react-infinite-scroll-component";

const totalCount = 10;
export default function Main({ filter }) {
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(-1);

  function filterJobs(jobs) {
    return jobs.filter((job) => {
      // Filter by work mode
      if (
        filter.workMode.length > 0 &&
        !filter.workMode.some((mode) => mode.value === job.location)
      ) {
        return false;
      }

      // Filter by base pay
      if (
        filter.basePay.length > 0 &&
        !filter.basePay.some(
          (pay) => pay.value >= job.minJdSalary && pay.value <= job.maxJdSalary
        )
      ) {
        return false;
      }

      // Filter by roles
      if (
        filter.roles.length > 0 &&
        !filter.roles.some((role) => role.value === job.jobRole)
      ) {
        return false;
      }

      // Filter by experience
      if (filter.exp.length > 0) {
        const isWithinSelectedRanges = filter.exp.some((range) => {
          const [minExp, maxExp] = range.value.split("-").map(Number);
          return job.minExp >= minExp;
        });
        if (!isWithinSelectedRanges) {
          return false;
        }
      }

      // Filter by title (company name)
      if (
        filter.title &&
        !job.companyName.toLowerCase().includes(filter.title.toLowerCase())
      ) {
        return false;
      }

      // If job passes all filters, include it in the filtered array
      return true;
    });
  }

  const fetchData = async (page = -1) => {
    try {
      const newOffset = (page + 1) * 20;
      const body = JSON.stringify({
        limit: 20,
        offset: newOffset,
      });

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

      const result = await response.json();
      const filteredData = filterJobs(result.jdList);
      const newData =
        page === -1 ? filteredData : [...cardData, ...filteredData];
      console.log(newData);
      setCardData(newData);
      setTotalData(result?.totalCount);
      setPage(page + 1);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <div className="main-cont">
      {
        <InfiniteScroll
          dataLength={cardData.length}
          next={() => fetchData(page)}
          hasMore={cardData.length !== totalData.length && cardData.length > 0}
          loader={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
                paddingRight: "20px",
              }}
            >
              <CircularProgress />
            </Box>
          }
          endMessage={
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
                paddingLeft: "400px",
              }}
            >
              <b>No Jobs available for this category at the moment</b>
            </p>
          }
        >
          <div className="job-cont">
            {cardData.length > 0 ? (
              cardData.map((item) => {
                return <Card data={item} key={item?.jdUid} />;
              })
            ) : (
              <div>No Jobs available for this category at the moment</div>
            )}
          </div>
        </InfiniteScroll>
      }
    </div>
  );
}
