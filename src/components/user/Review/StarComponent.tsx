import React from "react"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { AiOutlineStar } from "react-icons/ai"

const StarComponent = ({ stars }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar color="orange" />
        ) : stars >= number ? (
          <FaStarHalfAlt color="orange" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    )
  })
  return (
    <>
        <div className=" flex gap-2 align-middle justify-start">
            {ratingStar}
            {/* <p>({review} customer reviews)</p> */}
        </div>
    </>
  )
}

export default StarComponent
