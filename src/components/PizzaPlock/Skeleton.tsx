
import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader
  className="pizza-block" 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="125" cy="125" r="125" /> 
    <rect x="0" y="280" rx="10" ry="10" width="248" height="20" /> 
    <rect x="1" y="322" rx="10" ry="10" width="248" height="88" /> 
    <rect x="0" y="428" rx="10" ry="10" width="95" height="30" /> 
    <rect x="1" y="429" rx="10" ry="10" width="95" height="30" /> 
    <rect x="119" y="429" rx="26" ry="26" width="127" height="45" />
  </ContentLoader>
)

export default Skeleton; 