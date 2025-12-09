import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest){
    

    try{
        //@ts-ignore
    const body = await req.json();
        const existinguser = await prisma.user.findUnique({
            where:{
               email:body.email
            }
        });

           if (!body.email || !body.password ) {
           return NextResponse.json(
           { message: "Missing required fields" },
           { status: 400 }
        );
        }
      
        if(existinguser){
            return NextResponse.json({
                message:"User Already exists in the database"
            },{status:409})
        }


        const user  = await prisma.user.create({
            data:{
                email:body.email,
                password:body.password,
                
               
            }
            
        })

        return NextResponse.json({
          message:"User Created Successfully",
          success:true
        },{status:201})
    }catch(error){
        console.log("Oops there was an error",error);
        return NextResponse.json({
          message:"Internal Server Error"
        },{status:500})
    }
}