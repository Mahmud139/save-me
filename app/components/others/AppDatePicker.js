import { useState } from "react"
import DatePicker from "react-datepicker"

export default function AppDatePicker({
  name = "date",
  className = "",
  state = {},
  setState = () => null,
  canGoBack,
  canNotGoForward,
}) {
  const [startDate, setDate] = useState(Date.parse(state[name]))
  // const [endDate, setEndDate] = useState(new Date())
  // useEffect(() => {
  //   setEndDate(Date.parse(new Date().setMonth(startDate.getMonth() + 1)))
  // }, [startDate])
  // console.log(new Date(startDate.getTime() + 2592000000))
  const handleDateChange = (date) => {
    setDate(date)
    setState({ ...state, [name]: date })
  }
  return (
    <div className="relative">
      <DatePicker
        selected={startDate}
        onChange={(date) => handleDateChange(date)}
        selectsStart
        startDate={startDate}
        // endDate={endDate}
        minDate={canGoBack ? "" : new Date()}
        maxDate={canNotGoForward ? new Date() : ""}
        nextMonthButtonLabel=">"
        previousMonthButtonLabel="<"
        className={className}
      />
    </div>
  )
}
