import withAuth from "@components/auth/withAuth"
import DonorInfo from "@components/MultiStepForm/DonorInfo"
import React from "react"

const DonorProfile = () => (
  <div className="dashboard-main">
    <div className="h-24 min-h-0 md:min-h-full flex items-center">
      <h1 className="title">Donor Info</h1>
    </div>
    <DonorInfo />
  </div>
)

export default withAuth(DonorProfile)
