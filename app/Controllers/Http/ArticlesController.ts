// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Application from "@ioc:Adonis/Core/Application";
import Article from 'App/Models/Article'
import CreateArticleValidator from "App/Validators/CreateArticleValidator"

export default class ArticlesController {
    public async index({ view }) {
        const articles = await Article.all()
        const state = {
            articles
        }
        return view.render('news/view', state)
    }

    public async create({ view }) {
        return view.render('news/create')
    }

    public async store({ request, response }) {
        const payload = await request.validate(CreateArticleValidator)
        await payload.image.move(Application.publicPath("image"));
        payload.image = payload.image.fileName
        await Article.create(payload)
        // await Database.table('articles').insert({ ...payload, slug: `${payload.tittle.replaceAll(' ', '-')}-${new Date()}` })
        return response.redirect().back()

    }

    public async edit({ view, params }) {
        const { slug } = params
        const article = await Article.findBy('slug' , slug)
        return view.render('news/edit', {article})
    }
    
    public async update({ request, response , params}) {
        const payload = await request.validate(CreateArticleValidator)

        await Article.query().where('slug' , params.slug).update(payload)

        // await Database.from('articles').where('slug', params.slug).update(payload)
        return response.redirect('/news')
    }
    
    public async destroy({response, params}){      
       const article = await Article.findBy('slug' , params.slug)
       if(article){
            article.delete()
           return response.redirect().back()
       }
    }

    public async show ({view, params}){
        const article = await Article.findBy('slug' , params.slug)
        return view.render("news/show", {article})
    }
}
