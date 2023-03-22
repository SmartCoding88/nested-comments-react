import fastify from 'fastify'

import sensible from "@fastify/sensible"
import cors from "@fastify/cors"
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()

const app = fastify()
app.register(sensible)
app.register(cors,{
    origin: process.env.CLIENT_URL,
    credentials: true
})
const prisma = new PrismaClient()

//get posts
app.get("/posts", async (req, res)=>{
    return await commitToDb(prisma.post.findMany({
       select:{
        id: true,
        title: true
       }
    }))
})

//get post by Id
app.get("/posts/:id", async (req, res)=>{
    return await commitToDb(prisma.post.findUnique({
       where: {id: req.params.id},
       select:{
        body: true,
        title: true, comments:{
            orderBy:{
                createdAt: "desc"
            },
            select:{
                id: true,
                message: true, 
                parentId: true, 
                createdAt: true,
                user:{
                    select:{
                        id: true, 
                        name: true
                    }
                }

            }
        }
       }
    }))
})

//error handling helper function
async function commitToDb(promise){
   const [error, data] = await app.to(promise)
   if(error) return app.httpErrors.internalServerError(error.message)
   return data
}

app.listen({
    port: process.env.PORT
})