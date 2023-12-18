const Mcq = require('../models/qaModel');
module.exports = {
    createMcq : async (req,res)=>{
        const mcq = req.body;
        console.log(mcq);
        try {
            const newMcq  = new Mcq({
                question: mcq.question,
                option1:mcq.option1,
                option2:mcq.option2,
                option3:mcq.option3,
                option4:mcq.option4,
                rightanswer:mcq.rightanswer,
                hint:mcq.hint
            });
            console.log(newMcq);
            await newMcq.save();
            res.status(201).json({status:true});
        } catch (error) {
            res.status(500).json({status:false,message:error.message})
        }
    },

    getMcq : async(req,res)=>{
        try {
            const allMcqs = await Mcq.find();
            res.status(200).json(allMcqs);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
    
}