import { useState } from "react";
import users from "./data/users";

type User = (typeof users)[number];

const columns = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Occupation", key: "occupation" },
] as const;

function paginateUsers(
  usersList: Array<User>,
  page: number,
  pageSize: number,
  sortBy: Array<String>,
) {
  let updatedUsersList = [...usersList];
  if (sortBy.length != 0) {
    const sortByType = sortBy[0];
    const order = sortBy[1];

    updatedUsersList = updatedUsersList.sort((a:Object,b:Object) => {
      if(order == "ascending"){
        if(sortByType == "name" || sortByType == "occupation"){
          return a[sortByType].localeCompare(b[sortByType])
        }
        return a[sortByType] - b[sortByType]
      }
      else{
        if(sortByType == "name" || sortByType == "occupation"){
          return b[sortByType].localeCompare(a[sortByType])
        }
        return b[sortByType] - a[sortByType]
      }
    })
  }
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pageUsers = updatedUsersList.slice(start, end);
  const totalPages = Math.ceil(usersList.length / pageSize);
  return { pageUsers, totalPages };
}

export default function DataTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState([]);

  const { totalPages, pageUsers } = paginateUsers(
    users,
    page,
    pageSize,
    sortBy,
  );

  const handleSortBy = (label:String) => {
    if(sortBy.length == 0){
      setSortBy([label, "ascending"]);
    }
    else{
      const sortByType = sortBy[0];
      const order = sortBy[1];

      if(sortByType != label){
        setSortBy([label, "ascending"])
      }
      else{
        setSortBy([label, order == "ascending" ? "descending" : "ascending"])
      }
    }
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key} onClick={() => handleSortBy(key)}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageUsers.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="pagination">
        <select
          aria-label="Page size"
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPage(1);
          }}
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
        <div className="pages">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Prev
          </button>
          <span aria-label="Page number">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
