import Lottie from "lottie-react";

function LottieAnimation({ animation, className = "", loop = true }) {
  return <Lottie animationData={animation} loop={loop} className={className} />;
}

export default LottieAnimation;
