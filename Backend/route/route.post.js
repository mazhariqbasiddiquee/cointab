const Post=require("../model/post")
const express=require("express")
const PostRouter=express.Router()
const XLSX = require('xlsx');
const fs=require("fs")

PostRouter.get("/",async(req,res)=>{
   
        let data=await Post.findAll()
        res.status(200).json({data})
   
})
PostRouter.get("/:id",async(req,res)=>{
    let {id}=req.params
    let data=await Post.findOne({where:{userId:id}})
        res.status(200).json({data})
})

PostRouter.get("/export/:id", async (req, res) => {
    try {
        let {id} = req.params;
        let data = await Post.findAll({where:{userId:id}});
        const plainData = data.map(ele =>ele.toJSON());
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(plainData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelFilePath = 'output.xlsx';
        XLSX.writeFile(workbook, excelFilePath, {bookType: 'xlsx' });

        res.download(excelFilePath, 'output.xlsx', (err) => {
            if (err) {
                console.error('Error :', err);
                res.status(500).end();
            } else {
                fs.unlinkSync(excelFilePath);
            }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).end();
    }
});




PostRouter.post("/add",(req,res)=>{
    console.log(req.body)
    let data=Post.create(req.body)
    res.status(201).json({data})

})

module.exports=PostRouter