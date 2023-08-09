import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public tittle: string
  
  @column()
  public slug: string
  
  @column()
  public image: string
  
  @column()
  public content: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async crateSlug (article: Article){
    article.slug = `${article.$dirty.tittle.replaceAll(' ', '-')}-${new Date().toISOString()}`
  }
}
