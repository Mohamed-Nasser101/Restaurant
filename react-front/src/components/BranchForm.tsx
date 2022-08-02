import {LocalizationProvider,} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import TextField from '@mui/material/TextField';
import {useEffect, useState} from "react";
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {useForm} from "react-hook-form";
import axios from "../api/axios";
import {Branch} from "../models/branch";
import {toast} from "react-toastify";

interface Props {
  className?: string;
  itemToEdit: Branch | null;
  onBranchAdded: (branch: Branch) => void;
  onExitEditMode: () => void;
  onBranchEdited: (id: number, data: any) => void;
}

const formErrors = {
  openHourRequired: 1,
  closeHourRequired: 2,
  closeOpenHourMismatch: 3,
}

const BranchForm = ({className, onBranchAdded, itemToEdit, onExitEditMode, onBranchEdited}: Props) => {
  const {register, handleSubmit, watch, formState: {errors}, reset, setValue} = useForm();
  const [openHour, setOpenHour] = useState<Date | null>(null);
  const [closeHour, setCloseHour] = useState<Date | null>(null);
  const [customErrors, setCustomErrors] = useState<Set<number>>(new Set());

  const onSubmit = (data: any) => {
    validateForm();
    if (customErrors.size > 0) return;

    data.openingHour = openHour;
    data.closingHour = closeHour;

    if (editMode) {
      axios.put<Branch>(`Branches/${itemToEdit?.id}`, data)
        .then(branch => {
          onBranchEdited(itemToEdit?.id, branch.data);
          toast("branch Edited")
          reset();
          resetTimes();
        });
      return;
    }

    axios.post<Branch>('Branches', data)
      .then(branch => {
        onBranchAdded(branch.data);
        toast("branch added")
        reset();
        resetTimes();
      });

  };
  const validateForm = () => {
    openHour === null
      ? setCustomErrors(oldSet => {
        oldSet.add(formErrors.openHourRequired);
        return oldSet;
      })
      : setCustomErrors(oldSet => {
        oldSet.delete(formErrors.openHourRequired);
        return oldSet;
      })

    closeHour === null
      ? setCustomErrors(oldSet => {
        oldSet.add(formErrors.closeHourRequired);
        return oldSet;
      })
      : setCustomErrors(oldSet => {
        oldSet.delete(formErrors.closeHourRequired);
        return oldSet;
      })

    closeHour && openHour && closeHour < openHour
      ? setCustomErrors(oldSet => {
        oldSet.add(formErrors.closeOpenHourMismatch);
        return oldSet;
      })
      : closeHour && openHour && setCustomErrors(oldSet => {
      oldSet.delete(formErrors.closeOpenHourMismatch);
      return oldSet;
    })
  }
  const resetTimes = () => {
    setCloseHour(null);
    setOpenHour(null);
  }
  const editMode = !!itemToEdit;

  useEffect(() => {
    if (editMode) {
      setOpenHour(new Date(itemToEdit?.openingHour));
      setCloseHour(new Date(itemToEdit?.closingHour));
      setValue('title', itemToEdit?.title);
      setValue('managerName', itemToEdit?.managerName)
    } else {
      setOpenHour(null);
      setCloseHour(null);
      setValue('title', '');
      setValue('managerName', '')
    }
  }, [editMode, itemToEdit?.id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${className}`}>
      <h6 className={'text-center alert alert-dark'}>Add Branch</h6>

      <div className="form-group mb-3">
        <input {...register("title", {required: true, value: editMode ? itemToEdit?.title! : ''})}
               className={`form-control ${errors.title ? 'is-invalid' : ''}`}
               placeholder="Title" type="text"
               id="title"
        />
        {errors.title && <div className="invalid-feedback">This field is required.</div>}
      </div>

      <div className="form-group mb-3">
        <input {...register("managerName", {required: true, value: editMode ? itemToEdit?.managerName! : ''})}
               placeholder="Manager Name" type="text"
               className={`form-control ${errors.managerName ? 'is-invalid' : ''}`} id="manageName"
        />
        {errors.managerName && <div className="invalid-feedback">This field is required.</div>}
      </div>

      <div className={`form-group mb-2`}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Opening Hour"
            value={openHour}
            onViewChange={() => validateForm()}
            onChange={(newValue) => {
              setOpenHour(newValue);
              validateForm();
            }}
            ampm={false}
            minutesStep={30}
            minTime={new Date(0, 0, 0, 0)}
            maxTime={new Date(0, 0, 0, 23, 30)}
            renderInput={(params) =>
              (<>
                <TextField
                  {...params}
                  className={`${customErrors.has(formErrors.openHourRequired) ? 'is-invalid' : ''}`}
                />
                {customErrors.has(formErrors.openHourRequired) &&
                    <div className="invalid-feedback">This field is required.</div>}
              </>)
            }
          />
        </LocalizationProvider>
      </div>

      <div className="form-group mb-2">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Closing Hour"
            value={closeHour}
            onViewChange={() => validateForm()}
            onChange={(newValue) => {
              setCloseHour(newValue);
              validateForm();
            }}
            ampm={false}
            minutesStep={30}
            minTime={new Date(0, 0, 0, 0)}
            maxTime={new Date(0, 0, 0, 23, 30)}
            renderInput={(params) =>
              (<>
                <TextField
                  {...params}
                  className={`${customErrors.has(formErrors.closeHourRequired) || customErrors.has(formErrors.closeOpenHourMismatch) ? 'is-invalid' : ''}`}
                />
                {customErrors.has(formErrors.closeHourRequired) &&
                    <div className="invalid-feedback">This field is required.</div>}
                {customErrors.has(formErrors.closeOpenHourMismatch) &&
                    <div className="invalid-feedback">Close hour must be after open hour.</div>}
              </>)
            }
          />
        </LocalizationProvider>
      </div>
      <div>
        <button type="submit"
                className={`btn btn-outline-primary col-${editMode ? '7' : '12'} ${editMode ? '' : 'btn-block'}`}>
          {editMode ? 'Save' : 'Add'}
        </button>
        {editMode &&
            <button onClick={onExitEditMode} type="button" className="btn btn-secondary ml-2 col-4">Cancel</button>}
      </div>
    </form>
  );

}
export default BranchForm;