import {Branch} from "../models/branch";
import BranchItem from "./BranchItem";

interface Props {
  branches: Branch[];
  className?: string;
  margin: number;
  onItemDeleted: (id: number) => void;
  onItemEdit: (branch: Branch) => void;
}

const BranchesList = ({branches, className, margin, onItemDeleted, onItemEdit}: Props) => {
  return (
    <table className={`table table-striped table-bordered ${className}`}>
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">title</th>
        <th scope="col">Opening Hour</th>
        <th scope="col">Closing Hour</th>
        <th scope="col">Manager</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      {branches.map((branch, index) => (
        <BranchItem
          onItemDelete={id => onItemDeleted(id)}
          onItemEdit={branchToEdit => onItemEdit(branchToEdit)}
          key={branch.id}
          branch={branch}
          margin={margin}
          index={index}
        />
      ))}
      </tbody>
    </table>
  );
}

export default BranchesList;