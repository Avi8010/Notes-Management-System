const express=require('express');
const router=express.Router();
const {body, validationResult} = require('express-validator');
const fetchuser=require('../middleware/fetchuser')
const Note=require('../models/Notes')


//route:1 get all notes using get
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try{
    const notes=await Note.find({user:req.user.id}) 
    res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("internal some error occured");
    }
});

//route:2 add note using post 
router.post('/addnotes',fetchuser,[ 
    body('title').isLength({min:3}),
    body('description').isLength({min:5})
    
 
], async (req,res)=>{

    try{

    const {title,description,tag} = req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    const note=new Note({
        title,description,tag,user:req.user.id
    })
    const savnote=await note.save();
    res.json(savnote);
    }catch(error){
        console.error(error.message);
        res.status(500).send("internal sc error occured");
    }
    
});


//route:3 update a note
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const{title,description,tag}=req.body;

    //create a newnote object
    const newnote= {};
    if(title){newnote.title=title};
    if(description)(newnote.description=description);
    if(tag)(newnote.tag=tag);

    //find by id and update
    let note=await  Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowd");
    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
    res.json({note});
})


//rout:4 deleting exixting note
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    const{title,description,tag}=req.body;

    
    // if(title){newnote.title=title};
    // if(description)(newnote.description=description);
    // if(tag)(newnote.tag=tag);

    //find note to be delete and delete it
    let note=await  Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    //allow deletion only if user qwns it
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowd");
    }
    note=await Note.findByIdAndDelete(req.params.id);
    res.json({"success":"note has been deleted",note:note});
})
module.exports = router