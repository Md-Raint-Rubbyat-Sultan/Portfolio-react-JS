const success = (
  pos = "top-center",
  icon = "🔥",
  dura = 4000,
  delay = 1000
) => {
  return {
    duration: dura,
    position: pos,
    // Custom Icon
    icon: icon,
    removeDelay: delay,
  };
};

export default success;
