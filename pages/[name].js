import { useRouter } from "next/router"

const Name = () => {
  const router = useRouter()
  const query = router.query
  const { name } = query

  return (
    <div>
      <h1>Hello {name}</h1>
    </div>
  )
}

export default Name