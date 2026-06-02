import { useState, useRef } from "react";
import users from "./data/users";

export default function DataTable() {
  const [message, setMessage] = useState("Data Table");
  const [itemsperPage, setItemsPerPage] = useState("5");
  const [activePage, setActivePage] = useState(0);

  //page Calculations
  //const totalItems = users.length;
  //const perPageItemLength = Math.floor(totalItems / itemsperPage);
  const userTable = users.slice(
    activePage * itemsperPage,
    (activePage + 1) * itemsperPage,
  );
  const pages = Math.floor(users.length / itemsperPage);

  const handleSelectChange = (e) => {
    setItemsPerPage(e.target.value);
    setActivePage(0);
  }
  
  function getPagintaion(pages){
    return (
      <div>
        {
          Array.from({length:pages + 1}).fill("").map((item, index) => {
            return <button className={`${activePage == index ? 'active' : ''}`} onClick={() => setActivePage(index)}>{index + 1}</button>
          })
        }
      </div>
    )
  }

  return (
    <div>
      <h1>{message}</h1>
      <div className="selectDiv">
        <p>select number of items per page</p>
        <select
          value={itemsperPage}
          onChange={handleSelectChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            {[
              { label: "ID", key: "id" },
              { label: "Name", key: "name" },
              { label: "Age", key: "age" },
              { label: "Occupation", key: "occupation" },
            ].map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userTable.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {getPagintaion(pages)}
    </div>
  );
}
