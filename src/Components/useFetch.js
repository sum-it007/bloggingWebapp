import { useState, useEffect } from "react"

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const abortCont = new AbortController()

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't fetch data ")
        }
        return res.json()
      })
      .then((res) => {
        setData(res)
        setIsLoading(false)
        setError(null)
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch Aborted")
        } else {
          setError(err.message)
          setIsLoading(false)
        }
      })
    return () => abortCont.abort()
  }, [url])
  return { data, isLoading, error }
}

export default useFetch