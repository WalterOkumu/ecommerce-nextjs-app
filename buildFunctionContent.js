const fs = require('fs')
const matter = require('gray-matter')

const getProducts = () => {
  const directory = `${process.cwd()}/content`

  const filenames = fs.readdirSync(directory)

  const products = filenames.map(filename => {
    //read the file from fs
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString()

    // pull out frontmatter => name
    const { data } = matter(fileContent)

    return data
  })

  return products
}

const filePath = `${process.cwd()}/functions/products.json`
const products = getProducts()

fs.writeFileSync(filePath, JSON.stringify(products))
