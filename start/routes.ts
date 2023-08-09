import Route from '@ioc:Adonis/Core/Route'


Route.resource('news', 'ArticlesController').paramFor('news', 'slug').middleware({
  edit: ['auth'],
  create: ['auth'],
  store: ['auth'],
  destroy: ['auth'],
})


Route.on('/login').render('auth/login').as('auth.login')
Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')
  await auth.use('web').attempt(email, password)
  return response.redirect('/news')
})

Route.post('/logout', async ({ auth, response }) => {
  await auth.use('web').logout()
  response.redirect('/login')
}).as('auth.logout')

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

// Route.on('/news').render("news/view").as('news_view')
// Route.get('/news', 'ArticlesController.view').as('news_view')
// Route.get('/news/create', 'ArticlesController.create').as('news_create')
// Route.post('/news', 'ArticlesController.store').as('news_store')
// Route.get('/news/:slug/edit', 'ArticlesController.edit').as('news_edit')
// Route.patch('/news/:slug', 'ArticlesController.update').as('news_update')
// Route.delete('/news/:slug', 'ArticlesController.destroy').as('news_delete')

// Route.group(() => {
// }).middleware('auth')
// Route.delete('/news/:id', async ({ params }) => {
//   return { params }
// }).where("id", {
//   match : /^[0-9]+$/,
//   cast: (id) => Number(id)
// }).as('news_delete')