import prisma from "../db";
import { getProducts } from "./product";

export const getOneUpdates = async(req,res) => {
    const update = await prisma.update.findUnique({
        where : {
            id : req.params.id,


        }
    })
    res.json({data : update})
}


// const updates = await prisma.update.findMany({
    //     where : {
    //         productId : req.params.id
    //     }
    // })
    // res.json({data : updates})

export const getUpdates = async(req,res) => {
 
    const products = await prisma.product.findMany({
        where : {
            belongsToId : req.user.id
        },
        include : {
            update : true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates,...product.update]
    },[])

    res.json({data : updates})
}

export const createUpdate = async(req,res) => {
    const product = await prisma.product.findUnique({
        where : {
            
            id_belongsToId: {
                id:req.body.productId,
                belongsToId: req.user.id
            }
        }
    })
    
    if (!product) {
        return res.json({ message : 'Product Not Found'})
    }

    const update = await prisma.update.create({
        data : {
            title: req.body.title,
            body : req.body.body,
            product : {connect : {id : product.id}}
        }
    })
    res.json({data : update})
}

export const updateUpdate = async (req,res) => {
    const products = await prisma.product.findMany({
        where : {
            belongsToId: req.user.id
        },
        include : {
            update: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates,...product.update]
    },[])

    const match = updates.find(update => update.id === req.params.id)

    if(!match) {
        res.json({message : 'Match Not Found'})
    }

    const update = await prisma.update.update({
        where : {
            id : req.params.id
        },
        data : req.body
    })
    res.json({data : update})
}

export const deleteUpdate = async (req,res) => {
    const products = await prisma.product.findMany({
        where : {
            belongsToId: req.user.id
        },
        include : {
            update: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates,...product.update]
    },[])

    const match = updates.find(update => update.id === req.params.id)

    if(!match) {
        res.json({message : 'Match Not Found'})
    }

    const deleted = await prisma.update.delete({
        where : {
            id: req.params.id
        }
    })
    res.json({message: deleted})
}