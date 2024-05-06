import React from "react";
import "./_card.scss";
export default function Card({ data }) {
  const capitalize = (s: string): string => {
    return (s && s[0].toUpperCase() + s.slice(1)) || "";
  };

  const handleClick = (link) =>{
    window.open(link, "_blank");
  }

  return (
    <div className="job-card">
      <div className="card-nav">
        <div className="job-logo">
          <img src={data.logoUrl} />
        </div>
        <div className="card-nav-side">
          <div className="job-company">{data.companyName}</div>
          <div className="job-title">{capitalize(data.jobRole)}</div>
          <div className="job-location">{capitalize(data.location)}</div>
        </div>
      </div>
      <div className="job-salary">
        {`Estimated Salary: ₹${data.minJdSalary ? data.minJdSalary : ""} ${
          data.minJdSalary && data.maxJdSalary ? "-" : ""
        } ${data.maxJdSalary ? data.maxJdSalary : ""} LPA`}
      </div>
      <div className="job-details-heading">About Company:</div>
      <div className="job-details">{data?.jobDetailsFromCompany}</div>
      {/* <div className="show-more">
        
      </div> */}
      <a className="show-more">Show more</a>
      <div className="job-exp-cont">
        {data?.minExp && (
          <div className="job-exp-heading">Minimum Experience</div>
        )}
        {data?.minExp && (
          <div className="job-exp">{`${data?.minExp} Years`}</div>
        )}
      </div>
      <div className="btn-cont">
        <button type="button" className="btn-green" onClick={()=>handleClick(data.jdLink)}>
          Easy Apply
        </button>
        <button type="button" className="btn-blue">
          Unlock referral asks
        </button>
      </div>
    </div>
  );
}

// {
//     "jdUid": "cfff35ac-053c-11ef-83d3-06301d0a7178-92010",
//     "jdLink": "https://weekday.works",
//     "jobDetailsFromCompany": "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.",
//     "maxJdSalary": 61,
//     "minJdSalary": null,
//     "salaryCurrencyCode": "USD",
//     "location": "delhi ncr",
//     "minExp": 3,
//     "maxExp": 6,
//     "jobRole": "frontend",
//     "companyName": "Dropbox",
//     "logoUrl": "https://logo.clearbit.com/dropbox.com"
// }
