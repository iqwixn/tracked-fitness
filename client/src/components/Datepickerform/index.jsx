import { useForm, Controller } from "react-hook-form";
import { DatePicker, Button } from "antd";

import dayjs from "dayjs";

const DatePickerField = ({ control, name, placeholder }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: "This field is required",
      }}
      render={({ field, fieldState }) => (
        <>
          <DatePicker
            placeholder={placeholder}
            status={fieldState.error ? "error" : undefined}
            ref={field.ref}
            name={field.name}
            onBlur={field.onBlur}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => {
              field.onChange(date ? date.valueOf() : null);
            }}
          />
          <br />
          {fieldState.error ? (
            <span style={{ color: "red" }}>{fieldState.error?.message}</span>
          ) : null}
        </>
      )}
    />
  );
};

const DatePickerForm = () => {
  const { handleSubmit, control, watch } = useForm();

  return (
    <div className="container">
    <form
      onSubmit={handleSubmit((data) => {
        console.log("data ready to submit", data);
      })}
    >
      <div>
       
        <br />
        <DatePickerField
          placeholder="Select Date"
          control={control}
          name="startDate"
        />
        <br />
      </div>
      <br />
      <Button type="default">View previous workout</Button>
    </form>
    </div>
  );
};

export default DatePickerForm;