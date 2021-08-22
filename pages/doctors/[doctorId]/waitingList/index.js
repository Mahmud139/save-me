import withAuth from "@components/auth/withAuth"
import { Table, TableBody, TD } from "@components/others/Table"
import { getWaitingList } from "app/api/index"
import AppButton from "app/components/others/AppButton"
import { useUserContext } from "app/contexts/UserContext"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

const waitingList = () => {
  const [patient, setPatient] = useState({})
  const { currentUser } = useUserContext()
  const router = useRouter()
  const { doctorId } = router.query
  const [joined, setJoined] = useState(false)
  const [serial, setSerial] = useState(0)
  const [waiting, setWaiting] = useState(0)

  useEffect(() => {
    const get = async () => {
      try {
        const { data } = await getWaitingList(doctorId)
        const currentPatient = data.find((p) => p.patientId === currentUser._id)
        if(currentPatient) {
          setPatient(currentPatient)
          setSerial(data.indexOf(currentPatient)+1)
          setJoined(true)
        }
        else{
          setWaiting(data?.length)
        }

      } catch (error) {
        console.log(error)
      }
    }
    get()
  }, [])

  socket.on("patient-added", (newPatient, s) => {
    
    if(newPatient.patientId === currentUser._id){
      setPatient(newPatient)
      setSerial(s)
    }
    setWaiting(s)
    // if(patient.patientId !== currentUser._id){
    // }
  })

  socket.on("patient-removed", (patientId, s) => {

    if(patientId === currentUser._id){
      setPatient({})
    } else{
      setSerial(s)
    }
    setWaiting(s)
  })

  const handleJoin = () => {
    socket.emit("add-patient", {
      patientId: currentUser._id,
      doctorId,
      name: currentUser.name,
      phoneNumber: currentUser.phoneNumber,
    }, waiting)
    setJoined(true)
  }
  
  const handleCancel = () => {
    socket.emit("remove-patient", currentUser._id, waiting)
    setJoined(false)
  }

  return (
    <div className="">
      <h1 className="title">Waiting List</h1>
      <h2 className="my-10 text-center">{patient.patientId === currentUser._id ? `Your serial is ${serial}` : `${waiting} people waiting`}</h2>
      <Table>
        {patient._id ?
            <TableBody>
              <TD>{patient.name}</TD>
              <TD>Estimated: 1 min</TD>
              <TD><AppButton onClick={handleCancel} className="justify-center" >Cancel</AppButton></TD>
            </TableBody>
           : <TD>You haven't joined the waiting list yet, join now!</TD>}
      </Table>
      <AppButton
        className="w-56 my-5 mx-auto"
        onClick={handleJoin}
        disabled={joined}
      >
        Join the waiting list
      </AppButton>
    </div>
  )
}

export default withAuth(waitingList)
