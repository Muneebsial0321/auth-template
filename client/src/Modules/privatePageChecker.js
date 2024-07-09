
const PrivatePageChecker = async (link) => {

  const res = await fetch(link, { credentials: "include" })
  const __data__ = await res.json()
  return __data__
}

export default PrivatePageChecker