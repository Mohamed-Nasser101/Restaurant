import {useEffect, useState} from "react";
import axios from "../api/axios";
import {Paginated} from "../models/paginated";
import {Branch} from "../models/branch";
import {format} from "date-fns";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

interface Props {
  className?: string;
}

const BookingForm = ({className}: Props) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    axios.get<Paginated<Branch>>(`/Branches?pageSize=100`)
      .then(x => setBranches(x.data.items));
  }, []);

  const isValid = selectedId != null && name.length > 0 && selectedTime != null;

  const handleSubmit = () => {
    const openRange = branches.find(b => b.id == selectedId);
    if (
      selectedTime?.getHours()! < new Date(openRange!.openingHour).getHours()
      || selectedTime?.getHours()! > new Date(openRange!.closingHour).getHours()
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Wrong',
        text: 'Selected time must be in range',
      });
      return;
    }
    axios.post('Booking', {
      clientName: name,
      time: selectedTime,
      branchId: selectedId
    }).then(x => {
      if (x.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Booked Successfully'
        });
        setName('');
        setSelectedId(null);
        setSelectedTime(null);
      }
    });
  }

  return (
    <div className={`container mt-5 ${className}`}>
      <h2 className={'text-center'}>Book Now</h2>
      <div className={'row'}>
        <div className={'col-6 bg-light text-info pr-5 p-3 m-3 rounded-lg overflow-auto'}>
          {branches.length === 0
            ? <h5>No Branches To book</h5>
            : <div>
              <h5>Branch Title</h5>
              {branches.map(branch => (
                <div key={branch.id} className="form-check mb-2">
                  <input className="form-check-input"
                         type="radio"
                         name="branch" id={branch.id.toString()}
                         value={branch.id}
                         onChange={e => setSelectedId(+e.currentTarget.value)}
                  />
                  <label className="form-check-label" htmlFor={branch.id.toString()}>
                    {branch.title} (opens at: <span
                    className={'text-dark'}>{format(new Date(branch.openingHour), "h:m aaa")}</span> closes
                    at: <span
                    className={' text-dark'}>{format(new Date(branch.closingHour), "h:m aaa")}</span> )
                  </label>
                </div>
              ))}
            </div>}
        </div>
        <div className={'col-4 m-3'}>
          <div className="form-group">
            <label htmlFor="clientName">Your Name</label>
            <input type="text" value={name} onInput={x => setName(x.currentTarget.value)} className="form-control"
                   id="clientName"/>
          </div>
          <div className={`form-group mb-2`}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Select Time"
                value={selectedTime}
                // onViewChange={() => validateForm()}
                onChange={(newValue) => {
                  setSelectedTime(newValue);
                  // validateForm();
                }}
                renderInput={(params) =>
                  (<>
                    <TextField
                      {...params}
                      className={`${selectedTime == null ? 'is-invalid' : ''}`}
                    />
                    {/*{selectedTime == null &&*/}
                    {/*    <div className="invalid-feedback">This field is required.</div>}*/}
                  </>)
                }
              />
            </LocalizationProvider>
          </div>
          <button onClick={handleSubmit} disabled={!isValid} className={'btn btn-success btn-block'}>Book</button>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;