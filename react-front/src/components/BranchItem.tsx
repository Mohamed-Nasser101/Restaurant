import {Branch} from "../models/branch";
import {format} from 'date-fns'

interface Props {
  branch: Branch;
  index: number;
  margin: number;
  onItemDelete: (id: number) => void;
  onItemEdit: (branch: Branch) => void;
}

const BranchItem = ({branch, index, margin, onItemDelete, onItemEdit}: Props) => {
  return (
    <tr>
      <th scope="row">{index + 1 + margin}</th>
      <td>{branch.title}</td>
      {/*<td>{branch.openingHour}</td>*/}
      <td>{format(new Date(branch.openingHour), "H:mm")}</td>
      <td>{format(new Date(branch.closingHour), "H:mm")}</td>
      <td>{branch.managerName}</td>
      <td>
        <i onClick={_ => onItemDelete(branch.id)} className="bi bi-trash text-danger mx-3"></i>
        <i onClick={_ => onItemEdit(branch)} className="bi bi-pencil-fill"></i>
      </td>
    </tr>
  );

}

export default BranchItem;