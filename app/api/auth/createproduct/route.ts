import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";
import { BiFoodTag } from "react-icons/bi";

export async function POST(req:NextRequest){
    try{
        console.log("1. Incoming Cookies:", req.cookies.getAll());
        const session = await getServerSession(authOptions);
        console.log("2. Session Result:", session);
        
        const body = await req.json();

        if(!session||!session.user?.id){
            return NextResponse.json({
                message:"UnAuthorized",
            },{status:401})
        };

        if(!body.name||!body.quantity||!body.price){
            return NextResponse.json({
                message:"Missing Input Fields"
            },{status:402})
        }

        const product = await prisma.product.create({
            data:{
                name:body.name,
                sku:body.sku,
                price:body.price,
                quantity:body.quantity,
                lowStockAt:body.lowStockAt,
                userId:session.user.id
            }
        })

        return NextResponse.json({
           message:"Product Added Successfully",
        },{status:201})

        

    }catch(err){
        console.log("ERROR SAVING TO DB:", err);
       return NextResponse.json({
        message:"Internal Server Error",
        
       },{status:500})
    }
}