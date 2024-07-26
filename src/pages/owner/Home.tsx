import React from "react"
import Body from "../../components/owner/Body/Body"
import Banner from "../../components/owner/Banner/Banner"

const Home:React.FC = () => {
  return (
    <div className="overflow-hidden">
      <Banner/>
      <Body />
    </div>
  )
}

export default Home
