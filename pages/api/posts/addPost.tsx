// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method=='POST'){
        const session = await getServerSession(req, res, authOptions);
        console.log(req.method);
        
        if(!session)
            return res.status(401).json({message:"Please sign in to make a post"})

        const title: string = req.body.title

        //Check title
        if(title.length>300) return res.status(403).json({message: "Please write a shoter message"})

        if(title.length==0) return res.status(403).json({message: "Please write a message"})

        //Get user
        const prismaUser = await prisma.user.findUnique({
            where:{email: session?.user?.email}
        })

        //Create Post
        try {
            const result = await prisma.post.create({
                data:{
                    title: title,
                    userId: prismaUser,
                }
            })

            res.status(200).json(result);
        } catch (error) {
            res.status(403).json({err:error})
        }
    }
}
