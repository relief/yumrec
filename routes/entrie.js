const Router = require('express-promise-router')

const db = require('../db')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

// export our router to be mounted by the parent application
module.exports = router

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query('SELECT * FROM entries WHERE id = $1', [id])
  res.send(rows)
})

router.post('/:id', async (req, res) => {
  const { id } = req.params
  const { type } = req.query
  console.log(req.query)
  switch (type) {
  	case 'like':
  	  await db.query('UPDATE entries SET "like"="like" + 1 WHERE id=$1', [id])
  	  res.send({ status: 'success'})
  	  break
  	default:
  	  res.send({ status: 'error'})
  }
})