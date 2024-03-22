import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker";

interface DatePickerProps extends ReactDatePickerProps {}

export default function Datepicker(DatePickerProps: DatePickerProps) {
  return (
    <DatePicker
      wrapperClassName="w-full"
      placeholderText="Selecione uma data"
      className="w-full rounded py-1 px-2 mr-3 text-slate-900 block"
      dateFormat={"dd/MM/yyyy"}
      id={DatePickerProps.id}
      onChange={DatePickerProps.onChange}
      name={DatePickerProps.name}
      disabled={DatePickerProps.disabled}
      selected={DatePickerProps.selected}
      maxDate={new Date()}
    />
  );
}
