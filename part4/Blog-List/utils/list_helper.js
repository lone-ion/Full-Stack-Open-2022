const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blogs) =>
    blogs.likes + acc,
    0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((accObj, curObj) =>
    accObj.likes > curObj.likes ? accObj : curObj
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}