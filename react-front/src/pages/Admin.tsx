import BranchesList from "../components/BranchesList";
import axios from "../api/axios";
import {Paginated} from "../models/paginated";
import {Branch} from "../models/branch";
import {useEffect, useState} from "react";
import Pagination from '../components/Pagination';
import BranchForm from "../components/BranchForm";
import Search from "../components/Search";
import Swal from "sweetalert2";
import {toast} from "react-toastify";

const Admin = () => {
  const [branches, setBranches] = useState<Paginated<Branch>>();
  const [titleSearch, setTitleSearch] = useState('');
  const [managerSearch, setManagerSearch] = useState('');
  const [rerender, setRerender] = useState(true);
  const [editedItem, setEditedItem] = useState<Branch | null>(null);

  useEffect(() => {
    axios.get<Paginated<Branch>>(`/Branches?title=${titleSearch}&managerName=${managerSearch}&pageNumber=${branches?.pageNumber || 1}`).then(x => setBranches(x.data));
  }, [branches?.count, branches?.pageNumber, titleSearch, managerSearch, rerender]);

  const handlePageChange = (pageNumber: number) => {
    setBranches(branches => ({
      pageSize: branches?.pageSize!,
      pageNumber: pageNumber,
      count: branches?.count!,
      items: [...branches?.items!]
    }));
  }

  const resetSearch = () => {
    setManagerSearch('');
    setTitleSearch('');
  }

  const resetPagination = () => {
    setBranches(branches => ({
      pageSize: branches?.pageSize!,
      pageNumber: 1,
      count: branches?.count!,
      items: [...branches?.items!]
    }));
  }

  const handleItemDelete = (id: number) => {
    Swal.fire({
      title: 'Do you want to delete this branch?',
      showCancelButton: true,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`Branches/${id}`).then(x => {
          if (x.status === 200) {
            toast("branch Deleted");
            resetPagination();
            resetSearch();
            setRerender(x => !x);
          } else
            toast.error('error occured');
        });
      }
    })
  }

  const handleEditBranch = (id: number, data: any) => {
    setRerender(x => !x);
    setEditedItem(null);
    resetSearch();
  }

  if (!branches) {
    return <p>loading</p>
  }

  return (
    <div className={'container'}>
      <h2 className={'my-5 row'}>Branches</h2>
      <Search onManagerChanged={x => {
        resetPagination();
        setManagerSearch(x);
      }} onTitleChanged={x => {
        resetPagination();
        setTitleSearch(x);
      }}/>
      <div className={'row'}>
        <div className={'col-8'}>
          {branches && branches.count > 0 ?
            <>
              <BranchesList
                onItemEdit={branch => {
                  setEditedItem(branch)
                }}
                onItemDeleted={id => handleItemDelete(id)}
                className={''}
                branches={branches?.items}
                margin={(branches.pageNumber - 1) * branches.pageSize}
              />
              <Pagination pageCount={Math.ceil(branches?.count / branches.pageSize)}
                          onPageChange={handlePageChange}
                          currentPage={branches.pageNumber}
                          className={'mt-3 col-12'}
              />
            </>
            : <h2 className={'alert alert-info text-center'}>No Branches to show</h2>
          }
        </div>
        <div>
          <BranchForm
            itemToEdit={editedItem}
            onExitEditMode={() => setEditedItem(null)}
            onBranchEdited={(id, data) => handleEditBranch(id, data)}
            className={'rounded-lg'}
            onBranchAdded={branch => {
              resetSearch();
              resetPagination();
              setBranches(branches => ({
                pageSize: branches?.pageSize!,
                pageNumber: branches?.pageNumber!,
                count: branches?.count! + 1,
                items: [...branches?.items!, branch]
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Admin;