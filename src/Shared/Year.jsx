const minOffset = 0;
const maxOffset = 30;
import React from 'react';
import { FormControl, MenuItem, Select } from "@material-ui/core";
const tyear = (new Date()).getFullYear();
import { useEffect, useState } from "react";
// const[thisYear,selectedYear ]= useState(tyear);
const DatePicker = ({ yr }) => {
   
    const options = [];
    const onHandleChange = (evt) => {
        selectedYear(evt.target.value);
        window.scroll(0, 0);
    };
    for (let i = minOffset; i <= maxOffset; i++) {
        const year = tyear - i;
        options.push(<MenuItem value={year}>{year}</MenuItem>);
    }
    return (
        <div>
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={yr}
                    onChange={onHandleChange}
                >
                    {options}
                </Select>
            </FormControl>
        </div>
    );

}
export default DatePicker;
