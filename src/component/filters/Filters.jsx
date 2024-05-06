import Select from "react-select";
import "./_filters.scss";
import {
  rolesOptions,
  workModeOptions,
  experienceOptions,
  basePayOptions,
} from "../data";

const Filter = ({filter, onChange}) => {

  const style = {
    menu: (base) => ({
      ...base,
      width: "max-content",
      minWidth: "100%",
    }),
  };

  return (
    <div className="filter-cont">
      <div className="filter-item">
        <div className="filter-heading">Roles</div>
        <Select
          isMulti
          name="roles"
          options={rolesOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Roles"
          styles={style}
          onChange={(e) => onChange(e, "roles")}
        />
      </div>
      <div className="filter-item">
        <div className="filter-heading">Experience</div>
        <Select
          isMulti
          name="experience"
          options={experienceOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Experience"
          styles={style}
          onChange={(e) => onChange(e, "exp")}
        />
      </div>
      <div className="filter-item">
        <div className="filter-heading">Work Mode</div>
        <Select
          isMulti
          name="work_mode"
          options={workModeOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Work Mode"
          styles={style}
          onChange={(e) => onChange(e, "workMode")}
        />
      </div>
      <div className="filter-item">
        <div className="filter-heading">Min Base Pay</div>
        <Select
          isMulti
          name="pay"
          options={basePayOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Min Base Pay"
          styles={style}
          onChange={(e) => onChange(e, "basePay")}
        />
      </div>
      <input type="text" onChange={(e) => onChange(e.target.value, "title")} className="input-box" placeholder="Company Name"/>
    </div>
  );
};

export default Filter;
