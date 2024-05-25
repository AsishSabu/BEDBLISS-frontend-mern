import React from "react"
import Banner from "../../components/owner/Banner/Banner"
import Body from "../../components/owner/Body/Body"

const Home:React.FC = () => {
  return (
    <div className="overflow-hidden">
      <Banner />
      <Body />
    </div>
  )
}

export default Home
